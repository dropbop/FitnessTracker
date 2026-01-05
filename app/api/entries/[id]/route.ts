import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { ExerciseEntry, UpdateEntryInput } from '@/lib/types';

// Neon returns dates as ISO timestamps, normalize to YYYY-MM-DD
function normalizeEntry(e: ExerciseEntry): ExerciseEntry {
  return {
    ...e,
    exercise_date: typeof e.exercise_date === 'string' && e.exercise_date.length > 10
      ? e.exercise_date.substring(0, 10)
      : e.exercise_date
  };
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const entryId = parseInt(id, 10);

    if (isNaN(entryId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body: UpdateEntryInput = await request.json();
    const { exercise_date, category, sub_exercise, notes_quantitative, notes_qualitative } = body;

    if (category && category !== 'lifting' && category !== 'cardio') {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const result = await sql`
      UPDATE exercise_entries
      SET
        exercise_date = COALESCE(${exercise_date || null}, exercise_date),
        category = COALESCE(${category || null}, category),
        sub_exercise = COALESCE(${sub_exercise || null}, sub_exercise),
        notes_quantitative = ${notes_quantitative ?? null},
        notes_qualitative = ${notes_qualitative ?? null}
      WHERE id = ${entryId}
      RETURNING id, exercise_date, category, sub_exercise, notes_quantitative, notes_qualitative, created_at
    ` as ExerciseEntry[];

    if (result.length === 0) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json(normalizeEntry(result[0]));
  } catch (error) {
    console.error('Error updating entry:', error);
    return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const entryId = parseInt(id, 10);

    if (isNaN(entryId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const result = await sql`
      DELETE FROM exercise_entries
      WHERE id = ${entryId}
      RETURNING id
    ` as { id: number }[];

    if (result.length === 0) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting entry:', error);
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
  }
}
