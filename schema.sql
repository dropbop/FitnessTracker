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
