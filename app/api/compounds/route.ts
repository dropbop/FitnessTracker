import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { Compound, CreateCompoundInput } from '@/lib/types';

function normalizeCompounds(compounds: Compound[]): Compound[] {
  return compounds.map(c => ({
    ...c,
    start_date: new Date(c.start_date).toISOString().substring(0, 10),
    half_life: Number(c.half_life),
  }));
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const compounds = await sql`
      SELECT id, name, half_life, start_date, created_at
      FROM compounds
      ORDER BY created_at DESC
    ` as Compound[];

    return NextResponse.json(normalizeCompounds(compounds));
  } catch (error) {
    console.error('Error fetching compounds:', error);
    return NextResponse.json({ error: 'Failed to fetch compounds' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CreateCompoundInput = await request.json();
    const { name, half_life, start_date } = body;

    if (!name || !half_life || !start_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (half_life <= 0) {
      return NextResponse.json({ error: 'Half-life must be positive' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO compounds (name, half_life, start_date)
      VALUES (${name}, ${half_life}, ${start_date})
      RETURNING id, name, half_life, start_date, created_at
    ` as Compound[];

    return NextResponse.json(normalizeCompounds(result)[0], { status: 201 });
  } catch (error) {
    console.error('Error creating compound:', error);
    return NextResponse.json({ error: 'Failed to create compound' }, { status: 500 });
  }
}
