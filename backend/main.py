from fastapi import FastAPI, WebSocket
from fastapi.responses import Response, FileResponse
import requests
import asyncio, json
from fastapi.middleware.cors import CORSMiddleware
import os



app = FastAPI()


origins = [
    "http://localhost:3000",  # React frontend
    "http://localhost:8000",  # FastAPI backend
    # Add other allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/v1/reports")
async def reports():
    file_path = './app/data/data.json'
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        return Response(content="File not found", status_code=404)
