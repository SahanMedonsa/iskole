'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { classCategoryLabels, classGroupsByCategory, type ClassCategorySlug } from '../data';

type Props = {
  category: ClassCategorySlug;
};

export default function ClientClassCategoryPage({ category }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'homework' | 'marks'>('homework');
  const groups = classGroupsByCategory[category];
  const label = classCategoryLabels[category];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <button
            onClick={() => router.push('/dashboard/classes')}
            className="text-blue-600 hover:text-blue-800 font-semibold mb-2"
          >
            ← Back to Classes
          </button>
          <h1 className="text-3xl font-bold text-primary">{label} Classes</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Switch between homework and marks, then open a class card to view all students in that class.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
          {(['homework', 'marks'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`min-w-[140px] rounded-2xl border px-4 py-4 text-left transition shadow-sm ${activeTab === tab ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary'}`}
            >
              <div className="text-xs uppercase tracking-[0.2em] opacity-80">Explore</div>
              <div className="text-lg font-bold mt-1">{tab === 'homework' ? 'Homework' : 'Marks'}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((group) => (
          <Link key={group.slug} href={`/dashboard/classes/${category}/${group.slug}`} className="block group">
            <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-5 transition-transform group-hover:-translate-y-1">
              <div className={`h-2 rounded-full bg-gradient-to-r ${group.accent} mb-4`} />
              <div className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-2">{activeTab === 'homework' ? 'Homework Hub' : 'Marks Hub'}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{group.label}</h2>
              <p className="text-sm text-gray-600 mb-4">{group.teacher}</p>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="text-gray-500">Students</div>
                  <div className="font-bold text-gray-900">{group.studentCount}</div>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="text-gray-500">Homework</div>
                  <div className="font-bold text-gray-900">{group.homeworkCount}</div>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <div className="text-gray-500">Marks</div>
                  <div className="font-bold text-gray-900">{group.marksAverage}%</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-primary mb-4">{activeTab === 'homework' ? 'Homework View' : 'Marks View'}</h2>
        <p className="text-gray-600 mb-4">
          {activeTab === 'homework'
            ? 'This tab can show the homework overview for every class in the selected category.'
            : 'This tab can show the marks overview for every class in the selected category.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div key={group.slug} className="rounded-xl bg-gray-50 p-4">
              <div className="font-semibold text-gray-900">{group.label}</div>
              <div className="text-sm text-gray-600">{group.subjects.join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
