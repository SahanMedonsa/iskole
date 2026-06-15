"use client";
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

const stats = [
  { label: 'Total Teachers', value: 120 },
  { label: 'New Teachers This Month', value: 5 },
  { label: 'Active Teachers Today', value: 110 },
  { label: 'Teachers Absent Today', value: 10 },
  { label: 'Class Teachers Assigned', value: 30 },
  { label: 'Unassigned Teachers', value: 8 },
  { label: 'Male', value: 60 },
  { label: 'Female', value: 60 },
  { label: 'Subjects Covered', value: 15 },
  { label: 'Subjects Uncovered', value: 2 },
];

const teacherList = [
  { name: 'Ms. Nadeesha', id: 'T1001', grades: '6, 7', subjects: 'Science', status: 'Present', phone: '0712345678', email: 'nadeesha@school.lk' },
  { name: 'Mr. Ruwan', id: 'T1002', grades: '10, 11', subjects: 'Maths', status: 'Absent', phone: '0723456789', email: 'ruwan@school.lk' },
  { name: 'Mrs. Kanchana', id: 'T1003', grades: '1', subjects: 'Class Teacher', status: 'Present', phone: '0734567890', email: 'kanchana@school.lk' },
];

const gradeBar = [
  { grade: 1, count: 5 }, { grade: 2, count: 6 }, { grade: 3, count: 7 }, { grade: 4, count: 8 }, { grade: 5, count: 9 },
  { grade: 6, count: 10 }, { grade: 7, count: 8 }, { grade: 8, count: 7 }, { grade: 9, count: 6 }, { grade: 10, count: 8 },
  { grade: 11, count: 10 }, { grade: 12, count: 12 }, { grade: 13, count: 14 },
];

const subjectPie = [
  { label: 'Science', value: 20, color: 'fill-green-400' },
  { label: 'Maths', value: 18, color: 'fill-blue-400' },
  { label: 'English', value: 15, color: 'fill-pink-400' },
  { label: 'Other', value: 47, color: 'fill-yellow-400' },
];

