export type ClassCategorySlug = 'primary' | 'secondary' | 'advanced';

export type ClassGroup = {
  slug: string;
  label: string;
  subtitle: string;
  teacher: string;
  studentCount: number;
  homeworkCount: number;
  marksAverage: number;
  subjects: string[];
  accent: string;
};

export type StudentProfileCard = {
  name: string;
  id: string;
  rollNo: string;
  photo: string;
  attendance: string;
  remark: string;
};

export type HomeworkItem = {
  title: string;
  subject: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Reviewed';
};

export type MarkRow = {
  student: string;
  subjects: Record<string, number>;
  average: number;
};

export type ClassDetails = {
  category: ClassCategorySlug;
  slug: string;
  label: string;
  teacher: string;
  monitor: string;
  viceMonitor: string;
  totalStudents: number;
  activeStudents: number;
  absentStudents: number;
  timetable: Array<{
    period: string;
    time: string;
    subject: string;
    teacher: string;
  }>;
  teachers: Array<{
    subject: string;
    teacher: string;
  }>;
  subjects: string[];
  homework: HomeworkItem[];
  marks: MarkRow[];
  students: StudentProfileCard[];
};

export type GradeHub = {
  gradeSlug: string;
  gradeLabel: string;
  monitor: string;
  timetable: Array<{
    period: string;
    time: string;
    subject: string;
    teacher: string;
  }>;
  teachers: Array<{
    subject: string;
    teacher: string;
  }>;
  subjects: string[];
  sections: Array<{
    slug: string;
    label: string;
    classTeacher: string;
    studentCount: number;
    activeStudents: number;
    absentStudents: number;
  }>;
  accent: string;
};

export type SectionHomework = {
  subject: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Reviewed';
};

export type SectionTimetableSlot = {
  period: string;
  time: string;
  subject: string;
  teacher: string;
};

export type SectionTimetableDay = {
  day: string;
  slots: SectionTimetableSlot[];
};

export type SectionHomeworkDateGroup = {
  date: string;
  items: SectionHomework[];
};

export type SectionAttendanceStudent = {
  name: string;
  rollNo: string;
  photo: string;
};

export type SectionAttendanceRecord = {
  date: string;
  present: SectionAttendanceStudent[];
  absent: SectionAttendanceStudent[];
};

export type SectionMarkRow = {
  student: string;
  terms: {
    term1: number;
    term2: number;
    term3: number;
  };
  average: number;
};

export type SectionDetails = {
  gradeSlug: string;
  sectionSlug: string;
  label: string;
  gradeLabel: string;
  classTeacher: string;
  classTeacherId: string;
  classTeacherPhoto: string;
  monitor: string;
  viceMonitor: string;
  totalStudents: number;
  activeStudents: number;
  absentStudents: number;
  weeklyTimetable: SectionTimetableDay[];
  teachers: Array<{
    subject: string;
    teacher: string;
  }>;
  subjects: string[];
  homeworkByDate: SectionHomeworkDateGroup[];
  marks: SectionMarkRow[];
  students: StudentProfileCard[];
  attendanceRecords: SectionAttendanceRecord[];
};

export const categoryCards: Array<{
  slug: ClassCategorySlug;
  label: string;
  range: string;
  description: string;
  accent: string;
}> = [
  {
    slug: 'primary',
    label: 'Primary',
    range: 'Grades 1-5',
    description: 'Foundation classes for younger learners.',
    accent: 'from-sky-500 to-cyan-500',
  },
  {
    slug: 'secondary',
    label: 'Secondary',
    range: 'Grades 6-11',
    description: 'Middle and upper school classes with full subject coverage.',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    slug: 'advanced',
    label: 'Advanced',
    range: 'Science, Commerce, Art, Technology',
    description: 'Stream-based classes for advanced level study.',
    accent: 'from-amber-500 to-orange-500',
  },
];

