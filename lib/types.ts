export type ExerciseCategory = 'lifting' | 'cardio';

export interface ExerciseEntry {
  id: number;
  exercise_date: string; // ISO date string YYYY-MM-DD
  category: ExerciseCategory;
  sub_exercise: string;
  notes_quantitative: string | null;
  notes_qualitative: string | null;
  created_at: string;
}

export interface CreateEntryInput {
  exercise_date: string;
  category: ExerciseCategory;
  sub_exercise: string;
  notes_quantitative?: string | null;
  notes_qualitative?: string | null;
}

export interface UpdateEntryInput extends Partial<CreateEntryInput> {
  id: number;
}

export interface DayEntries {
  date: string;
  hasLifting: boolean;
  hasCardio: boolean;
  entries: ExerciseEntry[];
}

export interface ExerciseMetadata {
  id: number;
  exercise_name: string;
  category: ExerciseCategory;
  targets: string[];
  created_at: string;
  updated_at: string;
}

export interface CreateExerciseMetadataInput {
  exercise_name: string;
  category: ExerciseCategory;
  targets: string[];
}
