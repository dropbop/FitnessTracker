import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { ExerciseEntry, CreateEntryInput } from '@/lib/types';

// Neon returns dates as ISO timestamps, normalize to YYYY-MM-DD
function normalizeEntries(entries: ExerciseEntry[]): ExerciseEntry[] {
  return entries.map(e => ({
    ...e,
    exercise_date: typeof e.exercise_date === 'string' && e.exercise_date.length > 10
      ? e.exercise_date.substring(0, 10)
      : e.exercise_date
  }));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const date = searchParams.get('date');

    let entries: ExerciseEntry[];

    if (date) {
      // Get entries for a specific date
      entries = await sql`
        SELECT id, exercise_date, category, sub_exercise, notes_quantitative, notes_qualitative, created_at
        FROM exercise_entries
        WHERE exercise_date = ${date}
        ORDER BY created_at DESC
      ` as ExerciseEntry[];
    } else if (year && month) {
      // Get entries for a specific month
      const startDate = `${year}-${month.padStart(2, '0')}-01`;
      const endDate = new Date(parseInt(year), parseInt(month), 0).toISOString().split('T')[0];

      entries = await sql`
        SELECT id, exercise_date, category, sub_exercise, notes_quantitative, notes_qualitative, created_at
        FROM exercise_entries
        WHERE exercise_date >= ${startDate} AND exercise_date <= ${endDate}
        ORDER BY exercise_date, created_at DESC
      ` as ExerciseEntry[];
    } else if (year) {
      // Get entries for a full year
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;

      entries = await sql`
        SELECT id, exercise_date, category, sub_exercise, notes_quantitative, notes_qualitative, created_at
        FROM exercise_entries
        WHERE exercise_date >= ${startDate} AND exercise_date <= ${endDate}
        ORDER BY exercise_date, created_at DESC
      ` as ExerciseEntry[];
    } else {
      // Get all entries (limit to recent for safety)
      entries = await sql`
        SELECT id, exercise_date, category, sub_exercise, notes_quantitative, notes_qualitative, created_at
        FROM exercise_entries
        ORDER BY exercise_date DESC, created_at DESC
        LIMIT 1000
      ` as ExerciseEntry[];
    }

    return NextResponse.json(normalizeEntries(entries));
  } catch (error) {
    console.error('Error fetching entries:', error);
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateEntryInput = await request.json();
    const { exercise_date, category, sub_exercise, notes_quantitative, notes_qualitative } = body;

    if (!exercise_date || !category || !sub_exercise) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (category !== 'lifting' && category !== 'cardio') {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO exercise_entries (exercise_date, category, sub_exercise, notes_quantitative, notes_qualitative)
      VALUES (${exercise_date}, ${category}, ${sub_exercise}, ${notes_quantitative || null}, ${notes_qualitative || null})
      RETURNING id, exercise_date, category, sub_exercise, notes_quantitative, notes_qualitative, created_at
    ` as ExerciseEntry[];

    return NextResponse.json(normalizeEntries(result)[0], { status: 201 });
  } catch (error) {
    console.error('Error creating entry:', error);
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
  }
}