const sampleStudents = [
  { name: 'Ayesha Perera', attendance: '98%', remark: 'Top performer' },
  { name: 'Kasun Silva', attendance: '96%', remark: 'Strong in class work' },
  { name: 'Nimal Fernando', attendance: '99%', remark: 'Excellent discipline' },
  { name: 'Samantha Jayasuriya', attendance: '95%', remark: 'Good leadership' },
  { name: 'Dilshan Perera', attendance: '97%', remark: 'Consistent progress' },
  { name: 'Ishara Gunasekara', attendance: '94%', remark: 'Needs homework follow-up' },
];

function buildHomework(label: string, subjects: string[]): HomeworkItem[] {
  return [
    { title: `${label} workbook exercise`, subject: subjects[0], dueDate: 'Mon', status: 'Reviewed' },
    { title: `${label} reading reflection`, subject: subjects[1] ?? subjects[0], dueDate: 'Wed', status: 'Submitted' },
    { title: `${label} short quiz preparation`, subject: subjects[2] ?? subjects[0], dueDate: 'Fri', status: 'Pending' },
  ];
}

function buildMarks(subjects: string[], seed: number): MarkRow[] {
  return sampleStudents.slice(0, 5).map((student, index) => {
    const subjectMarks = subjects.reduce<Record<string, number>>((result, subject, subjectIndex) => {
      result[subject] = 72 + ((seed + index * 3 + subjectIndex * 5) % 23);
      return result;
    }, {});

    const values = Object.values(subjectMarks);
    const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);

    return {
      student: student.name,
      subjects: subjectMarks,
      average,
    };
  });
}

function buildStudents(label: string): StudentProfileCard[] {
  return sampleStudents.slice(0, 5).map((student, index) => ({
    name: student.name,
    id: `${label}-${index + 1}`.toUpperCase(),
    rollNo: `${index + 1}`,
    photo: '/assets/profile.jpg',
    attendance: student.attendance,
    remark: student.remark,
  }));
}

function buildWeeklyTimetable(subjects: string[]): SectionTimetableDay[] {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['07:30 - 08:15', '08:15 - 09:00', '09:00 - 09:45', '09:45 - 10:30', '10:30 - 11:15', '11:15 - 12:00', '12:00 - 12:45', '12:45 - 01:30'];
  const teacherNames = ['Ms. Nadeesha Silva', 'Mr. Ruwan Perera', 'Ms. Ishara Fernando', 'Mr. Kasun Jayasuriya', 'Ms. Dilani Senanayake'];

  return days.map((day, dayIndex) => ({
    day,
    slots: times.map((time, periodIndex) => {
      const subject = subjects[(periodIndex + dayIndex) % subjects.length];
      return {
        period: `${periodIndex + 1}`,
        time,
        subject,
        teacher: teacherNames[(periodIndex + dayIndex) % teacherNames.length],
      };
    }),
  }));
}

function buildHomeworkByDate(gradeLabel: string, sectionLabel: string, subjects: string[]): SectionHomeworkDateGroup[] {
  const dates = ['2026-06-18', '2026-06-17', '2026-06-16', '2026-06-15'];

  return dates.map((date, dateIndex) => ({
    date,
    items: subjects.slice(0, 3).map((subject, index) => ({
      subject,
      title: `${gradeLabel} ${sectionLabel} ${subject} homework ${dateIndex + 1}`,
      dueDate: date,
      status: index === 0 ? 'Reviewed' : index === 1 ? 'Submitted' : 'Pending',
    })),
  }));
}

