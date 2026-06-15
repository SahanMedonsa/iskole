'use client';

import React from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';
import Link from 'next/link';

const terms = [
  { name: 'Term 1', startDate: '2024-09-01', endDate: '2024-12-15', status: 'Active' },
  { name: 'Term 2', startDate: '2025-01-15', endDate: '2025-04-30', status: 'Upcoming' },
  { name: 'Final Term', startDate: '2025-05-15', endDate: '2025-08-31', status: 'Upcoming' },
];

export default function SessionPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center mb-6">
            <Link href="/dashboard/admin" className="mr-4 text-blue-600 hover:text-blue-800">
              ← Back to Admin Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-primary">Session / Term Setup</h1>
          <p className="mb-6 text-gray-600">Manage academic calendar and terms for your school.</p>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Academic Year Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Academic Year</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="e.g., 2024-2025" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Year Start Date</label>
                <input type="date" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Year End Date</label>
                <input type="date" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Session Auto-Advance</label>
                <select className="w-full p-2 border rounded">
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Save Academic Year</button>
          </Card>
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Terms Management</h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Add New Term</button>
            </div>
            <table className="w-full text-left border-t">
              <thead>
                <tr>
                  <th className="py-2">Term Name</th>
                  <th className="py-2">Start Date</th>
                  <th className="py-2">End Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {terms.map((term, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 font-medium">{term.name}</td>
                    <td className="py-2">{term.startDate}</td>
                    <td className="py-2">{term.endDate}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        term.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {term.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <button className="text-blue-600 hover:underline mr-2">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          {/* Placeholder for Add/Edit Term Modal */}
        </main>
      </div>
    </div>
  );
} 