'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';

export default function SettingsPage() {
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
          <h1 className="text-2xl font-bold mb-2 text-primary">Settings</h1>
          <p className="mb-6 text-gray-600">Manage account, security, and notification preferences.</p>

          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Display Name</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Admin Name" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Email Address</label>
                <input type="email" className="w-full p-2 border rounded" placeholder="admin@school.lk" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Phone Number</label>
                <input type="tel" className="w-full p-2 border rounded" placeholder="+94 XX XXX XXXX" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Role</label>
                <input type="text" className="w-full p-2 border rounded bg-gray-50" value="Administrator" readOnly />
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
              Save Account Settings
            </button>
          </Card>

          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Current Password</label>
                <input type="password" className="w-full p-2 border rounded" placeholder="••••••••" />
              </div>
              <div>
                <label className="block mb-2 font-medium">New Password</label>
                <input type="password" className="w-full p-2 border rounded" placeholder="••••••••" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Confirm New Password</label>
                <input type="password" className="w-full p-2 border rounded" placeholder="••••••••" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Two-Factor Authentication</label>
                <select className="w-full p-2 border rounded">
                  <option>Disabled</option>
                  <option>Email OTP</option>
                  <option>Authenticator App</option>
                </select>
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
              Update Password
            </button>
          </Card>

          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { label: 'Email notifications for new registrations', defaultChecked: true },
                { label: 'Email notifications for leave requests', defaultChecked: true },
                { label: 'SMS alerts for attendance issues', defaultChecked: false },
                { label: 'System maintenance alerts', defaultChecked: true },
                { label: 'Weekly summary reports', defaultChecked: false },
              ].map((item) => (
                <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked={item.defaultChecked} className="w-4 h-4 accent-primary" />
                  <span className="text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
              Save Notification Settings
            </button>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Session & Privacy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Session Timeout (minutes)</label>
                <select className="w-full p-2 border rounded">
                  <option>30</option>
                  <option>60</option>
                  <option>120</option>
                  <option>Never</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Login History</label>
                <button className="w-full p-2 border rounded text-left text-blue-600 hover:bg-blue-50 transition">
                  View login history →
                </button>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
                Save Session Settings
              </button>
              <button className="px-6 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50 transition">
                Sign out all devices
              </button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
