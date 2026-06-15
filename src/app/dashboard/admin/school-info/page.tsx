'use client';

import React from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';
import Link from 'next/link';

export default function SchoolInfoPage() {
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
          <h1 className="text-2xl font-bold mb-4 text-primary">School Info Management</h1>
          <p className="mb-6 text-gray-600">Edit your school's profile and contact details.</p>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">School Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">School Name</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Enter school name" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Registration Number</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Enter registration number" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Phone Number</label>
                <input type="tel" className="w-full p-2 border rounded" placeholder="Enter phone number" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input type="email" className="w-full p-2 border rounded" placeholder="Enter email address" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Website</label>
                <input type="url" className="w-full p-2 border rounded" placeholder="Enter website URL" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Principal Name</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Enter principal name" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">Address</label>
                <textarea className="w-full p-2 border rounded" rows={3} placeholder="Enter school address"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">School Motto</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Enter school motto" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Academic Year</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="e.g., 2024-2025" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Institution Type</label>
                <select className="w-full p-2 border rounded">
                  <option>Primary</option>
                  <option>Secondary</option>
                  <option>College</option>
                  <option>University</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">Upload Logo</label>
                <input type="file" accept="image/*" className="block" />
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Save Changes</button>
          </Card>
        </main>
      </div>
    </div>
  );
} 