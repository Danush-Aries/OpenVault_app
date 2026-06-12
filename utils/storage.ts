import AsyncStorage from '@react-native-async-storage/async-storage';
import { PasswordEntry, Identity, ThreatAlert } from '../types';

const KEYS = {
  PASSWORDS: 'openvault:passwords',
  IDENTITIES: 'openvault:identities',
  THREATS: 'openvault:threats',
} as const;

// ─── Passwords ───────────────────────────────────────────────────────────────

export async function loadPasswords(): Promise<PasswordEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.PASSWORDS);
    return raw ? (JSON.parse(raw) as PasswordEntry[]) : getDefaultPasswords();
  } catch {
    return getDefaultPasswords();
  }
}

export async function savePasswords(passwords: PasswordEntry[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.PASSWORDS, JSON.stringify(passwords));
}

function getDefaultPasswords(): PasswordEntry[] {
  const now = new Date().toISOString();
  return [
    { id: '1', service: 'Google', email: 'user@gmail.com', password: '', has2FA: true, strength: 'strong', createdAt: now, updatedAt: now },
    { id: '2', service: 'GitHub', email: 'dev@user.com', password: '', has2FA: true, strength: 'strong', createdAt: now, updatedAt: now },
    { id: '3', service: 'Twitter', email: 'user123', password: '', has2FA: false, strength: 'medium', createdAt: now, updatedAt: now },
    { id: '4', service: 'Netflix', email: 'user@email.com', password: '', has2FA: false, strength: 'weak', createdAt: now, updatedAt: now },
    { id: '5', service: 'Amazon', email: 'shop@user.com', password: '', has2FA: true, strength: 'strong', createdAt: now, updatedAt: now },
  ];
}

// ─── Identities ──────────────────────────────────────────────────────────────

export async function loadIdentities(): Promise<Identity[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.IDENTITIES);
    return raw ? (JSON.parse(raw) as Identity[]) : getDefaultIdentities();
  } catch {
    return getDefaultIdentities();
  }
}

export async function saveIdentities(identities: Identity[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.IDENTITIES, JSON.stringify(identities));
}

function getDefaultIdentities(): Identity[] {
  const now = new Date().toISOString();
  return [
    { id: '1', name: 'Personal', email: 'personal@example.com', type: 'email', status: 'active', createdAt: now },
    { id: '2', name: 'Work', email: 'work@company.com', type: 'email', status: 'active', createdAt: now },
    { id: '3', name: 'Shopping', email: 'temp-abc123@tempmail.com', type: 'temp-email', status: 'active', createdAt: now },
  ];
}

// ─── Threats ─────────────────────────────────────────────────────────────────

export async function loadThreats(): Promise<ThreatAlert[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.THREATS);
    return raw ? (JSON.parse(raw) as ThreatAlert[]) : getDefaultThreats();
  } catch {
    return getDefaultThreats();
  }
}

export async function saveThreats(threats: ThreatAlert[]): Promise<void> {
  await AsyncStorage.setItem(KEYS.THREATS, JSON.stringify(threats));
}

function getDefaultThreats(): ThreatAlert[] {
  return [
    {
      id: '1',
      type: 'phishing',
      severity: 'high',
      source: 'email@fake-bank.com',
      description: 'Suspicious login attempt detected',
      time: '2 hours ago',
      resolved: false,
    },
    {
      id: '2',
      type: 'breach',
      severity: 'medium',
      source: 'HaveIBeenPwned',
      description: 'Your email found in data breach',
      time: '1 day ago',
      resolved: false,
    },
  ];
}
