---
description: How to launch the DayWin application to Google Play Store using Capacitor
---

To launch your Next.js application on Google Play, we will use **Capacitor**. Capacitor allows you to wrap your web application into a native Android app.

Since your application uses Next.js API routes (backend), the most straightforward approach is to point the mobile app to your deployed live website (e.g., on Vercel).

### Prerequisites
1.  **Android Studio**: You must have [Android Studio](https://developer.android.com/studio) installed on your computer to build the final app bundle.
2.  **Live Deployment**: Your web application must be deployed and accessible via a public URL (e.g., `https://day-win.vercel.app`).

### Step 1: Install Capacitor Dependencies
Run the following commands to install the necessary packages:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### Step 2: Initialize Capacitor
Initialize Capacitor with your app name and ID (the ID should be unique, e.g., `com.daywin.app`).
```bash
npx cap init "Day Win" com.daywin.app
```

### Step 3: Configure Capacitor
Open the `capacitor.config.json` (or `.ts`) file that was created. You need to tell Capacitor to load your live website instead of a local file.

Modify `capacitor.config.ts` to look like this:
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daywin.app',
  appName: 'Day Win',
  webDir: 'public', // We point to public as a placeholder since we use server.url
  server: {
    url: 'https://day-win.vercel.app', // REPLACE THIS with your actual deployed URL
    cleartext: true
  }
};

export default config;
```
*Note: Using a live URL means the app requires an internet connection to work.*

### Step 4: Add Android Platform
Add the Android platform to your project:
```bash
npx cap add android
```

### Step 5: Build and Sync
Even though we are pointing to a live URL, Capacitor needs a build structure.
```bash
npm run build
npx cap sync
```

### Step 6: Open in Android Studio
Open the Android project in Android Studio:
```bash
npx cap open android
```

### Step 7: Build for Google Play
Inside Android Studio:
1.  Wait for Gradle sync to finish.
2.  Go to **Build** > **Generate Signed Bundle / APK**.
3.  Choose **Android App Bundle** (AAB) for the Play Store.
4.  Create a new KeyStore (save these credentials safely!).
5.  Finish the wizard to generate your `.aab` file.

### Step 8: Upload to Google Play Console
1.  Go to the [Google Play Console](https://play.google.com/console).
2.  Create a new app.
3.  Upload the `.aab` file you generated.
4.  Fill out the store listing details (screenshots, description, etc.).
5.  Submit for review!

---
**Note about "Native" Feel**:
To make the app feel more native (hide browser controls, handle status bar):
1.  Install the Status Bar plugin: `npm install @capacitor/status-bar`
2.  Import and stick to portrait mode if desired.
