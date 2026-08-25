# Pixel architecture (0.1)

This document records the approved architecture. Implementation follows staged delivery. Stages 0–1 are scaffolding and a non-connected mobile screen only.

## Goals

Pixel is a personal AI assistant with her own identity. Pixel 0.1 will eventually let the user open the app, press a button, and hold a real-time voice conversation with natural turn-taking and a natural female voice.

Not in 0.1: persistent memory, vision, computer control, agents, glasses, autonomous initiative.

The architecture must allow those later without rewriting the application.

Constraints:

- Mobile-first, TypeScript, React Native + Expo.
- Desktop later; share Pixel Core, not UI.
- Supabase later for auth and data.
- Gemini Live later for voice; must remain replaceable.
- €0 development budget: free tiers and open source.
- Secrets never in the client.
- GitHub is the source of truth.

## Repository layout

Monorepo (npm workspaces):

```
apps/mobile          Expo client (Pixel 0.1 UI)
packages/core        Provider-agnostic Pixel Core
packages/contracts   Shared TypeScript contracts
services/api         Local Node TypeScript gateway
docs/architecture.md This file
```

## Layers

| Layer | Owns | Must not own |
|---|---|---|
| UI (`apps/mobile`) | Screens, Talk button, device I/O | API keys, personality policy, provider SDKs |
| Pixel Core (`packages/core`) | Identity, conversation policy, epistemic and moral rules, session state, future memory interfaces | React Native, Gemini SDKs, HTTP libraries, provider-specific code |
| Contracts | Shared types as they become real | Runtime I/O |
| Providers (later, in API or adapters) | Map Pixel events to a vendor | Personality |
| Backend (`services/api`) | Auth, minting short-lived credentials, quotas | Pixel “soul” (loaded from Core) |
| Future memory | `MemoryStore` interface when needed | 0.1 product features |

## Realtime / Gemini Live (target)

Preferred target: **ephemeral-token direct client → Gemini Live**.

1. User authenticates (Supabase, later).
2. Mobile calls the backend to start a session.
3. Backend authenticates the user and **mints short-lived Gemini Live credentials**.
4. Client opens Gemini Live with those credentials. The long-lived API key never ships in the app.

If the current Gemini API cannot mint client-safe ephemeral credentials, the provider adapter may temporarily use a different flow (including a server audio proxy) **without changing Pixel Core or the UI contract**. That proxy is not the permanent architecture.

Development is **local only** until the voice loop works. No Fly.io, Render, Railway, Cloudflare, or other production hosting in this stage.

## Client ↔ backend (when implemented)

- REST over HTTPS for session minting / health.
- No provider secrets in Expo config or the binary.
- Backend verifies user identity before issuing Gemini credentials.

Do not invent additional public APIs until a stage needs them. The API currently exposes only a local health check.

## Provider abstraction (later)

A `RealtimeProvider` interface will sit behind Core session options (`systemInstruction`, voice profile, language). `PIXEL_PROVIDER` is a **server** env var. UI and Core never import `@google/genai`.

## Hosting

Undecided. Run `services/api` and Expo locally. Choose production hosting after the voice loop works.

## Stages

- **Stage 0:** Monorepo, workspaces, packages, docs, `.env.example`. (current)
- **Stage 1:** Minimal polished mobile screen; Talk button does not connect. (current)
- **Stage 2+:** Core session policy, API session minting, Gemini adapter, auth — not started.

## Explicitly out of scope for current code

Gemini, voice streaming, authentication, memory, vision, agents, paid TTS, LangChain, ORMs, analytics, production deploy.