function buildAttendanceRecords(sectionLabel: string): SectionAttendanceRecord[] {
  const dates = ['2026-06-18', '2026-06-17', '2026-06-16', '2026-06-15', '2026-06-14'];

  return dates.map((date, dateIndex) => {
    const rotatedStudents = [...sampleStudents.slice(0, 5)];
    const offset = dateIndex % rotatedStudents.length;
    const orderedStudents = [...rotatedStudents.slice(offset), ...rotatedStudents.slice(0, offset)];
    const present = orderedStudents.slice(0, 4).map((student, index) => ({
      name: `${student.name} ${sectionLabel}`,
      rollNo: `${index + 1}`,
      photo: '/assets/profile.jpg',
    }));
    const absent = orderedStudents.slice(4, 5).map((student, index) => ({
      name: `${student.name} ${sectionLabel}`,
      rollNo: `${index + 5}`,
      photo: '/assets/profile.jpg',
    }));

    return { date, present, absent };
  });
}

function buildGroup(category: ClassCategorySlug, slug: string, label: string, teacher: string, subjects: string[], accent: string): ClassDetails {
  const timetable = subjects.slice(0, 5).map((subject, index) => ({
    period: `${index + 1}`,
    time: `0${7 + index}:30 - 0${8 + index}:10`,
    subject,
    teacher: ['Ms. Nadeesha Silva', 'Mr. Ruwan Perera', 'Ms. Ishara Fernando', 'Mr. Kasun Jayasuriya', 'Ms. Dilani Senanayake'][index % 5],
  }));

  const teachers = subjects.map((subject, index) => ({
    subject,
    teacher: ['Ms. Nadeesha Silva', 'Mr. Ruwan Perera', 'Ms. Ishara Fernando', 'Mr. Kasun Jayasuriya', 'Ms. Dilani Senanayake'][index % 5],
  }));

  const totalStudents = 35 + slug.length * 2;
  const activeStudents = totalStudents - 2;
  const absentStudents = 2;

  return {
    category,
    slug,
    label,
    teacher,
    monitor: `${label} Monitor`,
    viceMonitor: `${label} Vice Monitor`,
    totalStudents,
    activeStudents,
    absentStudents,
    timetable,
    teachers,
    subjects,
    homework: buildHomework(label, subjects),
    marks: buildMarks(subjects, label.length + slug.length),
    students: buildStudents(label),
  };
}

const primarySubjects = ['Sinhala', 'Mathematics', 'English'];
const secondarySubjects = ['Sinhala', 'Mathematics', 'Science', 'History'];
const advancedSubjectsMap: Record<string, string[]> = {
  science: ['Physics', 'Chemistry', 'Combined Mathematics', 'Biology'],
  commerce: ['Accounting', 'Business Studies', 'Economics', 'ICT'],
  art: ['Sinhala', 'History', 'Art', 'Drama'],
  technology: ['Engineering Technology', 'Science for Technology', 'ICT', 'Management'],
};

