'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { type SectionDetails } from '../../../data';

type Props = {
  gradeSlug: string;
  sectionDetails?: SectionDetails;
};

type SectionTab = 'students' | 'timetable' | 'teachers' | 'marks' | 'homework' | 'attendance';

export default function ClientSectionDetailPage({ gradeSlug, sectionDetails }: Props) {
  const [activeTab, setActiveTab] = useState<SectionTab>('students');
  const [selectedHomeworkDate, setSelectedHomeworkDate] = useState(sectionDetails?.homeworkByDate[0]?.date ?? '');
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState(sectionDetails?.attendanceRecords[0]?.date ?? '');
  const resolvedDetails = sectionDetails;

  const rankedMarks = useMemo(() => {
    if (!resolvedDetails) {
      return [];
    }

    return [...resolvedDetails.marks]
      .map((row) => ({
        ...row,
        total: row.terms.term1 + row.terms.term2 + row.terms.term3,
      }))
      .sort((left, right) => right.average - left.average)
      .map((row, index) => ({
        ...row,
        rank: index + 1,
      }));
  }, [resolvedDetails]);

  const termWinners = useMemo(() => {
    if (!resolvedDetails) {
      return [];
    }

    const termConfigs: Array<{ key: 'term1' | 'term2' | 'term3'; label: string }> = [
      { key: 'term1', label: 'First Term' },
      { key: 'term2', label: 'Second Term' },
      { key: 'term3', label: 'Third Term' },
    ];

    return termConfigs.map((term) => {
      const winner = [...resolvedDetails.marks].sort((left, right) => right.terms[term.key] - left.terms[term.key])[0];
      return {
        label: term.label,
        student: winner.student,
        total: winner.terms.term1 + winner.terms.term2 + winner.terms.term3,
        average: winner.average,
        score: winner.terms[term.key],
      };
    });
  }, [resolvedDetails]);

  if (!resolvedDetails) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Section not found</h1>
        <Link href={`/dashboard/classes/secondary/${gradeSlug}`} className="text-blue-600 hover:text-blue-800 font-semibold">
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

  const selectedHomeworkGroup = resolvedDetails.homeworkByDate.find((group) => group.date === selectedHomeworkDate) ?? resolvedDetails.homeworkByDate[0];
  const selectedAttendanceRecord = resolvedDetails.attendanceRecords.find((record) => record.date === selectedAttendanceDate) ?? resolvedDetails.attendanceRecords[0];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Link href={`/dashboard/classes/secondary/${gradeSlug}`} className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1">
          ← Back to {resolvedDetails.gradeLabel}
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-primary">{resolvedDetails.label}</h1>
          <p className="text-gray-600 mt-2">
            This section contains homework, marks, timetable, teachers, subjects, and monitor details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white shadow-lg border border-gray-100 p-5">
          <div className="flex items-center gap-4">
            <img src={resolvedDetails.classTeacherPhoto} alt={resolvedDetails.classTeacher} className="h-16 w-16 rounded-2xl object-cover" />
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-gray-400">Class Teacher</div>
              <div className="text-lg font-bold text-gray-900">{resolvedDetails.classTeacher}</div>
              <div className="text-sm text-gray-600">Lead teacher for {resolvedDetails.gradeLabel}</div>
            </div>
          </div>
          <div className="mt-4">
            <Link href={`/dashboard/teachers/profile/${resolvedDetails.classTeacherId}`} className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition">
              View teacher profile
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg p-5 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-white/70">Monitor</div>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold">{resolvedDetails.monitor.slice(0, 1)}</div>
            <div>
              <div className="text-lg font-bold">{resolvedDetails.monitor}</div>
              <div className="text-sm text-white/80">Student monitor</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg p-5 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-white/70">Vice Monitor</div>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold">{resolvedDetails.viceMonitor.slice(0, 1)}</div>
            <div>
              <div className="text-lg font-bold">{resolvedDetails.viceMonitor}</div>
              <div className="text-sm text-white/80">Student vice monitor</div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 rounded-2xl shadow-lg border border-white/40 p-1.5 bg-sky-600">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1.5">
          {tabButtons.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-xl px-3 py-2 text-left transition-all duration-200 ${active ? 'bg-white text-sky-700 shadow-md ring-2 ring-white/80' : 'bg-white/10 text-white/90 hover:bg-white/20'}`}
              >
                <div className="text-sm font-semibold">{tab.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'students' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Students</h2>
            <span className="text-sm text-gray-500">{resolvedDetails.students.length} profiles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resolvedDetails.students.map((student) => (
              <Link key={student.id} href={`/dashboard/students/profile/${student.id.toLowerCase()}`} className="block">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 hover:bg-blue-50 transition flex items-center gap-4">
                  <img src={student.photo} alt={student.name} className="h-16 w-16 rounded-2xl object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="font-bold text-gray-900 truncate">{student.name}</div>
                    <div className="text-sm text-gray-600">Roll No. {student.rollNo}</div>
                    <div className="text-sm text-gray-600 mt-2">Attendance: {student.attendance}</div>
                    <div className="text-sm text-gray-600">{student.remark}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : activeTab === 'timetable' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl font-bold text-primary">Weekly Timetable</h2>
              <p className="text-sm text-gray-500">Monday to Friday, 8 periods, 7:30 AM to 1:30 PM.</p>
            </div>
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
              <Link href={`/dashboard/teachers/profile/${resolvedDetails.classTeacherId}`} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 transition">
                View profile
              </Link>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
              <img src={resolvedDetails.classTeacherPhoto} alt={resolvedDetails.classTeacher} className="h-16 w-16 rounded-2xl object-cover" />
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
                <div className="mt-3 text-sm text-gray-600">Total across three terms: <span className="font-semibold text-gray-900">{item.total}</span></div>
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
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selected ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
                    <div className="text-sm text-gray-600">Date: {item.dueDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold text-primary">Attendance</h2>
                <p className="text-sm text-gray-500">Filter by date to check past attendance.</p>
              </div>
              <select
                value={selectedAttendanceDate}
                onChange={(event) => setSelectedAttendanceDate(event.target.value)}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
              >
                {resolvedDetails.attendanceRecords.map((record) => (
                  <option key={record.date} value={record.date}>
                    {record.date}
                  </option>
                ))}
              </select>
            </div>

            {selectedAttendanceRecord && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-green-50 p-4">
                    <div className="text-sm text-green-700">Present</div>
                    <div className="text-2xl font-bold text-green-900">{selectedAttendanceRecord.present.length}</div>
                  </div>
                  <div className="rounded-xl bg-red-50 p-4">
                    <div className="text-sm text-red-700">Absent</div>
                    <div className="text-2xl font-bold text-red-900">{selectedAttendanceRecord.absent.length}</div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4">
                    <div className="text-sm text-blue-700">Total Students</div>
                    <div className="text-2xl font-bold text-blue-900">{selectedAttendanceRecord.present.length + selectedAttendanceRecord.absent.length}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4 space-y-3">
                    <div className="font-bold text-green-900">Present Students</div>
                    <div className="space-y-2">
                      {selectedAttendanceRecord.present.map((student) => (
                        <div key={student.rollNo} className="flex items-center gap-3 rounded-xl bg-white p-3">
                          <span className="h-3 w-3 rounded-full bg-green-500" />
                          <img src={student.photo} alt={student.name} className="h-10 w-10 rounded-full object-cover" />
                          <div>
                            <div className="font-semibold text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">Roll No. {student.rollNo}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-red-100 bg-red-50/60 p-4 space-y-3">
                    <div className="font-bold text-red-900">Absent Students</div>
                    <div className="space-y-2">
                      {selectedAttendanceRecord.absent.map((student) => (
                        <div key={student.rollNo} className="flex items-center gap-3 rounded-xl bg-white p-3">
                          <span className="h-3 w-3 rounded-full bg-red-500" />
                          <img src={student.photo} alt={student.name} className="h-10 w-10 rounded-full object-cover" />
                          <div>
                            <div className="font-semibold text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">Roll No. {student.rollNo}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-primary">Past Attendance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {resolvedDetails.attendanceRecords.map((record) => (
                <button
                  key={record.date}
                  type="button"
                  onClick={() => setSelectedAttendanceDate(record.date)}
                  className={`rounded-xl border p-4 text-left transition ${record.date === selectedAttendanceRecord?.date ? 'border-sky-500 bg-sky-50' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div className="font-semibold text-gray-900">{record.date}</div>
                  <div className="mt-2 text-sm text-gray-600">Present: {record.present.length}</div>
                  <div className="text-sm text-gray-600">Absent: {record.absent.length}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
