from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Test route
@app.route("/")
def home():
    return "Flask server is running"

# Translation API
@app.route("/translate", methods=["POST"])
def translate():
    try:
        data = request.get_json()

        text = data.get("text")
        lang = data.get("lang")

        if not text or not lang:
            return jsonify({"error": "Missing data"}), 400

        url = "https://libretranslate.de/translate"

        payload = {
            "q": text,
            "source": "en",
            "target": lang,
            "format": "text"
        }

        response = requests.post(url, data=payload)

        if response.status_code != 200:
            return jsonify({"error": "API failed"}), 500

        result = response.json()

        return jsonify({
            "translated": result.get("translatedText", text)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)