'use client';

import React from 'react';
import {
  Building2, Users, GraduationCap, BookOpen,
  UserCheck, UserX, TrendingUp, Award,
} from 'lucide-react';
import SriLankaSchoolMap, { type SchoolPin } from '../../../components/SriLankaSchoolMap';

// ── Map pins (5 pilot schools) ─────────────────────────────────────────────
const schoolPins: SchoolPin[] = [
  { id: 'SCH001', name: 'Kalutara National College',   location: 'Kalutara',   type: 'Government',      students: 1450, teachers: 120, lat: 6.58, lon: 79.96 },
  { id: 'SCH002', name: 'Colombo Central School',      location: 'Colombo 07', type: 'Government',      students: 2100, teachers: 180, lat: 6.93, lon: 79.85 },
  { id: 'SCH003', name: 'Galle International Academy', location: 'Galle',      type: 'Private',         students: 850,  teachers: 90,  lat: 6.05, lon: 80.22 },
  { id: 'SCH004', name: 'Kandy Heritage School',       location: 'Kandy',      type: 'Semi-Government', students: 1200, teachers: 105, lat: 7.29, lon: 80.63 },
  { id: 'SCH005', name: 'Jaffna Model School',         location: 'Jaffna',     type: 'Government',      students: 980,  teachers: 88,  lat: 9.66, lon: 80.02 },
];

// ── Derived totals ─────────────────────────────────────────────────────────
const totalNetworkSchools = 349;

// Pilot school aggregates (replace with real API)
const pilotStats = {
  students:      6580,
  teachers:       583,
  classes:        126,
  present:       6200,
  absent:         380,
  pendingFees:    428,
  newAdmissions:  120,
  avgGPA:        3.50,
};
const networkAttendance = ((pilotStats.present / pilotStats.students) * 100).toFixed(1);

const statCards = [
  { label: 'Total Schools',      value: totalNetworkSchools,                    icon: Building2,     color: 'text-slate-600',   bg: 'bg-slate-100'  },
  { label: 'Total Students',     value: pilotStats.students.toLocaleString(),   icon: Users,         color: 'text-blue-600',    bg: 'bg-blue-50'    },
  { label: 'Total Teachers',     value: pilotStats.teachers.toLocaleString(),   icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Total Classes',      value: pilotStats.classes,                     icon: BookOpen,      color: 'text-violet-600',  bg: 'bg-violet-50'  },
  { label: 'Present Today',      value: pilotStats.present.toLocaleString(),    icon: UserCheck,     color: 'text-green-600',   bg: 'bg-green-50'   },
  { label: 'Absent Today',       value: pilotStats.absent.toLocaleString(),     icon: UserX,         color: 'text-red-500',     bg: 'bg-red-50'     },
  { label: 'Network Attendance', value: `${networkAttendance}%`,               icon: TrendingUp,    color: 'text-cyan-600',    bg: 'bg-cyan-50'    },
  { label: 'New This Month',     value: pilotStats.newAdmissions,              icon: Award,         color: 'text-amber-600',   bg: 'bg-amber-50'   },
];

export default function CompanyDashboard() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Network Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">{today}</p>
        </div>
      </div>

      <div className="px-8 py-8 space-y-8 max-w-[1400px] mx-auto">

        {/* Sri Lanka Map */}
        <SriLankaSchoolMap schools={schoolPins} />

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4">
          {statCards.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
                <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-gray-900">{card.value}</div>
                  <div className="text-[11px] text-gray-400 font-medium mt-0.5 leading-tight">{card.label}</div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
}
