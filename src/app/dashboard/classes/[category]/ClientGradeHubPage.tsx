'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { secondaryGradeHubs } from '../data';

type Props = {
  gradeSlug: string;
};

export default function ClientGradeHubPage({ gradeSlug }: Props) {
  const grade = useMemo(
    () => secondaryGradeHubs.find((item) => item.gradeSlug === gradeSlug),
    [gradeSlug]
  );

  if (!grade) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Grade not found</h1>
        <p className="text-gray-600">Go back to Secondary Classes and choose a valid grade.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">{grade.gradeLabel}</h1>
          <p className="text-gray-600 max-w-2xl">Choose a class card.</p>
        </div>
        <Link href="/dashboard/classes/secondary" className="text-blue-600 hover:text-blue-800 font-semibold">
          ← Back to Secondary Classes
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {grade.sections.map((section) => (
          <Link key={section.slug} href={`/dashboard/classes/secondary/${grade.gradeSlug}/${section.slug}`} className="block">
            <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-5 hover:bg-blue-50 transition h-full space-y-3 text-center">
              <div className="text-3xl font-bold text-primary">{section.label}</div>
              <div className="text-sm text-gray-500">{section.studentCount} total students</div>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="rounded-lg bg-white p-2 shadow-sm">
                  <div className="text-gray-500">Total</div>
                  <div className="font-bold text-gray-900">{section.studentCount}</div>
                </div>
                <div className="rounded-lg bg-white p-2 shadow-sm">
                  <div className="text-gray-500">Active</div>
                  <div className="font-bold text-green-700">{section.activeStudents}</div>
                </div>
                <div className="rounded-lg bg-white p-2 shadow-sm">
                  <div className="text-gray-500">Absent</div>
                  <div className="font-bold text-red-700">{section.absentStudents}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}