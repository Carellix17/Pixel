# Pixel

Personal AI assistant. This repository is the source of truth for Pixel 0.1.

Stage 0–1: monorepo scaffolding and a local Expo screen. Voice, Gemini, and auth are not implemented yet.

## Requirements

- Node.js 20+
- npm 10+
- Expo Go on a phone, or a browser for the web preview

## Setup

```bash
git clone <this-repo>
cd Pixel
npm install
cp .env.example .env
```

Do not put secrets in `apps/mobile`. `.env` is for the local API later.

## Develop

Start the mobile app (Expo):

```bash
npm run mobile
```

Then scan the QR code with Expo Go, or press `w` for web.

Start the local API (health check only; not used by the app yet):

```bash
npm run api
```

Typecheck all workspaces:

```bash
npm run typecheck
```

## Workspaces

| Path | Package | Role |
|------|---------|------|
| `apps/mobile` | `@pixel/mobile` | Expo UI |
| `packages/core` | `@pixel/core` | Pixel identity / future policy (no RN, no Gemini) |
| `packages/contracts` | `@pixel/contracts` | Shared types |
| `services/api` | `@pixel/api` | Local Node gateway |

Architecture: [`docs/architecture.md`](docs/architecture.md).
