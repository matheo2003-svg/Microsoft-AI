# server.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env (if present)
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow requests from other origins

# Load Azure OpenAI credentials from environment
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_OPENAI_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")
AZURE_OPENAI_KEY = os.getenv("AZURE_OPENAI_KEY")
API_VERSION = "2024-04-01-preview"

@app.route("/")
def index():
    return send_from_directory("static", "ussd-sms.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()
    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    headers = {
        "Content-Type": "application/json",
        "api-key": AZURE_OPENAI_KEY
    }

    payload = {
        "messages": [
            {
                "role": "system",
                "content": "You are a live alert assistant for flood and drought updates in South Africa. Provide concise, timely information."
            },
            {"role": "user", "content": user_message}
        ],
        "max_tokens": 150,
        "temperature": 0.7
    }

    try:
        url = f"{AZURE_OPENAI_ENDPOINT}/openai/deployments/{AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version={API_VERSION}"
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        reply = data["choices"][0]["message"]["content"]
        return jsonify({"reply": reply.strip()})
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Alert Bot: Error retrieving update."}), 502

if __name__ == "__main__":
    app.run(debug=True, port=8000)
