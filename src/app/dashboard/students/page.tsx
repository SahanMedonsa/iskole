"use client";
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

const stats = [
  { label: 'Total Registered Students', value: 1450 },
  { label: 'Total Active Students', value: 1400 },
  { label: 'New Registrations (This Month)', value: 25 },
  { label: 'Present Today', value: 1370 },
  { label: 'Absent Today', value: 80 },
  { label: 'Male', value: 750 },
  { label: 'Female', value: 700 },
];

const gradeData = [
  { grade: 1, total: 120, present: 110, absent: 10, new: 3, male: 65, female: 55 },
  { grade: 2, total: 115, present: 112, absent: 3, new: 1, male: 60, female: 55 },
  { grade: 3, total: 130, present: 125, absent: 5, new: 2, male: 70, female: 60 },
  { grade: 4, total: 110, present: 108, absent: 2, new: 1, male: 58, female: 52 },
  { grade: 5, total: 125, present: 120, absent: 5, new: 2, male: 65, female: 60 },
  { grade: 6, total: 115, present: 110, absent: 5, new: 1, male: 60, female: 55 },
  { grade: 7, total: 120, present: 115, absent: 5, new: 2, male: 62, female: 58 },
  { grade: 8, total: 110, present: 108, absent: 2, new: 1, male: 57, female: 53 },
  { grade: 9, total: 120, present: 117, absent: 3, new: 2, male: 63, female: 57 },
  { grade: 10, total: 120, present: 115, absent: 5, new: 2, male: 60, female: 60 },
  { grade: 11, total: 110, present: 108, absent: 2, new: 1, male: 55, female: 55 },
  { grade: 12, total: 115, present: 110, absent: 5, new: 1, male: 58, female: 57 },
  { grade: 13, total: 100, present: 97, absent: 3, new: 2, male: 52, female: 48 },
];

