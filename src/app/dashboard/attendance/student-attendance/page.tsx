"use client";
import React from 'react';

export default function StudentAttendancePage() {
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
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <div>
      {/* Attendance Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 rounded-xl shadow flex flex-col items-center py-4">
          <span className="text-lg font-semibold">Total Students</span>
          <span className="text-2xl font-bold">1450</span>
        </div>
        <div className="bg-green-100 text-green-800 rounded-xl shadow flex flex-col items-center py-4">
          <span className="text-lg font-semibold">Present</span>
          <span className="text-2xl font-bold">1370</span>
        </div>
        <div className="bg-red-100 text-red-800 rounded-xl shadow flex flex-col items-center py-4">
          <span className="text-lg font-semibold">Absent</span>
          <span className="text-2xl font-bold">80</span>
        </div>
        <div className="bg-yellow-100 text-yellow-800 rounded-xl shadow flex flex-col items-center py-4">
          <span className="text-lg font-semibold">Late Arrivals</span>
          <span className="text-2xl font-bold">12</span>
        </div>
      </div>
      {/* Attendance Percentage & Date Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">Attendance %</span>
          <span className="text-2xl font-bold text-green-700">94.5%</span>
        </div>
        <div>
          <label className="font-medium mr-2">Date:</label>
          <input type="date" className="border rounded px-3 py-2" value={new Date().toISOString().slice(0,10)} />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Bar Chart: Students per Grade */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col">
          <div className="font-semibold text-lg mb-4">Students Per Grade</div>
          <div className="flex items-end gap-2 h-48 w-full">
            {gradeData.map(bar => (
              <div key={bar.grade} className="flex flex-col items-center justify-end h-full">
                <div className="w-6 rounded-t-lg bg-blue-500" style={{ height: `${bar.total * 1.2}px` }}>
                  <span className="block text-xs text-white text-center" style={{ marginTop: -18 }}>{bar.total}</span>
                </div>
                <span className="text-xs text-gray-600 mt-1">{bar.grade}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Pie Chart: Gender Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <div className="font-semibold text-lg mb-4">Gender Distribution</div>
          <svg width="120" height="120" viewBox="0 0 32 32" className="mb-2">
            <circle r="16" cx="16" cy="16" fill="#e5e7eb" />
            <path d="M16 16 L16 0 A16 16 0 0 1 31.8 19.2 Z" className="fill-blue-500" />
            <path d="M16 16 L31.8 19.2 A16 16 0 1 1 16 0 Z" className="fill-pink-400" />
          </svg>
          <div className="flex gap-4 mt-2">
            {genderPie.map(g => (
              <div key={g.label} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${g.color} inline-block`}></span>
                <span className="text-sm font-semibold">{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Summary (Sample) */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="font-semibold text-lg mb-4">Attendance Summary</div>
        <div className="flex flex-wrap gap-8 justify-between">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-success">1370</span>
            <span className="text-gray-600">Present Today</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-error">80</span>
            <span className="text-gray-600">Absent Today</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-warning">12</span>
            <span className="text-gray-600">Late Arrivals</span>
          </div>
          <div className="flex-1"></div>
          <div className="flex flex-col items-center justify-end">
            <span className="text-2xl font-bold text-primary">{formattedDate}</span>
            <span className="text-gray-600">Todays Date</span>
          </div>
        </div>
      </div>

      {/* Per Grade Table */}
      <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <div className="font-semibold text-lg mb-4">Per Grade/Class Overview</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 text-center">Grade</th>
              <th className="px-3 py-2 text-center">Total Students</th>
              <th className="px-3 py-2 text-center">Present Today</th>
              <th className="px-3 py-2 text-center">Absent</th>
              <th className="px-3 py-2 text-center">New Registrations</th>
              <th className="px-3 py-2 text-center">Male</th>
              <th className="px-3 py-2 text-center">Female</th>
              <th className="px-3 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {gradeData.map(row => (
              <tr key={row.grade} className="border-b last:border-0">
                <td className="px-3 py-2 font-bold text-center">{row.grade}</td>
                <td className="px-3 py-2 text-center">{row.total}</td>
                <td className="px-3 py-2 text-center">{row.present}</td>
                <td className="px-3 py-2 text-center">{row.absent}</td>
                <td className="px-3 py-2 text-center">{row.new}</td>
                <td className="px-3 py-2 text-center">{row.male}</td>
                <td className="px-3 py-2 text-center">{row.female}</td>
                <td className="px-3 py-2 text-center">
                  <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold hover:bg-blue-200 transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-6 mt-6">
        <select className="border rounded px-3 py-2">
          <option>All Grades</option>
          <option>Grade 1</option>
          <option>Grade 2</option>
          <option>Grade 3</option>
          <option>Grade 4</option>
          <option>Grade 5</option>
          <option>Grade 6</option>
          <option>Grade 7</option>
          <option>Grade 8</option>
          <option>Grade 9</option>
          <option>Grade 10</option>
          <option>Grade 11</option>
          <option>Grade 12</option>
          <option>Grade 13</option>
        </select>
        <select className="border rounded px-3 py-2">
          <option>All Sections</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
        </select>
        <select className="border rounded px-3 py-2">
          <option>All Status</option>
          <option>Present</option>
          <option>Absent</option>
          <option>Late</option>
        </select>
        <input type="text" className="border rounded px-3 py-2" placeholder="Search by name or reg. no" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Search</button>
      </div>
      {/* Student List Table */}
      <div className="bg-white rounded-xl shadow p-4 mb-8 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Reg. No</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Arrival Time</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Ayesha Perera</td>
              <td className="px-4 py-2">S1001</td>
              <td className="px-4 py-2 text-green-700 font-bold">Present</td>
              <td className="px-4 py-2">07:32 AM</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2"><button className="text-blue-600 underline">Edit</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2">Kasun Silva</td>
              <td className="px-4 py-2">S1002</td>
              <td className="px-4 py-2 text-red-700 font-bold">Absent</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">Sick</td>
              <td className="px-4 py-2"><button className="text-blue-600 underline">Edit</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2">Nimal Fernando</td>
              <td className="px-4 py-2">S1003</td>
              <td className="px-4 py-2 text-yellow-700 font-bold">Late</td>
              <td className="px-4 py-2">08:12 AM</td>
              <td className="px-4 py-2">Bus Delay</td>
              <td className="px-4 py-2"><button className="text-blue-600 underline">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold">Mark Attendance</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold">Export CSV</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold">Export PDF</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold">Generate Report</button>
      </div>
      {/* Past Attendance Section */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="font-semibold text-lg mb-2">Past Attendance</div>
        <div className="flex flex-wrap gap-4 mb-4">
          <input type="date" className="border rounded px-3 py-2" />
          <select className="border rounded px-3 py-2">
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">View</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Present</th>
                <th className="px-4 py-2 text-left">Absent</th>
                <th className="px-4 py-2 text-left">Late</th>
                <th className="px-4 py-2 text-left">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">2024-06-01</td>
                <td className="px-4 py-2">1370</td>
                <td className="px-4 py-2">80</td>
                <td className="px-4 py-2">12</td>
                <td className="px-4 py-2">94.5%</td>
              </tr>
              <tr>
                <td className="px-4 py-2">2024-05-31</td>
                <td className="px-4 py-2">1365</td>
                <td className="px-4 py-2">85</td>
                <td className="px-4 py-2">10</td>
                <td className="px-4 py-2">94.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 