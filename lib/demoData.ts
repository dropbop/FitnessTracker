import { ExerciseEntry, ExerciseMetadata } from './types';

let nextDemoId = 500;

export function getNextDemoId(): number {
  return nextDemoId++;
}

export function resetDemoId(): void {
  nextDemoId = 500;
}

// Helper to generate entries programmatically
function createEntry(
  id: number,
  date: string,
  category: 'lifting' | 'cardio',
  sub_exercise: string,
  notes_quantitative: string,
  notes_qualitative: string | null
): ExerciseEntry {
  return {
    id,
    exercise_date: date,
    category,
    sub_exercise,
    notes_quantitative,
    notes_qualitative,
    created_at: `${date}T10:00:00Z`,
  };
}

// Full year of demo entries (2025) showing realistic training progression
export const DEMO_ENTRIES: ExerciseEntry[] = [
  // ============ JANUARY 2025 - Starting fresh ============
  createEntry(1, '2025-01-02', 'lifting', 'Bench Press', '4x8 @ 165lbs', 'New year resolution - back in the gym'),
  createEntry(2, '2025-01-02', 'lifting', 'Incline Dumbbell Press', '3x10 @ 45lbs', null),
  createEntry(3, '2025-01-03', 'cardio', 'Treadmill', '25 min, 2.5 miles', 'Easy start'),
  createEntry(4, '2025-01-06', 'lifting', 'Squats', '4x8 @ 185lbs', 'Legs feeling rusty from holiday break'),
  createEntry(5, '2025-01-06', 'lifting', 'Leg Press', '3x12 @ 270lbs', null),
  createEntry(6, '2025-01-08', 'lifting', 'Deadlifts', '3x5 @ 225lbs', 'Taking it slow, focus on form'),
  createEntry(7, '2025-01-09', 'cardio', 'Rowing Machine', '20 min, 4000m', 'Zone 2 cardio'),
  createEntry(8, '2025-01-10', 'lifting', 'Overhead Press', '4x8 @ 95lbs', 'Shoulders tight'),
  createEntry(9, '2025-01-10', 'lifting', 'Pull-ups', '4x6 bodyweight', 'Need to rebuild strength'),
  createEntry(10, '2025-01-13', 'lifting', 'Bench Press', '4x8 @ 165lbs', 'Consistent'),
  createEntry(11, '2025-01-14', 'cardio', 'Stairmaster', '20 min, level 7', 'Brutal'),
  createEntry(12, '2025-01-15', 'lifting', 'Squats', '4x8 @ 195lbs', 'Bumped up weight'),
  createEntry(13, '2025-01-17', 'lifting', 'Barbell Rows', '4x8 @ 135lbs', 'Back day'),
  createEntry(14, '2025-01-17', 'lifting', 'Lat Pulldowns', '3x10 @ 120lbs', null),
  createEntry(15, '2025-01-20', 'lifting', 'Bench Press', '4x8 @ 170lbs', 'Weight going up'),
  createEntry(16, '2025-01-21', 'cardio', 'Treadmill', '30 min, 3 miles', 'Steady state'),
  createEntry(17, '2025-01-22', 'lifting', 'Deadlifts', '3x5 @ 245lbs', 'Feeling stronger'),
  createEntry(18, '2025-01-24', 'lifting', 'Overhead Press', '4x8 @ 100lbs', 'Small PR'),
  createEntry(19, '2025-01-27', 'lifting', 'Squats', '5x5 @ 205lbs', 'Switching to 5x5'),
  createEntry(20, '2025-01-28', 'cardio', 'Rowing Machine', '25 min, 5000m', 'Good session'),
  createEntry(21, '2025-01-29', 'lifting', 'Bench Press', '4x8 @ 170lbs', 'Solid'),
  createEntry(22, '2025-01-31', 'lifting', 'Pull-ups', '4x8 bodyweight', 'Getting easier'),

  // ============ FEBRUARY 2025 - Building momentum ============
  createEntry(23, '2025-02-03', 'lifting', 'Deadlifts', '3x5 @ 255lbs', 'Progress'),
  createEntry(24, '2025-02-03', 'lifting', 'Romanian Deadlifts', '3x10 @ 135lbs', 'Accessory work'),
  createEntry(25, '2025-02-04', 'cardio', 'Treadmill (intervals)', '25 min, 6x1min sprints', 'HIIT day'),
  createEntry(26, '2025-02-05', 'lifting', 'Bench Press', '4x6 @ 175lbs', 'Heavier sets'),
  createEntry(27, '2025-02-07', 'lifting', 'Squats', '5x5 @ 215lbs', 'Legs are adapting'),
  createEntry(28, '2025-02-10', 'lifting', 'Overhead Press', '4x6 @ 105lbs', 'Strict form'),
  createEntry(29, '2025-02-10', 'lifting', 'Lateral Raises', '3x12 @ 20lbs', 'Shoulder pump'),
  createEntry(30, '2025-02-11', 'cardio', 'Stairmaster', '25 min, level 8', 'Increased difficulty'),
  createEntry(31, '2025-02-12', 'lifting', 'Barbell Rows', '4x8 @ 145lbs', 'Back getting stronger'),
  createEntry(32, '2025-02-14', 'cardio', 'Swimming', '30 min, 800m', 'Valentine\'s day swim'),
  createEntry(33, '2025-02-17', 'lifting', 'Bench Press', '4x6 @ 180lbs', 'New PR territory'),
  createEntry(34, '2025-02-17', 'lifting', 'Tricep Dips', '3x12 bodyweight', null),
  createEntry(35, '2025-02-19', 'lifting', 'Deadlifts', '3x5 @ 265lbs', 'Grip holding up'),
  createEntry(36, '2025-02-20', 'cardio', 'Rowing Machine', '25 min, 5200m', 'Pace improving'),
  createEntry(37, '2025-02-21', 'lifting', 'Squats', '5x5 @ 225lbs', 'Two plates!'),
  createEntry(38, '2025-02-24', 'lifting', 'Overhead Press', '4x6 @ 105lbs', 'Plateauing a bit'),
  createEntry(39, '2025-02-25', 'cardio', 'Treadmill', '35 min, 3.5 miles', 'Long steady run'),
  createEntry(40, '2025-02-26', 'lifting', 'Pull-ups', '4x10 bodyweight', 'Volume up'),
  createEntry(41, '2025-02-28', 'lifting', 'Bench Press', '4x6 @ 180lbs', 'Consistent'),

  // ============ MARCH 2025 - Spring gains ============
  createEntry(42, '2025-03-03', 'lifting', 'Deadlifts', '3x5 @ 275lbs', 'Crushing it'),
  createEntry(43, '2025-03-04', 'cardio', 'Bike (outdoor)', '40 min, 10 miles', 'First outdoor ride of spring'),
  createEntry(44, '2025-03-05', 'lifting', 'Squats', '5x5 @ 225lbs', 'Deload week'),
  createEntry(45, '2025-03-07', 'lifting', 'Bench Press', '5x5 @ 175lbs', 'Deload'),
  createEntry(46, '2025-03-10', 'lifting', 'Overhead Press', '4x6 @ 110lbs', 'Broke through plateau'),
  createEntry(47, '2025-03-10', 'lifting', 'Face Pulls', '3x15 @ 40lbs', 'Rear delt work'),
  createEntry(48, '2025-03-11', 'cardio', 'Running (outdoor)', '30 min, 3.2 miles', 'Nice weather'),
  createEntry(49, '2025-03-12', 'lifting', 'Barbell Rows', '4x8 @ 155lbs', 'Heavy rows'),
  createEntry(50, '2025-03-14', 'lifting', 'Deadlifts', '3x5 @ 285lbs', 'Form video looked good'),
  createEntry(51, '2025-03-17', 'lifting', 'Squats', '5x5 @ 235lbs', 'Back to progression'),
  createEntry(52, '2025-03-18', 'cardio', 'Stairmaster', '30 min, level 9', 'Endurance building'),
  createEntry(53, '2025-03-19', 'lifting', 'Bench Press', '4x5 @ 185lbs', 'Approaching PR'),
  createEntry(54, '2025-03-19', 'lifting', 'Incline Bench Press', '3x8 @ 145lbs', null),
  createEntry(55, '2025-03-21', 'lifting', 'Pull-ups', '5x8 bodyweight', 'Added a set'),
  createEntry(56, '2025-03-24', 'cardio', 'Bike (outdoor)', '50 min, 13 miles', 'Longer ride'),
  createEntry(57, '2025-03-25', 'lifting', 'Overhead Press', '4x5 @ 115lbs', 'Shoulders responding'),
  createEntry(58, '2025-03-26', 'lifting', 'Front Squats', '4x6 @ 155lbs', 'Working on these'),
  createEntry(59, '2025-03-28', 'lifting', 'Deadlifts', '3x5 @ 295lbs', 'Almost 300'),
  createEntry(60, '2025-03-31', 'lifting', 'Bench Press', '3x3 @ 190lbs', 'Heavy singles next week'),

  // ============ APRIL 2025 - PR month ============
  createEntry(61, '2025-04-02', 'lifting', 'Bench Press', '1x1 @ 200lbs', 'TWO PLATE BENCH PR!!!'),
  createEntry(62, '2025-04-02', 'lifting', 'Close Grip Bench', '3x8 @ 155lbs', 'Celebration accessory'),
  createEntry(63, '2025-04-03', 'cardio', 'Running (outdoor)', '35 min, 4 miles', 'Runner\'s high'),
  createEntry(64, '2025-04-04', 'lifting', 'Squats', '5x5 @ 245lbs', 'Legs keeping up'),
  createEntry(65, '2025-04-07', 'lifting', 'Deadlifts', '1x3 @ 305lbs', '300+ club!'),
  createEntry(66, '2025-04-08', 'cardio', 'Rowing Machine', '30 min, 6000m', 'Great pace'),
  createEntry(67, '2025-04-09', 'lifting', 'Overhead Press', '4x5 @ 115lbs', 'Maintaining'),
  createEntry(68, '2025-04-11', 'lifting', 'Barbell Rows', '4x8 @ 165lbs', 'Back thickness'),
  createEntry(69, '2025-04-14', 'lifting', 'Bench Press', '4x5 @ 185lbs', 'Back to volume'),
  createEntry(70, '2025-04-15', 'cardio', 'Bike (outdoor)', '60 min, 16 miles', 'Long ride'),
  createEntry(71, '2025-04-16', 'lifting', 'Squats', '5x5 @ 245lbs', 'Solid'),
  createEntry(72, '2025-04-18', 'lifting', 'Romanian Deadlifts', '3x10 @ 155lbs', 'Hamstring focus'),
  createEntry(73, '2025-04-21', 'lifting', 'Pull-ups', '5x10 bodyweight', 'High volume'),
  createEntry(74, '2025-04-21', 'lifting', 'Chin-ups', '3x8 bodyweight', 'Bicep pump'),
  createEntry(75, '2025-04-23', 'cardio', 'Running (outdoor)', '40 min, 4.5 miles', 'Tempo run'),
  createEntry(76, '2025-04-24', 'lifting', 'Deadlifts', '3x5 @ 295lbs', 'Volume work'),
  createEntry(77, '2025-04-25', 'lifting', 'Overhead Press', '4x5 @ 120lbs', 'Progress'),
  createEntry(78, '2025-04-28', 'lifting', 'Bench Press', '4x5 @ 185lbs', 'Consistent'),
  createEntry(79, '2025-04-29', 'cardio', 'Swimming', '35 min, 1000m', 'Technique improving'),
  createEntry(80, '2025-04-30', 'lifting', 'Squats', '5x5 @ 255lbs', 'Weight moving up'),

  // ============ MAY 2025 - Summer prep ============
  createEntry(81, '2025-05-01', 'cardio', 'Running (outdoor)', '45 min, 5 miles', 'May day run'),
  createEntry(82, '2025-05-02', 'lifting', 'Bench Press', '4x6 @ 185lbs', 'Volume phase'),
  createEntry(83, '2025-05-05', 'lifting', 'Deadlifts', '3x5 @ 305lbs', 'Maintaining 300+'),
  createEntry(84, '2025-05-06', 'cardio', 'Bike (outdoor)', '70 min, 18 miles', 'Long weekend ride'),
  createEntry(85, '2025-05-07', 'lifting', 'Squats', '5x5 @ 255lbs', 'Solid'),
  createEntry(86, '2025-05-09', 'lifting', 'Overhead Press', '4x5 @ 120lbs', 'Plateau again'),
  createEntry(87, '2025-05-09', 'lifting', 'Arnold Press', '3x10 @ 40lbs', 'Trying new exercise'),
  createEntry(88, '2025-05-12', 'lifting', 'Barbell Rows', '4x8 @ 175lbs', 'Heavy'),
  createEntry(89, '2025-05-13', 'cardio', 'Running (outdoor)', '50 min, 5.5 miles', 'Training for 10k'),
  createEntry(90, '2025-05-14', 'lifting', 'Bench Press', '4x5 @ 190lbs', 'Pushing it'),
  createEntry(91, '2025-05-16', 'lifting', 'Front Squats', '4x6 @ 175lbs', 'Getting comfortable'),
  createEntry(92, '2025-05-19', 'lifting', 'Pull-ups', '5x10 bodyweight', 'Easy now'),
  createEntry(93, '2025-05-20', 'cardio', 'Stairmaster', '35 min, level 10', 'Max level'),
  createEntry(94, '2025-05-21', 'lifting', 'Deadlifts', '3x5 @ 315lbs', 'THREE PLATES!'),
  createEntry(95, '2025-05-23', 'lifting', 'Squats', '5x5 @ 265lbs', 'Approaching 3 plates'),
  createEntry(96, '2025-05-26', 'cardio', 'Running (outdoor)', '60 min, 6.2 miles', '10K distance!'),
  createEntry(97, '2025-05-27', 'lifting', 'Bench Press', '4x5 @ 190lbs', 'Consistent'),
  createEntry(98, '2025-05-28', 'lifting', 'Overhead Press', '4x5 @ 125lbs', 'Finally moving'),
  createEntry(99, '2025-05-30', 'lifting', 'Barbell Rows', '4x8 @ 175lbs', 'Back day'),

  // ============ JUNE 2025 - Peak summer ============
  createEntry(100, '2025-06-02', 'lifting', 'Squats', '5x5 @ 275lbs', 'Summer strength'),
  createEntry(101, '2025-06-03', 'cardio', 'Swimming', '45 min, 1500m', 'Pool opened'),
  createEntry(102, '2025-06-04', 'lifting', 'Bench Press', '4x5 @ 190lbs', 'Maintaining'),
  createEntry(103, '2025-06-06', 'lifting', 'Deadlifts', '3x5 @ 315lbs', 'Consistent 3 plates'),
  createEntry(104, '2025-06-09', 'cardio', 'Bike (outdoor)', '90 min, 25 miles', 'Epic ride'),
  createEntry(105, '2025-06-10', 'lifting', 'Overhead Press', '4x5 @ 125lbs', 'Holding steady'),
  createEntry(106, '2025-06-11', 'lifting', 'Pull-ups', '5x12 bodyweight', 'High rep PR'),
  createEntry(107, '2025-06-13', 'lifting', 'Squats', '5x5 @ 275lbs', 'Solid'),
  createEntry(108, '2025-06-16', 'cardio', 'Running (outdoor)', '55 min, 6 miles', 'Morning run'),
  createEntry(109, '2025-06-17', 'lifting', 'Bench Press', '4x5 @ 195lbs', 'Almost there'),
  createEntry(110, '2025-06-18', 'lifting', 'Romanian Deadlifts', '3x10 @ 175lbs', 'Heavy RDLs'),
  createEntry(111, '2025-06-20', 'lifting', 'Barbell Rows', '4x8 @ 185lbs', 'Row PR'),
  createEntry(112, '2025-06-23', 'lifting', 'Deadlifts', '1x3 @ 325lbs', 'New 3RM'),
  createEntry(113, '2025-06-24', 'cardio', 'Swimming', '50 min, 1800m', 'Great swim'),
  createEntry(114, '2025-06-25', 'lifting', 'Squats', '5x5 @ 285lbs', 'Almost 3 plates'),
  createEntry(115, '2025-06-27', 'lifting', 'Overhead Press', '3x3 @ 135lbs', 'Testing max'),
  createEntry(116, '2025-06-30', 'cardio', 'Bike (outdoor)', '75 min, 20 miles', 'End of month ride'),

  // ============ JULY 2025 - Summer peak ============
  createEntry(117, '2025-07-01', 'lifting', 'Bench Press', '3x3 @ 205lbs', 'Heavy day'),
  createEntry(118, '2025-07-02', 'cardio', 'Running (outdoor)', '45 min, 5 miles', 'Hot day run'),
  createEntry(119, '2025-07-04', 'cardio', 'Swimming', '60 min, 2000m', '4th of July swim'),
  createEntry(120, '2025-07-07', 'lifting', 'Squats', '1x3 @ 295lbs', 'Close to 300'),
  createEntry(121, '2025-07-08', 'lifting', 'Deadlifts', '3x5 @ 315lbs', 'Volume at 3 plates'),
  createEntry(122, '2025-07-09', 'cardio', 'Bike (outdoor)', '80 min, 22 miles', 'Long ride'),
  createEntry(123, '2025-07-11', 'lifting', 'Bench Press', '4x5 @ 195lbs', 'Back to volume'),
  createEntry(124, '2025-07-11', 'lifting', 'Incline Dumbbell Press', '3x10 @ 65lbs', 'Dumbbells up'),
  createEntry(125, '2025-07-14', 'lifting', 'Overhead Press', '4x5 @ 125lbs', 'Steady'),
  createEntry(126, '2025-07-15', 'cardio', 'Swimming', '55 min, 1700m', 'Afternoon swim'),
  createEntry(127, '2025-07-16', 'lifting', 'Pull-ups', '4x12 bodyweight', 'Easy'),
  createEntry(128, '2025-07-18', 'lifting', 'Squats', '5x5 @ 285lbs', 'Consistent'),
  createEntry(129, '2025-07-21', 'cardio', 'Running (outdoor)', '50 min, 5.5 miles', 'Early morning beat heat'),
  createEntry(130, '2025-07-22', 'lifting', 'Barbell Rows', '4x8 @ 185lbs', 'Strong back'),
  createEntry(131, '2025-07-23', 'lifting', 'Bench Press', '4x5 @ 195lbs', 'Solid'),
  createEntry(132, '2025-07-25', 'lifting', 'Deadlifts', '3x5 @ 325lbs', 'Moving up'),
  createEntry(133, '2025-07-28', 'cardio', 'Bike (outdoor)', '100 min, 28 miles', 'Century training'),
  createEntry(134, '2025-07-29', 'lifting', 'Squats', '5x5 @ 295lbs', 'Almost there'),
  createEntry(135, '2025-07-30', 'lifting', 'Overhead Press', '4x5 @ 130lbs', 'Progress'),

  // ============ AUGUST 2025 - Late summer push ============
  createEntry(136, '2025-08-01', 'lifting', 'Bench Press', '4x5 @ 200lbs', 'Two plates for reps'),
  createEntry(137, '2025-08-04', 'lifting', 'Squats', '1x3 @ 305lbs', '300 CLUB! Finally'),
  createEntry(138, '2025-08-04', 'lifting', 'Leg Press', '3x12 @ 450lbs', 'Celebration volume'),
  createEntry(139, '2025-08-05', 'cardio', 'Swimming', '60 min, 2000m', 'Recovery swim'),
  createEntry(140, '2025-08-06', 'lifting', 'Deadlifts', '1x1 @ 345lbs', 'Testing max'),
  createEntry(141, '2025-08-08', 'cardio', 'Bike (outdoor)', '85 min, 24 miles', 'Good pace'),
  createEntry(142, '2025-08-11', 'lifting', 'Overhead Press', '4x5 @ 130lbs', 'Shoulder day'),
  createEntry(143, '2025-08-11', 'lifting', 'Lateral Raises', '3x15 @ 25lbs', 'Pump work'),
  createEntry(144, '2025-08-12', 'cardio', 'Running (outdoor)', '55 min, 6 miles', 'Consistent'),
  createEntry(145, '2025-08-13', 'lifting', 'Pull-ups', '5x12 bodyweight', 'High rep'),
  createEntry(146, '2025-08-15', 'lifting', 'Bench Press', '4x5 @ 200lbs', 'Feeling strong'),
  createEntry(147, '2025-08-18', 'lifting', 'Barbell Rows', '4x8 @ 195lbs', 'Heavy rows'),
  createEntry(148, '2025-08-19', 'cardio', 'Swimming', '50 min, 1600m', 'Easy swim'),
  createEntry(149, '2025-08-20', 'lifting', 'Squats', '5x5 @ 295lbs', 'Volume after PR'),
  createEntry(150, '2025-08-22', 'lifting', 'Deadlifts', '3x5 @ 325lbs', 'Back to work'),
  createEntry(151, '2025-08-25', 'cardio', 'Bike (outdoor)', '95 min, 26 miles', 'Long ride'),
  createEntry(152, '2025-08-26', 'lifting', 'Overhead Press', '4x5 @ 135lbs', 'PR at bodyweight'),
  createEntry(153, '2025-08-27', 'lifting', 'Bench Press', '4x5 @ 200lbs', 'Consistent'),
  createEntry(154, '2025-08-29', 'lifting', 'Front Squats', '4x6 @ 195lbs', 'Getting heavy'),

  // ============ SEPTEMBER 2025 - Fall grind ============
  createEntry(155, '2025-09-02', 'lifting', 'Squats', '5x5 @ 305lbs', '300+ for reps'),
  createEntry(156, '2025-09-03', 'cardio', 'Running (outdoor)', '60 min, 6.5 miles', 'Fall weather'),
  createEntry(157, '2025-09-04', 'lifting', 'Bench Press', '4x5 @ 200lbs', 'Maintaining'),
  createEntry(158, '2025-09-05', 'lifting', 'Deadlifts', '3x5 @ 335lbs', 'Moving up'),
  createEntry(159, '2025-09-08', 'lifting', 'Overhead Press', '4x5 @ 135lbs', 'Solid'),
  createEntry(160, '2025-09-08', 'lifting', 'Face Pulls', '3x20 @ 50lbs', 'Rear delts'),
  createEntry(161, '2025-09-09', 'cardio', 'Bike (outdoor)', '75 min, 20 miles', 'Beautiful day'),
  createEntry(162, '2025-09-10', 'lifting', 'Barbell Rows', '4x8 @ 195lbs', 'Heavy'),
  createEntry(163, '2025-09-12', 'lifting', 'Squats', '5x5 @ 305lbs', 'Consistent'),
  createEntry(164, '2025-09-15', 'cardio', 'Running (outdoor)', '65 min, 7 miles', 'Long run'),
  createEntry(165, '2025-09-16', 'lifting', 'Bench Press', '3x3 @ 210lbs', 'Heavy day'),
  createEntry(166, '2025-09-17', 'lifting', 'Pull-ups', '5x10 weighted +25lbs', 'Added weight'),
  createEntry(167, '2025-09-19', 'lifting', 'Deadlifts', '3x5 @ 335lbs', 'Strong'),
  createEntry(168, '2025-09-22', 'lifting', 'Overhead Press', '3x3 @ 140lbs', 'New PR attempt'),
  createEntry(169, '2025-09-23', 'cardio', 'Rowing Machine', '30 min, 6500m', 'Back to indoor'),
  createEntry(170, '2025-09-24', 'lifting', 'Squats', '5x5 @ 315lbs', 'THREE PLATES FOR REPS'),
  createEntry(171, '2025-09-26', 'lifting', 'Bench Press', '4x5 @ 205lbs', 'Progress'),
  createEntry(172, '2025-09-29', 'cardio', 'Stairmaster', '35 min, level 11', 'Fall cardio'),
  createEntry(173, '2025-09-30', 'lifting', 'Romanian Deadlifts', '3x10 @ 185lbs', 'Hamstrings'),

  // ============ OCTOBER 2025 - Strength phase ============
  createEntry(174, '2025-10-01', 'lifting', 'Deadlifts', '1x3 @ 355lbs', 'New 3RM PR!'),
  createEntry(175, '2025-10-02', 'cardio', 'Rowing Machine', '35 min, 7200m', 'Strong row'),
  createEntry(176, '2025-10-03', 'lifting', 'Bench Press', '4x5 @ 205lbs', 'Volume'),
  createEntry(177, '2025-10-06', 'lifting', 'Squats', '5x5 @ 315lbs', 'Consistent'),
  createEntry(178, '2025-10-07', 'cardio', 'Treadmill', '40 min, 4 miles', 'Rainy day'),
  createEntry(179, '2025-10-08', 'lifting', 'Overhead Press', '4x5 @ 135lbs', 'Solid'),
  createEntry(180, '2025-10-10', 'lifting', 'Barbell Rows', '4x6 @ 205lbs', 'Heavy rows'),
  createEntry(181, '2025-10-13', 'lifting', 'Bench Press', '1x3 @ 215lbs', 'Testing strength'),
  createEntry(182, '2025-10-13', 'lifting', 'Incline Bench Press', '3x8 @ 165lbs', null),
  createEntry(183, '2025-10-14', 'cardio', 'Stairmaster', '40 min, level 10', 'Endurance'),
  createEntry(184, '2025-10-15', 'lifting', 'Deadlifts', '3x5 @ 335lbs', 'Volume work'),
  createEntry(185, '2025-10-17', 'lifting', 'Squats', '3x3 @ 325lbs', 'Heavy triples'),
  createEntry(186, '2025-10-20', 'lifting', 'Pull-ups', '5x8 weighted +35lbs', 'Progression'),
  createEntry(187, '2025-10-21', 'cardio', 'Rowing Machine', '30 min, 6300m', 'Steady state'),
  createEntry(188, '2025-10-22', 'lifting', 'Overhead Press', '3x3 @ 145lbs', 'Heavy press'),
  createEntry(189, '2025-10-24', 'lifting', 'Bench Press', '4x5 @ 205lbs', 'Back to volume'),
  createEntry(190, '2025-10-27', 'lifting', 'Deadlifts', '3x5 @ 345lbs', 'Moving up'),
  createEntry(191, '2025-10-28', 'cardio', 'Treadmill (intervals)', '30 min, 8x45s sprints', 'HIIT'),
  createEntry(192, '2025-10-29', 'lifting', 'Squats', '5x5 @ 315lbs', 'Solid'),
  createEntry(193, '2025-10-31', 'cardio', 'Basketball', '90 min pickup', 'Halloween hoops'),

  // ============ NOVEMBER 2025 - Push through ============
  createEntry(194, '2025-11-03', 'lifting', 'Bench Press', '4x5 @ 210lbs', 'November push'),
  createEntry(195, '2025-11-04', 'cardio', 'Rowing Machine', '35 min, 7500m', 'PR pace'),
  createEntry(196, '2025-11-05', 'lifting', 'Squats', '5x5 @ 315lbs', 'Consistent'),
  createEntry(197, '2025-11-07', 'lifting', 'Deadlifts', '3x5 @ 345lbs', 'Strong pulls'),
  createEntry(198, '2025-11-10', 'lifting', 'Overhead Press', '4x5 @ 140lbs', 'Progress'),
  createEntry(199, '2025-11-10', 'lifting', 'Lateral Raises', '3x15 @ 30lbs', 'Heavier'),
  createEntry(200, '2025-11-11', 'cardio', 'Treadmill', '45 min, 4.5 miles', 'Veterans day'),
  createEntry(201, '2025-11-12', 'lifting', 'Barbell Rows', '4x6 @ 205lbs', 'Back day'),
  createEntry(202, '2025-11-14', 'lifting', 'Bench Press', '3x3 @ 220lbs', 'Heavy bench'),
  createEntry(203, '2025-11-17', 'lifting', 'Squats', '3x3 @ 335lbs', 'Heavy squats'),
  createEntry(204, '2025-11-18', 'cardio', 'Stairmaster', '45 min, level 10', 'Leg burner'),
  createEntry(205, '2025-11-19', 'lifting', 'Pull-ups', '5x8 weighted +40lbs', 'Strong'),
  createEntry(206, '2025-11-21', 'lifting', 'Deadlifts', '1x3 @ 365lbs', 'New PR!'),
  createEntry(207, '2025-11-24', 'lifting', 'Overhead Press', '4x5 @ 140lbs', 'Maintaining'),
  createEntry(208, '2025-11-25', 'cardio', 'Rowing Machine', '30 min, 6500m', 'Pre-holiday'),
  createEntry(209, '2025-11-26', 'lifting', 'Bench Press', '4x5 @ 210lbs', 'Good session'),
  createEntry(210, '2025-11-28', 'cardio', 'Treadmill', '60 min, 6 miles', 'Turkey trot'),

  // ============ DECEMBER 2025 - Year end strong ============
  createEntry(211, '2025-12-01', 'lifting', 'Squats', '5x5 @ 325lbs', 'December gains'),
  createEntry(212, '2025-12-02', 'cardio', 'Rowing Machine', '35 min, 7300m', 'Strong row'),
  createEntry(213, '2025-12-03', 'lifting', 'Bench Press', '4x5 @ 210lbs', 'Consistent'),
  createEntry(214, '2025-12-05', 'lifting', 'Deadlifts', '3x5 @ 355lbs', 'Heavy volume'),
  createEntry(215, '2025-12-08', 'lifting', 'Overhead Press', '4x5 @ 145lbs', 'Shoulders'),
  createEntry(216, '2025-12-08', 'lifting', 'Face Pulls', '3x20 @ 55lbs', 'Rear delts'),
  createEntry(217, '2025-12-09', 'cardio', 'Stairmaster', '40 min, level 11', 'Cardio day'),
  createEntry(218, '2025-12-10', 'lifting', 'Barbell Rows', '4x6 @ 215lbs', 'Heavy'),
  createEntry(219, '2025-12-12', 'lifting', 'Squats', '3x3 @ 345lbs', 'Testing max'),
  createEntry(220, '2025-12-15', 'lifting', 'Bench Press', '1x2 @ 225lbs', 'NEW PR! 225 for reps!'),
  createEntry(221, '2025-12-15', 'lifting', 'Close Grip Bench', '3x8 @ 175lbs', 'Accessory'),
  createEntry(222, '2025-12-16', 'cardio', 'Treadmill', '50 min, 5 miles', 'Winter cardio'),
  createEntry(223, '2025-12-17', 'lifting', 'Pull-ups', '5x8 weighted +45lbs', 'Strong'),
  createEntry(224, '2025-12-19', 'lifting', 'Deadlifts', '3x5 @ 355lbs', 'Solid'),
  createEntry(225, '2025-12-22', 'lifting', 'Overhead Press', '3x3 @ 150lbs', 'Testing'),
  createEntry(226, '2025-12-23', 'cardio', 'Rowing Machine', '30 min, 6400m', 'Pre-holiday'),
  createEntry(227, '2025-12-26', 'lifting', 'Squats', '5x5 @ 325lbs', 'Post-Christmas'),
  createEntry(228, '2025-12-29', 'lifting', 'Bench Press', '4x5 @ 215lbs', 'Building'),
  createEntry(229, '2025-12-30', 'cardio', 'Stairmaster', '45 min, level 12', 'Year end push'),
  createEntry(230, '2025-12-31', 'lifting', 'Deadlifts', '1x1 @ 385lbs', 'NYE PR attempt - SO CLOSE to 4 plates'),

  // ============ JANUARY 2026 - New year, new goals ============
  createEntry(231, '2026-01-02', 'lifting', 'Bench Press', '4x5 @ 215lbs', 'New year, staying consistent'),
  createEntry(232, '2026-01-02', 'lifting', 'Incline Dumbbell Press', '3x10 @ 70lbs', null),
  createEntry(233, '2026-01-03', 'cardio', 'Treadmill', '40 min, 4 miles', 'Easy cardio'),
  createEntry(234, '2026-01-06', 'lifting', 'Squats', '5x5 @ 335lbs', 'Building to 4 plates'),
  createEntry(235, '2026-01-06', 'lifting', 'Leg Press', '3x12 @ 540lbs', null),
  createEntry(236, '2026-01-08', 'lifting', 'Deadlifts', '3x5 @ 365lbs', 'Chasing 405'),
  createEntry(237, '2026-01-09', 'cardio', 'Rowing Machine', '35 min, 7500m', 'Strong pace'),
  createEntry(238, '2026-01-10', 'lifting', 'Overhead Press', '4x5 @ 145lbs', 'Maintaining strength'),
  createEntry(239, '2026-01-10', 'lifting', 'Pull-ups', '5x10 weighted +45lbs', 'Volume'),
  createEntry(240, '2026-01-13', 'lifting', 'Bench Press', '4x5 @ 215lbs', 'Consistent'),
  createEntry(241, '2026-01-14', 'cardio', 'Stairmaster', '40 min, level 12', 'High intensity'),
  createEntry(242, '2026-01-15', 'lifting', 'Squats', '5x5 @ 335lbs', 'Solid'),
  createEntry(243, '2026-01-17', 'lifting', 'Barbell Rows', '4x6 @ 215lbs', 'Back strength'),
  createEntry(244, '2026-01-17', 'lifting', 'Lat Pulldowns', '3x10 @ 160lbs', null),
  createEntry(245, '2026-01-20', 'lifting', 'Bench Press', '3x3 @ 225lbs', 'Heavy day'),
  createEntry(246, '2026-01-21', 'cardio', 'Treadmill', '45 min, 4.5 miles', 'Steady state'),
  createEntry(247, '2026-01-22', 'lifting', 'Deadlifts', '3x5 @ 375lbs', 'Getting closer'),
  createEntry(248, '2026-01-24', 'lifting', 'Overhead Press', '4x5 @ 150lbs', 'New working weight'),
  createEntry(249, '2026-01-27', 'lifting', 'Squats', '3x3 @ 355lbs', 'Heavy triples'),
  createEntry(250, '2026-01-28', 'cardio', 'Rowing Machine', '35 min, 7600m', 'PR pace'),
  createEntry(251, '2026-01-29', 'lifting', 'Bench Press', '4x5 @ 220lbs', 'Progress'),
  createEntry(252, '2026-01-31', 'lifting', 'Pull-ups', '5x8 weighted +50lbs', 'Strong finish'),
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
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 2,
    exercise_name: 'Incline Dumbbell Press',
    category: 'lifting',
    targets: ['chest', 'shoulders'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 3,
    exercise_name: 'Squats',
    category: 'lifting',
    targets: ['legs', 'glutes', 'core'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 4,
    exercise_name: 'Romanian Deadlifts',
    category: 'lifting',
    targets: ['hamstrings', 'glutes', 'back'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 5,
    exercise_name: 'Overhead Press',
    category: 'lifting',
    targets: ['shoulders', 'triceps'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 6,
    exercise_name: 'Pull-ups',
    category: 'lifting',
    targets: ['back', 'biceps'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 7,
    exercise_name: 'Deadlifts',
    category: 'lifting',
    targets: ['back', 'legs', 'glutes', 'core'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 8,
    exercise_name: 'Barbell Rows',
    category: 'lifting',
    targets: ['back', 'biceps'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 9,
    exercise_name: 'Tricep Dips',
    category: 'lifting',
    targets: ['triceps', 'chest', 'shoulders'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  // Cardio exercises
  {
    id: 10,
    exercise_name: 'Treadmill',
    category: 'cardio',
    targets: ['cardio', 'legs'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 11,
    exercise_name: 'Rowing Machine',
    category: 'cardio',
    targets: ['cardio', 'back', 'arms'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 12,
    exercise_name: 'Stairmaster',
    category: 'cardio',
    targets: ['cardio', 'legs', 'glutes'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: 13,
    exercise_name: 'Swimming',
    category: 'cardio',
    targets: ['cardio', 'full body'],
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
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
