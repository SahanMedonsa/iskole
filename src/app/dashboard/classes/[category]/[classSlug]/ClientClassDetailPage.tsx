'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { classCategoryLabels, type ClassCategorySlug, type ClassDetails } from '../../data';

type Props = {
  category: ClassCategorySlug;
  classSlug: string;
  classDetails?: ClassDetails;
};

type Tab = 'students' | 'timetable' | 'teachers' | 'marks' | 'homework' | 'attendance';

const categoryGradient: Record<ClassCategorySlug, string> = {
  primary: 'from-sky-600 via-sky-500 to-cyan-500',
  secondary: 'from-emerald-600 via-teal-500 to-cyan-500',
  advanced: 'from-amber-500 via-orange-500 to-red-500',
};

const tabButtons: Array<{ key: Tab; label: string }> = [
  { key: 'students', label: 'Students' },
  { key: 'timetable', label: 'Timetable' },
  { key: 'teachers', label: 'Teachers' },
  { key: 'marks', label: 'Marks' },
  { key: 'homework', label: 'Homework' },
  { key: 'attendance', label: 'Attendance' },
];

const homeworkStatusBadge: Record<string, string> = {
  Reviewed: 'bg-emerald-100 text-emerald-700',
  Submitted: 'bg-sky-100 text-sky-700',
  Pending: 'bg-amber-100 text-amber-700',
};

