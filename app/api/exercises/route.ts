import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { ExerciseMetadata, CreateExerciseMetadataInput } from '@/lib/types';

export async function GET() {
  try {
    const metadata = await sql`
      SELECT id, exercise_name, category, targets, created_at, updated_at
      FROM exercise_metadata
      ORDER BY category, exercise_name
    ` as ExerciseMetadata[];

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error fetching exercise metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch exercise metadata' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateExerciseMetadataInput = await request.json();
    const { exercise_name, category, targets } = body;

    if (!exercise_name || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (category !== 'lifting' && category !== 'cardio') {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO exercise_metadata (exercise_name, category, targets)
      VALUES (${exercise_name.trim()}, ${category}, ${targets || []})
      RETURNING id, exercise_name, category, targets, created_at, updated_at
    ` as ExerciseMetadata[];

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating exercise metadata:', error);
    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes('unique')) {
      return NextResponse.json({ error: 'Exercise already exists for this category' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create exercise metadata' }, { status: 500 });
  }
}
