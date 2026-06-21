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
      <div className="mb-8 font-bold text-xl tracking-wide text-white">Menu</div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors text-sm font-medium ${
                active
                  ? 'bg-white text-[#212B36]'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-[#212B36]' : 'text-white'}`} />
              {item.label}
            </Link>
          );
        })}

        <div className="mt-3">
          <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
            Class Sections
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {classSectionLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors text-sm font-medium ${
                    active
                      ? 'bg-white text-[#212B36]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-[#212B36]' : 'text-white'}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-1">
        <Link
          href="/dashboard/admin/profile"
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-white">Profile</span>
        </Link>

        <Link
          href="/dashboard/admin"
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2 hover:bg-white/10 transition-colors"
        >
          <UserCog className="w-4 h-4 text-white flex-shrink-0" />
          <span className="text-sm font-medium text-white">Admin</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
