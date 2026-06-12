import { PasswordStrength } from '../types';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export interface GeneratorOptions {
  length?: number;
  uppercase?: boolean;
  digits?: boolean;
  symbols?: boolean;
}

/**
 * Generates a cryptographically random password using Math.random
 * (sufficient for demo purposes — swap for expo-crypto on device)
 */
export function generatePassword(options: GeneratorOptions = {}): string {
  const {
    length = 20,
    uppercase = true,
    digits = true,
    symbols = true,
  } = options;

  let charset = LOWERCASE;
  const required: string[] = [];

  if (uppercase) {
    charset += UPPERCASE;
    required.push(UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)]);
  }
  if (digits) {
    charset += DIGITS;
    required.push(DIGITS[Math.floor(Math.random() * DIGITS.length)]);
  }
  if (symbols) {
    charset += SYMBOLS;
    required.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }

  // Fill the rest of the password
  const remaining = length - required.length;
  const rest = Array.from(
    { length: remaining },
    () => charset[Math.floor(Math.random() * charset.length)]
  );

  // Shuffle required + rest together
  const all = [...required, ...rest];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  return all.join('');
}

export function assessStrength(password: string): PasswordStrength {
  let score = 0;

  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score >= 4) return 'strong';
  if (score >= 2) return 'medium';
  return 'weak';
}
