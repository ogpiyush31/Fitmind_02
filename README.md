# FitMind Project

FitMind is a mental fitness journal designed to help users track their daily moods, analyze their sentiments, and receive uplifting messages. This project consists of a backend built with Node.js and Express, and a frontend developed using React.

## Project Structure

The project is organized into the following directories:

- **backend**: Contains the server-side code, including API routes, controllers, models, and utilities for sentiment analysis.
- **frontend**: Contains the client-side code, including React components, services for API calls, and styles.
- **database**: Contains SQL files for database schema and seeding.

## Backend Setup

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your MySQL database and configure the connection in `src/app.js`.
4. Start the server:
   ```
   npm start
   ```

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Features

- **Daily Mood Writing**: Users can log their mood and feelings each day.
- **Sentiment Analysis**: The application uses TextBlob to analyze the sentiment of mood entries.
- **Weekly Mood Chart**: Users can view their mood trends over the week in a chart format.
- **Uplifting Messages**: The app provides motivational messages to encourage users.

## Technologies Used

- **Backend**: Node.js, Express, MySQL, TextBlob
- **Frontend**: React, Axios, CSS

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.