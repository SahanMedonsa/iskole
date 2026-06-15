'use client';

import React from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import Card from '../../../../components/Card';
import Link from 'next/link';

const backups = [
  { date: '2024-06-01', size: '2.1 MB', link: '#' },
  { date: '2024-05-25', size: '2.0 MB', link: '#' },
  { date: '2024-05-18', size: '1.9 MB', link: '#' },
];

export default function BackupPage() {
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
          <h1 className="text-2xl font-bold mb-4 text-primary">Backup & Restore Data</h1>
          <p className="mb-6 text-gray-600">Create, download, and restore backups to keep your data safe.</p>
          <div className="flex gap-4 mb-6">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Manual Backup</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Restore Backup</button>
          </div>
          <Card>
            <h2 className="text-lg font-semibold mb-4">Backup History</h2>
            <table className="w-full text-left border-t">
              <thead>
                <tr>
                  <th className="py-2">Date</th>
                  <th className="py-2">Size</th>
                  <th className="py-2">Download</th>
                </tr>
              </thead>
              <tbody>
                {backups.map((backup, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2">{backup.date}</td>
                    <td className="py-2">{backup.size}</td>
                    <td className="py-2">
                      <a href={backup.link} className="text-blue-600 hover:underline">Download</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          {/* Placeholder for Backup/Restore Modal */}
        </main>
      </div>
    </div>
  );
}