from fastapi import FastAPI, HTTPException, UploadFile, File
import requests

app = FastAPI()
CHATBOT_API_URL = "http://chatbot-service:8000"

@app.post("/chat")
def chat(question: str):
    try:
        response = requests.post(f"{CHATBOT_API_URL}/chat/", json={"question": question})
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur : {str(e)}")

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    response = requests.post(f"{CHATBOT_API_URL}/ingest/", json={"id": file.filename, "content": contents.decode()})
    return response.json()
