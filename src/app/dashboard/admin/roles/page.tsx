'use client';

import React from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';
import Link from 'next/link';

const roles = [
  { name: 'Super Admin', description: 'Full control over the system.' },
  { name: 'School Admin', description: 'Manages a single school.' },
  { name: 'HR Manager', description: 'Manages staff and HR functions.' },
  { name: 'Academic Admin', description: 'Manages timetable, classes, subjects.' },
  { name: 'Communication Admin', description: 'Manages notices and messaging.' },
];

export default function RolesPage() {
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
          <h1 className="text-2xl font-bold mb-4 text-primary">User Roles & Permissions</h1>
          <p className="mb-6 text-gray-600">Manage user roles, permissions, and access levels for your school management system.</p>
          <Card className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Roles List</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Add New Role</button>
            </div>
            <table className="w-full text-left border-t">
              <thead>
                <tr>
                  <th className="py-2">Role Name</th>
                  <th className="py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 font-medium">{role.name}</td>
                    <td className="py-2 text-gray-600">{role.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          {/* Placeholder for Add/Edit Role Modal or Form */}
        </main>
      </div>
    </div>
  );
}