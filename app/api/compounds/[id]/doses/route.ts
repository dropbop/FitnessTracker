import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { CompoundDose, CreateCompoundDoseInput } from '@/lib/types';

function normalizeDoses(doses: CompoundDose[]): CompoundDose[] {
  return doses.map(d => ({
    ...d,
    dose_date: new Date(d.dose_date).toISOString().substring(0, 10),
    dose_amount: Number(d.dose_amount),
  }));
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

    const doses = await sql`
      SELECT id, compound_id, dose_date, dose_amount, created_at
      FROM compound_doses
      WHERE compound_id = ${compoundId}
      ORDER BY dose_date ASC
    ` as CompoundDose[];

    return NextResponse.json(normalizeDoses(doses));
  } catch (error) {
    console.error('Error fetching doses:', error);
    return NextResponse.json({ error: 'Failed to fetch doses' }, { status: 500 });
  }
}

export async function POST(
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
    const body: CreateCompoundDoseInput = await request.json();
    const { dose_date, dose_amount } = body;

    if (!dose_date || dose_amount === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upsert: insert or update if exists
    const result = await sql`
      INSERT INTO compound_doses (compound_id, dose_date, dose_amount)
      VALUES (${compoundId}, ${dose_date}, ${dose_amount})
      ON CONFLICT (compound_id, dose_date)
      DO UPDATE SET dose_amount = ${dose_amount}
      RETURNING id, compound_id, dose_date, dose_amount, created_at
    ` as CompoundDose[];

    return NextResponse.json(normalizeDoses(result)[0], { status: 201 });
  } catch (error) {
    console.error('Error saving dose:', error);
    return NextResponse.json({ error: 'Failed to save dose' }, { status: 500 });
  }
}
