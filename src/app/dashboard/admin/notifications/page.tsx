'use client';

import React from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';
import Link from 'next/link';

export default function NotificationsPage() {
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
          <h1 className="text-2xl font-bold mb-4 text-primary">Notification Settings</h1>
          <p className="mb-6 text-gray-600">Configure app, email, and SMS notifications for your school community.</p>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Email Notifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">SMTP Server</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="smtp.gmail.com" />
              </div>
              <div>
                <label className="block mb-2 font-medium">SMTP Port</label>
                <input type="number" className="w-full p-2 border rounded" placeholder="587" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email Username</label>
                <input type="email" className="w-full p-2 border rounded" placeholder="noreply@school.com" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email Password</label>
                <input type="password" className="w-full p-2 border rounded" placeholder="Enter password" />
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Test Email Connection</button>
          </Card>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">SMS Gateway</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">SMS Provider</label>
                <select className="w-full p-2 border rounded">
                  <option>Twilio</option>
                  <option>Vonage</option>
                  <option>Custom API</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">API Key</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Enter API key" />
              </div>
              <div>
                <label className="block mb-2 font-medium">API Secret</label>
                <input type="password" className="w-full p-2 border rounded" placeholder="Enter API secret" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Sender ID</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="SCHOOL" />
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Test SMS Connection</button>
          </Card>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">New Student Registration</h3>
                  <p className="text-sm text-gray-600">Notify when a new student is registered</p>
                </div>
                <select className="p-2 border rounded">
                  <option>Email & SMS</option>
                  <option>Email only</option>
                  <option>SMS only</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Attendance Alerts</h3>
                  <p className="text-sm text-gray-600">Notify parents about student attendance</p>
                </div>
                <select className="p-2 border rounded">
                  <option>Email & SMS</option>
                  <option>Email only</option>
                  <option>SMS only</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Exam Results</h3>
                  <p className="text-sm text-gray-600">Notify when exam results are published</p>
                </div>
                <select className="p-2 border rounded">
                  <option>Email & SMS</option>
                  <option>Email only</option>
                  <option>SMS only</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">School Notices</h3>
                  <p className="text-sm text-gray-600">Notify about important school announcements</p>
                </div>
                <select className="p-2 border rounded">
                  <option>Email & SMS</option>
                  <option>Email only</option>
                  <option>SMS only</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Save Preferences</button>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold mb-4">Push Notifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Firebase Server Key</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Enter Firebase server key" />
              </div>
              <div>
                <label className="block mb-2 font-medium">App Package Name</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="com.school.app" />
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Test Push Notification</button>
          </Card>
        </main>
      </div>
    </div>
  );
} 