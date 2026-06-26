// Shared school data used by both Schools and Students pages

export type SchoolType = 'Government' | 'Private' | 'Semi-Government';
export type TypeFilter  = 'all' | SchoolType;
export type Level    = { total: number; male: number; female: number };
export type GradeRow = { grade: string; male: number; female: number; total: number };

export type TeacherSubject = { subject: string; count: number; male: number; female: number };
export type TeacherDetails = {
  total: number; male: number; female: number;
  levels: { primary: Level; secondary: Level; advanced: Level };
  subjects: TeacherSubject[];
};

export type GenderType = 'Boys' | 'Girls' | 'Mixed';

export type School = {
  id: string; name: string; initials: string;
  isKV?: boolean; logoBg?: string; logoColor?: string;
  type: SchoolType; typeBadge: string;
  gender: GenderType;
  location: string; district: string; province: string;
  address: string;
  established: number;
  registrationNo: string;
  classes: number;
  principal: string; contact: string; email: string; website: string;
  students: {
    total: number; male: number; female: number;
    levels: { primary: Level; secondary: Level; advanced: Level };
    grades: GradeRow[];
  };
  teachers: number;
  teachersPresent: number;
  teacherDetails: TeacherDetails;
  attendance: Record<string, number>;
};

export const TODAY    = new Date().toISOString().split('T')[0];
export const MIN_DATE = (() => { const d = new Date(); d.setDate(d.getDate() - 30); return d.toISOString().split('T')[0]; })();

export function buildAttendance(idx: number, basePresent: number, total: number): Record<string, number> {
  const map: Record<string, number> = {};
  const base = new Date();
  for (let i = 0; i <= 30; i++) {
    const d = new Date(base); d.setDate(d.getDate() - i);
    map[d.toISOString().split('T')[0]] = i === 0
      ? basePresent
      : Math.round(total * (0.82 + (((idx * 11 + i * 7) % 15) / 100)));
  }
  return map;
}

export function makeGrades(p: Level, s: Level, a: Level): GradeRow[] {
  const rows: GradeRow[] = [];
  const split = (level: Level, count: number, startGrade: number) => {
    const tEach = Math.floor(level.total / count);
    const mEach = Math.floor(level.male  / count);
    for (let i = 0; i < count; i++) {
      const isLast = i === count - 1;
      const t = isLast ? level.total - tEach * (count - 1) : tEach;
      const m = isLast ? level.male  - mEach * (count - 1) : mEach;
      rows.push({ grade: `G${startGrade + i}`, male: m, female: t - m, total: t });
    }
  };
  split(p, 5,  1);
  split(s, 6,  6);
  split(a, 2, 12);
  return rows;
}

export function makeTeachers(
  total: number, male: number,
  pRatio: number, sRatio: number,        // primary & secondary share of total (advanced = remainder)
  subjectList: [string, number, number][], // [subject, count, maleCount]
): TeacherDetails {
  const female = total - male;
  const pTotal = Math.round(total * pRatio);
  const sTotal = Math.round(total * sRatio);
  const aTotal = total - pTotal - sTotal;
  const pMale  = Math.round(male * pRatio);
  const sMale  = Math.round(male * sRatio);
  const aMale  = male - pMale - sMale;
  return {
    total, male, female,
    levels: {
      primary:   { total: pTotal, male: pMale,  female: pTotal - pMale  },
      secondary: { total: sTotal, male: sMale,  female: sTotal - sMale  },
      advanced:  { total: aTotal, male: aMale,  female: aTotal - aMale  },
    },
    subjects: subjectList.map(([subject, count, mc]) => ({ subject, count, male: mc, female: count - mc })),
  };
}

