'use client';

import React from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';
import Link from 'next/link';

const promotionRules = [
  { grade: 'Grade 6', criteria: 'Pass % ≥ 50%', status: 'Active' },
  { grade: 'Grade 7', criteria: 'Pass % ≥ 50%', status: 'Active' },
  { grade: 'Grade 8', criteria: 'Pass % ≥ 50%', status: 'Active' },
];

export default function PromotionPage() {
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
          <h1 className="text-2xl font-bold mb-4 text-primary">Auto-Promotion Rules</h1>
          <p className="mb-6 text-gray-600">Automate student promotions based on predefined criteria.</p>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Promotion Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Minimum Pass Percentage</label>
                <input type="number" min="0" max="100" className="w-full p-2 border rounded" placeholder="50" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Attendance Requirement</label>
                <input type="number" min="0" max="100" className="w-full p-2 border rounded" placeholder="75" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Allow Manual Override</label>
                <select className="w-full p-2 border rounded">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Auto-Generate Class Assignments</label>
                <select className="w-full p-2 border rounded">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Save Settings</button>
          </Card>
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Grade-Specific Rules</h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Add Rule</button>
            </div>
            <table className="w-full text-left border-t">
              <thead>
                <tr>
                  <th className="py-2">Grade</th>
                  <th className="py-2">Promotion Criteria</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promotionRules.map((rule, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 font-medium">{rule.grade}</td>
                    <td className="py-2">{rule.criteria}</td>
                    <td className="py-2">
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                        {rule.status}
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
          <Card>
            <h2 className="text-lg font-semibold mb-4">Bulk Promotion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Select Grade</label>
                <select className="w-full p-2 border rounded">
                  <option>Grade 6</option>
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Target Grade</label>
                <select className="w-full p-2 border rounded">
                  <option>Grade 7</option>
                  <option>Grade 8</option>
                  <option>Grade 9</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <button className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition mr-4">Preview Promotion</button>
              <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Execute Promotion</button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
} 