'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { gradeHubsByCategory, type ClassCategorySlug } from '../data';

type Props = {
  gradeSlug: string;
  category: 'primary' | 'secondary';
};

type LocalSection = {
  slug: string;
  label: string;
  classTeacher: string;
  studentCount: number;
  activeStudents: number;
  absentStudents: number;
  isNew?: boolean;
};

const sectionColors = [
  { bg: 'bg-gradient-to-br from-sky-500 to-cyan-500', light: 'bg-sky-50', text: 'text-sky-700' },
  { bg: 'bg-gradient-to-br from-violet-500 to-fuchsia-500', light: 'bg-violet-50', text: 'text-violet-700' },
  { bg: 'bg-gradient-to-br from-amber-500 to-orange-500', light: 'bg-amber-50', text: 'text-amber-700' },
  { bg: 'bg-gradient-to-br from-rose-500 to-pink-500', light: 'bg-rose-50', text: 'text-rose-700' },
  { bg: 'bg-gradient-to-br from-teal-500 to-emerald-500', light: 'bg-teal-50', text: 'text-teal-700' },
  { bg: 'bg-gradient-to-br from-indigo-500 to-blue-500', light: 'bg-indigo-50', text: 'text-indigo-700' },
];

const categoryLabel: Record<'primary' | 'secondary', string> = {
  primary: 'Primary Classes',
  secondary: 'Secondary Classes',
};