export default function ClientClassDetailPage({ category, classDetails }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('students');

  const rankedMarks = useMemo(() => {
    if (!classDetails) return [];
    return [...classDetails.marks]
      .sort((a, b) => b.average - a.average)
      .map((row, index) => ({ ...row, rank: index + 1 }));
  }, [classDetails]);

  if (!classDetails) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-primary mb-2">Class not found</h1>
        <button onClick={() => router.push(`/dashboard/classes/${category}`)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition">
          ← Back to {classCategoryLabels[category]}
        </button>
      </div>
    );
  }

  const gradient = categoryGradient[category];
  const attendancePct = Math.round((classDetails.activeStudents / classDetails.totalStudents) * 100);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 text-white`}>
        <button
          onClick={() => router.push(`/dashboard/classes/${category}`)}
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white font-semibold mb-4 transition"
        >
          ← Back to {classCategoryLabels[category]}
        </button>
        <div className="text-xs uppercase tracking-[0.25em] text-white/70 mb-2">{classCategoryLabels[category]} · Class Detail</div>
        <h1 className="text-4xl font-extrabold mb-2">{classDetails.label}</h1>
        <p className="text-white/80 max-w-xl">Manage homework, marks, timetable, teachers, attendance, and student profiles.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{classDetails.totalStudents}</div>
            <div className="text-sm text-white/70">Total Students</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{classDetails.activeStudents}</div>
            <div className="text-sm text-white/70">Active Today</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{attendancePct}%</div>
            <div className="text-sm text-white/70">Attendance</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{classDetails.subjects.length}</div>
            <div className="text-sm text-white/70">Subjects</div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-3xl bg-white shadow-lg border border-gray-100 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Class Teacher</div>
          <div className="flex items-center gap-4">
            <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-extrabold flex-shrink-0`}>
              {classDetails.teacher.charAt(0)}
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{classDetails.teacher}</div>
              <div className="text-sm text-gray-500">Lead teacher</div>
            </div>
          </div>
        </div>

        <div className={`rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg p-6 text-white`}>
          <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3">Monitor</div>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-extrabold">
              {classDetails.monitor.charAt(0)}
            </div>
            <div>
              <div className="text-lg font-bold">{classDetails.monitor}</div>
              <div className="text-sm text-white/80">Student monitor</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg p-6 text-white">
          <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3">Vice Monitor</div>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-extrabold">
              {classDetails.viceMonitor.charAt(0)}
            </div>
            <div>
              <div className="text-lg font-bold">{classDetails.viceMonitor}</div>
              <div className="text-sm text-white/80">Student vice monitor</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tab Bar */}
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

      {/* Tab Content */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-primary">Students</h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">{classDetails.students.length} profiles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classDetails.students.map((student) => (
              <div key={student.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-center gap-4 hover:bg-sky-50 transition">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-lg font-extrabold flex-shrink-0`}>
                  {student.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 truncate">{student.name}</div>
                  <div className="text-xs text-gray-500">Roll No. {student.rollNo} · {student.id}</div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">{student.attendance}</span>
                    <span className="text-xs text-gray-500 truncate">{student.remark}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'timetable' && (
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-primary">Timetable</h2>
            <p className="text-sm text-gray-500">Daily schedule for {classDetails.label}.</p>
          </div>
          <div className="space-y-2">
            {classDetails.timetable.map((slot) => (
              <div key={`${slot.period}-${slot.subject}`} className="flex items-center gap-4 rounded-2xl bg-gray-50 px-5 py-4">
                <div className="w-24 shrink-0">
                  <div className="text-xs font-semibold text-gray-400 uppercase">Period {slot.period}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{slot.time}</div>
                </div>
                <div className="h-8 w-px bg-gray-200 shrink-0" />
                <div className="font-semibold text-gray-900">{slot.subject}</div>
                <div className="ml-auto text-sm text-gray-500">{slot.teacher}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'teachers' && (
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-primary">Subject Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {classDetails.teachers.map((item, index) => (
              <div key={item.subject} className="rounded-2xl bg-gray-50 p-4 flex items-center gap-4">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{item.subject}</div>
                  <div className="text-sm text-gray-500 truncate">{item.teacher}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'marks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-primary">Marks · Ranked</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 rounded-xl">
                    <th className="text-left px-4 py-3 rounded-l-xl font-semibold text-gray-500">Rank</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500">Student</th>
                    {classDetails.subjects.map((subject) => (
                      <th key={subject} className="text-left px-4 py-3 font-semibold text-gray-500">{subject}</th>
                    ))}
                    <th className="text-left px-4 py-3 rounded-r-xl font-semibold text-gray-500">Average</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rankedMarks.map((row) => (
                    <tr key={row.student} className="hover:bg-sky-50/40 transition">
                      <td className="px-4 py-3 font-extrabold text-sky-700">#{row.rank}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.student}</td>
                      {classDetails.subjects.map((subject) => (
                        <td key={subject} className="px-4 py-3 text-gray-700">{row.subjects[subject]}</td>
                      ))}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${row.average >= 90 ? 'bg-emerald-100 text-emerald-700' : row.average >= 80 ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>
                          {row.average}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-3">
            <h3 className="text-lg font-bold text-primary">Performance Bars</h3>
            {rankedMarks.map((row) => (
              <div key={row.student} className="flex items-center gap-4">
                <div className="w-36 shrink-0 text-sm font-medium text-gray-700 truncate">{row.student}</div>
                <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all`}
                    style={{ width: `${row.average}%` }}
                  />
                </div>
                <div className="text-sm font-bold text-gray-900 w-12 text-right">{row.average}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'homework' && (
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-primary">Homework</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classDetails.homework.map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold mb-3 ${homeworkStatusBadge[item.status] ?? 'bg-gray-100 text-gray-700'}`}>
                  {item.status}
                </div>
                <div className="font-bold text-gray-900 mb-1 text-sm">{item.title}</div>
                <div className="text-xs text-gray-500 mb-1">{item.subject}</div>
                <div className="text-xs text-gray-400">Due: {item.dueDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="space-y-5">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg p-6 text-white">
              <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">Active Students</div>
              <div className="text-5xl font-extrabold">{classDetails.activeStudents}</div>
              <div className="text-sm text-white/70 mt-1">Present today</div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-red-500 to-rose-500 shadow-lg p-6 text-white">
              <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">Absent Students</div>
              <div className="text-5xl font-extrabold">{classDetails.absentStudents}</div>
              <div className="text-sm text-white/70 mt-1">Not present</div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-sky-500 to-blue-500 shadow-lg p-6 text-white">
              <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-2">Total Students</div>
              <div className="text-5xl font-extrabold">{classDetails.totalStudents}</div>
              <div className="text-sm text-white/70 mt-1">{attendancePct}% attendance rate</div>
            </div>
          </div>

          {/* Attendance progress */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-primary">Attendance Rate</h3>
              <span className="text-2xl font-extrabold text-emerald-700">{attendancePct}%</span>
            </div>
            <div className="h-4 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
                style={{ width: `${attendancePct}%` }}
              />
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />{classDetails.activeStudents} present</span>
              <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400" />{classDetails.absentStudents} absent</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
