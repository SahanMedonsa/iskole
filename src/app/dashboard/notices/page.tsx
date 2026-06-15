import React from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';

export default function NoticesPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4 text-primary">Notices</h1>
          <p>Notices and announcements go here.</p>
        </main>
      </div>
    </div>
  );
} 