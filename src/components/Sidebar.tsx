'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Bell,
  FileText,
  School,
  UserCog,
  PencilLine,
  Book,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Students', href: '/dashboard/students', icon: Users },
  { label: 'Teachers', href: '/dashboard/teachers', icon: GraduationCap },
  { label: 'Attendance', href: '/dashboard/attendance', icon: Calendar },
  { label: 'Classes', href: '/dashboard/classes', icon: School },
  { label: 'Learnings', href: '/dashboard/learnings', icon: Book },
  { label: 'Notices', href: '/dashboard/notices', icon: Bell },
  { label: 'Leaves', href: '/dashboard/leaves', icon: FileText },
  { label: 'Register', href: '/dashboard/register', icon: PencilLine },
];

const classSectionLinks = [
  { label: 'Primary', href: '/dashboard/classes/primary', icon: School },
  { label: 'Secondary', href: '/dashboard/classes/secondary', icon: School },
  { label: 'Advanced', href: '/dashboard/classes/advanced', icon: School },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="h-[110vh] w-60 bg-[#212B36] text-white flex flex-col p-6 shadow-lg rounded-xl mt-[15px] ml-[10px] mr-[10px] mb-[15px]">
      <div className="mb-8 font-bold text-xl tracking-wide">Menu</div>
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded px-3 py-2 transition-colors text-base font-medium ${
                active
                  ? 'bg-white text-black font-bold'
                  : 'text-white hover:bg-gray-100 hover:text-black'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-black' : 'text-white'}`} />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-2">
          <div className="px-3 py-2 text-base font-medium text-white">Classes</div>
          <div className="flex flex-col gap-1 ml-4">
            {classSectionLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded px-2 py-1 transition-colors text-base font-semibold ${
                    active
                      ? 'bg-white text-black font-bold'
                      : 'text-white hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${active ? 'text-black' : 'text-[#2c1810]'}`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <Link
        href="/dashboard/admin/profile"
        className="mt-auto pt-6 border-t border-gray-700 flex items-center gap-3 w-full hover:bg-gray-800 rounded transition-colors px-2 py-2 focus:outline-none"
      >
        <div className="bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
            />
          </svg>
        </div>
        <span className="font-semibold text-base">Profile</span>
      </Link>

      <Link
        href="/dashboard/admin"
        className="mt-2 flex items-center gap-3 w-full hover:bg-gray-800 rounded transition-colors px-2 py-2 focus:outline-none"
      >
        <UserCog className="w-6 h-6 text-white" />
        <span className="font-semibold text-base">Admin</span>
      </Link>
    </aside>
  );
};

export default Sidebar;