export const classGroupsByCategory: Record<ClassCategorySlug, ClassGroup[]> = {
  primary: [
    { slug: 'grade-1', label: 'Grade 1', subtitle: 'Primary', teacher: 'Ms. Nadeesha Silva', studentCount: 120, homeworkCount: 6, marksAverage: 88, subjects: primarySubjects, accent: 'from-sky-500 to-cyan-500' },
    { slug: 'grade-2', label: 'Grade 2', subtitle: 'Primary', teacher: 'Mr. Ruwan Perera', studentCount: 115, homeworkCount: 5, marksAverage: 87, subjects: primarySubjects, accent: 'from-sky-500 to-cyan-500' },
    { slug: 'grade-3', label: 'Grade 3', subtitle: 'Primary', teacher: 'Ms. Ishara Fernando', studentCount: 130, homeworkCount: 7, marksAverage: 89, subjects: primarySubjects, accent: 'from-sky-500 to-cyan-500' },
    { slug: 'grade-4', label: 'Grade 4', subtitle: 'Primary', teacher: 'Mr. Kasun Jayasuriya', studentCount: 110, homeworkCount: 5, marksAverage: 86, subjects: primarySubjects, accent: 'from-sky-500 to-cyan-500' },
    { slug: 'grade-5', label: 'Grade 5', subtitle: 'Primary', teacher: 'Ms. Dilani Senanayake', studentCount: 125, homeworkCount: 6, marksAverage: 90, subjects: primarySubjects, accent: 'from-sky-500 to-cyan-500' },
  ],
  secondary: [
    { slug: 'grade-6', label: 'Grade 6', subtitle: 'Secondary', teacher: 'Mr. Tharindu Wijesinghe', studentCount: 115, homeworkCount: 7, marksAverage: 84, subjects: secondarySubjects, accent: 'from-emerald-500 to-teal-500' },
    { slug: 'grade-7', label: 'Grade 7', subtitle: 'Secondary', teacher: 'Ms. Harsha Bandara', studentCount: 120, homeworkCount: 6, marksAverage: 85, subjects: secondarySubjects, accent: 'from-emerald-500 to-teal-500' },
    { slug: 'grade-8', label: 'Grade 8', subtitle: 'Secondary', teacher: 'Mr. Nimal Fernando', studentCount: 110, homeworkCount: 7, marksAverage: 83, subjects: secondarySubjects, accent: 'from-emerald-500 to-teal-500' },
    { slug: 'grade-9', label: 'Grade 9', subtitle: 'Secondary', teacher: 'Ms. Samantha Jayasuriya', studentCount: 120, homeworkCount: 8, marksAverage: 86, subjects: secondarySubjects, accent: 'from-emerald-500 to-teal-500' },
    { slug: 'grade-10', label: 'Grade 10', subtitle: 'Secondary', teacher: 'Mr. Sahan Medonsa', studentCount: 120, homeworkCount: 8, marksAverage: 87, subjects: secondarySubjects, accent: 'from-emerald-500 to-teal-500' },
    { slug: 'grade-11', label: 'Grade 11', subtitle: 'Secondary', teacher: 'Ms. Ruwanthi Senanayake', studentCount: 110, homeworkCount: 8, marksAverage: 85, subjects: secondarySubjects, accent: 'from-emerald-500 to-teal-500' },
  ],
  advanced: [
    { slug: 'science', label: 'Science Stream', subtitle: 'Advanced', teacher: 'Mr. Dilshan Perera', studentCount: 90, homeworkCount: 8, marksAverage: 88, subjects: advancedSubjectsMap.science, accent: 'from-amber-500 to-orange-500' },
    { slug: 'commerce', label: 'Commerce Stream', subtitle: 'Advanced', teacher: 'Ms. Nadeesha Herath', studentCount: 85, homeworkCount: 7, marksAverage: 87, subjects: advancedSubjectsMap.commerce, accent: 'from-amber-500 to-orange-500' },
    { slug: 'art', label: 'Art Stream', subtitle: 'Advanced', teacher: 'Ms. Ruwanthi Senanayake', studentCount: 70, homeworkCount: 5, marksAverage: 84, subjects: advancedSubjectsMap.art, accent: 'from-amber-500 to-orange-500' },
    { slug: 'technology', label: 'Technology Stream', subtitle: 'Advanced', teacher: 'Mr. Harindu Perera', studentCount: 75, homeworkCount: 6, marksAverage: 86, subjects: advancedSubjectsMap.technology, accent: 'from-amber-500 to-orange-500' },
  ],
};

export const classDetailsMap: Record<ClassCategorySlug, Record<string, ClassDetails>> = {
  primary: Object.fromEntries(
    classGroupsByCategory.primary.map((group) => [
      group.slug,
      buildGroup('primary', group.slug, group.label, group.teacher, group.subjects, group.accent),
    ])
  ) as Record<string, ClassDetails>,
  secondary: Object.fromEntries(
    classGroupsByCategory.secondary.map((group) => [
      group.slug,
      buildGroup('secondary', group.slug, group.label, group.teacher, group.subjects, group.accent),
    ])
  ) as Record<string, ClassDetails>,
  advanced: Object.fromEntries(
    classGroupsByCategory.advanced.map((group) => [
      group.slug,
      buildGroup('advanced', group.slug, group.label, group.teacher, group.subjects, group.accent),
    ])
  ) as Record<string, ClassDetails>,
};

