'use client';

import React from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import Card from '../../../components/Card';
import Link from 'next/link';
import { FaUserShield, FaDatabase, FaPalette, FaSchool, FaCalendarAlt, FaArrowUp, FaUsersCog, FaBell, FaCog } from 'react-icons/fa';

const settings = [
  {
    icon: <FaUserShield className="text-2xl text-blue-600" />,
    title: 'User Roles & Permissions',
    description: 'Manage roles, permissions, and access for all user types.',
    features: [
      'Create custom roles (e.g., Finance Admin, Exam Coordinator)',
      'Set access permissions (View / Create / Edit / Delete)',
      'Assign roles to users',
      'Prevent unauthorized actions'
    ],
    action: (
      <Link href="/dashboard/admin/roles">
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Manage Roles</button>
      </Link>
    )
  },
  {
    icon: <FaDatabase className="text-2xl text-green-600" />,
    title: 'Backup & Restore Data',
    description: 'Backup your data manually or automatically, and restore from backup points.',
    features: [
      'Manual & scheduled backups',
      'Cloud sync (Google Drive, Dropbox)',
      'Restore from backup',
      'View backup history'
    ],
    action: (
      <Link href="/dashboard/admin/backup">
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Backup Now</button>
      </Link>
    )
  },
  {
    icon: <FaPalette className="text-2xl text-pink-600" />,
    title: 'Theme Customization',
    description: 'Personalize the admin panel appearance.',
    features: [
      'Change theme colors',
      'Upload school logo',
      'Toggle dark/light mode',
      'Font & layout settings'
    ],
    action: (
      <Link href="/dashboard/admin/theme">
        <button className="mt-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition">Customize Theme</button>
      </Link>
    )
  },
  {
    icon: <FaSchool className="text-2xl text-yellow-600" />,
    title: 'School Info Management',
    description: 'Edit your school\'s profile and contact details.',
    features: [
      'School name, registration number',
      'Logo upload, contact info',
      'Principal info, motto, academic year'
    ],
    action: (
      <Link href="/dashboard/admin/school-info">
        <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">Edit School Info</button>
      </Link>
    )
  },
  {
    icon: <FaCalendarAlt className="text-2xl text-purple-600" />,
    title: 'Session / Term Setup',
    description: 'Manage academic calendar and terms.',
    features: [
      'Define academic year & terms',
      'Enable/disable terms',
      'Session auto-advance'
    ],
    action: (
      <Link href="/dashboard/admin/session">
        <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">Setup Terms</button>
      </Link>
    )
  },
  {
    icon: <FaArrowUp className="text-2xl text-orange-600" />,
    title: 'Auto-Promotion Rules',
    description: 'Automate student promotions based on criteria.',
    features: [
      'Set promotion rules',
      'Manual override',
      'Bulk promote students'
    ],
    action: (
      <Link href="/dashboard/admin/promotion">
        <button className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition">Configure Promotion</button>
      </Link>
    )
  },
  {
    icon: <FaUsersCog className="text-2xl text-cyan-600" />,
    title: 'Admin Management & Access Control',
    description: 'Add, invite, and manage admin users and their access.',
    features: [
      'Add new admins, assign roles',
      'MFA, IP/location restrictions',
      'Audit logs, revoke access'
    ],
    action: (
      <Link href="/dashboard/admin/admin-management">
        <button className="mt-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition">Manage Admins</button>
      </Link>
    )
  },
  {
    icon: <FaBell className="text-2xl text-red-600" />,
    title: 'Notification Settings',
    description: 'Configure app, email, and SMS notifications.',
    features: [
      'Email/SMS templates',
      'Enable/disable notifications',
      'Push notification setup'
    ],
    action: (
      <Link href="/dashboard/admin/notifications">
        <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Notification Settings</button>
      </Link>
    )
  },
  {
    icon: <FaCog className="text-2xl text-gray-600" />,
    title: 'System Configuration',
    description: 'Global platform settings.',
    features: [
      'Language, timezone, currency',
      'File upload limits',
      'Data retention policy'
    ],
    action: (
      <Link href="/dashboard/admin/system">
        <button className="mt-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition">System Settings</button>
      </Link>
    )
  }
];

export default function AdminPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {settings.map((section, idx) => (
              <Card key={idx} className="flex flex-col h-full">
                <div className="flex items-center mb-3">{section.icon}<span className="ml-3 text-xl font-semibold">{section.title}</span></div>
                <p className="text-gray-600 mb-2">{section.description}</p>
                <ul className="list-disc list-inside text-sm text-gray-500 mb-4">
                  {section.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                {section.action}
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
} 