from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app) # Allow requests from your other services

# Load a pre-trained model for emotion classification from Hugging Face
emotion_classifier = pipeline(
    "text-classification", 
    model="j-hartmann/emotion-english-distilroberta-base", 
    return_all_scores=True
)
print("✅ Emotion detection model loaded.")

@app.route('/analyze-emotions', methods=['POST'])
def analyze_emotions_route():
    data = request.get_json()
    if not data or 'journal_text' not in data:
        return jsonify({"error": "Missing 'journal_text' in request"}), 400

    journal_text = data['journal_text']

    # The model returns a list containing a dictionary of scores
    emotion_results = emotion_classifier(journal_text)[0]

    # Sort emotions by score to easily find the most dominant ones
    sorted_emotions = sorted(emotion_results, key=lambda x: x['score'], reverse=True)

    return jsonify({"emotions": sorted_emotions})

if __name__ == '__main__':
    app.run(port=5003, debug=True)