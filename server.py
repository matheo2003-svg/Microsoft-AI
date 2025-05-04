# server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import vertexai
from vertexai.language_models import ChatModel

app = Flask(__name__)
CORS(app)

# Initialize Vertex AI
vertexai.init(project="clinic-booking-group-8", location="us-central1")  # e.g., "us-central1"

# Load Gemini model
chat_model = ChatModel.from_pretrained("chat-bison@002")
chat_session = chat_model.start_chat()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()
    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    try:
        response = chat_session.send_message(user_message)
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"error": f"Error from Gemini: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)