export const classCategoryLabels: Record<ClassCategorySlug, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  advanced: 'Advanced',
};

const secondaryGradeMeta = [
  {
    gradeSlug: 'grade-6',
    gradeLabel: 'Grade 6',
    monitor: 'Ayesh Fernando',
    classTeacher: 'Mr. Tharindu Wijesinghe',
    subjects: ['Sinhala', 'Mathematics', 'Science', 'History', 'English'],
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    gradeSlug: 'grade-7',
    gradeLabel: 'Grade 7',
    monitor: 'Sithum Perera',
    classTeacher: 'Ms. Harsha Bandara',
    subjects: ['Sinhala', 'Mathematics', 'Science', 'History', 'English'],
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    gradeSlug: 'grade-8',
    gradeLabel: 'Grade 8',
    monitor: 'Mihiran Silva',
    classTeacher: 'Mr. Nimal Fernando',
    subjects: ['Sinhala', 'Mathematics', 'Science', 'History', 'ICT'],
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    gradeSlug: 'grade-9',
    gradeLabel: 'Grade 9',
    monitor: 'Pasindu Jayasuriya',
    classTeacher: 'Ms. Samantha Jayasuriya',
    subjects: ['Sinhala', 'Mathematics', 'Science', 'Geography', 'English'],
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    gradeSlug: 'grade-10',
    gradeLabel: 'Grade 10',
    monitor: 'Nethmi Perera',
    classTeacher: 'Mr. Sahan Medonsa',
    subjects: ['Sinhala', 'Mathematics', 'Science', 'Commerce', 'English'],
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    gradeSlug: 'grade-11',
    gradeLabel: 'Grade 11',
    monitor: 'Yasiru Fernando',
    classTeacher: 'Ms. Ruwanthi Senanayake',
    subjects: ['Sinhala', 'Mathematics', 'Science', 'History', 'ICT'],
    accent: 'from-emerald-500 to-teal-500',
  },
];

export const secondaryGradeHubs: GradeHub[] = secondaryGradeMeta.map((meta) => ({
  gradeSlug: meta.gradeSlug,
  gradeLabel: meta.gradeLabel,
  monitor: meta.monitor,
  teachers: meta.subjects.map((subject, index) => ({
    subject,
    teacher: ['Ms. Nadeesha Silva', 'Mr. Ruwan Perera', 'Ms. Ishara Fernando', 'Mr. Kasun Jayasuriya', 'Ms. Dilani Senanayake'][index % 5],
  })),
  timetable: [
    { period: '1', time: '07:30 - 08:10', subject: meta.subjects[0], teacher: 'Ms. Nadeesha Silva' },
    { period: '2', time: '08:10 - 08:50', subject: meta.subjects[1], teacher: 'Mr. Ruwan Perera' },
    { period: '3', time: '08:50 - 09:30', subject: meta.subjects[2], teacher: 'Ms. Ishara Fernando' },
    { period: '4', time: '09:45 - 10:25', subject: meta.subjects[3], teacher: 'Mr. Kasun Jayasuriya' },
    { period: '5', time: '10:25 - 11:05', subject: meta.subjects[4], teacher: 'Ms. Dilani Senanayake' },
  ],
  subjects: meta.subjects,
  sections: ['A', 'B', 'C'].map((section, index) => ({
    slug: `${meta.gradeSlug.replace('grade-', '')}${section.toLowerCase()}`,
    label: `${meta.gradeLabel.replace('Grade ', '')}${section}`,
    classTeacher: meta.classTeacher,
    studentCount: 38 + index * 2,
    activeStudents: 36 + index * 2,
    absentStudents: 2,
  })),
  accent: meta.accent,
}));

