'use client';

import Link from 'next/link';
import { secondaryGradeHubs } from '../data';

export default function ClientSecondaryCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Secondary Classes</h1>
        <p className="text-gray-600 max-w-2xl">
          Choose a grade card first. Then open a section card like 6A, 6B, or 6C to view homework, marks, timetable, teachers, subjects, and monitor details.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {secondaryGradeHubs.map((grade) => (
          <Link key={grade.gradeSlug} href={`/dashboard/classes/secondary/${grade.gradeSlug}`} className="block group">
            <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-5 transition-transform group-hover:-translate-y-1">
              <div className={`h-2 rounded-full bg-gradient-to-r ${grade.accent} mb-4`} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{grade.gradeLabel}</h2>
              <div className="text-sm text-gray-600 mb-3">Monitor: {grade.monitor}</div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <div className="text-gray-500">Sections</div>
                  <div className="font-bold text-gray-900">3</div>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <div className="text-gray-500">Subjects</div>
                  <div className="font-bold text-gray-900">{grade.subjects.length}</div>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-center">
                  <div className="text-gray-500">Teacher</div>
                  <div className="font-bold text-gray-900">Class</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}