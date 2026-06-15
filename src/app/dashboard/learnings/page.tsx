import React from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import Link from 'next/link';

export default function LearningsPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4 text-primary">Learnings</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(13)].map((_, i) => (
              <Link key={i+1} href={`/dashboard/learnings/${i+1}`} className="block">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer">
                  <span className="text-3xl font-bold text-blue-700">Class {i+1}</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
} 