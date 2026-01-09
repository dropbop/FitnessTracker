import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { Compound, CreateCompoundInput } from '@/lib/types';

function normalizeCompound(compound: Compound): Compound {
  return {
    ...compound,
    start_date: new Date(compound.start_date).toISOString().substring(0, 10),
    half_life: Number(compound.half_life),
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const compoundId = parseInt(id, 10);

    const result = await sql`
      SELECT id, name, half_life, start_date, created_at
      FROM compounds
      WHERE id = ${compoundId}
    ` as Compound[];

    if (result.length === 0) {
      return NextResponse.json({ error: 'Compound not found' }, { status: 404 });
    }

    return NextResponse.json(normalizeCompound(result[0]));
  } catch (error) {
    console.error('Error fetching compound:', error);
    return NextResponse.json({ error: 'Failed to fetch compound' }, { status: 500 });
  }
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
    const compoundId = parseInt(id, 10);
    const body: Partial<CreateCompoundInput> = await request.json();
    const { name, half_life, start_date } = body;

    if (half_life !== undefined && half_life <= 0) {
      return NextResponse.json({ error: 'Half-life must be positive' }, { status: 400 });
    }

    const result = await sql`
      UPDATE compounds
      SET
        name = COALESCE(${name ?? null}, name),
        half_life = COALESCE(${half_life ?? null}, half_life),
        start_date = COALESCE(${start_date ?? null}, start_date)
      WHERE id = ${compoundId}
      RETURNING id, name, half_life, start_date, created_at
    ` as Compound[];

    if (result.length === 0) {
      return NextResponse.json({ error: 'Compound not found' }, { status: 404 });
    }

    return NextResponse.json(normalizeCompound(result[0]));
  } catch (error) {
    console.error('Error updating compound:', error);
    return NextResponse.json({ error: 'Failed to update compound' }, { status: 500 });
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
    const compoundId = parseInt(id, 10);

    const result = await sql`
      DELETE FROM compounds
      WHERE id = ${compoundId}
      RETURNING id
    ` as { id: number }[];

    if (result.length === 0) {
      return NextResponse.json({ error: 'Compound not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting compound:', error);
    return NextResponse.json({ error: 'Failed to delete compound' }, { status: 500 });
  }
}
