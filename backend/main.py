from fastapi import FastAPI, WebSocket
from fastapi.responses import StreamingResponse, Response
import requests
import asyncio, json
from fastapi.middleware.cors import CORSMiddleware




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