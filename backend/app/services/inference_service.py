from langchain.prompts import ChatPromptTemplate
from langchain_community.llms import Ollama
from typing import Any
import json
import os
from tqdm.auto import tqdm
from backend.app.services.prompts import (
    stage_1_prompt_template,
    stage_2_prompt_template,
    stage_3_prompt_template,
)


# Define the model handler
class ModelHandler:
    def __init__(self, model_name: str, temperature: float = 0.0, num_ctx: int = 16384):
        self.chat = Ollama(
            model=model_name, temperature=temperature, num_ctx=num_ctx, keep_alive=-1
        )

    def invoke(self, prompt: Any) -> str:
        return self.chat.invoke(prompt)


# Instantiate chat model
# chat = ModelHandler("qwen2.5:7b-instruct-fp16")
chat = ModelHandler("llama2")

# Define file path and chunk size
output_file = "data.json"
chunk_size = 10


# Load existing data from JSON file
def load_data(file_path: str) -> list:
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            return json.load(f)
    return []


# Save data to JSON file
def save_data(file_path: str, data: list):
    with open(file_path, "w") as f:
        json.dump(data, f, indent=4)


# Process a specific stage
def process_stage(
    data: list, stage_prompt_template: ChatPromptTemplate, stage_output_key: str
):
    pathology_report_data = []
    new_data_count = 0

    for entry in tqdm(data, desc=f"Processing {stage_output_key}", dynamic_ncols=True):
        if stage_output_key not in entry:
            if stage_output_key == "stage_1_output":
                input_message = stage_prompt_template.format_messages(
                    report=entry["text"]
                )
            elif stage_output_key == "stage_2_output":
                input_message = stage_prompt_template.format_messages(
                    report=entry["text"], stage_1_output=entry["stage_1_output"]
                )
            elif stage_output_key == "stage_3_output":
                input_message = stage_prompt_template.format_messages(
                    stage_1_output=entry["stage_1_output"],
                    stage_2_output=entry["stage_2_output"],
                )
            stage_output = chat.invoke(input_message)
            entry[stage_output_key] = stage_output
            pathology_report_data.append(entry)
            new_data_count += 1

        if new_data_count >= chunk_size:
            save_data(output_file, data)
            pathology_report_data.clear()
            new_data_count = 0

    if pathology_report_data:
        save_data(output_file, data)


data = load_data(output_file)

stage_1_prompt = ChatPromptTemplate.from_template(stage_1_prompt_template)
process_stage(data, stage_1_prompt, "stage_1_output")

stage_2_prompt = ChatPromptTemplate.from_template(stage_2_prompt_template)
process_stage(data, stage_2_prompt, "stage_2_output")

stage_3_prompt = ChatPromptTemplate.from_template(stage_3_prompt_template)
process_stage(data, stage_3_prompt, "stage_3_output")
