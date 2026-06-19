'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { classCategoryLabels, classGroupsByCategory, type ClassCategorySlug } from '../data';

type Props = {
  category: ClassCategorySlug;
};

const categoryMeta: Record<ClassCategorySlug, { icon: string; gradient: string; description: string }> = {
  primary: {
    icon: '🌱',
    gradient: 'from-sky-600 via-sky-500 to-cyan-500',
    description: 'Foundation grades for young learners — homework, marks, and student profiles.',
  },
  secondary: {
    icon: '📚',
    gradient: 'from-emerald-600 via-teal-500 to-cyan-500',
    description: 'Middle and upper school with full subject coverage and section management.',
  },
  advanced: {
    icon: '🎓',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    description: 'Stream-based A/L classes with advanced subject tracking and rankings.',
  },
};

const statusBadge = {
  Reviewed: 'bg-emerald-100 text-emerald-700',
  Submitted: 'bg-sky-100 text-sky-700',
  Pending: 'bg-amber-100 text-amber-700',
};

export default function ClientClassCategoryPage({ category }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'homework' | 'marks'>('overview');
  const groups = classGroupsByCategory[category];
  const label = classCategoryLabels[category];
  const meta = categoryMeta[category];

  const totalStudents = groups.reduce((s, g) => s + g.studentCount, 0);
  const avgMarks = Math.round(groups.reduce((s, g) => s + g.marksAverage, 0) / groups.length);
  const totalHomework = groups.reduce((s, g) => s + g.homeworkCount, 0);

  const tabs = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'homework' as const, label: 'Homework' },
    { key: 'marks' as const, label: 'Marks' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${meta.gradient} rounded-3xl p-8 text-white`}>
        <button
          onClick={() => router.push('/dashboard/classes')}
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white font-semibold mb-4 transition"
        >
          ← Back to Classes
        </button>
        <div className="flex items-start gap-4">
          <div className="text-5xl">{meta.icon}</div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/70 mb-1">Class Category</div>
            <h1 className="text-4xl font-extrabold mb-2">{label} Classes</h1>
            <p className="text-white/80 max-w-xl leading-relaxed">{meta.description}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{groups.length}</div>
            <div className="text-sm text-white/70">Classes</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{totalStudents}</div>
            <div className="text-sm text-white/70">Students</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{avgMarks}%</div>
            <div className="text-sm text-white/70">Avg Marks</div>
          </div>
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{totalHomework}</div>
            <div className="text-sm text-white/70">Homework Items</div>
          </div>
        </div>
      </div>

      {/* Sticky Tab Bar */}
      <div className="sticky top-0 z-10 rounded-2xl shadow-lg border border-white/40 p-1.5 bg-sky-600">
        <div className="grid grid-cols-3 gap-1.5">
          {tabs.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-xl px-4 py-2.5 text-left transition-all duration-200 ${active ? 'bg-white text-sky-700 shadow-md ring-2 ring-white/80' : 'bg-white/10 text-white/90 hover:bg-white/20'}`}
              >
                <div className="text-sm font-semibold">{tab.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group) => (
            <Link key={group.slug} href={`/dashboard/classes/${category}/${group.slug}`} className="block group">
              <div className="rounded-3xl bg-white shadow-lg border border-gray-100 overflow-hidden h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className={`h-1.5 bg-gradient-to-r ${group.accent}`} />
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">{group.subtitle}</div>
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{group.label}</h2>
                  <p className="text-sm text-gray-500 mb-5">{group.teacher}</p>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <div className="text-xs text-gray-500 mb-0.5">Students</div>
                      <div className="font-extrabold text-gray-900">{group.studentCount}</div>
                    </div>
                    <div className="rounded-xl bg-amber-50 p-3">
                      <div className="text-xs text-amber-600 mb-0.5">Homework</div>
                      <div className="font-extrabold text-amber-800">{group.homeworkCount}</div>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-3">
                      <div className="text-xs text-emerald-600 mb-0.5">Avg</div>
                      <div className="font-extrabold text-emerald-800">{group.marksAverage}%</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.subjects.slice(0, 4).map((subject) => (
                      <span key={subject} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-gray-100 px-6 py-3">
                  <div className="text-sm font-semibold text-sky-600 flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-1">
                    <span>Open class</span><span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'homework' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-primary mb-5">Homework Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map((group) => (
                <div key={group.slug} className="rounded-2xl border border-gray-100 p-4">
                  <div className={`h-1 rounded-full bg-gradient-to-r ${group.accent} mb-3`} />
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-bold text-gray-900">{group.label}</div>
                      <div className="text-sm text-gray-500">{group.teacher}</div>
                    </div>
                    <span className="rounded-2xl bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700">
                      {group.homeworkCount} items
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Reviewed', 'Submitted', 'Pending'] as const).map((status) => (
                      <span key={status} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadge[status]}`}>
                        {status}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'marks' && (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-primary mb-5">Marks Overview</h2>
          <div className="space-y-3">
            {[...groups].sort((a, b) => b.marksAverage - a.marksAverage).map((group, index) => {
              const pct = group.marksAverage;
              const barColor = pct >= 90 ? 'from-emerald-500 to-teal-500' : pct >= 80 ? 'from-sky-500 to-cyan-500' : 'from-amber-500 to-orange-500';
              return (
                <div key={group.slug} className="flex items-center gap-4 rounded-2xl bg-gray-50 p-4">
                  <div className="w-6 text-center font-extrabold text-gray-400 text-sm shrink-0">#{index + 1}</div>
                  <div className="w-28 shrink-0">
                    <div className="font-semibold text-gray-900 text-sm">{group.label}</div>
                    <div className="text-xs text-gray-500 truncate">{group.teacher}</div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className={`text-sm font-extrabold shrink-0 ${pct >= 90 ? 'text-emerald-700' : pct >= 80 ? 'text-sky-700' : 'text-amber-700'}`}>
                    {pct}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
