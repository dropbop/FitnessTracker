import { ExerciseEntry, ExerciseMetadata } from './types';

let nextDemoId = 100;

export function getNextDemoId(): number {
  return nextDemoId++;
}

export function resetDemoId(): void {
  nextDemoId = 100;
}

// Sample demo entries spread across January 2026
export const DEMO_ENTRIES: ExerciseEntry[] = [
  // Week 1 - Starting the year strong
  {
    id: 1,
    exercise_date: '2026-01-02',
    category: 'lifting',
    sub_exercise: 'Bench Press',
    notes_quantitative: '4x8 @ 185lbs',
    notes_qualitative: 'New year, felt motivated. Good form.',
    created_at: '2026-01-02T10:00:00Z',
  },
  {
    id: 2,
    exercise_date: '2026-01-02',
    category: 'lifting',
    sub_exercise: 'Incline Dumbbell Press',
    notes_quantitative: '3x10 @ 60lbs',
    notes_qualitative: null,
    created_at: '2026-01-02T10:30:00Z',
  },
  {
    id: 3,
    exercise_date: '2026-01-03',
    category: 'cardio',
    sub_exercise: 'Treadmill',
    notes_quantitative: '30 min, 3.2 miles',
    notes_qualitative: 'Easy recovery pace',
    created_at: '2026-01-03T07:00:00Z',
  },
  {
    id: 4,
    exercise_date: '2026-01-04',
    category: 'lifting',
    sub_exercise: 'Squats',
    notes_quantitative: '5x5 @ 225lbs',
    notes_qualitative: 'Legs felt strong. Depth was good.',
    created_at: '2026-01-04T09:00:00Z',
  },
  {
    id: 5,
    exercise_date: '2026-01-04',
    category: 'lifting',
    sub_exercise: 'Romanian Deadlifts',
    notes_quantitative: '3x10 @ 135lbs',
    notes_qualitative: 'Focus on hamstring stretch',
    created_at: '2026-01-04T09:30:00Z',
  },

  // Week 2
  {
    id: 6,
    exercise_date: '2026-01-06',
    category: 'lifting',
    sub_exercise: 'Overhead Press',
    notes_quantitative: '4x6 @ 115lbs',
    notes_qualitative: 'Shoulders felt tight, warmed up extra',
    created_at: '2026-01-06T10:00:00Z',
  },
  {
    id: 7,
    exercise_date: '2026-01-06',
    category: 'lifting',
    sub_exercise: 'Pull-ups',
    notes_quantitative: '4x8 bodyweight',
    notes_qualitative: null,
    created_at: '2026-01-06T10:30:00Z',
  },
  {
    id: 8,
    exercise_date: '2026-01-07',
    category: 'cardio',
    sub_exercise: 'Rowing Machine',
    notes_quantitative: '20 min, 4500m',
    notes_qualitative: 'Steady state, zone 2 heart rate',
    created_at: '2026-01-07T06:30:00Z',
  },
  {
    id: 9,
    exercise_date: '2026-01-08',
    category: 'lifting',
    sub_exercise: 'Deadlifts',
    notes_quantitative: '3x5 @ 315lbs',
    notes_qualitative: 'PR attempt next week',
    created_at: '2026-01-08T10:00:00Z',
  },
  {
    id: 10,
    exercise_date: '2026-01-09',
    category: 'cardio',
    sub_exercise: 'Stairmaster',
    notes_quantitative: '25 min, level 8',
    notes_qualitative: 'Good sweat session',
    created_at: '2026-01-09T07:00:00Z',
  },
  {
    id: 11,
    exercise_date: '2026-01-10',
    category: 'lifting',
    sub_exercise: 'Bench Press',
    notes_quantitative: '4x8 @ 190lbs',
    notes_qualitative: 'Bumped up weight, felt good',
    created_at: '2026-01-10T09:00:00Z',
  },

  // Week 3
  {
    id: 12,
    exercise_date: '2026-01-12',
    category: 'lifting',
    sub_exercise: 'Front Squats',
    notes_quantitative: '4x6 @ 185lbs',
    notes_qualitative: 'Working on mobility',
    created_at: '2026-01-12T10:00:00Z',
  },
  {
    id: 13,
    exercise_date: '2026-01-12',
    category: 'lifting',
    sub_exercise: 'Leg Press',
    notes_quantitative: '3x12 @ 360lbs',
    notes_qualitative: null,
    created_at: '2026-01-12T10:30:00Z',
  },
  {
    id: 14,
    exercise_date: '2026-01-13',
    category: 'cardio',
    sub_exercise: 'Bike (outdoor)',
    notes_quantitative: '45 min, 12 miles',
    notes_qualitative: 'Nice weather, hilly route',
    created_at: '2026-01-13T08:00:00Z',
  },
  {
    id: 15,
    exercise_date: '2026-01-14',
    category: 'lifting',
    sub_exercise: 'Barbell Rows',
    notes_quantitative: '4x8 @ 155lbs',
    notes_qualitative: 'Focused on squeeze at top',
    created_at: '2026-01-14T10:00:00Z',
  },
  {
    id: 16,
    exercise_date: '2026-01-15',
    category: 'cardio',
    sub_exercise: 'Jump Rope',
    notes_quantitative: '15 min intervals',
    notes_qualitative: 'Double unders getting better',
    created_at: '2026-01-15T07:00:00Z',
  },
  {
    id: 17,
    exercise_date: '2026-01-16',
    category: 'lifting',
    sub_exercise: 'Deadlifts',
    notes_quantitative: '1x3 @ 335lbs (PR!)',
    notes_qualitative: 'NEW PR! Form held up well.',
    created_at: '2026-01-16T10:00:00Z',
  },

  // Week 4
  {
    id: 18,
    exercise_date: '2026-01-19',
    category: 'lifting',
    sub_exercise: 'Dumbbell Lunges',
    notes_quantitative: '3x10 each leg @ 50lbs',
    notes_qualitative: 'Balance improving',
    created_at: '2026-01-19T09:00:00Z',
  },
  {
    id: 19,
    exercise_date: '2026-01-20',
    category: 'cardio',
    sub_exercise: 'Swimming',
    notes_quantitative: '30 min, 1000m',
    notes_qualitative: 'Need to work on breathing technique',
    created_at: '2026-01-20T06:00:00Z',
  },
  {
    id: 20,
    exercise_date: '2026-01-21',
    category: 'lifting',
    sub_exercise: 'Incline Bench Press',
    notes_quantitative: '4x8 @ 155lbs',
    notes_qualitative: null,
    created_at: '2026-01-21T10:00:00Z',
  },
  {
    id: 21,
    exercise_date: '2026-01-22',
    category: 'cardio',
    sub_exercise: 'Treadmill (intervals)',
    notes_quantitative: '25 min, 8x30s sprints',
    notes_qualitative: 'Brutal but effective',
    created_at: '2026-01-22T07:00:00Z',
  },
  {
    id: 22,
    exercise_date: '2026-01-23',
    category: 'lifting',
    sub_exercise: 'Squats',
    notes_quantitative: '5x5 @ 235lbs',
    notes_qualitative: 'Weight moving up steadily',
    created_at: '2026-01-23T09:00:00Z',
  },

  // Week 5
  {
    id: 23,
    exercise_date: '2026-01-26',
    category: 'lifting',
    sub_exercise: 'Bench Press',
    notes_quantitative: '4x8 @ 195lbs',
    notes_qualitative: 'Feeling strong this month',
    created_at: '2026-01-26T10:00:00Z',
  },
  {
    id: 24,
    exercise_date: '2026-01-26',
    category: 'lifting',
    sub_exercise: 'Tricep Dips',
    notes_quantitative: '3x12 bodyweight',
    notes_qualitative: null,
    created_at: '2026-01-26T10:30:00Z',
  },
  {
    id: 25,
    exercise_date: '2026-01-27',
    category: 'cardio',
    sub_exercise: 'Elliptical',
    notes_quantitative: '35 min, level 12',
    notes_qualitative: 'Recovery day, easy effort',
    created_at: '2026-01-27T07:00:00Z',
  },
  {
    id: 26,
    exercise_date: '2026-01-28',
    category: 'lifting',
    sub_exercise: 'Overhead Press',
    notes_quantitative: '4x6 @ 120lbs',
    notes_qualitative: 'Shoulders responding well',
    created_at: '2026-01-28T10:00:00Z',
  },
  {
    id: 27,
    exercise_date: '2026-01-29',
    category: 'cardio',
    sub_exercise: 'Basketball',
    notes_quantitative: '60 min pickup game',
    notes_qualitative: 'Fun session with friends',
    created_at: '2026-01-29T18:00:00Z',
  },
  {
    id: 28,
    exercise_date: '2026-01-30',
    category: 'lifting',
    sub_exercise: 'Deadlifts',
    notes_quantitative: '3x5 @ 325lbs',
    notes_qualitative: 'Building on that PR',
    created_at: '2026-01-30T10:00:00Z',
  },
];

