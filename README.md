# OpenVault

**Your passwords, aliases, and breach alerts — offline, on-device.**

<!-- hero: 1600x600 screenshot of the OpenVault dashboard on a phone -->

![License](https://img.shields.io/badge/License-MIT-yellow)
![Expo SDK](https://img.shields.io/badge/Expo-SDK%2052-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)

A React Native (Expo) personal security dashboard. Passwords, digital identities, breach alerts — all stored locally with `AsyncStorage`, no cloud backend, dark themed.

---

## Why this exists

Every commercial password manager is a subscription funnel. OpenVault is the opposite — a single-user offline vault that runs entirely on your device, ships as an Expo app you can install on your own phone, and never talks to a server. If you want a friction-free personal vault you fully own, this is it.

---

## Try it in 60 seconds

```bash
git clone https://github.com/Danush-Aries/OpenVault_app
cd OpenVault_app
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone. No account, no signup.

---

## How it works

```
+-- Dashboard tab -----------+
|  live security stats       |
|  quick-action shortcuts    |
+----------------------------+

+-- Password Vault tab ------+
|  service / username / pw   |
|  strength indicator        |
|  20-char generator         |
|  2FA flag                  |
+----------------------------+

+-- Identities tab ----------+
|  named personas            |
|  temporary email aliases   |
+----------------------------+

+-- Threat Monitor tab ------+
|  phishing alerts           |
|  breach notifications      |
|  resolve + track           |
+----------------------------+

           |
           v
   AsyncStorage (on-device)
```

No backend. No sync. What's on your phone stays on your phone.

---

## Screenshots

<!-- screenshot: dashboard.png -->
<!-- screenshot: vault.png -->
<!-- screenshot: threats.png -->

---

## Stack

| Layer | Tech |
|---|---|
| App | Expo SDK 52 + React Native 0.76 |
| Language | TypeScript 5.3 |
| Storage | AsyncStorage (device-local) |
| Nav | React Navigation tab bar |
| Theme | Dark-mode-first, minimal |

---

## More from Danush

Part of a broader stack of AI + security tooling:

- [jarvis](https://github.com/Danush-Aries/jarvis) — portable multi-provider AI assistant (voice/web/CLI)
- [breachintel](https://github.com/Danush-Aries/breachintel) — OSINT breach intelligence aggregator
- [cve-advisor](https://github.com/Danush-Aries/cve-advisor) — AI-powered CVE triage and patch recommendation
- [llm-fragility-lab](https://github.com/Danush-Aries/llm-fragility-lab) — adversarial testing lab for LLM robustness
- [network-intrusion-analyzer](https://github.com/Danush-Aries/network-intrusion-analyzer) — Suricata + Claude AI intrusion triage
- [autonomous-coding-agent](https://github.com/Danush-Aries/autonomous-coding-agent) — two-agent autonomous coding system

Built by [Dhanush](https://github.com/Danush-Aries) — AI engineering + cybersecurity.

## License

MIT.
