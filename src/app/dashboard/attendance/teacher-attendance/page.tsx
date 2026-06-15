"use client";
import React from 'react';

export default function TeacherAttendancePage() {
  return (
    <div>
      {/* Current Day Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 text-blue-800 rounded-xl shadow flex flex-col justify-center py-4 gap-2">
          <span className="text-lg font-semibold text-gray-700 text-center mb-2">Total Teachers</span>
          <div className="flex flex-row items-center w-full px-6 justify-between">
            <div className="text-2xl font-bold text-primary text-left">120</div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold text-blue-600">Male - 60</span>
              <span className="text-sm font-semibold text-pink-500">Female - 60</span>
            </div>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 rounded-xl shadow flex flex-col justify-center py-4 gap-2">
          <span className="text-lg font-semibold text-gray-700 text-center mb-2">Present</span>
          <div className="flex flex-row items-center w-full px-6 justify-between">
            <div className="text-2xl font-bold text-primary text-left">110</div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold text-blue-600">Male - 55</span>
              <span className="text-sm font-semibold text-pink-500">Female - 55</span>
            </div>
          </div>
        </div>
        <div className="bg-red-100 text-red-800 rounded-xl shadow flex flex-col justify-center py-4 gap-2">
          <span className="text-lg font-semibold text-gray-700 text-center mb-2">Absent</span>
          <div className="flex flex-row items-center w-full px-6 justify-between">
            <div className="text-2xl font-bold text-primary text-left">10</div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold text-blue-600">Male - 4</span>
              <span className="text-sm font-semibold text-pink-500">Female - 6</span>
            </div>
          </div>
        </div>
        <div className="bg-yellow-100 text-yellow-800 rounded-xl shadow flex flex-col justify-center py-4 gap-2">
          <span className="text-lg font-semibold text-gray-700 text-center mb-2">Late Arrivals</span>
          <div className="flex flex-row items-center w-full px-6 justify-between">
            <div className="text-2xl font-bold text-primary text-left">3</div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold text-blue-600">Male - 2</span>
              <span className="text-sm font-semibold text-pink-500">Female - 1</span>
            </div>
          </div>
        </div>
        <div className="bg-purple-100 text-purple-800 rounded-xl shadow flex flex-col items-center py-4 col-span-2 md:col-span-1">
          <span className="text-lg font-semibold">On Leave</span>
          <span className="text-2xl font-bold">5</span>
        </div>
        <div className="bg-green-50 text-green-800 rounded-xl shadow flex flex-col items-center py-4 col-span-2 md:col-span-1">
          <span className="text-lg font-semibold">Attendance %</span>
          <span className="text-2xl font-bold text-green-700">91.7%</span>
        </div>
      </div>
      {/* Date Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">Date:</span>
          <input type="date" className="border rounded px-3 py-2" value={new Date().toISOString().slice(0,10)} />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">Attendance %</span>
          <span className="text-2xl font-bold text-green-700">91.7%</span>
        </div>
      </div>
      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border rounded px-3 py-2">
          <option>All Departments</option>
          <option>Math</option>
          <option>Science</option>
          <option>English</option>
          <option>History</option>
          <option>ICT</option>
        </select>
        <select className="border rounded px-3 py-2">
          <option>All Status</option>
          <option>Present</option>
          <option>Absent</option>
          <option>Late</option>
          <option>On Leave</option>
        </select>
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
        <input type="text" className="border rounded px-3 py-2" placeholder="Search by name or ID" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Search</button>
      </div>
      {/* Teacher List Table */}
      <div className="bg-white rounded-xl shadow p-4 mb-8 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Subjects</th>
              <th className="px-4 py-2 text-left">Grades</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Time-in</th>
              <th className="px-4 py-2 text-left">Time-out</th>
              <th className="px-4 py-2 text-left">Reason</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Ms. Nadeesha</td>
              <td className="px-4 py-2">T1001</td>
              <td className="px-4 py-2">Science</td>
              <td className="px-4 py-2">6, 7</td>
              <td className="px-4 py-2 text-green-700 font-bold">Present</td>
              <td className="px-4 py-2">07:45 AM</td>
              <td className="px-4 py-2">01:30 PM</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2"><button className="text-blue-600 underline">Edit</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2">Mr. Ruwan</td>
              <td className="px-4 py-2">T1002</td>
              <td className="px-4 py-2">Math</td>
              <td className="px-4 py-2">10, 11</td>
              <td className="px-4 py-2 text-red-700 font-bold">Absent</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">Sick</td>
              <td className="px-4 py-2"><button className="text-blue-600 underline">Edit</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2">Mrs. Kanchana</td>
              <td className="px-4 py-2">T1003</td>
              <td className="px-4 py-2">Class Teacher</td>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2 text-yellow-700 font-bold">Late</td>
              <td className="px-4 py-2">08:12 AM</td>
              <td className="px-4 py-2">01:30 PM</td>
              <td className="px-4 py-2">Bus Delay</td>
              <td className="px-4 py-2"><button className="text-blue-600 underline">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Leave Management */}
      <div className="bg-white rounded-xl shadow p-4 mb-8">
        <div className="font-semibold text-lg mb-2">Leave Management</div>
        <div className="flex flex-wrap gap-4 mb-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded font-semibold">View Approved Leaves</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold">Request Leave</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold">Track Upcoming Leaves</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold">Approve/Reject Leave</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Teacher</th>
                <th className="px-4 py-2 text-left">Leave Type</th>
                <th className="px-4 py-2 text-left">From</th>
                <th className="px-4 py-2 text-left">To</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Approved By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">Mr. Ruwan</td>
                <td className="px-4 py-2">Medical</td>
                <td className="px-4 py-2">2024-06-01</td>
                <td className="px-4 py-2">2024-06-03</td>
                <td className="px-4 py-2 text-purple-700 font-bold">Approved</td>
                <td className="px-4 py-2">Principal Silva</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Ms. Nadeesha</td>
                <td className="px-4 py-2">Personal</td>
                <td className="px-4 py-2">2024-06-05</td>
                <td className="px-4 py-2">2024-06-06</td>
                <td className="px-4 py-2 text-yellow-700 font-bold">Pending</td>
                <td className="px-4 py-2">-</td>
              </tr>
            </tbody>
          </table>
        </div>
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
                <th className="px-4 py-2 text-left">On Leave</th>
                <th className="px-4 py-2 text-left">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">2024-06-01</td>
                <td className="px-4 py-2">110</td>
                <td className="px-4 py-2">10</td>
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2">91.7%</td>
              </tr>
              <tr>
                <td className="px-4 py-2">2024-05-31</td>
                <td className="px-4 py-2">108</td>
                <td className="px-4 py-2">12</td>
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">4</td>
                <td className="px-4 py-2">90.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 