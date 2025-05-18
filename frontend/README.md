# FitMind Frontend Documentation

## Overview
FitMind is a mental fitness journal designed to help users track their daily moods, analyze their sentiments, and receive uplifting messages. This frontend application is built using React and provides a user-friendly interface for interacting with the backend services.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fitmind.git
   ```
2. Navigate to the frontend directory:
   ```
   cd fitmind/frontend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the development server, run:
```
npm start
```
This will launch the application in your default web browser at `http://localhost:3000`.

### Folder Structure
- **public/**: Contains static files like `index.html` and styles.
- **src/**: Contains the React components and services.
  - **components/**: Includes `MoodChart.js`, `MoodForm.js`, and `UpliftingMessages.js`.
  - **services/**: Contains `api.js` for making API calls to the backend.
  - **App.js**: The main application component.
  - **index.js**: The entry point for the React application.

### Features
- **Daily Mood Writing**: Users can input their mood and feelings through the MoodForm component.
- **Sentiment Analysis**: The application uses TextBlob for analyzing the sentiment of the mood entries.
- **Weekly Mood Chart**: Displays a visual representation of the user's mood over the week.
- **Uplifting Messages**: Provides motivational messages to encourage users.

### Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

### License
This project is licensed under the MIT License. See the LICENSE file for details.