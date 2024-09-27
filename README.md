# Speech-to-Text Transcription App

This project is a TypeScript React application built with Vite that allows users to transcribe audio files using their own OpenAI API key. It utilizes Firebase for authentication and a Firestore database to securely store users' encrypted API keys.

## Project Overview

This application enables users to upload audio files and receive transcripts using OpenAI's speech-to-text API. The process involves two main steps:

1. Setting up your OpenAI API key (which will be encrypted and stored in Firestore)
2. Running the speech-to-text transcription

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js (version 14 or later)
- npm (usually comes with Node.js)
- An OpenAI API key
- A Firebase project

### Firebase Setup

Before installing the application, you need to set up a Firebase project:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add project" and follow the steps to create a new project
3. Once your project is created, click on "Add app" and choose the web platform (</>)
4. Register your app and copy the Firebase configuration object
5. Enable Authentication and Firestore Database in your Firebase project settings

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/jonsrose/speech-to-text.git
   ```

2. Navigate to the project directory:
   ```
   cd speech-to-text
   ```

3. Create a `.env` file in the root directory of the project. This file is already ignored by git for security reasons. Add your Firebase configuration to this file. You can retrieve these values from your Firebase project settings:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Replace the placeholders (e.g., `your_api_key`) with the actual values from your Firebase project settings.

4. Install dependencies:
   ```
   npm install
   ```

### Usage

1. Start the application:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Use the interface to upload an audio file and initiate the transcription process

### Development

To start the development server:
```
npm run dev
```

This will start the development server and open your default browser to `http://localhost:3000`.

### Building

To build the project:
```
npm run build
```

This will create a `dist` directory with the production-ready files.

### Linting

To run the linter:
```
npm run lint
```

### Preview

To preview the production build:
```
npm run preview
```

This will start a local server and open your default browser to `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenAI](https://openai.com/) for providing the speech-to-text API
- [Vite](https://vitejs.dev/) for the fast build tool and development server
- [React](https://reactjs.org/) for the frontend framework
- [Firebase](https://firebase.google.com/) for backend services, authentication, and Firestore database
