'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { type SectionDetails } from '../../../data';
import { useSchoolStudents, type SchoolStudent } from '../../../SchoolStudentsContext';

type Props = {
  gradeSlug: string;
  sectionSlug?: string;
  sectionDetails?: SectionDetails;
  category?: string;
};

type SectionTab = 'students' | 'timetable' | 'teachers' | 'marks' | 'homework' | 'attendance';

export default function ClientSectionDetailPage({
  gradeSlug,
  sectionSlug = '',
  sectionDetails,
  category = 'secondary',
}: Props) {
  const [activeTab, setActiveTab] = useState<SectionTab>('students');
  const [selectedHomeworkDate, setSelectedHomeworkDate] = useState(sectionDetails?.homeworkByDate[0]?.date ?? '');
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState(sectionDetails?.attendanceRecords[0]?.date ?? '');

  // Add student modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [justAdded, setJustAdded] = useState<string | null>(null);

  // Attendance calendar state
  const todayStr = new Date().toISOString().split('T')[0];
  const [calendarYear, setCalendarYear] = useState(() => {
    const first = sectionDetails?.attendanceRecords[0]?.date;
    return first ? parseInt(first.split('-')[0]) : new Date().getFullYear();
  });
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const first = sectionDetails?.attendanceRecords[0]?.date;
    return first ? parseInt(first.split('-')[1]) - 1 : new Date().getMonth();
  });
  const [attendanceSearch, setAttendanceSearch] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState<'all' | 'present' | 'absent' | 'late'>('all');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  const sectionKey = `${gradeSlug}/${sectionSlug}`;
  const { allStudents, getSectionStudents, addStudentToSection, isStudentInSection } = useSchoolStudents();

  const contextStudents = getSectionStudents(sectionKey);

  // Merge static + context-added students for display
  const staticStudents = sectionDetails?.students ?? [];
  const allDisplayStudents = [
    ...staticStudents,
    ...contextStudents.filter((cs) => !staticStudents.some((ss) => ss.id === cs.id)),
  ];

  // Filter global pool for search
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allStudents;
    return allStudents.filter((s) => s.name.toLowerCase().includes(q));
  }, [searchQuery, allStudents]);

  const resolvedDetails = sectionDetails;

  const rankedMarks = useMemo(() => {
    if (!resolvedDetails) return [];
    return [...resolvedDetails.marks]
      .map((row) => ({ ...row, total: row.terms.term1 + row.terms.term2 + row.terms.term3 }))
      .sort((a, b) => b.average - a.average)
      .map((row, index) => ({ ...row, rank: index + 1 }));
  }, [resolvedDetails]);

  const termWinners = useMemo(() => {
    if (!resolvedDetails) return [];
    const termConfigs: Array<{ key: 'term1' | 'term2' | 'term3'; label: string }> = [
      { key: 'term1', label: 'First Term' },
      { key: 'term2', label: 'Second Term' },
      { key: 'term3', label: 'Third Term' },
    ];
    return termConfigs.map((term) => {
      const winner = [...resolvedDetails.marks].sort((a, b) => b.terms[term.key] - a.terms[term.key])[0];
      return {
        label: term.label,
        student: winner.student,
        total: winner.terms.term1 + winner.terms.term2 + winner.terms.term3,
        average: winner.average,
        score: winner.terms[term.key],
      };
    });
  }, [resolvedDetails]);

  // Calendar helpers
  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAY_ABBR = ['Mo','Tu','We','Th','Fr','Sa','Su'];

  const recordsByDate = useMemo(() => {
    const map: Record<string, (typeof resolvedDetails.attendanceRecords)[0]> = {};
    resolvedDetails?.attendanceRecords.forEach((r) => { map[r.date] = r; });
    return map;
  }, [resolvedDetails]);

  const calendarCells = useMemo(() => {
    const firstDow = new Date(calendarYear, calendarMonth, 1).getDay();
    const startOffset = (firstDow + 6) % 7; // Monday start
    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    const daysInPrev = new Date(calendarYear, calendarMonth, 0).getDate();
    const cells: Array<{ dateStr: string; inMonth: boolean }> = [];
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = daysInPrev - i;
      const m = calendarMonth === 0 ? 12 : calendarMonth;
      const y = calendarMonth === 0 ? calendarYear - 1 : calendarYear;
      cells.push({ dateStr: `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`, inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ dateStr: `${calendarYear}-${String(calendarMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`, inMonth: true });
    }
    const remaining = 42 - cells.length;
    const nm = calendarMonth === 11 ? 0 : calendarMonth + 1;
    const ny = calendarMonth === 11 ? calendarYear + 1 : calendarYear;
    for (let d = 1; d <= remaining; d++) {
      cells.push({ dateStr: `${ny}-${String(nm+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`, inMonth: false });
    }
    return cells;
  }, [calendarYear, calendarMonth]);

  function formatDateFull(dateStr: string) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  function getStudentStats(rollNo: string) {
    const records = resolvedDetails?.attendanceRecords ?? [];
    const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));

    // Use year of first record, or current year
    const year = records.length > 0 ? parseInt(records[0].date.split('-')[0]) : new Date().getFullYear();

    // Pre-initialise all 12 months so the chart always shows Jan–Dec
    const byMonth: Record<string, { present: number; total: number }> = {};
    for (let m = 1; m <= 12; m++) {
      byMonth[`${year}-${String(m).padStart(2, '0')}`] = { present: 0, total: 0 };
    }

    let totalPresent = 0;
    const recentDays: Array<{ date: string; present: boolean; dayName: string }> = [];

    sorted.forEach((rec) => {
      const monthKey = rec.date.substring(0, 7);
      const isPresent = rec.present.some((s) => s.rollNo === rollNo);
      if (byMonth[monthKey] !== undefined) {
        byMonth[monthKey].total++;
        if (isPresent) byMonth[monthKey].present++;
      }
      if (isPresent) totalPresent++;
      const [yr, mo, dy] = rec.date.split('-').map(Number);
      recentDays.push({
        date: rec.date,
        present: isPresent,
        dayName: new Date(yr, mo - 1, dy).toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2),
      });
    });

    const totalDays = records.length;
    return {
      totalPresent,
      totalDays,
      year,
      pct: totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0,
      byMonth,
      recentDays: recentDays.slice(-10),
    };
  }

  if (!resolvedDetails) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Section not found</h1>
        <Link href={`/dashboard/classes/${category}/${gradeSlug}`} className="text-blue-600 hover:text-blue-800 font-semibold">
          ← Back to Grade
        </Link>
      </div>
    );
  }

  const tabButtons: Array<{ key: SectionTab; label: string }> = [
    { key: 'students', label: 'Students' },
    { key: 'timetable', label: 'Timetable' },
    { key: 'teachers', label: 'Teachers' },
    { key: 'marks', label: 'Marks' },
    { key: 'homework', label: 'Homework' },
    { key: 'attendance', label: 'Attendance' },
  ];

  const selectedHomeworkGroup =
    resolvedDetails.homeworkByDate.find((g) => g.date === selectedHomeworkDate) ??
    resolvedDetails.homeworkByDate[0];
  const selectedAttendanceRecord =
    resolvedDetails.attendanceRecords.find((r) => r.date === selectedAttendanceDate) ??
    resolvedDetails.attendanceRecords[0];

  function handleAdd(student: SchoolStudent) {
    addStudentToSection(sectionKey, student);
    setJustAdded(student.id);
    setTimeout(() => setJustAdded(null), 1500);
  }

  function handleCloseModal() {
    setAddModalOpen(false);
    setSearchQuery('');
    setJustAdded(null);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link
          href={`/dashboard/classes/${category}/${gradeSlug}`}
          className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
        >
          ← Back to {resolvedDetails.gradeLabel}
        </Link>
        <h1 className="text-3xl font-bold text-primary">{resolvedDetails.label}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white shadow-lg border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <img
              src={resolvedDetails.classTeacherPhoto}
              alt={resolvedDetails.classTeacher}
              className="h-16 w-16 rounded-2xl object-cover"
            />
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-gray-400">Class Teacher</div>
              <div className="text-lg font-bold text-gray-900">{resolvedDetails.classTeacher}</div>
              <div className="text-sm text-gray-600">Lead teacher for {resolvedDetails.gradeLabel}</div>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href={`/dashboard/teachers/profile/${resolvedDetails.classTeacherId}`}
              className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
            >
              View teacher profile
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg p-5 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-white/70">Monitor</div>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold">
              {resolvedDetails.monitor.slice(0, 1)}
            </div>
            <div>
              <div className="text-lg font-bold">{resolvedDetails.monitor}</div>
              <div className="text-sm text-white/80">Student monitor</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg p-5 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-white/70">Vice Monitor</div>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold">
              {resolvedDetails.viceMonitor.slice(0, 1)}
            </div>
            <div>
              <div className="text-lg font-bold">{resolvedDetails.viceMonitor}</div>
              <div className="text-sm text-white/80">Student vice monitor</div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 rounded-2xl shadow-lg border border-white/40 p-1.5 bg-[#212B36]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1.5">
          {tabButtons.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-xl px-3 py-2 text-left transition-all duration-200 ${
                  active
                    ? 'bg-white text-[#212B36] shadow-md ring-2 ring-white/80'
                    : 'bg-white/10 text-white/90 hover:bg-white/20'
                }`}
              >
                <div className="text-sm font-semibold">{tab.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STUDENTS TAB ── */}
      {activeTab === 'students' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-primary">Students</h2>
              <p className="text-sm text-gray-500 mt-0.5">{allDisplayStudents.length} enrolled</p>
            </div>
            <button
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#212B36] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2d3a47] transition-colors shadow-sm"
            >
              <span className="text-base leading-none">+</span>
              Add Student
            </button>
          </div>

          {allDisplayStudents.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-4xl mb-3">👤</div>
              <p className="text-gray-500 font-medium">No students yet</p>
              <p className="text-sm text-gray-400 mt-1">Click &quot;Add Student&quot; to enrol someone.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allDisplayStudents.map((student) => (
                <Link
                  key={student.id}
                  href={`/dashboard/students/profile/${student.id.toLowerCase()}`}
                  className="block"
                >
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 hover:bg-blue-50 transition flex items-center gap-4">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="h-14 w-14 rounded-2xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-gray-900 truncate">{student.name}</div>
                      <div className="text-sm text-gray-600">Roll No. {student.rollNo}</div>
                      <div className="text-sm text-gray-500 mt-1">{student.attendance} attendance</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : activeTab === 'timetable' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Weekly Timetable</h2>
            <p className="text-sm text-gray-500">Monday to Friday, 8 periods, 7:30 AM to 1:30 PM.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full text-sm border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-gray-500">Period</th>
                  {resolvedDetails.weeklyTimetable.map((day) => (
                    <th key={day.day} className="px-3 py-2 text-center text-gray-500">{day.day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resolvedDetails.weeklyTimetable[0]?.slots.map((slot, index) => (
                  <tr key={slot.period}>
                    <td className="px-3 py-3 rounded-xl bg-gray-50 font-semibold text-gray-900 align-top">
                      <div>Period {slot.period}</div>
                      <div className="text-xs text-gray-500 mt-1">{slot.time}</div>
                    </td>
                    {resolvedDetails.weeklyTimetable.map((day) => {
                      const daySlot = day.slots[index];
                      return (
                        <td key={`${day.day}-${daySlot.period}`} className="px-3 py-3 align-top">
                          <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 min-h-[92px]">
                            <div className="font-semibold text-gray-900">{daySlot.subject}</div>
                            <div className="text-xs text-gray-500 mt-1">{daySlot.teacher}</div>
                            <div className="mt-3 inline-flex rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-semibold text-sky-700">
                              {daySlot.time}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'teachers' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-primary">Class Teacher</h2>
                <p className="text-sm text-gray-500">View the main teacher profile from here.</p>
              </div>
              <Link
                href={`/dashboard/teachers/profile/${resolvedDetails.classTeacherId}`}
                className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition"
              >
                View profile
              </Link>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
              <img
                src={resolvedDetails.classTeacherPhoto}
                alt={resolvedDetails.classTeacher}
                className="h-16 w-16 rounded-2xl object-cover"
              />
              <div>
                <div className="text-lg font-bold text-gray-900">{resolvedDetails.classTeacher}</div>
                <div className="text-sm text-gray-600">Teaching {resolvedDetails.gradeLabel}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-primary">Subject Teachers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {resolvedDetails.teachers.map((item) => (
                <div key={item.subject} className="rounded-xl bg-gray-50 p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-gray-900">{item.subject}</div>
                    <div className="text-sm text-gray-500">Subject lead</div>
                  </div>
                  <div className="text-sm text-gray-600 text-right">{item.teacher}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeTab === 'marks' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-primary">Marks by Term</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2">Rank</th>
                    <th className="text-left px-3 py-2">Student</th>
                    <th className="text-left px-3 py-2">Term 1</th>
                    <th className="text-left px-3 py-2">Term 2</th>
                    <th className="text-left px-3 py-2">Term 3</th>
                    <th className="text-left px-3 py-2">Average</th>
                    <th className="text-left px-3 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedMarks.map((row) => (
                    <tr key={row.student} className="border-b last:border-0">
                      <td className="px-3 py-2 font-semibold text-sky-700">{row.rank}</td>
                      <td className="px-3 py-2 font-medium">{row.student}</td>
                      <td className="px-3 py-2">{row.terms.term1}</td>
                      <td className="px-3 py-2">{row.terms.term2}</td>
                      <td className="px-3 py-2">{row.terms.term3}</td>
                      <td className="px-3 py-2 font-semibold text-primary">{row.average}%</td>
                      <td className="px-3 py-2 font-semibold text-gray-900">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {termWinners.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white shadow-lg border border-gray-100 p-5">
                <div className="text-sm uppercase tracking-[0.2em] text-gray-400">{item.label}</div>
                <div className="mt-2 text-lg font-bold text-gray-900">{item.student}</div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-sky-50 p-3">
                    <div className="text-gray-500">Top Score</div>
                    <div className="text-xl font-bold text-sky-700">{item.score}</div>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3">
                    <div className="text-gray-500">Average</div>
                    <div className="text-xl font-bold text-emerald-700">{item.average}%</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Total: <span className="font-semibold text-gray-900">{item.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'homework' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl font-bold text-primary">Homework by Date</h2>
              <p className="text-sm text-gray-500">Click a date to open the homework items.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {resolvedDetails.homeworkByDate.map((group) => {
                const selected = group.date === selectedHomeworkGroup?.date;
                return (
                  <button
                    key={group.date}
                    type="button"
                    onClick={() => setSelectedHomeworkDate(group.date)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      selected ? 'bg-[#212B36] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {group.date}
                  </button>
                );
              })}
            </div>
          </div>
          {selectedHomeworkGroup && (
            <div className="rounded-2xl bg-gray-50 p-4 space-y-3">
              <div className="text-sm font-semibold text-gray-500">{selectedHomeworkGroup.date}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {selectedHomeworkGroup.items.map((item) => (
                  <div key={item.title} className="rounded-xl border border-gray-100 bg-white p-4">
                    <div className="text-sm uppercase tracking-[0.15em] text-gray-400 mb-2">{item.status}</div>
                    <div className="font-semibold text-gray-900 mb-1">{item.subject}</div>
                    <div className="text-sm text-gray-600 mb-2">{item.title}</div>
                    <div className="text-sm text-gray-600">Due: {item.dueDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Today's summary */}
          {(() => {
            const rec = recordsByDate[todayStr];
            const total = rec ? rec.present.length + rec.absent.length : 0;
            const pct = total > 0 ? Math.round((rec!.present.length / total) * 100) : 0;
            return (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Today&apos;s Attendance</h2>
                    <p className="text-sm text-gray-500">{formatDateFull(todayStr)}</p>
                  </div>
                  {rec && (
                    <span className="rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold px-3 py-1">
                      {pct}% present
                    </span>
                  )}
                </div>
                {rec ? (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="rounded-2xl bg-green-50 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-green-600 mb-1">Present</div>
                        <div className="text-3xl font-extrabold text-green-900">{rec.present.length}</div>
                      </div>
                      <div className="rounded-2xl bg-red-50 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-red-600 mb-1">Absent</div>
                        <div className="text-3xl font-extrabold text-red-900">{rec.absent.length}</div>
                      </div>
                      <div className="rounded-2xl bg-[#212B36]/5 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">Total</div>
                        <div className="text-3xl font-extrabold text-gray-900">{total}</div>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl bg-gray-50 p-6 text-center text-gray-400 text-sm">
                    No attendance recorded for today yet.
                  </div>
                )}
              </div>
            );
          })()}

          {/* Calendar + date detail */}
          <div className="grid grid-cols-1 lg:grid-cols-[340px,1fr] gap-6 items-start">
            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow-lg p-5">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => {
                    if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(y => y - 1); }
                    else setCalendarMonth(m => m - 1);
                  }}
                  className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition"
                >
                  ‹
                </button>
                <div className="text-sm font-bold text-gray-900">
                  {MONTH_NAMES[calendarMonth]} {calendarYear}
                </div>
                <button
                  onClick={() => {
                    if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(y => y + 1); }
                    else setCalendarMonth(m => m + 1);
                  }}
                  className="h-8 w-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600 transition"
                >
                  ›
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAY_ABBR.map((d) => (
                  <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-1">{d}</div>
                ))}
              </div>

              {/* Date cells */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {calendarCells.map(({ dateStr, inMonth }) => {
                  const hasRecord = !!recordsByDate[dateStr];
                  const isSelected = dateStr === selectedAttendanceDate;
                  const isToday = dateStr === todayStr;
                  const rec = recordsByDate[dateStr];
                  const pct = rec && (rec.present.length + rec.absent.length) > 0
                    ? Math.round(rec.present.length / (rec.present.length + rec.absent.length) * 100)
                    : 0;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => { if (hasRecord) setSelectedAttendanceDate(dateStr); }}
                      disabled={!hasRecord}
                      className={`relative flex flex-col items-center justify-center rounded-xl py-1.5 text-xs font-semibold transition-all
                        ${isSelected ? 'bg-[#212B36] text-white' : ''}
                        ${!isSelected && isToday ? 'ring-2 ring-[#212B36] text-[#212B36]' : ''}
                        ${!isSelected && !isToday && inMonth && hasRecord ? 'hover:bg-gray-100 text-gray-900 cursor-pointer' : ''}
                        ${!inMonth ? 'text-gray-300' : ''}
                        ${inMonth && !hasRecord ? 'text-gray-400 cursor-default' : ''}
                      `}
                    >
                      <span>{parseInt(dateStr.split('-')[2])}</span>
                      {hasRecord && (
                        <span className={`mt-0.5 h-1 w-1 rounded-full ${
                          isSelected ? 'bg-white' : pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-[11px] text-gray-500">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-green-500" />≥80%</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" />50–79%</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" />&lt;50%</span>
              </div>
            </div>

            {/* Selected date details */}
            <div className="space-y-4">
              {selectedAttendanceRecord ? (
                <>
                  {/* Date header */}
                  <div className="bg-white rounded-2xl shadow-lg p-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Selected Date</div>
                    <div className="text-lg font-extrabold text-gray-900">{formatDateFull(selectedAttendanceDate)}</div>

                    {/* Summary row */}
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-green-50 p-3 text-center">
                        <div className="text-2xl font-extrabold text-green-900">{selectedAttendanceRecord.present.length}</div>
                        <div className="text-xs text-green-700 font-semibold mt-0.5">Present</div>
                      </div>
                      <div className="rounded-xl bg-red-50 p-3 text-center">
                        <div className="text-2xl font-extrabold text-red-900">{selectedAttendanceRecord.absent.length}</div>
                        <div className="text-xs text-red-700 font-semibold mt-0.5">Absent</div>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3 text-center">
                        <div className="text-2xl font-extrabold text-gray-900">
                          {selectedAttendanceRecord.present.length + selectedAttendanceRecord.absent.length}
                        </div>
                        <div className="text-xs text-gray-500 font-semibold mt-0.5">Total</div>
                      </div>
                    </div>
                  </div>

                  {/* All students with accordion */}
                  {(() => {
                    const allStudentsForDate = [
                      ...selectedAttendanceRecord.present.map((s) => ({ ...s, status: 'present' as const })),
                      ...selectedAttendanceRecord.absent.map((s) => ({ ...s, status: 'absent' as const })),
                    ].sort((a, b) => parseInt(a.rollNo) - parseInt(b.rollNo));

                    const filtered = allStudentsForDate.filter((s) => {
                      const matchesSearch = s.name.toLowerCase().includes(attendanceSearch.toLowerCase());
                      if (attendanceFilter === 'present') return s.status === 'present' && matchesSearch;
                      if (attendanceFilter === 'absent') return s.status === 'absent' && matchesSearch;
                      if (attendanceFilter === 'late') return false;
                      return matchesSearch;
                    });

                    return (
                      <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
                        {/* Search */}
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                          <input
                            type="text"
                            value={attendanceSearch}
                            onChange={(e) => setAttendanceSearch(e.target.value)}
                            placeholder="Search student by name..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#212B36] transition"
                          />
                        </div>

                        {/* Filter pills */}
                        <div className="flex gap-2 flex-wrap">
                          {([
                            { key: 'all', label: `All (${allStudentsForDate.length})`, active: 'bg-[#212B36] text-white', idle: 'bg-gray-100 text-gray-600' },
                            { key: 'present', label: `Present (${selectedAttendanceRecord.present.length})`, active: 'bg-green-600 text-white', idle: 'bg-green-50 text-green-700' },
                            { key: 'absent', label: `Absent (${selectedAttendanceRecord.absent.length})`, active: 'bg-red-600 text-white', idle: 'bg-red-50 text-red-700' },
                            { key: 'late', label: 'Late (0)', active: 'bg-amber-500 text-white', idle: 'bg-amber-50 text-amber-700' },
                          ] as const).map((f) => (
                            <button
                              key={f.key}
                              onClick={() => setAttendanceFilter(f.key)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${attendanceFilter === f.key ? f.active : f.idle + ' hover:opacity-80'}`}
                            >
                              {f.label}
                            </button>
                          ))}
                        </div>

                        {/* Student rows */}
                        <div className="space-y-1">
                          {filtered.length === 0 ? (
                            <div className="py-8 text-center text-gray-400 text-sm">No students match.</div>
                          ) : (
                            filtered.map((student) => {
                              const stats = getStudentStats(student.rollNo);
                              const isExpanded = expandedStudent === student.rollNo;
                              const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

                              return (
                                <div key={student.rollNo} className="rounded-xl border border-gray-100 overflow-hidden">
                                  {/* Row button */}
                                  <button
                                    onClick={() => setExpandedStudent(isExpanded ? null : student.rollNo)}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                  >
                                    <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${student.status === 'present' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <img src={student.photo} alt={student.name} className="h-10 w-10 rounded-xl object-cover flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold text-gray-900 text-sm truncate">{student.name}</div>
                                      <div className="text-xs text-gray-500">Roll No. {student.rollNo}</div>
                                    </div>
                                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${student.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                      {student.status === 'present' ? 'Present' : 'Absent'}
                                    </span>
                                    <span className={`text-gray-300 text-xs flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                                  </button>

                                  {/* Expanded accordion */}
                                  {isExpanded && (
                                    <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4 space-y-5">
                                      {/* Overall progress */}
                                      <div>
                                        <div className="flex items-center justify-between text-xs mb-1.5">
                                          <span className="font-semibold text-gray-700">Overall School Attendance</span>
                                          <span className={`font-bold text-sm ${stats.pct >= 80 ? 'text-green-600' : stats.pct >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                            {stats.pct}%
                                          </span>
                                        </div>
                                        <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
                                          <div
                                            className={`h-full rounded-full transition-all duration-700 ${stats.pct >= 80 ? 'bg-green-500' : stats.pct >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                                            style={{ width: `${stats.pct}%` }}
                                          />
                                        </div>
                                        <div className="text-[11px] text-gray-400 mt-1">{stats.totalPresent} present out of {stats.totalDays} school days</div>
                                      </div>

                                      {/* Full-year monthly bar chart */}
                                      <div>
                                        <div className="flex items-center justify-between mb-3">
                                          <div className="text-xs font-semibold text-gray-700">
                                            Monthly Attendance — {stats.year}
                                          </div>
                                          <div className="text-[11px] text-gray-400">
                                            {stats.totalPresent} / {stats.totalDays} days
                                          </div>
                                        </div>
                                        <div className="flex items-end gap-1 h-24">
                                          {Object.entries(stats.byMonth).map(([month, data]) => {
                                            const mo = parseInt(month.split('-')[1]);
                                            const hasData = data.total > 0;
                                            const pct = hasData ? Math.round((data.present / data.total) * 100) : 0;
                                            const barH = hasData ? Math.max(5, Math.round((pct / 100) * 80)) : 3;
                                            const color = !hasData ? '#e5e7eb' : pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444';
                                            return (
                                              <div key={month} className="flex flex-col items-center gap-0.5 flex-1 min-w-0">
                                                <span className={`text-[9px] font-bold ${hasData ? 'text-gray-500' : 'text-transparent'}`}>
                                                  {pct}%
                                                </span>
                                                <div
                                                  className="w-full rounded-t-sm transition-all duration-500"
                                                  style={{ height: `${barH}px`, backgroundColor: color }}
                                                />
                                                <span className="text-[9px] text-gray-400 w-full text-center">{MONTH_ABBR[mo - 1]}</span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                        <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-gray-400">
                                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-green-500 inline-block" />≥80%</span>
                                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-amber-400 inline-block" />60–79%</span>
                                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-400 inline-block" />&lt;60%</span>
                                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-gray-200 inline-block" />No data</span>
                                        </div>
                                      </div>

                                      {/* Recent days (weekly view) */}
                                      {stats.recentDays.length > 0 && (
                                        <div>
                                          <div className="text-xs font-semibold text-gray-700 mb-2">Recent Days</div>
                                          <div className="flex gap-1.5 flex-wrap">
                                            {stats.recentDays.map(({ date, present: p, dayName }) => (
                                              <div key={date} className="flex flex-col items-center gap-0.5">
                                                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${p ? 'bg-green-100' : 'bg-red-100'}`}>
                                                  <span className={`text-[10px] font-bold ${p ? 'text-green-700' : 'text-red-700'}`}>{dayName}</span>
                                                </div>
                                                <span className="text-[9px] text-gray-400">{date.slice(5)}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-400">
                  <div className="text-4xl mb-3">📅</div>
                  <p className="font-medium text-gray-500">Select a date with a dot to view attendance</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── ADD STUDENT MODAL ── */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal} />

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">Add Student</h2>
                <p className="text-sm text-gray-500 mt-0.5">Search by name and add to this section</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Search input */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student by name..."
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#212B36] transition"
                  autoFocus
                />
              </div>
            </div>

            {/* Results list */}
            <div className="overflow-y-auto flex-1 px-4 py-3 space-y-2">
              {searchResults.length === 0 ? (
                <div className="py-10 text-center text-gray-400 text-sm">No students found</div>
              ) : (
                searchResults.map((student) => {
                  const alreadyIn = isStudentInSection(sectionKey, student.id) ||
                    staticStudents.some((s) => s.id === student.id);
                  const wasJustAdded = justAdded === student.id;

                  return (
                    <div
                      key={student.id}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                        alreadyIn ? 'opacity-50 bg-gray-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="h-11 w-11 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.currentGrade}</div>
                      </div>
                      {alreadyIn ? (
                        <span className="text-xs font-semibold text-gray-400 px-3 py-1.5 rounded-lg bg-gray-100">
                          {wasJustAdded ? '✓ Added' : 'Enrolled'}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAdd(student)}
                          className="text-xs font-semibold text-white bg-[#212B36] hover:bg-[#2d3a47] px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">{allDisplayStudents.length} students enrolled</span>
              <button
                onClick={handleCloseModal}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
