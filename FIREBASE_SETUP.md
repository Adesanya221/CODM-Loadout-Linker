# Firebase Authentication Setup

This project uses Firebase for authentication. Follow these steps to set up Firebase in your project:

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Give your project a name and follow the prompts

## Step 2: Register your app with Firebase

1. In the Firebase console, click on the project you just created
2. Click "Add app" and select the web platform (</> icon)
3. Register your app with a nickname and click "Register app"
4. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

## Step 3: Set up environment variables

1. Create a `.env` file in the root of your project
2. Add the following variables, replacing the values with your Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Step 4: Enable Authentication Methods

1. In the Firebase console, go to "Authentication" and click "Get started"
2. Enable the authentication methods you want to use:
   - Email/Password: Click "Email/Password", enable it, and save
   - Google: Click "Google", enable it, configure your OAuth client if needed, and save

## Step 5: Set up Firestore (optional)

If you plan to use Firestore for data storage:

1. Go to "Firestore Database" in the Firebase console
2. Click "Create database"
3. Choose "Start in production mode" or "Start in test mode" (for development)
4. Select a location for your database
5. Click "Enable"

## Step 6: Deploy your application

1. Run `npm run build` to create a production build
2. Deploy your application to your hosting provider of choice

## Troubleshooting

- Make sure your environment variables are correctly set
- Check that the authentication methods you want to use are enabled in Firebase
- Ensure your Firebase project is properly configured for the platforms you're targeting 