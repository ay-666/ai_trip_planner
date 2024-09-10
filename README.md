# AI Trip Planner

AI Trip Planner is a web application that helps users create personalized travel itineraries based on their preferences, utilizing React, Tailwind CSS, Firebase, the Gemini API and Google place API for real-time travel information.

## Features

- AI-powered trip recommendations based on user preferences.
- Users can create, and save their customised plans.
- Responsive design with Tailwind CSS for optimal viewing across devices.
- Real-time travel information and recommendations via the Gemini  and Google Place API.
- Authentication and data storage using Firebase.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase (for authentication and database)
- **API**: Gemini API for travel data , Google Place API for location information

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ay-666/ai_trip_planner.git
    ```
   
2. **Navigate to the project directory**:
    ```bash
    cd client
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Create a `.env` file**:
    To run this project, you will need to add the following environment variables to your `.env` file.

```bash
# Google Places API Key
VITE_GOOGLE_PLACE_API_KEY=YOUR_GOOGLE_PLACE_API_KEY

# Gemini API Key
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY

# Google Authentication Client ID
VITE_GOOGLE_AUTH_CLIENT_ID=YOUR_GOOGLE_AUTH_CLIENT_ID

# Firebase API Configuration
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

```

5. **Start the application**:
    ```bash
    npm run dev
    ```

The app should now be running on `http://localhost:5173`.

## Firebase Setup

To set up Firebase for authentication and data storage:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project and set up authentication (email/password or any other provider).
3. Create a Firestore database for storing user travel plans.
4. Add your Firebase configuration to the `.env` file as shown above.

## Usage

1. **Sign In** to create your travel itinerary.
2. **Search for destinations** using the AI-powered search functionality.
3. **Create and save** your personalized travel plans.
4. View **real-time travel information** and recommendations from the Gemini API.

## Live Demo

Check out the live demo: [AI Trip Planner Live](https://ai-trip-planner-demo.com/)

## Contributing

If you'd like to contribute to this project, feel free to submit a pull request or open an issue.