export const schools: School[] = [
  {
    id: 'SCH001', name: 'Kalutara Vidyalaya', initials: 'KV', isKV: true,
    type: 'Government', typeBadge: 'bg-blue-100 text-blue-700', gender: 'Mixed',
    location: 'Kalutara', district: 'Kalutara', province: 'Western',
    address: '123, Galle Road, Kalutara South, Kalutara',
    established: 1952, registrationNo: 'MOE-WP-KAL-001', classes: 42,
    principal: 'Mr. D. R. Jayasuriya', contact: '+94 34 222 1234',
    email: 'info@kalutaravidyalaya.edu.lk', website: 'www.kalutaravidyalaya.edu.lk',
    students: (() => {
      const p = { total: 450, male: 235, female: 215 };
      const s = { total: 720, male: 370, female: 350 };
      const a = { total: 280, male: 145, female: 135 };
      return { total: 1450, male: 750, female: 700, levels: { primary: p, secondary: s, advanced: a }, grades: makeGrades(p, s, a) };
    })(),
    teachers: 120,
    teachersPresent: 113,
    teacherDetails: makeTeachers(120, 58, 0.28, 0.50, [
      ['Mathematics', 14, 8], ['Science', 12, 7], ['Sinhala', 11, 4],
      ['English', 10, 4],     ['History', 8, 3],  ['Religion', 7, 3],
      ['Arts', 6, 2],         ['Physical Ed.', 6, 5], ['ICT', 5, 3], ['Commerce', 5, 2],
      ['Geography', 5, 2],    ['Music', 4, 1],    ['Home Science', 4, 0], ['Tamil', 3, 1],
    ]),
    attendance: buildAttendance(0, 1370, 1450),
  },
  {
    id: 'SCH002', name: 'Colombo Central School', initials: 'CCS', logoBg: 'bg-emerald-100', logoColor: 'text-emerald-700',
    type: 'Government', typeBadge: 'bg-blue-100 text-blue-700', gender: 'Boys',
    location: 'Colombo 07', district: 'Colombo', province: 'Western',
    address: '15, Ward Place, Colombo 07',
    established: 1945, registrationNo: 'MOE-WP-COL-002', classes: 63,
    principal: 'Ms. S. A. Perera', contact: '+94 11 269 5678',
    email: 'admin@colombocentral.edu.lk', website: 'www.colombocentral.edu.lk',
    students: (() => {
      const p = { total: 650,  male: 330, female: 320 };
      const s = { total: 1050, male: 530, female: 520 };
      const a = { total: 400,  male: 190, female: 210 };
      return { total: 2100, male: 1050, female: 1050, levels: { primary: p, secondary: s, advanced: a }, grades: makeGrades(p, s, a) };
    })(),
    teachers: 180,
    teachersPresent: 168,
    teacherDetails: makeTeachers(180, 82, 0.30, 0.48, [
      ['Mathematics', 20, 12], ['Science', 18, 10], ['English', 16, 6],
      ['Sinhala', 14, 5],      ['History', 12, 5],  ['Commerce', 12, 7],
      ['ICT', 10, 6],          ['Geography', 10, 4], ['Physical Ed.', 10, 8],
      ['Religion', 9, 3],      ['Arts', 8, 2],       ['Music', 6, 2],
      ['Home Science', 6, 0],  ['Tamil', 5, 2],      ['Biology', 5, 3],
      ['Chemistry', 4, 2],     ['Physics', 4, 3],    ['Drama', 4, 1],
      ['Economics', 4, 3],     ['Accounting', 3, 2],
    ]),
    attendance: buildAttendance(1, 1980, 2100),
  },
  {
    id: 'SCH003', name: 'Galle International Academy', initials: 'GIA', logoBg: 'bg-violet-100', logoColor: 'text-violet-700',
    type: 'Private', typeBadge: 'bg-violet-100 text-violet-700', gender: 'Mixed',
    location: 'Galle', district: 'Galle', province: 'Southern',
    address: '45, Closenberg Road, Galle',
    established: 1998, registrationNo: 'MOE-SP-GAL-003', classes: 28,
    principal: 'Mr. K. P. Fernando', contact: '+94 91 222 9012',
    email: 'info@galleacademy.edu.lk', website: 'www.galleacademy.edu.lk',
    students: (() => {
      const p = { total: 280, male: 135, female: 145 };
      const s = { total: 420, male: 205, female: 215 };
      const a = { total: 150, male: 80,  female: 70  };
      return { total: 850, male: 420, female: 430, levels: { primary: p, secondary: s, advanced: a }, grades: makeGrades(p, s, a) };
    })(),
    teachers: 90,
    teachersPresent: 85,
    teacherDetails: makeTeachers(90, 38, 0.26, 0.50, [
      ['Mathematics', 10, 5], ['Science', 9, 5],  ['English', 10, 4],
      ['Sinhala', 8, 3],      ['Tamil', 6, 2],    ['History', 7, 2],
      ['ICT', 8, 5],          ['Commerce', 7, 4], ['Arts', 6, 2],
      ['Physical Ed.', 6, 4], ['Religion', 5, 1], ['Music', 4, 1],
      ['Home Science', 4, 0],
    ]),
    attendance: buildAttendance(2, 820, 850),
  },
  {
    id: 'SCH004', name: 'Kandy Heritage School', initials: 'KHS', logoBg: 'bg-amber-100', logoColor: 'text-amber-700',
    type: 'Semi-Government', typeBadge: 'bg-amber-100 text-amber-700', gender: 'Girls',
    location: 'Kandy', district: 'Kandy', province: 'Central',
    address: '78, Peradeniya Road, Kandy',
    established: 1967, registrationNo: 'MOE-CP-KAN-004', classes: 36,
    principal: 'Mrs. R. M. Silva', contact: '+94 81 222 3456',
    email: 'contact@kandyheritage.edu.lk', website: 'www.kandyheritage.edu.lk',
    students: (() => {
      const p = { total: 380, male: 190, female: 190 };
      const s = { total: 600, male: 300, female: 300 };
      const a = { total: 220, male: 110, female: 110 };
      return { total: 1200, male: 600, female: 600, levels: { primary: p, secondary: s, advanced: a }, grades: makeGrades(p, s, a) };
    })(),
    teachers: 105,
    teachersPresent: 98,
    teacherDetails: makeTeachers(105, 46, 0.27, 0.50, [
      ['Mathematics', 12, 7], ['Science', 11, 6],  ['Sinhala', 10, 3],
      ['English', 9, 3],      ['History', 8, 3],   ['Religion', 7, 2],
      ['Commerce', 8, 5],     ['ICT', 7, 4],       ['Arts', 6, 2],
      ['Physical Ed.', 7, 5], ['Geography', 6, 2], ['Music', 5, 1],
      ['Home Science', 5, 0], ['Tamil', 4, 1],
    ]),
    attendance: buildAttendance(3, 1100, 1200),
  },
  {
    id: 'SCH005', name: 'Jaffna Model School', initials: 'JMS', logoBg: 'bg-rose-100', logoColor: 'text-rose-700',
    type: 'Government', typeBadge: 'bg-blue-100 text-blue-700', gender: 'Boys',
    location: 'Jaffna', district: 'Jaffna', province: 'Northern',
    address: '22, Hospital Road, Jaffna',
    established: 1959, registrationNo: 'MOE-NP-JAF-005', classes: 31,
    principal: 'Mr. T. Balasingham', contact: '+94 21 222 7890',
    email: 'info@jaffnamodel.edu.lk', website: 'www.jaffnamodel.edu.lk',
    students: (() => {
      const p = { total: 310, male: 155, female: 155 };
      const s = { total: 490, male: 255, female: 235 };
      const a = { total: 180, male: 90,  female: 90  };
      return { total: 980, male: 500, female: 480, levels: { primary: p, secondary: s, advanced: a }, grades: makeGrades(p, s, a) };
    })(),
    teachers: 88,
    teachersPresent: 82,
    teacherDetails: makeTeachers(88, 40, 0.27, 0.50, [
      ['Mathematics', 10, 6], ['Science', 9, 5],  ['Tamil', 10, 3],
      ['English', 9, 3],      ['History', 7, 3],  ['Religion', 7, 2],
      ['Commerce', 7, 4],     ['ICT', 6, 4],      ['Arts', 5, 1],
      ['Physical Ed.', 6, 4], ['Geography', 5, 2],['Music', 4, 1],
      ['Home Science', 4, 0],
    ]),
    attendance: buildAttendance(4, 930, 980),
  },
];

export const ALL_DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara',
  'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota',
  'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu',
  'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam',
  'Anuradhapura', 'Polonnaruwa',
  'Badulla', 'Monaragala',
  'Ratnapura', 'Kegalle',
].sort();

export const TYPE_FILTERS: { label: string; value: TypeFilter }[] = [
  { label: 'All',             value: 'all'             },
  { label: 'Government',      value: 'Government'      },
  { label: 'Private',         value: 'Private'         },
  { label: 'Semi-Government', value: 'Semi-Government' },
];
