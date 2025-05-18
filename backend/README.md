# FitMind Backend Documentation

## Overview
FitMind is a mental fitness journal designed to help users track their daily moods, analyze their sentiments, and receive uplifting messages. This backend documentation provides instructions on setting up and using the backend services.

## Technologies Used
- Node.js
- Express.js
- MySQL
- TextBlob for sentiment analysis

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MySQL server running
- A MySQL database created for the FitMind application

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd fitmind/backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Run the SQL commands in `database/schema.sql` to create the necessary tables.
   - Optionally, run `database/seed.sql` to seed the database with initial data.

### Running the Application

1. Start the server:
   ```
   npm start
   ```

2. The backend will be running on `http://localhost:3000` (or the port specified in your app).

## API Endpoints

### Mood Routes
- **POST /mood**: Save a new mood entry.
- **GET /mood/weekly**: Retrieve weekly mood data.

### Sentiment Analysis
The backend uses TextBlob to analyze the sentiment of mood entries. This is handled in the `sentimentAnalysis.js` utility.

## Folder Structure
- `src/app.js`: Entry point of the application.
- `src/controllers/moodController.js`: Handles mood-related requests.
- `src/models/moodModel.js`: Defines the mood schema and database interactions.
- `src/routes/moodRoutes.js`: Defines API routes for mood operations.
- `src/utils/sentimentAnalysis.js`: Contains the sentiment analysis logic.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.