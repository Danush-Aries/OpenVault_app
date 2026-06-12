export type PasswordStrength = 'strong' | 'medium' | 'weak';

export interface PasswordEntry {
  id: string;
  service: string;
  email: string;
  password: string;
  has2FA: boolean;
  strength: PasswordStrength;
  createdAt: string;
  updatedAt: string;
}

export interface Identity {
  id: string;
  name: string;
  email: string;
  type: 'email' | 'temp-email';
  status: 'active' | 'inactive';
  createdAt: string;
}

export type ThreatSeverity = 'high' | 'medium' | 'low';
export type ThreatType = 'phishing' | 'breach' | 'malware' | 'suspicious';

export interface ThreatAlert {
  id: string;
  type: ThreatType;
  severity: ThreatSeverity;
  source: string;
  description: string;
  time: string;
  resolved: boolean;
}
