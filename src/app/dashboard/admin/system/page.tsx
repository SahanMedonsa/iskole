'use client';

import React from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';
import Link from 'next/link';

export default function SystemPage() {
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
          <h1 className="text-2xl font-bold mb-4 text-primary">System Configuration</h1>
          <p className="mb-6 text-gray-600">Global platform settings and system preferences.</p>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Regional Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Language</label>
                <select className="w-full p-2 border rounded">
                  <option>English</option>
                  <option>Sinhala</option>
                  <option>Tamil</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Timezone</label>
                <select className="w-full p-2 border rounded">
                  <option>Asia/Colombo (UTC+5:30)</option>
                  <option>UTC</option>
                  <option>America/New_York</option>
                  <option>Europe/London</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Date Format</label>
                <select className="w-full p-2 border rounded">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Time Format</label>
                <select className="w-full p-2 border rounded">
                  <option>12-hour (AM/PM)</option>
                  <option>24-hour</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Currency</label>
                <select className="w-full p-2 border rounded">
                  <option>LKR (Sri Lankan Rupee)</option>
                  <option>USD (US Dollar)</option>
                  <option>EUR (Euro)</option>
                  <option>GBP (British Pound)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Currency Symbol</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Rs." />
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Save Regional Settings</button>
          </Card>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">File Upload Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Maximum File Size (MB)</label>
                <input type="number" className="w-full p-2 border rounded" placeholder="10" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Allowed File Types</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="jpg,jpeg,png,pdf,doc,docx" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Image Quality</label>
                <select className="w-full p-2 border rounded">
                  <option>High (100%)</option>
                  <option>Medium (80%)</option>
                  <option>Low (60%)</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Storage Location</label>
                <select className="w-full p-2 border rounded">
                  <option>Local Server</option>
                  <option>Cloud Storage (AWS S3)</option>
                  <option>Google Drive</option>
                </select>
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Save Upload Settings</button>
          </Card>
          <Card className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Data Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Data Retention Period (years)</label>
                <input type="number" className="w-full p-2 border rounded" placeholder="7" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Auto Backup Frequency</label>
                <select className="w-full p-2 border rounded">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium">Log Retention Period (months)</label>
                <input type="number" className="w-full p-2 border rounded" placeholder="12" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Database Optimization</label>
                <select className="w-full p-2 border rounded">
                  <option>Automatic</option>
                  <option>Manual</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">Save Data Settings</button>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold mb-4">System Maintenance</h2>
            <div className="flex gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Clear Cache</button>
              <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Optimize Database</button>
              <button className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">System Health Check</button>
              <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Emergency Mode</button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
} 