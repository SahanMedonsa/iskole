'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  GraduationCap,
  Package,
  DollarSign,
  LogOut,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/company/dashboard',           icon: LayoutDashboard },
  { label: 'Schools',   href: '/company/dashboard/schools',   icon: Building2       },
  { label: 'Students',  href: '/company/dashboard/students',  icon: Users           },
  { label: 'Teachers',  href: '/company/dashboard/teachers',  icon: GraduationCap   },
  { label: 'Resources', href: '/company/dashboard/resources', icon: Package         },
  { label: 'Earnings',  href: '/company/dashboard/earnings',  icon: DollarSign      },
];

export default function CompanySidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/company/dashboard'
      ? pathname === href
      : pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="h-screen w-60 bg-[#212B36] text-white flex flex-col p-6 shadow-lg flex-shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-[#3E4EFA] flex items-center justify-center flex-shrink-0">
          <Building2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="font-extrabold text-sm text-white leading-none">iSkole</div>
          <div className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">Company</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35 mb-1">
          Main Menu
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors text-sm font-medium ${
                active
                  ? 'bg-white text-[#212B36]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-[#3E4EFA]' : ''}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-white/10">
        <Link
          href="/company/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
