# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient

# Create FastAPI app
app = FastAPI()

# Allow frontend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient("mongodb+srv://mudithasasanka7:Muditha1234@cluster0.vdkrcfo.mongodb.net/")
db = client["name_db"]
collection = db["names"]

# Request model
class Name(BaseModel):
    name: str

@app.post("/add-name")
async def add_name(data: Name):
    collection.insert_one({"name": data.name})
    return {"message": "Name added successfully"}