function buildSectionHomework(gradeLabel: string, sectionLabel: string, subjects: string[]): SectionHomework[] {
  return subjects.map((subject, index) => ({
    subject,
    title: `${gradeLabel} ${sectionLabel} ${subject} homework`,
    dueDate: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][index % 5],
    status: index === 0 ? 'Reviewed' : index === 1 ? 'Submitted' : 'Pending',
  }));
}

function buildSectionMarks(subjects: string[], seed: number): SectionMarkRow[] {
  return sampleStudents.slice(0, 5).map((student, index) => {
    const term1 = 70 + ((seed + index * 2) % 25);
    const term2 = 72 + ((seed + index * 3) % 23);
    const term3 = 74 + ((seed + index * 4) % 21);
    const average = Math.round((term1 + term2 + term3) / 3);

    return {
      student: student.name,
      terms: { term1, term2, term3 },
      average,
    };
  });
}

function buildSectionStudents(gradeLabel: string, sectionLabel: string): StudentProfileCard[] {
  return sampleStudents.slice(0, 5).map((student, index) => ({
    name: `${student.name} ${sectionLabel}`,
    id: `${gradeLabel}-${sectionLabel}-${index + 1}`.toUpperCase(),
    rollNo: `${index + 1}`,
    photo: '/assets/profile.jpg',
    attendance: student.attendance,
    remark: student.remark,
  }));
}

export const secondarySectionDetailsMap: Record<string, SectionDetails> = Object.fromEntries(
  secondaryGradeHubs.flatMap((hub) =>
    hub.sections.map((section) => {
      const sectionLabel = section.label;
      const subjects = hub.subjects;
      const classKey = `${hub.gradeSlug}/${section.slug}`;

      return [
        classKey,
        {
          gradeSlug: hub.gradeSlug,
          sectionSlug: section.slug,
          label: `${hub.gradeLabel} ${sectionLabel}`,
          gradeLabel: hub.gradeLabel,
          classTeacher: hub.sections[0].classTeacher,
          classTeacherId: 'TCH-0085',
          classTeacherPhoto: '/assets/profile.jpg',
          monitor: hub.monitor,
          viceMonitor: `${hub.gradeLabel} Vice Monitor`,
          totalStudents: section.studentCount,
          activeStudents: section.activeStudents,
          absentStudents: section.absentStudents,
          weeklyTimetable: buildWeeklyTimetable(subjects),
          teachers: hub.teachers,
          subjects,
          homeworkByDate: buildHomeworkByDate(hub.gradeLabel, sectionLabel, subjects),
          marks: buildSectionMarks(subjects, sectionLabel.charCodeAt(1)),
          students: buildSectionStudents(hub.gradeLabel, sectionLabel),
          attendanceRecords: buildAttendanceRecords(sectionLabel),
        },
      ];
    })
  )
) as Record<string, SectionDetails>;

// ─── Primary Grade Hubs ────────────────────────────────────────────────────

const primaryGradeMeta = [
  { gradeSlug: 'grade-1', gradeLabel: 'Grade 1', monitor: 'Sithum Perera', classTeacher: 'Ms. Nadeesha Silva', subjects: ['Sinhala', 'Mathematics', 'English'], accent: 'from-sky-500 to-blue-500' },
  { gradeSlug: 'grade-2', gradeLabel: 'Grade 2', monitor: 'Chamara Fernando', classTeacher: 'Mr. Ruwan Perera', subjects: ['Sinhala', 'Mathematics', 'English'], accent: 'from-blue-500 to-indigo-500' },
  { gradeSlug: 'grade-3', gradeLabel: 'Grade 3', monitor: 'Dilini Jayawardana', classTeacher: 'Ms. Ishara Fernando', subjects: ['Sinhala', 'Mathematics', 'English'], accent: 'from-indigo-500 to-violet-500' },
  { gradeSlug: 'grade-4', gradeLabel: 'Grade 4', monitor: 'Kasun Abewickrama', classTeacher: 'Mr. Kasun Jayasuriya', subjects: ['Sinhala', 'Mathematics', 'English'], accent: 'from-violet-500 to-purple-500' },
  { gradeSlug: 'grade-5', gradeLabel: 'Grade 5', monitor: 'Nethmi Gunawardana', classTeacher: 'Ms. Dilani Senanayake', subjects: ['Sinhala', 'Mathematics', 'English'], accent: 'from-purple-500 to-fuchsia-500' },
];

