'use client';

import React from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';
import Link from 'next/link';

const admins = [
  { name: 'John Doe', email: 'john@school.com', role: 'Super Admin', lastLogin: '2024-06-01', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@school.com', role: 'School Admin', lastLogin: '2024-05-30', status: 'Active' },
  { name: 'Bob Wilson', email: 'bob@school.com', role: 'HR Manager', lastLogin: '2024-05-29', status: 'Inactive' },
];

export default function AdminManagementPage() {
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
          <h1 className="text-2xl font-bold mb-4 text-primary">Admin Management & Access Control</h1>
          <p className="mb-6 text-gray-600">Add, invite, and manage admin users and their access levels.</p>
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Admin Users</h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Add New Admin</button>
            </div>
            <table className="w-full text-left border-t">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Last Login</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 font-medium">{admin.name}</td>
                    <td className="py-2">{admin.email}</td>
                    <td className="py-2">{admin.role}</td>
                    <td className="py-2">{admin.lastLogin}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <button className="text-blue-600 hover:underline mr-2">Edit</button>
                      <button className="text-red-600 hover:underline">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Multi-Factor Authentication</label>
                <select className="w-full p-2 border rounded">
                  <option>Required for all admins</option>
                  <option>Optional</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">IP Access Restrictions</label>
                <select className="w-full p-2 border rounded">
                  <option>Allow all IPs</option>
                  <option>Restrict to school network</option>
                  <option>Custom IP whitelist</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Session Timeout (minutes)</label>
                <input type="number" className="w-full p-2 border rounded" placeholder="30" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Failed Login Attempts</label>
                <input type="number" className="w-full p-2 border rounded" placeholder="5" />
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Save Security Settings</button>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold mb-4">Audit Logs</h2>
            <div className="flex gap-4 mb-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">View Recent Logs</button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">Export Logs</button>
            </div>
            <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400">Audit Logs Preview Area</div>
          </Card>
        </main>
      </div>
    </div>
  );
} 