// Get a fresh copy of demo entries (for resetting state)
export function getInitialDemoEntries(): ExerciseEntry[] {
  resetDemoId();
  return [...DEMO_ENTRIES];
}

// Demo exercise metadata with target associations
export const DEMO_EXERCISE_METADATA: ExerciseMetadata[] = [
  // Lifting exercises
  {
    id: 1,
    exercise_name: 'Bench Press',
    category: 'lifting',
    targets: ['chest', 'triceps', 'shoulders'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 2,
    exercise_name: 'Incline Dumbbell Press',
    category: 'lifting',
    targets: ['chest', 'shoulders'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 3,
    exercise_name: 'Squats',
    category: 'lifting',
    targets: ['legs', 'glutes', 'core'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 4,
    exercise_name: 'Romanian Deadlifts',
    category: 'lifting',
    targets: ['hamstrings', 'glutes', 'back'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 5,
    exercise_name: 'Overhead Press',
    category: 'lifting',
    targets: ['shoulders', 'triceps'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 6,
    exercise_name: 'Pull-ups',
    category: 'lifting',
    targets: ['back', 'biceps'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 7,
    exercise_name: 'Deadlifts',
    category: 'lifting',
    targets: ['back', 'legs', 'glutes', 'core'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 8,
    exercise_name: 'Barbell Rows',
    category: 'lifting',
    targets: ['back', 'biceps'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 9,
    exercise_name: 'Tricep Dips',
    category: 'lifting',
    targets: ['triceps', 'chest', 'shoulders'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  // Cardio exercises
  {
    id: 10,
    exercise_name: 'Treadmill',
    category: 'cardio',
    targets: ['cardio', 'legs'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 11,
    exercise_name: 'Rowing Machine',
    category: 'cardio',
    targets: ['cardio', 'back', 'arms'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 12,
    exercise_name: 'Stairmaster',
    category: 'cardio',
    targets: ['cardio', 'legs', 'glutes'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 13,
    exercise_name: 'Swimming',
    category: 'cardio',
    targets: ['cardio', 'full body'],
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
];

let nextDemoMetadataId = 100;

export function getNextDemoMetadataId(): number {
  return nextDemoMetadataId++;
}

export function resetDemoMetadataId(): void {
  nextDemoMetadataId = 100;
}

export function getInitialDemoExerciseMetadata(): ExerciseMetadata[] {
  resetDemoMetadataId();
  return [...DEMO_EXERCISE_METADATA];
}
