# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

## Architecture Overview

This is a **Next.js 16** fitness tracking app using the App Router with **Neon Postgres** for serverless database and **Tailwind CSS v4** for styling.

### Core Structure

- **Frontend**: React 19 client components with date-fns for date handling, react-swipeable for mobile gestures
- **Backend**: Next.js API routes with Neon serverless Postgres
- **Auth**: Cookie-based authentication using SHA256 hash of `USERNAME:PASSWORD` env vars; 7-day session expiry

### Key Patterns

**Dual Mode Operation**: App runs in `demo` mode (local state with sample data) or `real` mode (database-backed). Mode is determined by auth status via `/api/auth/check`. Demo mode uses `lib/demoData.ts` which holds sample entries and provides `getNextDemoId()` for mock IDs.

**Date Handling**: Neon returns Date objects that must be normalized to `YYYY-MM-DD` strings using `new Date(date).toISOString().substring(0, 10)`. See `normalizeEntries()` in `app/api/entries/route.ts`.

**Component Hierarchy**:
- `Calendar.tsx` - Main view, manages month navigation, swipe handling, and coordinates demo/real mode state
- `DayModal.tsx` - Entry list for selected day with add/edit/delete
- `EntryForm.tsx` - Form for creating/editing entries
- `Heatmap.tsx` - Year heatmap visualization on stats page

### API Routes

- `GET/POST /api/entries` - List (with year/month/date filters) and create entries
- `PUT/DELETE /api/entries/[id]` - Update and delete entries
- `POST/DELETE /api/auth` - Login (set cookie) and logout (clear cookie)
- `GET /api/auth/check` - Returns current auth mode

### Database

Schema in `schema.sql`:
- `exercise_entries` table with `exercise_date`, `category` (enum: 'lifting'|'cardio'), `sub_exercise`, `notes_quantitative`, `notes_qualitative`
- Requires `DATABASE_URL` env var pointing to Neon connection string

### Environment Variables

- `DATABASE_URL` - Neon Postgres connection string
- `USERNAME` - Auth username
- `PASSWORD` - Auth password

### Path Alias

`@/*` maps to project root (e.g., `@/lib/types`, `@/components/Calendar`)
