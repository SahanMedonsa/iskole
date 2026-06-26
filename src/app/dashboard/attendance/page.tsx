"use client";
import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import ClassAttendanceStatus from '../../../components/ClassAttendanceStatus';
import StudentAttendancePage from './student-attendance/page';
import TeacherAttendancePage from './teacher-attendance/page';

export default function AttendancePage() {
  const [tab, setTab] = useState('student');
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-6">

          {/* Page header */}
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Attendance</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
            </p>
          </div>

          {/* Today's class attendance status */}
          <ClassAttendanceStatus />

          {/* Student / Teacher tabs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-gray-100">
              {(['student','teacher'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-6 py-3.5 text-sm font-semibold transition-colors ${
                    tab === t
                      ? 'text-[#3E4EFA] border-b-2 border-[#3E4EFA] bg-[#3E4EFA]/5'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t === 'student' ? 'Student Attendance' : 'Teacher Attendance'}
                </button>
              ))}
            </div>
            <div className="p-6">
              {tab === 'student' ? <StudentAttendancePage /> : <TeacherAttendancePage />}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
} 