export default function TeachersPage() {
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  // Filtered teacher list for the table
  const filteredTeachers = teacherList.filter(row =>
    (!search ||
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.id.toLowerCase().includes(search.toLowerCase()) ||
      row.subjects.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="rounded-l-2xl overflow-hidden">
          <Sidebar />
        </div>
        <main className="flex-1 flex flex-col p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Teachers Dashboard</h1>
              <div className="text-lg text-gray-500 mt-1">{formattedDate}</div>
            </div>
            <div className="hidden md:flex bg-white rounded-xl shadow-lg p-2 md:p-4 gap-2 md:gap-4 w-full md:w-[700px]">
              <div className="flex-1 min-w-[160px]">
                <label className="block text-sm font-medium mb-1">Search</label>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Name, Teacher ID, Subject, Grade..."
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="min-w-[120px]">
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  value={subjectFilter}
                  onChange={e => setSubjectFilter(e.target.value)}
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="min-w-[120px]">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">All</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded font-semibold">Search</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-8 items-center justify-between">
            <div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow"
                onClick={() => window.location.href = '/dashboard/teachers/details'}
              >
                Teacher
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-green-200 text-green-900 px-4 py-2 rounded font-semibold shadow">+ Register New Teacher</button>
              <button className="bg-orange-200 text-orange-900 px-4 py-2 rounded font-semibold shadow">Update Teacher Details</button>
              <button className="bg-blue-200 text-blue-900 px-4 py-2 rounded font-semibold shadow">Export List</button>
              <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded font-semibold shadow">Print ID Cards</button>
            </div>
          </div>

          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.slice(0, 4).map((stat, i) => (
              <div key={stat.label} className={[
                'rounded-xl shadow-lg flex flex-col justify-center py-6 gap-2',
                i === 0 ? 'bg-blue-100 text-blue-800' :
                i === 1 ? 'bg-green-100 text-green-800' :
                i === 2 ? 'bg-yellow-100 text-yellow-800' :
                i === 3 ? 'bg-red-100 text-red-800' : '',
              ].join(' ')}>
                <div className="text-lg font-semibold text-gray-700 text-center mb-2">{stat.label}</div>
                <div className="flex flex-row items-center w-full px-6">
                  <div className="flex-1 text-3xl font-bold text-primary text-left">{stat.value}</div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-blue-600">Male - {20 + i * 2}</span>
                    <span className="text-sm font-semibold text-pink-500">Female - {30 + i * 2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.slice(4, 6).map((stat, i) => (
              <div key={stat.label} className="bg-white rounded-xl shadow-lg flex flex-col justify-center py-6 gap-2">
                <div className="text-lg font-semibold text-gray-700 text-center mb-2">{stat.label}</div>
                <div className="flex flex-row items-center w-full px-6">
                  <div className="flex-1 text-3xl font-bold text-primary text-left">{stat.value}</div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold text-blue-600">Male - {22 + i * 2}</span>
                    <span className="text-sm font-semibold text-pink-500">Female - {28 + i * 2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Bar Chart: Teachers per Grade */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
              <div className="font-semibold text-lg mb-4">Teachers Per Grade</div>
              <div className="flex items-end gap-2 h-48 w-full">
                {gradeBar.map(bar => (
                  <div key={bar.grade} className="flex flex-col items-center justify-end h-full">
                    <div className="w-6 rounded-t-lg bg-blue-500" style={{ height: `${bar.count * 8}px` }}>
                      <span className="block text-xs text-white text-center" style={{ marginTop: -18 }}>{bar.count}</span>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">{bar.grade}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Pie Chart: Subject Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
              <div className="font-semibold text-lg mb-4">Subject Distribution</div>
              <svg width="120" height="120" viewBox="0 0 32 32" className="mb-2">
                <circle r="16" cx="16" cy="16" fill="#e5e7eb" />
                <path d="M16 16 L16 0 A16 16 0 0 1 31.8 19.2 Z" className="fill-green-400" />
                <path d="M16 16 L31.8 19.2 A16 16 0 1 1 16 0 Z" className="fill-blue-400" />
                {/* Add more slices as needed for demo */}
              </svg>
              <div className="flex gap-4 mt-2">
                {subjectPie.map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${s.color} inline-block`}></span>
                    <span className="text-sm font-semibold">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="font-semibold text-lg mb-4">Attendance Summary</div>
            <div className="flex flex-wrap gap-8 justify-between">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-success">110</span>
                <span className="text-gray-600">Present Today</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-error">10</span>
                <span className="text-gray-600">Absent Today</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-warning">2</span>
                <span className="text-gray-600">Late Arrivals</span>
              </div>
              <div className="flex-1"></div>
              <div className="flex flex-col items-center justify-end">
                <span className="text-2xl font-bold text-primary">{formattedDate}</span>
                <span className="text-gray-600">Today&apos;s Date</span>
              </div>
            </div>
          </div>

          {/* Teacher List Table */}
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <div className="font-semibold text-lg">Teacher Directory</div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm font-medium text-gray-700">Search :</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by Name, ID, Subject, Email..."
                  className="w-full sm:w-64 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 py-2 text-center">Name</th>
                  <th className="px-3 py-2 text-center">Teacher ID</th>
                  <th className="px-3 py-2 text-center">Grade(s)</th>
                  <th className="px-3 py-2 text-center">Subject(s)</th>
                  <th className="px-3 py-2 text-center">Status</th>
                  <th className="px-3 py-2 text-center">Phone</th>
                  <th className="px-3 py-2 text-center">Email</th>
                  <th className="px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map(row => (
                  <tr key={row.id} className="border-b last:border-0">
                    <td className="px-3 py-2 text-center font-bold">{row.name}</td>
                    <td className="px-3 py-2 text-center">{row.id}</td>
                    <td className="px-3 py-2 text-center">{row.grades}</td>
                    <td className="px-3 py-2 text-center">{row.subjects}</td>
                    <td className={`px-3 py-2 text-center font-semibold ${row.status === 'Present' ? 'text-success' : 'text-error'}`}>{row.status}</td>
                    <td className="px-3 py-2 text-center">{row.phone}</td>
                    <td className="px-3 py-2 text-center">{row.email}</td>
                    <td className="px-3 py-2 text-center">
                      <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold hover:bg-blue-200 transition">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
