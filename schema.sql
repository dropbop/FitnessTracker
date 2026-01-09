-- FitnessTracker Database Schema
-- Run this against your Neon Postgres database

CREATE TYPE exercise_category AS ENUM ('lifting', 'cardio');

CREATE TABLE exercise_entries (
  id SERIAL PRIMARY KEY,
  exercise_date DATE NOT NULL,
  category exercise_category NOT NULL,
  sub_exercise TEXT NOT NULL,
  notes_quantitative TEXT,
  notes_qualitative TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_entries_date ON exercise_entries(exercise_date);
CREATE INDEX idx_entries_category ON exercise_entries(category);
CREATE INDEX idx_entries_date_category ON exercise_entries(exercise_date, category);

-- Exercise metadata table for target associations
CREATE TABLE exercise_metadata (
  id SERIAL PRIMARY KEY,
  exercise_name TEXT NOT NULL,
  category exercise_category NOT NULL,
  targets TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(exercise_name, category)
);

CREATE INDEX idx_metadata_exercise ON exercise_metadata(exercise_name);
CREATE INDEX idx_metadata_category ON exercise_metadata(category);

-- Compound tracker tables (for half-life dose calculations)
CREATE TABLE compounds (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  half_life DECIMAL NOT NULL,  -- in days
  start_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE compound_doses (
  id SERIAL PRIMARY KEY,
  compound_id INTEGER REFERENCES compounds(id) ON DELETE CASCADE,
  dose_date DATE NOT NULL,
  dose_amount DECIMAL NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(compound_id, dose_date)
);

CREATE INDEX idx_compound_doses_compound ON compound_doses(compound_id);
CREATE INDEX idx_compound_doses_date ON compound_doses(dose_date);
