"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell } from 'lucide-react';

const notifications = [
  { id: 1, title: 'New student registered', time: '2 min ago', description: 'Nimal Fernando has joined Grade 10.' },
  { id: 2, title: 'Teacher leave request', time: '10 min ago', description: 'Kasun Silva requested leave for 2 days.' },
  { id: 3, title: 'Exam timetable released', time: '1 hr ago', description: 'Check the new exam schedule.' },
];

const Navbar: React.FC = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  return (
    <>
      <nav className="w-full h-20 bg-[#1f2937] flex items-center justify-between px-6 shadow text-white">
        <div className="font-extrabold text-2xl tracking-wide">Iskole</div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start">
            <span className="font-bold text-2xl tracking-wide">KALUTARA VIDYALAYA</span>
            <span className="text-sm font-medium text-gray-300">Kalutara</span>
          </div>
          <Link href="/dashboard/admin/profile" className="focus:outline-none">
            <Image
              src="/assets/kalutara vidyalaya.png"
              alt="School Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 ml-4">
         <button className="relative focus:outline-none" onClick={() => setDrawerOpen(true)}>
           <Bell className="w-7 h-7 text-white" />
           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">{notifications.length}</span>
         </button>
          <div className="flex flex-col items-end">
            <span className="text-base font-semibold text-white">{formattedDate}</span>
            <span className="text-sm text-gray-300">{formattedTime}</span>
          </div>
        </div>
      </nav>
      {/* Notification Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-full max-w-sm h-full bg-white shadow-xl p-6 flex flex-col overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-6 text-primary">Notifications</h2>
            <ul className="space-y-4">
              {notifications.map((n) => (
                <li key={n.id} className="bg-gray-100 rounded-lg p-4 shadow flex flex-col">
                  <span className="font-semibold text-gray-800">{n.title}</span>
                  <span className="text-xs text-gray-500 mb-1">{n.time}</span>
                  <span className="text-sm text-gray-700">{n.description}</span>
                </li>
              ))}
            </ul>
            {notifications.length === 0 && (
              <div className="text-gray-500 text-center mt-8">No new notifications.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 