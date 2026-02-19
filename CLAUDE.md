# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
npm start        # Start production server
```

## Testing Policy

This is a semi-private tool. Do not run `npm run dev`, `npm run build`, or any local testing commands. Push changes straight to prod — users will test in production. Any issues can be quickly caught and reverted.

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
- `DoseChart.tsx` - Compound dose line chart with half-life decay visualization (recharts)
- `CompoundTable.tsx` - Editable dose input table with auto-scroll to today
- `AuthPrompt.tsx` - Login modal
- `Icons.tsx` - Shared SVG icon components
- `TimeDisplay.tsx` - Live clock display (CST) in footer

**Pages**:
- `/` - Calendar (monthly exercise entry view)
- `/stats` - Year heatmaps for lifting & cardio activity
- `/exercises` - Exercise library with target muscle metadata
- `/compounds` - Medication/supplement tracker with pharmacokinetic half-life charts

### API Routes

- `GET/POST /api/entries` - List (with year/month/date filters) and create entries
- `PUT/DELETE /api/entries/[id]` - Update and delete entries
- `POST/DELETE /api/auth` - Login (set cookie) and logout (clear cookie)
- `GET /api/auth/check` - Returns current auth mode
- `GET/POST /api/exercises` - List and create exercise metadata
- `PUT/DELETE /api/exercises/[id]` - Update and delete exercise metadata
- `GET/POST /api/compounds` - List and create compounds
- `GET/PUT/DELETE /api/compounds/[id]` - Get, update, and delete compounds
- `GET/POST /api/compounds/[id]/doses` - List and upsert compound doses

### Database

Schema in `schema.sql`:
- `exercise_entries` table with `exercise_date`, `category` (enum: 'lifting'|'cardio'), `sub_exercise`, `notes_quantitative`, `notes_qualitative`
- `exercise_metadata` table with `exercise_name`, `category`, `targets` (TEXT array), unique on (name, category)
- `compounds` table with `name`, `half_life` (decimal, days), `start_date`
- `compound_doses` table with `compound_id` (FK), `dose_date`, `dose_amount`, unique on (compound_id, dose_date)
- Requires `DATABASE_URL` env var pointing to Neon connection string

### Environment Variables

- `DATABASE_URL` - Neon Postgres connection string
- `USERNAME` - Auth username
- `PASSWORD` - Auth password

### Path Alias

`@/*` maps to project root (e.g., `@/lib/types`, `@/components/Calendar`)
