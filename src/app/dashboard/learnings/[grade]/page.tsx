"use client";
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const initialSubjectsByGrade = {
  1: [
    { name: 'Mathematics', professional: 'Mr. Perera' },
    { name: 'English', professional: 'Ms. Silva' },
    { name: 'Environmental Studies', professional: 'Ms. Fernando' },
  ],
  2: [
    { name: 'Mathematics', professional: 'Mr. Perera' },
    { name: 'English', professional: 'Ms. Silva' },
    { name: 'Environmental Studies', professional: 'Ms. Fernando' },
  ],
  // ...add for other grades as needed
};

export default function GradeSubjectsPage({ params }) {
  const { grade } = params;
  const router = useRouter();
  const [subjects, setSubjects] = useState(initialSubjectsByGrade[grade] || []);
  const [openSubject, setOpenSubject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: '', professional: '' });

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!form.name || !form.professional) return;
    setSubjects([...subjects, { name: form.name, professional: form.professional }]);
    setForm({ name: '', professional: '' });
    setShowAddModal(false);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <button
            onClick={() => router.push('/dashboard/learnings')}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold px-2 py-2 rounded transition cursor-pointer mb-4"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Classes
          </button>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary mb-4">Subjects for Class {grade}</h1>
            <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">+ Add Subject</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {subjects.map((subject, idx) => (
              <div key={subject.name} className="bg-white rounded-xl shadow p-0">
                <button
                  className="w-full flex justify-between items-center p-6 text-xl font-bold text-blue-700 focus:outline-none rounded-t-xl"
                  onClick={() => setOpenSubject(openSubject === idx ? null : idx)}
                >
                  <span>{subject.name}</span>
                  <span>{openSubject === idx ? '▲' : '▼'}</span>
                </button>
                {openSubject === idx && (
                  <div className="border-t px-6 pb-4 text-gray-700">
                    <div className="mb-2"><b>Professional:</b> {subject.professional}</div>
                    <Link href={`/dashboard/learnings/${grade}/${encodeURIComponent(subject.name)}`} className="inline-block mt-2 bg-blue-500 text-white px-3 py-1 rounded font-semibold hover:bg-blue-600 transition text-sm">Go to Lessons</Link>
                  </div>
                )}
                {openSubject !== idx && (
                  <Link href={`/dashboard/learnings/${grade}/${encodeURIComponent(subject.name)}`} className="block px-6 pb-4 text-center text-blue-600 hover:underline rounded-b-xl">Go to Lessons</Link>
                )}
              </div>
            ))}
          </div>

          {/* Add Subject Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <form onSubmit={handleAddSubject} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Subject</h2>
                <input type="text" placeholder="Subject Name" className="border rounded px-3 py-2 w-full mb-2" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                <input type="text" placeholder="Professional/Teacher" className="border rounded px-3 py-2 w-full mb-4" value={form.professional} onChange={e => setForm(f => ({ ...f, professional: e.target.value }))} required />
                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold">Add Subject</button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}