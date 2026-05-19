# S.Nehra Backend Architecture

This backend is designed to be production-grade, scalable, and fully compatible with TanStack Start SSR.

## Tech Stack

- **Runtime**: Node.js with TypeScript (`tsx` for dev, `esbuild` for production)
- **Framework**: Express (integrated with Vite for unified stack)
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: JWT with `httpOnly` cookies and Refresh Token rotation
- **Payments**: Razorpay (secure server-side flow)
- **Validation**: Zod
- **API Style**: REST optimized for TanStack Query

## Directory Structure

```
/src/server/
├── config/             # Prisma client, Razorpay initialization
├── controllers/        # Business logic for each resource
├── middleware/         # Auth, Error handling, Validation
├── routes/             # API route definitions
├── utils/              # JWT, hashing, etc.
└── app.ts              # Express application setup
/server.ts              # Main entry point (Vite + Express)
/prisma/                # Database schema
```

## Key Features

### 1. SSR-Safe Authentication

Auth is handled via `httpOnly` cookies. This ensures that when TanStack Start performs an initial server-side render, the session cookies are automatically sent to the backend, allowing the server to prefetch data as the authenticated user.

### 2. Multi-Step Onboarding

The `Application` model supports a `data` JSON field and a `currentStep` pointer, allowing candidates to save their progress across multiple sessions.

### 3. Secure Razorpay Flow

Avoids "Order ID spoofing" by creating orders on the backend and verifying signatures before unlocking dashboard access. Includes a webhook handler for asynchronous payment state updates.

### 4. Typed Error Pipeline

Centralized `errorHandler` maps application errors to structured JSON responses, providing clear feedback to the frontend TanStack Query hooks.

## Environment Setup

Required in `.env`:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET`

## Scripts

- `npm run dev`: Starts the unified dev server
- `npm run build`: Bundles the backend and frontend for production
- `npm run prisma:generate`: Updates Prisma client
- `npm run prisma:push`: Syncs schema to DB
