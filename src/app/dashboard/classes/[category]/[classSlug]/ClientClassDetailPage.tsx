'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { classCategoryLabels, type ClassCategorySlug, type ClassDetails } from '../../data';

type Props = {
  category: ClassCategorySlug;
  classSlug: string;
  classDetails?: ClassDetails;
};

export default function ClientClassDetailPage({ category, classDetails }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'students' | 'timetable' | 'teachers' | 'marks' | 'homework' | 'attendance'>('students');

  if (!classDetails) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-primary mb-4">Class not found</h1>
        <button onClick={() => router.push(`/dashboard/classes/${category}`)} className="text-blue-600 font-semibold">
          Back to {classCategoryLabels[category]}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push(`/dashboard/classes/${category}`)}
          className="text-blue-600 hover:text-blue-800 font-semibold mb-2"
        >
          ← Back to {classCategoryLabels[category]}
        </button>
        <h1 className="text-3xl font-bold text-primary">{classDetails.label}</h1>
        <p className="text-gray-600 mt-2">Manage homework, marks, and student profiles for this class.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-2xl bg-white shadow p-4">
          <div className="text-sm text-gray-500">Class Teacher</div>
          <div className="font-semibold text-gray-900">{classDetails.teacher}</div>
        </div>
        <div className="rounded-2xl bg-white shadow p-4">
          <div className="text-sm text-gray-500">Monitor</div>
          <div className="font-semibold text-gray-900">{classDetails.monitor}</div>
        </div>
        <div className="rounded-2xl bg-white shadow p-4">
          <div className="text-sm text-gray-500">Vice Monitor</div>
          <div className="font-semibold text-gray-900">{classDetails.viceMonitor}</div>
        </div>
        <div className="rounded-2xl bg-white shadow p-4">
          <div className="text-sm text-gray-500">Total Students</div>
          <div className="font-semibold text-gray-900">{classDetails.totalStudents}</div>
        </div>
        <div className="rounded-2xl bg-white shadow p-4">
          <div className="text-sm text-gray-500">Active Students</div>
          <div className="font-semibold text-green-700">{classDetails.activeStudents}</div>
        </div>
        <div className="rounded-2xl bg-white shadow p-4">
          <div className="text-sm text-gray-500">Absent Students</div>
          <div className="font-semibold text-red-700">{classDetails.absentStudents}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {(['students', 'timetable', 'teachers', 'marks', 'homework', 'attendance'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-2xl border px-4 py-4 text-left transition shadow-sm ${activeTab === tab ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary'}`}
          >
            <div className="text-xs uppercase tracking-[0.2em] opacity-80">Class View</div>
            <div className="text-lg font-bold mt-1 capitalize">{tab}</div>
          </button>
        ))}
      </div>

      {activeTab === 'students' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Students</h2>
            <span className="text-sm text-gray-500">{classDetails.students.length} profiles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classDetails.students.map((student) => (
              <div key={student.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="font-bold text-gray-900">{student.name}</div>
                <div className="text-sm text-gray-600">Roll No. {student.rollNo}</div>
                <div className="text-sm text-gray-600 mt-2">Attendance: {student.attendance}</div>
                <div className="text-sm text-gray-600">{student.remark}</div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'timetable' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-primary">Timetable</h2>
          <div className="space-y-3">
            {classDetails.timetable.map((slot) => (
              <div key={`${slot.period}-${slot.subject}`} className="rounded-xl bg-gray-50 p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900">Period {slot.period}</div>
                  <div className="text-sm text-gray-600">{slot.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{slot.subject}</div>
                  <div className="text-sm text-gray-600">{slot.teacher}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'teachers' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-primary">Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {classDetails.teachers.map((item) => (
              <div key={item.subject} className="rounded-xl bg-gray-50 p-4 flex items-center justify-between gap-4">
                <div className="font-semibold text-gray-900">{item.subject}</div>
                <div className="text-sm text-gray-600">{item.teacher}</div>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === 'marks' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-primary">Marks</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-3 py-2">Student</th>
                  {classDetails.subjects.map((subject) => (
                    <th key={subject} className="text-left px-3 py-2">{subject}</th>
                  ))}
                  <th className="text-left px-3 py-2">Average</th>
                </tr>
              </thead>
              <tbody>
                {classDetails.marks.map((row) => (
                  <tr key={row.student} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium">{row.student}</td>
                    {classDetails.subjects.map((subject) => (
                      <td key={subject} className="px-3 py-2">{row.subjects[subject]}</td>
                    ))}
                    <td className="px-3 py-2 font-semibold text-primary">{row.average}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'homework' ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-primary">Homework</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classDetails.homework.map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="text-sm uppercase tracking-[0.15em] text-gray-400 mb-2">{item.status}</div>
                <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                <div className="text-sm text-gray-600">{item.subject}</div>
                <div className="text-sm text-gray-600">Due: {item.dueDate}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-primary">Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-green-50 p-4">
              <div className="text-sm text-green-700">Active Students</div>
              <div className="text-2xl font-bold text-green-900">{classDetails.activeStudents}</div>
            </div>
            <div className="rounded-xl bg-red-50 p-4">
              <div className="text-sm text-red-700">Absent Students</div>
              <div className="text-2xl font-bold text-red-900">{classDetails.absentStudents}</div>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="text-sm text-blue-700">Total Students</div>
              <div className="text-2xl font-bold text-blue-900">{classDetails.totalStudents}</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}