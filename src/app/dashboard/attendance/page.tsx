"use client";
import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import StudentAttendancePage from './student-attendance/page';
import TeacherAttendancePage from './teacher-attendance/page';

export default function AttendancePage() {
  const [tab, setTab] = useState('student');
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4 text-primary">Attendance</h1>
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded font-semibold transition-colors ${tab === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setTab('student')}
            >
              Student Attendance
            </button>
            <button
              className={`px-4 py-2 rounded font-semibold transition-colors ${tab === 'teacher' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setTab('teacher')}
            >
              Teacher Attendance
            </button>
          </div>
          {tab === 'student' ? (
            <StudentAttendancePage />
          ) : (
            <TeacherAttendancePage />
          )}
        </main>
      </div>
    </div>
  );
} 