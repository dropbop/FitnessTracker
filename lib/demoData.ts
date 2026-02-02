import { ExerciseEntry, ExerciseMetadata } from './types';

let nextDemoId = 500;

export function getNextDemoId(): number {
  return nextDemoId++;
}

export function resetDemoId(): void {
  nextDemoId = 500;
}

// Template for demo entries - month/day only, year computed at runtime
type DemoEntryTemplate = {
  id: number;
  month: number;  // 1-12
  day: number;    // 1-31
  category: 'lifting' | 'cardio';
  sub_exercise: string;
  notes_quantitative: string;
  notes_qualitative: string | null;
};

// Helper to create template entries
function t(
  id: number,
  month: number,
  day: number,
  category: 'lifting' | 'cardio',
  sub_exercise: string,
  notes_quantitative: string,
  notes_qualitative: string | null
): DemoEntryTemplate {
  return { id, month, day, category, sub_exercise, notes_quantitative, notes_qualitative };
}

// Demo entry templates - dates are month/day, year computed dynamically
const DEMO_ENTRY_TEMPLATES: DemoEntryTemplate[] = [
  // ============ JANUARY - New year momentum ============
  t(1, 1, 2, 'lifting', 'Bench Press', '4x5 @ 215lbs', 'New year, staying consistent'),
  t(2, 1, 2, 'lifting', 'Incline Dumbbell Press', '3x10 @ 70lbs', null),
  t(3, 1, 3, 'cardio', 'Treadmill', '40 min, 4 miles', 'Easy cardio'),
  t(4, 1, 6, 'lifting', 'Squats', '5x5 @ 335lbs', 'Building to 4 plates'),
  t(5, 1, 6, 'lifting', 'Leg Press', '3x12 @ 540lbs', null),
  t(6, 1, 8, 'lifting', 'Deadlifts', '3x5 @ 365lbs', 'Chasing 405'),
  t(7, 1, 9, 'cardio', 'Rowing Machine', '35 min, 7500m', 'Strong pace'),
  t(8, 1, 10, 'lifting', 'Overhead Press', '4x5 @ 145lbs', 'Maintaining strength'),
  t(9, 1, 10, 'lifting', 'Pull-ups', '5x10 weighted +45lbs', 'Volume'),
  t(10, 1, 13, 'lifting', 'Bench Press', '4x5 @ 215lbs', 'Consistent'),
  t(11, 1, 14, 'cardio', 'Stairmaster', '40 min, level 12', 'High intensity'),
  t(12, 1, 15, 'lifting', 'Squats', '5x5 @ 335lbs', 'Solid'),
  t(13, 1, 17, 'lifting', 'Barbell Rows', '4x6 @ 215lbs', 'Back strength'),
  t(14, 1, 17, 'lifting', 'Lat Pulldowns', '3x10 @ 160lbs', null),
  t(15, 1, 20, 'lifting', 'Bench Press', '3x3 @ 225lbs', 'Heavy day'),
  t(16, 1, 21, 'cardio', 'Treadmill', '45 min, 4.5 miles', 'Steady state'),
  t(17, 1, 22, 'lifting', 'Deadlifts', '3x5 @ 375lbs', 'Getting closer'),
  t(18, 1, 24, 'lifting', 'Overhead Press', '4x5 @ 150lbs', 'New working weight'),
  t(19, 1, 27, 'lifting', 'Squats', '3x3 @ 355lbs', 'Heavy triples'),
  t(20, 1, 28, 'cardio', 'Rowing Machine', '35 min, 7600m', 'PR pace'),
  t(21, 1, 29, 'lifting', 'Bench Press', '4x5 @ 220lbs', 'Progress'),
  t(22, 1, 31, 'lifting', 'Pull-ups', '5x8 weighted +50lbs', 'Strong finish'),

  // ============ FEBRUARY - Building momentum ============
  t(23, 2, 3, 'lifting', 'Deadlifts', '3x5 @ 380lbs', 'Progress'),
  t(24, 2, 3, 'lifting', 'Romanian Deadlifts', '3x10 @ 185lbs', 'Accessory work'),
  t(25, 2, 4, 'cardio', 'Treadmill (intervals)', '25 min, 6x1min sprints', 'HIIT day'),
  t(26, 2, 5, 'lifting', 'Bench Press', '4x6 @ 215lbs', 'Volume day'),
  t(27, 2, 7, 'lifting', 'Squats', '5x5 @ 345lbs', 'Legs are strong'),
  t(28, 2, 10, 'lifting', 'Overhead Press', '4x6 @ 145lbs', 'Strict form'),
  t(29, 2, 10, 'lifting', 'Lateral Raises', '3x12 @ 30lbs', 'Shoulder pump'),
  t(30, 2, 11, 'cardio', 'Stairmaster', '25 min, level 11', 'Solid effort'),
  t(31, 2, 12, 'lifting', 'Barbell Rows', '4x8 @ 205lbs', 'Back getting stronger'),
  t(32, 2, 14, 'cardio', 'Swimming', '30 min, 1200m', 'Valentine\'s day swim'),
  t(33, 2, 17, 'lifting', 'Bench Press', '4x6 @ 220lbs', 'Feeling strong'),
  t(34, 2, 17, 'lifting', 'Tricep Dips', '3x12 weighted +25lbs', null),
  t(35, 2, 19, 'lifting', 'Deadlifts', '3x5 @ 385lbs', 'Grip holding up'),
  t(36, 2, 20, 'cardio', 'Rowing Machine', '25 min, 5500m', 'Pace improving'),
  t(37, 2, 21, 'lifting', 'Squats', '5x5 @ 350lbs', 'Solid session'),
  t(38, 2, 24, 'lifting', 'Overhead Press', '4x6 @ 150lbs', 'Shoulders responding'),
  t(39, 2, 25, 'cardio', 'Treadmill', '35 min, 3.5 miles', 'Long steady run'),
  t(40, 2, 26, 'lifting', 'Pull-ups', '4x10 weighted +45lbs', 'Volume up'),
  t(41, 2, 28, 'lifting', 'Bench Press', '4x6 @ 220lbs', 'Consistent'),

  // ============ MARCH - Spring gains ============
  t(42, 3, 3, 'lifting', 'Deadlifts', '3x5 @ 390lbs', 'Crushing it'),
  t(43, 3, 4, 'cardio', 'Bike (outdoor)', '40 min, 10 miles', 'First outdoor ride of spring'),
  t(44, 3, 5, 'lifting', 'Squats', '5x5 @ 345lbs', 'Deload week'),
  t(45, 3, 7, 'lifting', 'Bench Press', '5x5 @ 205lbs', 'Deload'),
  t(46, 3, 10, 'lifting', 'Overhead Press', '4x6 @ 150lbs', 'Maintaining'),
  t(47, 3, 10, 'lifting', 'Face Pulls', '3x15 @ 50lbs', 'Rear delt work'),
  t(48, 3, 11, 'cardio', 'Running (outdoor)', '30 min, 3.2 miles', 'Nice weather'),
  t(49, 3, 12, 'lifting', 'Barbell Rows', '4x8 @ 205lbs', 'Heavy rows'),
  t(50, 3, 14, 'lifting', 'Deadlifts', '3x5 @ 395lbs', 'Form video looked good'),
  t(51, 3, 17, 'lifting', 'Squats', '5x5 @ 355lbs', 'Back to progression'),
  t(52, 3, 18, 'cardio', 'Stairmaster', '30 min, level 11', 'Endurance building'),
  t(53, 3, 19, 'lifting', 'Bench Press', '4x5 @ 225lbs', 'Two plates for reps!'),
  t(54, 3, 19, 'lifting', 'Incline Bench Press', '3x8 @ 175lbs', null),
  t(55, 3, 21, 'lifting', 'Pull-ups', '5x8 weighted +50lbs', 'Added weight'),
  t(56, 3, 24, 'cardio', 'Bike (outdoor)', '50 min, 13 miles', 'Longer ride'),
  t(57, 3, 25, 'lifting', 'Overhead Press', '4x5 @ 155lbs', 'Progress'),
  t(58, 3, 26, 'lifting', 'Front Squats', '4x6 @ 225lbs', 'Getting comfortable'),
  t(59, 3, 28, 'lifting', 'Deadlifts', '1x3 @ 405lbs', 'FOUR PLATES! Finally!'),
  t(60, 3, 31, 'lifting', 'Bench Press', '3x3 @ 235lbs', 'Chasing 250'),

  // ============ APRIL - PR month ============
  t(61, 4, 2, 'lifting', 'Bench Press', '1x1 @ 245lbs', 'NEW PR! So close to 250'),
  t(62, 4, 2, 'lifting', 'Close Grip Bench', '3x8 @ 185lbs', 'Celebration accessory'),
  t(63, 4, 3, 'cardio', 'Running (outdoor)', '35 min, 4 miles', 'Runner\'s high'),
  t(64, 4, 4, 'lifting', 'Squats', '5x5 @ 365lbs', 'Legs keeping up'),
  t(65, 4, 7, 'lifting', 'Deadlifts', '3x5 @ 395lbs', 'Volume at heavy weight'),
  t(66, 4, 8, 'cardio', 'Rowing Machine', '30 min, 6500m', 'Great pace'),
  t(67, 4, 9, 'lifting', 'Overhead Press', '4x5 @ 155lbs', 'Maintaining'),
  t(68, 4, 11, 'lifting', 'Barbell Rows', '4x8 @ 215lbs', 'Back thickness'),
  t(69, 4, 14, 'lifting', 'Bench Press', '4x5 @ 225lbs', 'Back to volume'),
  t(70, 4, 15, 'cardio', 'Bike (outdoor)', '60 min, 16 miles', 'Long ride'),
  t(71, 4, 16, 'lifting', 'Squats', '5x5 @ 365lbs', 'Solid'),
  t(72, 4, 18, 'lifting', 'Romanian Deadlifts', '3x10 @ 205lbs', 'Hamstring focus'),
  t(73, 4, 21, 'lifting', 'Pull-ups', '5x10 weighted +50lbs', 'High volume'),
  t(74, 4, 21, 'lifting', 'Chin-ups', '3x8 weighted +25lbs', 'Bicep pump'),
  t(75, 4, 23, 'cardio', 'Running (outdoor)', '40 min, 4.5 miles', 'Tempo run'),
  t(76, 4, 24, 'lifting', 'Deadlifts', '3x5 @ 400lbs', 'Volume work'),
  t(77, 4, 25, 'lifting', 'Overhead Press', '4x5 @ 160lbs', 'Progress'),
  t(78, 4, 28, 'lifting', 'Bench Press', '4x5 @ 230lbs', 'Consistent'),
  t(79, 4, 29, 'cardio', 'Swimming', '35 min, 1200m', 'Technique improving'),
  t(80, 4, 30, 'lifting', 'Squats', '5x5 @ 370lbs', 'Weight moving up'),

  // ============ MAY - Summer prep ============
  t(81, 5, 1, 'cardio', 'Running (outdoor)', '45 min, 5 miles', 'May day run'),
  t(82, 5, 2, 'lifting', 'Bench Press', '4x6 @ 225lbs', 'Volume phase'),
  t(83, 5, 5, 'lifting', 'Deadlifts', '3x5 @ 405lbs', 'Consistent 4 plates'),
  t(84, 5, 6, 'cardio', 'Bike (outdoor)', '70 min, 18 miles', 'Long weekend ride'),
  t(85, 5, 7, 'lifting', 'Squats', '5x5 @ 370lbs', 'Solid'),
  t(86, 5, 9, 'lifting', 'Overhead Press', '4x5 @ 160lbs', 'Holding steady'),
  t(87, 5, 9, 'lifting', 'Arnold Press', '3x10 @ 50lbs', 'Shoulder variety'),
  t(88, 5, 12, 'lifting', 'Barbell Rows', '4x8 @ 215lbs', 'Heavy'),
  t(89, 5, 13, 'cardio', 'Running (outdoor)', '50 min, 5.5 miles', 'Good weather'),
  t(90, 5, 14, 'lifting', 'Bench Press', '4x5 @ 230lbs', 'Pushing it'),
  t(91, 5, 16, 'lifting', 'Front Squats', '4x6 @ 235lbs', 'Getting stronger'),
  t(92, 5, 19, 'lifting', 'Pull-ups', '5x10 weighted +50lbs', 'Easy now'),
  t(93, 5, 20, 'cardio', 'Stairmaster', '35 min, level 12', 'Max effort'),
  t(94, 5, 21, 'lifting', 'Deadlifts', '3x5 @ 410lbs', 'Past 4 plates!'),
  t(95, 5, 23, 'lifting', 'Squats', '5x5 @ 375lbs', 'Approaching 4 plates'),
  t(96, 5, 26, 'cardio', 'Running (outdoor)', '60 min, 6.2 miles', '10K distance!'),
  t(97, 5, 27, 'lifting', 'Bench Press', '4x5 @ 230lbs', 'Consistent'),
  t(98, 5, 28, 'lifting', 'Overhead Press', '4x5 @ 165lbs', 'Finally moving up'),
  t(99, 5, 30, 'lifting', 'Barbell Rows', '4x8 @ 220lbs', 'Back day'),

  // ============ JUNE - Peak summer ============
  t(100, 6, 2, 'lifting', 'Squats', '5x5 @ 380lbs', 'Summer strength'),
  t(101, 6, 3, 'cardio', 'Swimming', '45 min, 1500m', 'Pool season'),
  t(102, 6, 4, 'lifting', 'Bench Press', '4x5 @ 230lbs', 'Maintaining'),
  t(103, 6, 6, 'lifting', 'Deadlifts', '3x5 @ 415lbs', 'Strong pulls'),
  t(104, 6, 9, 'cardio', 'Bike (outdoor)', '90 min, 25 miles', 'Epic ride'),
  t(105, 6, 10, 'lifting', 'Overhead Press', '4x5 @ 165lbs', 'Solid'),
  t(106, 6, 11, 'lifting', 'Pull-ups', '5x12 weighted +45lbs', 'High rep PR'),
  t(107, 6, 13, 'lifting', 'Squats', '5x5 @ 380lbs', 'Consistent'),
  t(108, 6, 16, 'cardio', 'Running (outdoor)', '55 min, 6 miles', 'Morning run'),
  t(109, 6, 17, 'lifting', 'Bench Press', '4x5 @ 235lbs', 'Moving up'),
  t(110, 6, 18, 'lifting', 'Romanian Deadlifts', '3x10 @ 225lbs', 'Heavy RDLs'),
  t(111, 6, 20, 'lifting', 'Barbell Rows', '4x8 @ 225lbs', 'Row PR'),
  t(112, 6, 23, 'lifting', 'Deadlifts', '1x3 @ 425lbs', 'New 3RM'),
  t(113, 6, 24, 'cardio', 'Swimming', '50 min, 1800m', 'Great swim'),
  t(114, 6, 25, 'lifting', 'Squats', '5x5 @ 385lbs', 'Close to 4 plates'),
  t(115, 6, 27, 'lifting', 'Overhead Press', '3x3 @ 175lbs', 'Testing max'),
  t(116, 6, 30, 'cardio', 'Bike (outdoor)', '75 min, 20 miles', 'End of month ride'),

  // ============ JULY - Summer peak ============
  t(117, 7, 1, 'lifting', 'Bench Press', '3x3 @ 240lbs', 'Heavy day'),
  t(118, 7, 2, 'cardio', 'Running (outdoor)', '45 min, 5 miles', 'Hot day run'),
  t(119, 7, 4, 'cardio', 'Swimming', '60 min, 2000m', '4th of July swim'),
  t(120, 7, 7, 'lifting', 'Squats', '1x3 @ 395lbs', 'Close to 4 plates'),
  t(121, 7, 8, 'lifting', 'Deadlifts', '3x5 @ 415lbs', 'Volume at heavy weight'),
  t(122, 7, 9, 'cardio', 'Bike (outdoor)', '80 min, 22 miles', 'Long ride'),
  t(123, 7, 11, 'lifting', 'Bench Press', '4x5 @ 235lbs', 'Back to volume'),
  t(124, 7, 11, 'lifting', 'Incline Dumbbell Press', '3x10 @ 80lbs', 'Dumbbells up'),
  t(125, 7, 14, 'lifting', 'Overhead Press', '4x5 @ 165lbs', 'Steady'),
  t(126, 7, 15, 'cardio', 'Swimming', '55 min, 1700m', 'Afternoon swim'),
  t(127, 7, 16, 'lifting', 'Pull-ups', '4x12 weighted +50lbs', 'Strong'),
  t(128, 7, 18, 'lifting', 'Squats', '5x5 @ 385lbs', 'Consistent'),
  t(129, 7, 21, 'cardio', 'Running (outdoor)', '50 min, 5.5 miles', 'Early morning beat heat'),
  t(130, 7, 22, 'lifting', 'Barbell Rows', '4x8 @ 225lbs', 'Strong back'),
  t(131, 7, 23, 'lifting', 'Bench Press', '4x5 @ 235lbs', 'Solid'),
  t(132, 7, 25, 'lifting', 'Deadlifts', '3x5 @ 420lbs', 'Moving up'),
  t(133, 7, 28, 'cardio', 'Bike (outdoor)', '100 min, 28 miles', 'Century training'),
  t(134, 7, 29, 'lifting', 'Squats', '5x5 @ 390lbs', 'Almost there'),
  t(135, 7, 30, 'lifting', 'Overhead Press', '4x5 @ 170lbs', 'Progress'),

  // ============ AUGUST - Late summer push ============
  t(136, 8, 1, 'lifting', 'Bench Press', '4x5 @ 240lbs', 'August gains'),
  t(137, 8, 4, 'lifting', 'Squats', '1x3 @ 405lbs', 'FOUR PLATE SQUAT!'),
  t(138, 8, 4, 'lifting', 'Leg Press', '3x12 @ 630lbs', 'Celebration volume'),
  t(139, 8, 5, 'cardio', 'Swimming', '60 min, 2000m', 'Recovery swim'),
  t(140, 8, 6, 'lifting', 'Deadlifts', '1x1 @ 445lbs', 'Testing max'),
  t(141, 8, 8, 'cardio', 'Bike (outdoor)', '85 min, 24 miles', 'Good pace'),
  t(142, 8, 11, 'lifting', 'Overhead Press', '4x5 @ 170lbs', 'Shoulder day'),
  t(143, 8, 11, 'lifting', 'Lateral Raises', '3x15 @ 30lbs', 'Pump work'),
  t(144, 8, 12, 'cardio', 'Running (outdoor)', '55 min, 6 miles', 'Consistent'),
  t(145, 8, 13, 'lifting', 'Pull-ups', '5x12 weighted +50lbs', 'High rep'),
  t(146, 8, 15, 'lifting', 'Bench Press', '4x5 @ 240lbs', 'Feeling strong'),
  t(147, 8, 18, 'lifting', 'Barbell Rows', '4x8 @ 230lbs', 'Heavy rows'),
  t(148, 8, 19, 'cardio', 'Swimming', '50 min, 1600m', 'Easy swim'),
  t(149, 8, 20, 'lifting', 'Squats', '5x5 @ 395lbs', 'Volume after PR'),
  t(150, 8, 22, 'lifting', 'Deadlifts', '3x5 @ 425lbs', 'Back to work'),
  t(151, 8, 25, 'cardio', 'Bike (outdoor)', '95 min, 26 miles', 'Long ride'),
  t(152, 8, 26, 'lifting', 'Overhead Press', '4x5 @ 175lbs', 'Shoulders strong'),
  t(153, 8, 27, 'lifting', 'Bench Press', '4x5 @ 240lbs', 'Consistent'),
  t(154, 8, 29, 'lifting', 'Front Squats', '4x6 @ 255lbs', 'Getting heavy'),

  // ============ SEPTEMBER - Fall grind ============
  t(155, 9, 2, 'lifting', 'Squats', '5x5 @ 405lbs', '4 plates for reps!'),
  t(156, 9, 3, 'cardio', 'Running (outdoor)', '60 min, 6.5 miles', 'Fall weather'),
  t(157, 9, 4, 'lifting', 'Bench Press', '4x5 @ 240lbs', 'Maintaining'),
  t(158, 9, 5, 'lifting', 'Deadlifts', '3x5 @ 430lbs', 'Moving up'),
  t(159, 9, 8, 'lifting', 'Overhead Press', '4x5 @ 175lbs', 'Solid'),
  t(160, 9, 8, 'lifting', 'Face Pulls', '3x20 @ 60lbs', 'Rear delts'),
  t(161, 9, 9, 'cardio', 'Bike (outdoor)', '75 min, 20 miles', 'Beautiful day'),
  t(162, 9, 10, 'lifting', 'Barbell Rows', '4x8 @ 230lbs', 'Heavy'),
  t(163, 9, 12, 'lifting', 'Squats', '5x5 @ 405lbs', 'Consistent'),
  t(164, 9, 15, 'cardio', 'Running (outdoor)', '65 min, 7 miles', 'Long run'),
  t(165, 9, 16, 'lifting', 'Bench Press', '3x3 @ 250lbs', 'Heavy day'),
  t(166, 9, 17, 'lifting', 'Pull-ups', '5x10 weighted +55lbs', 'Added weight'),
  t(167, 9, 19, 'lifting', 'Deadlifts', '3x5 @ 435lbs', 'Strong'),
  t(168, 9, 22, 'lifting', 'Overhead Press', '3x3 @ 185lbs', 'Testing strength'),
  t(169, 9, 23, 'cardio', 'Rowing Machine', '30 min, 6500m', 'Back to indoor'),
  t(170, 9, 24, 'lifting', 'Squats', '5x5 @ 405lbs', 'Four plates consistent'),
  t(171, 9, 26, 'lifting', 'Bench Press', '4x5 @ 245lbs', 'Progress'),
  t(172, 9, 29, 'cardio', 'Stairmaster', '35 min, level 12', 'Fall cardio'),
  t(173, 9, 30, 'lifting', 'Romanian Deadlifts', '3x10 @ 225lbs', 'Hamstrings'),

  // ============ OCTOBER - Strength phase ============
  t(174, 10, 1, 'lifting', 'Deadlifts', '1x3 @ 455lbs', 'New 3RM PR!'),
  t(175, 10, 2, 'cardio', 'Rowing Machine', '35 min, 7200m', 'Strong row'),
  t(176, 10, 3, 'lifting', 'Bench Press', '4x5 @ 245lbs', 'Volume'),
  t(177, 10, 6, 'lifting', 'Squats', '5x5 @ 405lbs', 'Consistent'),
  t(178, 10, 7, 'cardio', 'Treadmill', '40 min, 4 miles', 'Rainy day'),
  t(179, 10, 8, 'lifting', 'Overhead Press', '4x5 @ 175lbs', 'Solid'),
  t(180, 10, 10, 'lifting', 'Barbell Rows', '4x6 @ 235lbs', 'Heavy rows'),
  t(181, 10, 13, 'lifting', 'Bench Press', '1x3 @ 255lbs', 'Testing strength'),
  t(182, 10, 13, 'lifting', 'Incline Bench Press', '3x8 @ 195lbs', null),
  t(183, 10, 14, 'cardio', 'Stairmaster', '40 min, level 11', 'Endurance'),
  t(184, 10, 15, 'lifting', 'Deadlifts', '3x5 @ 435lbs', 'Volume work'),
  t(185, 10, 17, 'lifting', 'Squats', '3x3 @ 425lbs', 'Heavy triples'),
  t(186, 10, 20, 'lifting', 'Pull-ups', '5x8 weighted +60lbs', 'Progression'),
  t(187, 10, 21, 'cardio', 'Rowing Machine', '30 min, 6300m', 'Steady state'),
  t(188, 10, 22, 'lifting', 'Overhead Press', '3x3 @ 185lbs', 'Heavy press'),
  t(189, 10, 24, 'lifting', 'Bench Press', '4x5 @ 245lbs', 'Back to volume'),
  t(190, 10, 27, 'lifting', 'Deadlifts', '3x5 @ 445lbs', 'Moving up'),
  t(191, 10, 28, 'cardio', 'Treadmill (intervals)', '30 min, 8x45s sprints', 'HIIT'),
  t(192, 10, 29, 'lifting', 'Squats', '5x5 @ 410lbs', 'Solid'),
  t(193, 10, 31, 'cardio', 'Basketball', '90 min pickup', 'Halloween hoops'),

  // ============ NOVEMBER - Push through ============
  t(194, 11, 3, 'lifting', 'Bench Press', '4x5 @ 250lbs', 'November push'),
  t(195, 11, 4, 'cardio', 'Rowing Machine', '35 min, 7500m', 'PR pace'),
  t(196, 11, 5, 'lifting', 'Squats', '5x5 @ 415lbs', 'Consistent'),
  t(197, 11, 7, 'lifting', 'Deadlifts', '3x5 @ 450lbs', 'Strong pulls'),
  t(198, 11, 10, 'lifting', 'Overhead Press', '4x5 @ 180lbs', 'Progress'),
  t(199, 11, 10, 'lifting', 'Lateral Raises', '3x15 @ 35lbs', 'Heavier'),
  t(200, 11, 11, 'cardio', 'Treadmill', '45 min, 4.5 miles', 'Veterans day run'),
  t(201, 11, 12, 'lifting', 'Barbell Rows', '4x6 @ 240lbs', 'Back day'),
  t(202, 11, 14, 'lifting', 'Bench Press', '3x3 @ 260lbs', 'Heavy bench'),
  t(203, 11, 17, 'lifting', 'Squats', '3x3 @ 435lbs', 'Heavy squats'),
  t(204, 11, 18, 'cardio', 'Stairmaster', '45 min, level 11', 'Leg burner'),
  t(205, 11, 19, 'lifting', 'Pull-ups', '5x8 weighted +60lbs', 'Strong'),
  t(206, 11, 21, 'lifting', 'Deadlifts', '1x3 @ 465lbs', 'New PR!'),
  t(207, 11, 24, 'lifting', 'Overhead Press', '4x5 @ 180lbs', 'Maintaining'),
  t(208, 11, 25, 'cardio', 'Rowing Machine', '30 min, 6500m', 'Pre-holiday'),
  t(209, 11, 26, 'lifting', 'Bench Press', '4x5 @ 250lbs', 'Good session'),
  t(210, 11, 28, 'cardio', 'Treadmill', '60 min, 6 miles', 'Turkey trot'),

  // ============ DECEMBER - Year end strong ============
  t(211, 12, 1, 'lifting', 'Squats', '5x5 @ 425lbs', 'December gains'),
  t(212, 12, 2, 'cardio', 'Rowing Machine', '35 min, 7300m', 'Strong row'),
  t(213, 12, 3, 'lifting', 'Bench Press', '4x5 @ 250lbs', 'Consistent'),
  t(214, 12, 5, 'lifting', 'Deadlifts', '3x5 @ 455lbs', 'Heavy volume'),
  t(215, 12, 8, 'lifting', 'Overhead Press', '4x5 @ 185lbs', 'Shoulders'),
  t(216, 12, 8, 'lifting', 'Face Pulls', '3x20 @ 65lbs', 'Rear delts'),
  t(217, 12, 9, 'cardio', 'Stairmaster', '40 min, level 12', 'Cardio day'),
  t(218, 12, 10, 'lifting', 'Barbell Rows', '4x6 @ 245lbs', 'Heavy'),
  t(219, 12, 12, 'lifting', 'Squats', '3x3 @ 445lbs', 'Testing max'),
  t(220, 12, 15, 'lifting', 'Bench Press', '1x2 @ 265lbs', 'NEW PR!'),
  t(221, 12, 15, 'lifting', 'Close Grip Bench', '3x8 @ 205lbs', 'Accessory'),
  t(222, 12, 16, 'cardio', 'Treadmill', '50 min, 5 miles', 'Winter cardio'),
  t(223, 12, 17, 'lifting', 'Pull-ups', '5x8 weighted +65lbs', 'Strong'),
  t(224, 12, 19, 'lifting', 'Deadlifts', '3x5 @ 455lbs', 'Solid'),
  t(225, 12, 22, 'lifting', 'Overhead Press', '3x3 @ 190lbs', 'Testing'),
  t(226, 12, 23, 'cardio', 'Rowing Machine', '30 min, 6400m', 'Pre-holiday'),
  t(227, 12, 26, 'lifting', 'Squats', '5x5 @ 425lbs', 'Post-Christmas'),
  t(228, 12, 29, 'lifting', 'Bench Press', '4x5 @ 255lbs', 'Building'),
  t(229, 12, 30, 'cardio', 'Stairmaster', '45 min, level 12', 'Year end push'),
  t(230, 12, 31, 'lifting', 'Deadlifts', '1x1 @ 485lbs', 'NYE PR attempt - chasing 500!'),
];

// Get a fresh copy of demo entries with dynamically computed dates
export function getInitialDemoEntries(): ExerciseEntry[] {
  resetDemoId();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-12

  return DEMO_ENTRY_TEMPLATES.map((template) => {
    // If template month is after current month, use previous year
    // This ensures we always show trailing 12 months of data
    const year = template.month > currentMonth ? currentYear - 1 : currentYear;
    const dateStr = `${year}-${String(template.month).padStart(2, '0')}-${String(template.day).padStart(2, '0')}`;

    return {
      id: template.id,
      exercise_date: dateStr,
      category: template.category,
      sub_exercise: template.sub_exercise,
      notes_quantitative: template.notes_quantitative,
      notes_qualitative: template.notes_qualitative,
      created_at: `${dateStr}T10:00:00Z`,
    };
  });
}

// Demo exercise metadata with target associations
export const DEMO_EXERCISE_METADATA: ExerciseMetadata[] = [
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