export const primaryGradeHubs: GradeHub[] = primaryGradeMeta.map((meta) => ({
  gradeSlug: meta.gradeSlug,
  gradeLabel: meta.gradeLabel,
  monitor: meta.monitor,
  teachers: meta.subjects.map((subject, index) => ({
    subject,
    teacher: ['Ms. Nadeesha Silva', 'Mr. Ruwan Perera', 'Ms. Ishara Fernando'][index % 3],
  })),
  timetable: [
    { period: '1', time: '07:30 - 08:10', subject: meta.subjects[0], teacher: 'Ms. Nadeesha Silva' },
    { period: '2', time: '08:10 - 08:50', subject: meta.subjects[1], teacher: 'Mr. Ruwan Perera' },
    { period: '3', time: '08:50 - 09:30', subject: meta.subjects[2], teacher: 'Ms. Ishara Fernando' },
    { period: '4', time: '09:45 - 10:25', subject: meta.subjects[0], teacher: 'Ms. Nadeesha Silva' },
    { period: '5', time: '10:25 - 11:05', subject: meta.subjects[1], teacher: 'Mr. Ruwan Perera' },
  ],
  subjects: meta.subjects,
  sections: ['A', 'B', 'C'].map((section, index) => ({
    slug: `${meta.gradeSlug.replace('grade-', '')}${section.toLowerCase()}`,
    label: `${meta.gradeLabel.replace('Grade ', '')}${section}`,
    classTeacher: meta.classTeacher,
    studentCount: 34 + index * 2,
    activeStudents: 32 + index * 2,
    absentStudents: 2,
  })),
  accent: meta.accent,
}));

export const primarySectionDetailsMap: Record<string, SectionDetails> = Object.fromEntries(
  primaryGradeHubs.flatMap((hub) =>
    hub.sections.map((section) => {
      const sectionLabel = section.label;
      const subjects = hub.subjects;
      const classKey = `${hub.gradeSlug}/${section.slug}`;

      return [
        classKey,
        {
          gradeSlug: hub.gradeSlug,
          sectionSlug: section.slug,
          label: `${hub.gradeLabel} ${sectionLabel}`,
          gradeLabel: hub.gradeLabel,
          classTeacher: section.classTeacher,
          classTeacherId: 'TCH-0085',
          classTeacherPhoto: '/assets/profile.jpg',
          monitor: hub.monitor,
          viceMonitor: `${hub.gradeLabel} Vice Monitor`,
          totalStudents: section.studentCount,
          activeStudents: section.activeStudents,
          absentStudents: section.absentStudents,
          weeklyTimetable: buildWeeklyTimetable(subjects),
          teachers: hub.teachers,
          subjects,
          homeworkByDate: buildHomeworkByDate(hub.gradeLabel, sectionLabel, subjects),
          marks: buildSectionMarks(subjects, sectionLabel.charCodeAt(1)),
          students: buildSectionStudents(hub.gradeLabel, sectionLabel),
          attendanceRecords: buildAttendanceRecords(sectionLabel),
        },
      ];
    })
  )
) as Record<string, SectionDetails>;

export const gradeHubsByCategory: Partial<Record<ClassCategorySlug, GradeHub[]>> = {
  primary: primaryGradeHubs,
  secondary: secondaryGradeHubs,
};

export const sectionDetailsByCategory: Partial<Record<ClassCategorySlug, Record<string, SectionDetails>>> = {
  primary: primarySectionDetailsMap,
  secondary: secondarySectionDetailsMap,
};
