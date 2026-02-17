import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daywin.app',
  appName: 'Day Win',
  webDir: 'public',
  server: {
    url: 'https://day-win.vercel.app',
    cleartext: true
  }
};

export default config;
