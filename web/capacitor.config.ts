import type { CapacitorConfig } from '@capacitor/cli';

// PrimeDesk Android shell: loads the live site so login, assessments,
// plans and drive keep working against the real backend (internet required).
const config: CapacitorConfig = {
  appId: 'com.primedesk.app',
  appName: 'PrimeDesk',
  webDir: 'public',
  server: {
    url: 'https://digitaldriver.netlify.app/',
    cleartext: false,
  },
  allowNavigation: ['digitaldriver.netlify.app'],
};

export default config;