export default function ClientGradeHubPage({ gradeSlug, category }: Props) {
  const grade = useMemo(
    () => (gradeHubsByCategory[category as ClassCategorySlug] ?? []).find(
      (item) => item.gradeSlug === gradeSlug
    ),
    [gradeSlug, category]
  );

  const [sections, setSections] = useState<LocalSection[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [error, setError] = useState('');

  if (!grade) {
    return (
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-primary mb-2">Grade not found</h1>
        <p className="text-gray-600 mb-4">Go back and choose a valid grade.</p>
        <Link href={`/dashboard/classes/${category}`} className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition">
          ← Back to {categoryLabel[category]}
        </Link>
      </div>
    );
  }

  // Merge static sections with locally created ones
  const allSections: LocalSection[] = [
    ...grade.sections.map((s) => ({ ...s, isNew: false })),
    ...sections,
  ];

  const gradeNumber = grade.gradeSlug.replace('grade-', '');
  const nextLetter = String.fromCharCode(65 + allSections.length); // A=65
  const nextLabel = `${gradeNumber}${nextLetter}`;
  const nextSlug = `${gradeNumber}${nextLetter.toLowerCase()}`;

  const totalStudents = allSections.reduce((s, sec) => s + sec.studentCount, 0);
  const totalActive = allSections.reduce((s, sec) => s + sec.activeStudents, 0);
  const sectionalHead = grade.sections[0]?.classTeacher ?? '';

  function handleCreate() {
    if (!teacherName.trim()) {
      setError('Please enter a class teacher name.');
      return;
    }
    setSections((prev) => [
      ...prev,
      {
        slug: nextSlug,
        label: nextLabel,
        classTeacher: teacherName.trim(),
        studentCount: 0,
        activeStudents: 0,
        absentStudents: 0,
        isNew: true,
      },
    ]);
    setTeacherName('');
    setError('');
    setModalOpen(false);
  }

  function handleClose() {
    setTeacherName('');
    setError('');
    setModalOpen(false);
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className={`bg-gradient-to-br ${grade.accent} rounded-3xl p-8 text-white`}>
        <Link
          href={`/dashboard/classes/${category}`}
          className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white font-semibold mb-4 transition"
        >
          ← Back to {categoryLabel[category]}
        </Link>
        <div className="text-xs uppercase tracking-[0.25em] text-white/70 mb-2">{categoryLabel[category]} · Grade Hub</div>
        <h1 className="text-4xl font-extrabold mb-2">{grade.gradeLabel}</h1>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/15 rounded-2xl px-5 py-3">
            <div className="text-2xl font-extrabold">{allSections.length}</div>
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

      {/* Sectional Head */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg p-6 text-white">
        <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-3">Sectional Head</div>
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-extrabold flex-shrink-0">
            {sectionalHead.charAt(0)}
          </div>
          <div>
            <div className="text-xl font-extrabold">{sectionalHead}</div>
            <div className="text-sm text-white/70">{grade.gradeLabel} · Sectional Head</div>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Sections</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#212B36] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#2d3a47] transition-colors shadow-sm"
          >
            <span className="text-lg leading-none">+</span>
            New Section
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {allSections.map((section, index) => {
            const colors = sectionColors[index % sectionColors.length];
            const attendancePct = section.studentCount > 0
              ? Math.round((section.activeStudents / section.studentCount) * 100)
              : 0;

            const cardContent = (
              <div className="rounded-3xl bg-white shadow-lg border border-gray-100 overflow-hidden h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <div className={`${colors.bg} p-6 text-white relative`}>
                  {section.isNew && (
                    <span className="absolute top-3 right-3 rounded-full bg-white/25 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide">
                      New
                    </span>
                  )}
                  <div className="text-xs uppercase tracking-[0.2em] text-white/70 mb-1">{grade.gradeLabel}</div>
                  <div className="text-5xl font-extrabold tracking-tight">{section.label}</div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-xl ${colors.light} ${colors.text} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                      {section.classTeacher.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Class Teacher</div>
                      <div className="text-sm font-semibold text-gray-900 truncate">{section.classTeacher}</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-500">Attendance today</span>
                      <span className={`font-bold ${colors.text}`}>{attendancePct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className={`h-full rounded-full ${colors.bg}`} style={{ width: `${attendancePct}%` }} />
                    </div>
                  </div>

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
            );

            if (section.isNew) {
              return (
                <div key={section.slug} className="block group">
                  {cardContent}
                </div>
              );
            }

            return (
              <Link
                key={section.slug}
                href={`/dashboard/classes/${category}/${grade.gradeSlug}/${section.slug}`}
                className="block group"
              >
                {cardContent}
              </Link>
            );
          })}

          {/* Add Section Placeholder */}
          <button
            onClick={() => setModalOpen(true)}
            className="group rounded-3xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center gap-3 hover:border-[#212B36] hover:bg-gray-50 transition-all duration-200 min-h-[220px]"
          >
            <div className="h-14 w-14 rounded-2xl bg-gray-100 group-hover:bg-[#212B36] flex items-center justify-center transition-colors">
              <span className="text-2xl font-bold text-gray-400 group-hover:text-white transition-colors">+</span>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-500 group-hover:text-[#212B36] transition-colors">Add Section {nextLetter}</div>
              <div className="text-xs text-gray-400 mt-0.5">Create section {nextLabel}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Create Section Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-1">{grade.gradeLabel}</div>
                <h2 className="text-2xl font-extrabold text-gray-900">Create New Section</h2>
              </div>
              <button
                onClick={handleClose}
                className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Section Label Preview */}
            <div className="mb-6 rounded-2xl bg-[#212B36] p-5 text-white flex items-center gap-4">
              <div className="text-5xl font-extrabold tracking-tight">{nextLabel}</div>
              <div>
                <div className="text-sm font-semibold">{grade.gradeLabel} — Section {nextLetter}</div>
                <div className="text-xs text-white/60 mt-0.5">
                  {allSections.length > 0
                    ? `Follows sections ${allSections.map((s) => s.label).join(', ')}`
                    : 'First section in this grade'}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Class Teacher <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => { setTeacherName(e.target.value); setError(''); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  placeholder="e.g. Ms. Dilani Senanayake"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#212B36] focus:border-transparent transition"
                  autoFocus
                />
                {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
              </div>

              <div className="rounded-xl bg-gray-50 px-4 py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                  {nextLabel}
                </div>
                <div className="text-xs text-gray-500">
                  Section <strong>{nextLetter}</strong> will be added to <strong>{grade.gradeLabel}</strong> with <strong>0 students</strong> initially.
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 rounded-xl bg-[#212B36] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2d3a47] transition-colors"
              >
                Create Section {nextLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
