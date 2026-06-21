'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gradeHubsByCategory, type ClassCategorySlug } from '../data';

type Props = {
  category: 'primary' | 'secondary';
};

const categoryMeta: Record<'primary' | 'secondary', { gradient: string; label: string; range: string; badgeFn: (accent: string) => { badge: string; text: string } }> = {
  primary: {
    gradient: 'from-sky-600 via-blue-500 to-indigo-500',
    label: 'Primary Classes',
    range: 'Grades 1 – 5',
  },
  secondary: {
    gradient: 'from-emerald-600 via-teal-500 to-cyan-500',
    label: 'Secondary Classes',
    range: 'Grades 6 – 11',
  },
} as Record<'primary' | 'secondary', { gradient: string; label: string; range: string; badgeFn: (accent: string) => { badge: string; text: string } }>;

function badgeFromAccent(accent: string): { badge: string; text: string } {
  if (accent.includes('fuchsia')) return { badge: 'bg-fuchsia-50', text: 'text-fuchsia-700' };
  if (accent.includes('purple')) return { badge: 'bg-purple-50', text: 'text-purple-700' };
  if (accent.includes('violet')) return { badge: 'bg-violet-50', text: 'text-violet-700' };
  if (accent.includes('indigo')) return { badge: 'bg-indigo-50', text: 'text-indigo-700' };
  if (accent.includes('blue')) return { badge: 'bg-blue-50', text: 'text-blue-700' };
  if (accent.includes('sky')) return { badge: 'bg-sky-50', text: 'text-sky-700' };
  if (accent.includes('cyan')) return { badge: 'bg-cyan-50', text: 'text-cyan-700' };
  if (accent.includes('teal')) return { badge: 'bg-teal-50', text: 'text-teal-700' };
  if (accent.includes('emerald')) return { badge: 'bg-emerald-50', text: 'text-emerald-700' };
  return { badge: 'bg-gray-50', text: 'text-gray-700' };
}

export default function ClientSecondaryCategoryPage({ category }: Props) {
  const router = useRouter();
  const gradeHubs = gradeHubsByCategory[category as ClassCategorySlug] ?? [];
  const meta = categoryMeta[category];

  const totalStudents = gradeHubs.reduce(
    (sum, g) => sum + g.sections.reduce((s, sec) => s + sec.studentCount, 0),
    0
  );
  const totalSections = gradeHubs.reduce((sum, g) => sum + g.sections.length, 0);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${meta.gradient} rounded-3xl p-8 text-white mb-8`}>
        <button
          onClick={() => router.push('/dashboard/classes')}
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white font-semibold mb-4 transition"
        >
          ← Back to Classes
        </button>
        <h1 className="text-4xl font-extrabold mb-2">{meta.label}</h1>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{gradeHubs.length}</div>
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
        {gradeHubs.map((grade) => {
          const colors = badgeFromAccent(grade.accent);
          const totalStudentsInGrade = grade.sections.reduce((s, sec) => s + sec.studentCount, 0);
          const totalActiveInGrade = grade.sections.reduce((s, sec) => s + sec.activeStudents, 0);
          const sectionalHead = grade.sections[0]?.classTeacher ?? '';

          return (
            <Link key={grade.gradeSlug} href={`/dashboard/classes/${category}/${grade.gradeSlug}`} className="block group">
              <div className="rounded-3xl bg-white shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl h-full">
                <div className={`h-1.5 bg-gradient-to-r ${grade.accent}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">{meta.range}</div>
                      <h2 className="text-2xl font-extrabold text-gray-900">{grade.gradeLabel}</h2>
                    </div>
                    <div className={`rounded-2xl ${colors.badge} ${colors.text} px-3 py-1.5 text-sm font-bold`}>
                      {grade.sections.length} sections
                    </div>
                  </div>

                  {/* Sectional Head */}
                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-3 mb-4">
                    <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${grade.accent} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {sectionalHead.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">Sectional Head</div>
                      <div className="text-sm font-semibold text-gray-900">{sectionalHead}</div>
                    </div>
                  </div>

                  {/* Section pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {grade.sections.map((section) => (
                      <span key={section.slug} className={`rounded-full ${colors.badge} ${colors.text} px-3 py-1 text-xs font-bold`}>
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
                    <span className="text-gray-400 truncate">{grade.subjects.join(' · ')}</span>
                    <span className={`${colors.text} font-semibold transition-transform duration-200 group-hover:translate-x-1`}>→</span>
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
