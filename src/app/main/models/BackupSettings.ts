export interface BackupSettings {
    backupFrequency: 'Daily' | 'Weekly' | 'Monthly';
    enableAutomaticBackups: boolean;
    backupLocation: string; // Path or URL
  }
  