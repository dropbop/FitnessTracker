import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { ExerciseMetadata } from '@/lib/types';

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
    const body = await request.json();
    const { exercise_name, category, targets } = body;

    // Build update query dynamically based on provided fields
    const updates: string[] = [];
    const values: (string | string[])[] = [];

    if (exercise_name !== undefined) {
      updates.push('exercise_name');
      values.push(exercise_name.trim());
    }
    if (category !== undefined) {
      if (category !== 'lifting' && category !== 'cardio') {
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
      }
      updates.push('category');
      values.push(category);
    }
    if (targets !== undefined) {
      updates.push('targets');
      values.push(targets);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Use a simpler approach - update all fields
    const result = await sql`
      UPDATE exercise_metadata
      SET
        exercise_name = COALESCE(${exercise_name?.trim() || null}, exercise_name),
        category = COALESCE(${category || null}, category),
        targets = COALESCE(${targets || null}, targets),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, exercise_name, category, targets, created_at, updated_at
    ` as ExerciseMetadata[];

    if (result.length === 0) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error updating exercise metadata:', error);
    if (error instanceof Error && error.message.includes('unique')) {
      return NextResponse.json({ error: 'Exercise already exists for this category' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update exercise metadata' }, { status: 500 });
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

    const result = await sql`
      DELETE FROM exercise_metadata
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting exercise metadata:', error);
    return NextResponse.json({ error: 'Failed to delete exercise metadata' }, { status: 500 });
  }
}