const genderPie = [
  { label: 'Male', value: 750, color: 'fill-blue-500' },
  { label: 'Female', value: 700, color: 'fill-pink-400' },
];

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  // Filtered data for table
  const filteredGrades = gradeData.filter(row =>
    (!gradeFilter || row.grade.toString() === gradeFilter) &&
    (!genderFilter || genderFilter === 'Male' ? row.male > 0 : row.female > 0)
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
              <h1 className="text-3xl font-bold text-primary">Students Dashboard</h1>
              <div className="text-lg text-gray-500 mt-1">{formattedDate}</div>
            </div>
            <div className="hidden md:flex bg-white rounded-xl shadow-lg p-2 md:p-4 gap-2 md:gap-4 w-full md:w-[700px]">
              <div className="flex-1 min-w-[160px]">
                <label className="block text-sm font-medium mb-1">Search</label>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Name, Admission No, Class Teacher..."
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="min-w-[120px]">
                <label className="block text-sm font-medium mb-1">Grade</label>
                <select
                  value={gradeFilter}
                  onChange={e => setGradeFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">All</option>
                  {gradeData.map(g => (
                    <option key={g.grade} value={g.grade}>{g.grade}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[120px]">
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  value={genderFilter}
                  onChange={e => setGenderFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">All</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
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
                onClick={() => window.location.href = '/dashboard/students/details'}
              >
                Students
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-green-200 text-green-900 px-4 py-2 rounded font-semibold shadow">+ Register New Student</button>
              <button className="bg-orange-200 text-orange-900 px-4 py-2 rounded font-semibold shadow">Update Student Details</button>
              <button className="bg-yellow-200 text-yellow-900 px-4 py-2 rounded font-semibold shadow">Transfer Student</button>
              <button className="bg-blue-200 text-blue-900 px-4 py-2 rounded font-semibold shadow">Export List</button>
              <button className="bg-gray-200 text-gray-900 px-4 py-2 rounded font-semibold shadow">Print ID Cards</button>
            </div>
          </div>

          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Total Registered Students with Male/Female breakdown */}
            <div className="bg-blue-100 text-blue-800 rounded-xl shadow-lg flex flex-col justify-center py-6 gap-2">
              <div className="text-lg font-semibold text-gray-700 text-center mb-2">Total Registered Students</div>
              <div className="flex flex-row items-center w-full px-6 justify-between">
                <div className="text-3xl font-bold text-primary text-left">1450</div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-blue-600">Male - 750</span>
                  <span className="text-sm font-semibold text-pink-500">Female - 700</span>
                </div>
              </div>
            </div>
            {/* Total Active Students with Male/Female breakdown */}
            <div className="bg-green-100 text-green-800 rounded-xl shadow-lg flex flex-col justify-center py-6 gap-2">
              <div className="text-lg font-semibold text-gray-700 text-center mb-2">Total Active Students</div>
              <div className="flex flex-row items-center w-full px-6 justify-between">
                <div className="text-3xl font-bold text-primary text-left">1400</div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-blue-600">Male - 720</span>
                  <span className="text-sm font-semibold text-pink-500">Female - 680</span>
                </div>
              </div>
            </div>
            {/* Absent Today with Male/Female breakdown */}
            <div className="bg-red-100 text-red-800 rounded-xl shadow-lg flex flex-col justify-center py-6 gap-2">
              <div className="text-lg font-semibold text-gray-700 text-center mb-2">Absent Today</div>
              <div className="flex flex-row items-center w-full px-6 justify-between">
                <div className="text-3xl font-bold text-primary text-left">80</div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-semibold text-blue-600">Male - 30</span>
                  <span className="text-sm font-semibold text-pink-500">Female - 50</span>
                </div>
              </div>
            </div>
          </div>

          {/* 🎓 Student Summary Section */}
          <div className="space-y-8">
            {/* 📋 General Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                📋 General Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-sm text-blue-600 font-medium">Total Enrolled</div>
                  <div className="text-2xl font-bold text-blue-800">1,450</div>
                  <div className="text-xs text-blue-600 mt-1">+25 this month</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <div className="text-sm text-green-600 font-medium">New Admissions</div>
                  <div className="text-2xl font-bold text-green-800">25</div>
                  <div className="text-xs text-green-600 mt-1">This month</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
                  <div className="text-sm text-orange-600 font-medium">Dropouts</div>
                  <div className="text-2xl font-bold text-orange-800">8</div>
                  <div className="text-xs text-orange-600 mt-1">This month</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="text-sm text-purple-600 font-medium">Active Students</div>
                  <div className="text-2xl font-bold text-purple-800">1,400</div>
                  <div className="text-xs text-purple-600 mt-1">96.6% retention</div>
                </div>
              </div>
              
              {/* Students by Grade Breakdown */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Students by Grade</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {gradeData.map(grade => (
                    <div key={grade.grade} className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-primary">Grade {grade.grade}</div>
                      <div className="text-sm text-gray-600">{grade.total} students</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 👨‍🏫 Attendance Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                👨‍🏫 Attendance Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <div className="text-sm text-green-600 font-medium">Todays Attendance</div>
                  <div className="text-2xl font-bold text-green-800">94.5%</div>
                  <div className="text-xs text-green-600 mt-1">1,370 present / 80 absent</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-sm text-blue-600 font-medium">Monthly Average</div>
                  <div className="text-2xl font-bold text-blue-800">92.3%</div>
                  <div className="text-xs text-blue-600 mt-1">Last 30 days</div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
                  <div className="text-sm text-red-600 font-medium">Chronic Absentees</div>
                  <div className="text-2xl font-bold text-red-800">45</div>
                  <div className="text-xs text-red-600 mt-1">&lt;75% attendance</div>
                </div>
              </div>
              
              {/* Top Punctual Students */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Top 5 Most Punctual Students</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {[
                      { name: "Ayesha Perera", grade: "10A", attendance: "99.8%" },
                      { name: "Kasun Silva", grade: "12B", attendance: "99.5%" },
                      { name: "Nimal Fernando", grade: "8C", attendance: "99.2%" },
                      { name: "Samantha Jayasuriya", grade: "11A", attendance: "98.9%" },
                      { name: "Dilshan Perera", grade: "9B", attendance: "98.7%" }
                    ].map((student, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <span className="font-medium">{student.name}</span>
                          <span className="text-gray-500 ml-2">({student.grade})</span>
                        </div>
                        <span className="text-green-600 font-bold">{student.attendance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 📈 Academic Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                📈 Academic Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4">
                  <div className="text-sm text-yellow-600 font-medium">Top Performers</div>
                  <div className="text-2xl font-bold text-yellow-800">156</div>
                  <div className="text-xs text-yellow-600 mt-1">GPA &gt;3.8</div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
                  <div className="text-sm text-red-600 font-medium">At Risk Students</div>
                  <div className="text-2xl font-bold text-red-800">23</div>
                  <div className="text-xs text-red-600 mt-1">GPA &lt;2.0</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-sm text-blue-600 font-medium">Average GPA</div>
                  <div className="text-2xl font-bold text-blue-800">3.4</div>
                  <div className="text-xs text-blue-600 mt-1">School wide</div>
                </div>
              </div>
              
              {/* Performance by Subject */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Average Performance by Subject</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                     {[
                     { subject: "Mathematics", avg: "3.6", color: "blue" },
                     { subject: "Science", avg: "3.4", color: "green" },
                     { subject: "English", avg: "3.2", color: "purple" },
                     { subject: "History", avg: "3.5", color: "orange" }
                   ].map((subject, index) => (
                     <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                       <div className="text-sm font-medium text-gray-600">{subject.subject}</div>
                       <div className="text-lg font-bold text-primary">{subject.avg}</div>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* 💰 Fee & Finance Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                💰 Fee & Finance Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
                  <div className="text-sm text-red-600 font-medium">Pending Fees</div>
                  <div className="text-2xl font-bold text-red-800">89</div>
                  <div className="text-xs text-red-600 mt-1">Students</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <div className="text-sm text-green-600 font-medium">Scholarships</div>
                  <div className="text-2xl font-bold text-green-800">45</div>
                  <div className="text-xs text-green-600 mt-1">Students</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-sm text-blue-600 font-medium">Fees Collected</div>
                  <div className="text-2xl font-bold text-blue-800">$45,230</div>
                  <div className="text-xs text-blue-600 mt-1">This month</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4">
                  <div className="text-sm text-orange-600 font-medium">Due Payments</div>
                  <div className="text-2xl font-bold text-orange-800">$12,450</div>
                  <div className="text-xs text-orange-600 mt-1">Next week</div>
                </div>
              </div>
            </div>

            {/* 🏅 Behavior & Activity Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                🏅 Behavior & Activity Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4">
                  <div className="text-sm text-red-600 font-medium">Discipline Records</div>
                  <div className="text-2xl font-bold text-red-800">12</div>
                  <div className="text-xs text-red-600 mt-1">This month</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                  <div className="text-sm text-green-600 font-medium">Achievements</div>
                  <div className="text-2xl font-bold text-green-800">67</div>
                  <div className="text-xs text-green-600 mt-1">This year</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
                  <div className="text-sm text-purple-600 font-medium">Extracurricular</div>
                  <div className="text-2xl font-bold text-purple-800">890</div>
                  <div className="text-xs text-purple-600 mt-1">Participations</div>
                </div>
              </div>
            </div>

            {/* 👨‍👩‍👧‍👦 Demographics Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                👨‍👩‍👧‍👦 Demographics Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Male</span>
                      <span className="text-blue-600 font-bold">750 (51.7%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Female</span>
                      <span className="text-pink-600 font-bold">700 (48.3%)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {[
                      { range: "5-10 years", count: "320", percentage: "22.1%" },
                      { range: "11-15 years", count: "580", percentage: "40.0%" },
                      { range: "16-18 years", count: "550", percentage: "37.9%" }
                    ].map((age, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium">{age.range}</span>
                        <span className="text-gray-600">{age.count} ({age.percentage})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Special Needs Support</h3>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-800">23 Students</div>
                  <div className="text-sm text-blue-600 mt-1">With special needs / support plans</div>
                </div>
              </div>
            </div>

            {/* 🔍 Interactive Tools */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                🔍 Interactive Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Advanced Search & Filters</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Search by name, ID, grade..."
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button className="bg-primary text-white px-4 py-2 rounded font-semibold">Search</button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option>All Grades</option>
                        {gradeData.map(g => (
                          <option key={g.grade}>Grade {g.grade}</option>
                        ))}
                      </select>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option>All Attendance %</option>
                        <option>&gt;90%</option>
                        <option>75-90%</option>
                        <option>&lt;75%</option>
                      </select>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option>All Payment Status</option>
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Export & Reports</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition">
                      📊 Download Summary Report (PDF)
                    </button>
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition">
                      📋 Export Student List (Excel)
                    </button>
                    <button className="w-full bg-purple-600 text-white px-4 py-2 rounded font-semibold hover:bg-purple-700 transition">
                      📈 Generate Analytics Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
