'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { secondaryGradeHubs } from '../data';

const gradeColors: Record<string, { accent: string; badge: string; badgeText: string }> = {
  'grade-6': { accent: 'from-emerald-500 to-teal-500', badge: 'bg-emerald-50', badgeText: 'text-emerald-700' },
  'grade-7': { accent: 'from-teal-500 to-cyan-500', badge: 'bg-teal-50', badgeText: 'text-teal-700' },
  'grade-8': { accent: 'from-cyan-500 to-sky-500', badge: 'bg-cyan-50', badgeText: 'text-cyan-700' },
  'grade-9': { accent: 'from-sky-500 to-blue-500', badge: 'bg-sky-50', badgeText: 'text-sky-700' },
  'grade-10': { accent: 'from-blue-500 to-indigo-500', badge: 'bg-blue-50', badgeText: 'text-blue-700' },
  'grade-11': { accent: 'from-indigo-500 to-violet-500', badge: 'bg-indigo-50', badgeText: 'text-indigo-700' },
};

export default function ClientSecondaryCategoryPage() {
  const router = useRouter();

  const totalStudents = secondaryGradeHubs.reduce((sum, g) => sum + g.sections.reduce((s, sec) => s + sec.studentCount, 0), 0);
  const totalSections = secondaryGradeHubs.reduce((sum, g) => sum + g.sections.length, 0);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 rounded-3xl p-8 text-white mb-8">
        <button
          onClick={() => router.push('/dashboard/classes')}
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white font-semibold mb-4 transition"
        >
          ← Back to Classes
        </button>
        <div className="text-xs uppercase tracking-[0.25em] text-white/70 mb-2">Class Category</div>
        <h1 className="text-4xl font-extrabold mb-2">Secondary Classes</h1>
        <p className="text-white/80 max-w-xl leading-relaxed">
          Choose a grade to manage its sections. Each section has homework, marks, timetable, teachers, and attendance records.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">6</div>
            <div className="text-sm text-white/70">Grades</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{totalSections}</div>
            <div className="text-sm text-white/70">Sections</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{totalStudents}</div>
            <div className="text-sm text-white/70">Total Students</div>
          </div>
        </div>
      </div>

      {/* Grade Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {secondaryGradeHubs.map((grade) => {
          const colors = gradeColors[grade.gradeSlug] ?? { accent: 'from-emerald-500 to-teal-500', badge: 'bg-emerald-50', badgeText: 'text-emerald-700' };
          const totalStudentsInGrade = grade.sections.reduce((s, sec) => s + sec.studentCount, 0);
          const totalActiveInGrade = grade.sections.reduce((s, sec) => s + sec.activeStudents, 0);

          return (
            <Link key={grade.gradeSlug} href={`/dashboard/classes/secondary/${grade.gradeSlug}`} className="block group">
              <div className="rounded-3xl bg-white shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl h-full">
                {/* Top gradient strip */}
                <div className={`h-1.5 bg-gradient-to-r ${colors.accent}`} />

                <div className="p-6">
                  {/* Grade label */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">Secondary</div>
                      <h2 className="text-2xl font-extrabold text-gray-900">{grade.gradeLabel}</h2>
                    </div>
                    <div className={`rounded-2xl ${colors.badge} ${colors.badgeText} px-3 py-1.5 text-sm font-bold`}>
                      {grade.sections.length} sections
                    </div>
                  </div>

                  {/* Monitor */}
                  <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3 mb-4">
                    <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${colors.accent} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {grade.monitor.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Grade Monitor</div>
                      <div className="text-sm font-semibold text-gray-900">{grade.monitor}</div>
                    </div>
                  </div>

                  {/* Section pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {grade.sections.map((section) => (
                      <span key={section.slug} className={`rounded-full ${colors.badge} ${colors.badgeText} px-3 py-1 text-xs font-bold`}>
                        {section.label}
                      </span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-xs text-gray-500 mb-0.5">Total</div>
                      <div className="font-extrabold text-gray-900">{totalStudentsInGrade}</div>
                    </div>
                    <div className="rounded-xl bg-green-50 p-3">
                      <div className="text-xs text-green-600 mb-0.5">Active</div>
                      <div className="font-extrabold text-green-800">{totalActiveInGrade}</div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-xs text-gray-500 mb-0.5">Subjects</div>
                      <div className="font-extrabold text-gray-900">{grade.subjects.length}</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 px-6 py-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 truncate">{grade.subjects.slice(0, 3).join(' · ')}</span>
                    <span className={`${colors.badgeText} font-semibold transition-transform duration-200 group-hover:translate-x-1`}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
