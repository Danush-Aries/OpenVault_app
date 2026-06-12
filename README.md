# OpenVault

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2052-000020?logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)](https://www.typescriptlang.org)

A personal security dashboard built with React Native (Expo). OpenVault gives you a unified view of your passwords, digital identities, and threat alerts — all in one dark-themed, offline-first mobile app.

---

## What it does

OpenVault is organized into four screens accessible via a persistent tab bar:

| Tab | Purpose |
|-----|---------|
| **Dashboard** | Security overview with live stats and quick-action shortcuts |
| **Password Vault** | Store, view, copy, and generate passwords with strength assessment |
| **Identities** | Manage named personas and temporary email aliases |
| **Threat Monitor** | Track phishing alerts, breach notifications, and resolve them |

Data is persisted locally using `AsyncStorage` so your entries survive app restarts without any backend.

---

## Features

- **Password vault** — add entries with service name, email/username, and password; each entry shows a strength indicator (strong / medium / weak) and 2FA status
- **Password generator** — one-tap generation of 20-character passwords with uppercase letters, digits, and symbols; configurable via `utils/passwordGenerator.ts`
- **Strength assessment** — automatic scoring when you type or generate a password
- **Copy to clipboard** — tap "Copy" on any password card or temp email to copy it instantly
- **Reveal / hide passwords** — tap "View" to toggle the masked display
- **Identity management** — create personas (named email aliases) or temporary emails; copy temp email addresses with one tap
- **Threat monitor** — view active phishing and breach alerts by severity; resolve or dismiss all with a single tap
- **Persistent storage** — all data written to `AsyncStorage`; seed data is loaded on first launch
- **Fully typed** — shared TypeScript types in `types/index.ts` used across all screens and utilities
- **Dark UI** — consistent dark color scheme throughout (`#111827` background, `#1f2937` cards)

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native 0.76 via Expo SDK 52 |
| Language | TypeScript 5.3 |
| Navigation | React Navigation 6 (bottom tabs) |
| Storage | `@react-native-async-storage/async-storage` |
| Secure storage | `expo-secure-store` (available for future biometric / key-chain integration) |
| Styling | React Native `StyleSheet` (no external UI library) |

---

## Installation

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli` (or use `npx expo`)
- iOS Simulator (macOS) or Android emulator, or the [Expo Go](https://expo.dev/go) app on a physical device

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/Dhanush-Aries/OpenVault_app.git
cd OpenVault_app

# 2. Install dependencies
npm install

# 3. Start the dev server
npx expo start
```

Then press `i` for iOS simulator, `a` for Android, or scan the QR code with Expo Go.

---

## Usage

### Adding a password

```
Vault tab -> tap the purple "+" button
-> fill in Service, Email/Username, Password
-> tap "Generate" to auto-fill a strong password
-> toggle 2FA status if needed
-> tap "Save Password"
```

### Copying a password

```
Vault tab -> find the entry -> tap "Copy"
```

### Revealing a password

```
Vault tab -> find the entry -> tap "View"
```

### Deleting an entry

```
Long-press any password card or identity card -> confirm deletion
```

### Creating an identity

```
Identity tab -> tap "+ Create New Identity"
-> enter name and email address
-> choose type: Persona or Temp Email
-> tap "Create Identity"
```

### Resolving a threat alert

```
Threats tab -> find the active alert -> tap "Mark Resolved"
```

---

## Project structure

```
OpenVault_app/
├── App.tsx                  # Root component, tab navigator
├── app.json                 # Expo config (name, slug, plugins)
├── package.json
├── tsconfig.json
├── types/
│   └── index.ts             # Shared TypeScript interfaces
├── utils/
│   ├── passwordGenerator.ts # Password generation and strength scoring
│   └── storage.ts           # AsyncStorage read/write helpers + seed data
├── screens/
│   ├── HomeScreen.tsx       # Dashboard with stats and quick actions
│   ├── VaultScreen.tsx      # Password list + Add Password modal
│   ├── IdentityScreen.tsx   # Personas + temp emails + Create modal
│   └── ThreatScreen.tsx     # Threat alerts with resolve actions
├── components/
│   ├── PasswordCard.tsx     # Individual password entry card
│   └── StatCard.tsx         # Metric card used in Dashboard and Threats
└── assets/                  # App icons and splash screen
```

---

## Configuration

### Customizing the password generator

Edit `utils/passwordGenerator.ts` to change defaults:

```typescript
export function generatePassword(options: GeneratorOptions = {}): string {
  const {
    length = 20,       // change default length here
    uppercase = true,
    digits = true,
    symbols = true,
  } = options;
  // ...
}
```

### Swapping storage back-end

All reads and writes go through `utils/storage.ts`. To replace `AsyncStorage` with a different back-end (e.g. SQLite via `expo-sqlite`, or encrypted storage), update only those functions — the screens are unaffected.

---

## Roadmap

- [ ] Biometric authentication (Face ID / fingerprint) using `expo-local-authentication`
- [ ] AES-256 encryption for stored passwords via `expo-crypto`
- [ ] Search and filter within the vault
- [ ] Password health report (detect duplicates and weak entries)
- [ ] iCloud / Google Drive encrypted backup
- [ ] Dark / light theme toggle

---

## License

MIT — see [LICENSE](LICENSE) for details.
