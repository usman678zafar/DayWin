---
description: How to build and install the APK locally on an Android device (Side-loading) without Google Play
---

You can install the application directly on your Android device completely free of charge. This is called "side-loading".

### Prerequisites
1.  **Enable Developer Options**:
    *   Go to **Settings** > **About phone**.
    *   Tap **Build number** 7 times until you see "You are now a developer!".
2.  **Enable USB Debugging**:
    *   Go to **Settings** > **System** > **Developer options**.
    *   Enable **USB debugging**.

### Option 1: Run Directly (Easiest)
This method builds and installs the app automatically while your phone is connected.

1.  Connect your Android phone to your computer via USB.
2.  Run the following command in your terminal:
    ```bash
    npx cap run android
    ```
3.  Select your device from the list if prompted.
4.  The app will open automatically on your phone.

### Option 2: Build APK and Transfer
If you want to send the file to your phone (or share it with friends):

1.  **Open Android Studio**:
    ```bash
    npx cap open android
    ```
2.  **Build the APK**:
    *   In the top menu, go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
    *   Wait for the build to finish. A notification will appear at the bottom right.
    *   Click **locate** in the notification to open the folder containing `app-debug.apk`.
3.  **Install on Phone**:
    *   Transfer `app-debug.apk` to your phone (via USB, Drive, Bluetooth, etc.).
    *   Open the file manager on your phone and tap the APK file.
    *   You may need to allow "Install from unknown sources" for your file manager.
    *   Tap **Install**.

---
**Note**: Since your app is configured to load `https://day-win.vercel.app`, your phone **must have internet access** for the app to work.
