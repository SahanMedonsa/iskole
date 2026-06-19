'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { secondaryGradeHubs } from '../data';

type Props = {
  gradeSlug: string;
};

const sectionColors = [
  { bg: 'bg-gradient-to-br from-sky-500 to-cyan-500', light: 'bg-sky-50', text: 'text-sky-700', badge: 'bg-sky-100 text-sky-800' },
  { bg: 'bg-gradient-to-br from-violet-500 to-fuchsia-500', light: 'bg-violet-50', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-800' },
  { bg: 'bg-gradient-to-br from-amber-500 to-orange-500', light: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800' },
];

export default function ClientGradeHubPage({ gradeSlug }: Props) {
  const grade = useMemo(
    () => secondaryGradeHubs.find((item) => item.gradeSlug === gradeSlug),
    [gradeSlug]
  );

  if (!grade) {
    return (
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-primary mb-2">Grade not found</h1>
        <p className="text-gray-600 mb-4">Go back to Secondary Classes and choose a valid grade.</p>
        <Link href="/dashboard/classes/secondary" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition">
          ← Back to Secondary
        </Link>
      </div>
    );
  }

  const totalStudents = grade.sections.reduce((s, sec) => s + sec.studentCount, 0);
  const totalActive = grade.sections.reduce((s, sec) => s + sec.activeStudents, 0);
  const totalAbsent = grade.sections.reduce((s, sec) => s + sec.absentStudents, 0);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${grade.accent} rounded-3xl p-8 text-white`}>
        <Link
          href="/dashboard/classes/secondary"
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white font-semibold mb-4 transition"
        >
          ← Back to Secondary Classes
        </Link>
        <div className="text-xs uppercase tracking-[0.25em] text-white/70 mb-2">Secondary · Grade Hub</div>
        <h1 className="text-4xl font-extrabold mb-2">{grade.gradeLabel}</h1>
        <p className="text-white/80 max-w-xl leading-relaxed">
          Select a section to view homework, marks, timetable, teachers, attendance, and student profiles.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{grade.sections.length}</div>
            <div className="text-sm text-white/70">Sections</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{totalStudents}</div>
            <div className="text-sm text-white/70">Total Students</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{totalActive}</div>
            <div className="text-sm text-white/70">Active Today</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{grade.subjects.length}</div>
            <div className="text-sm text-white/70">Subjects</div>
          </div>
        </div>
      </div>

      {/* Grade Overview: Monitor + Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Grade Monitor</div>
          <div className="flex items-center gap-4">
            <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${grade.accent} flex items-center justify-center text-white text-xl font-extrabold`}>
              {grade.monitor.charAt(0)}
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{grade.monitor}</div>
              <div className="text-sm text-gray-500">{grade.gradeLabel} student monitor</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Subjects</div>
          <div className="flex flex-wrap gap-2">
            {grade.subjects.map((subject) => (
              <span key={subject} className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700">
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {grade.sections.map((section, index) => {
            const colors = sectionColors[index % sectionColors.length];
            const attendancePct = Math.round((section.activeStudents / section.studentCount) * 100);

            return (
              <Link
                key={section.slug}
                href={`/dashboard/classes/secondary/${grade.gradeSlug}/${section.slug}`}
                className="block group"
              >
                <div className="rounded-3xl bg-white shadow-lg border border-gray-100 overflow-hidden h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {/* Section header gradient */}
                  <div className={`${colors.bg} p-6 text-white`}>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-1">{grade.gradeLabel}</div>
                    <div className="text-5xl font-extrabold tracking-tight">{section.label}</div>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Teacher */}
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-xl ${colors.light} ${colors.text} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                        {section.classTeacher.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Class Teacher</div>
                        <div className="text-sm font-semibold text-gray-900 truncate">{section.classTeacher}</div>
                      </div>
                    </div>

                    {/* Attendance progress */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-gray-500">Attendance today</span>
                        <span className={`font-bold ${colors.text}`}>{attendancePct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${colors.bg}`}
                          style={{ width: `${attendancePct}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="rounded-xl bg-gray-50 p-2.5">
                        <div className="text-xs text-gray-500">Total</div>
                        <div className="font-extrabold text-gray-900">{section.studentCount}</div>
                      </div>
                      <div className="rounded-xl bg-green-50 p-2.5">
                        <div className="text-xs text-green-600">Active</div>
                        <div className="font-extrabold text-green-800">{section.activeStudents}</div>
                      </div>
                      <div className="rounded-xl bg-red-50 p-2.5">
                        <div className="text-xs text-red-500">Absent</div>
                        <div className="font-extrabold text-red-800">{section.absentStudents}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 px-5 py-3">
                    <div className={`text-sm font-semibold ${colors.text} flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1`}>
                      <span>Open section</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Timetable preview */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-primary mb-4">Timetable Preview</h3>
        <div className="space-y-2">
          {grade.timetable.map((slot) => (
            <div key={slot.period} className="flex items-center gap-4 rounded-2xl bg-gray-50 px-4 py-3">
              <div className="w-20 shrink-0">
                <div className="text-xs font-semibold text-gray-400 uppercase">Period {slot.period}</div>
                <div className="text-xs text-gray-500">{slot.time}</div>
              </div>
              <div className="h-8 w-px bg-gray-200 shrink-0" />
              <div className="font-semibold text-gray-900">{slot.subject}</div>
              <div className="ml-auto text-sm text-gray-500">{slot.teacher}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
