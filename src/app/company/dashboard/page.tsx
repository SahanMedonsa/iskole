'use client';

import React from 'react';
import {
  Building2, Users, GraduationCap, BookOpen,
  UserCheck, UserX, TrendingUp, Award, AlertCircle, BarChart3,
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

// ── Province / district school counts ─────────────────────────────────────
type District = { name: string; schools: number };
type Province = {
  id: string;
  name: string;
  bg: string;
  border: string;
  labelColor: string;
  dotColor: string;
  districts: District[];
};

const provinces: Province[] = [
  {
    id: 'western', name: 'Western Province',
    bg: 'bg-blue-50', border: 'border-blue-100', labelColor: 'text-blue-700',
    dotColor: 'bg-blue-400',
    districts: [
      { name: 'Colombo',  schools: 30 },
      { name: 'Gampaha',  schools: 25 },
      { name: 'Kalutara', schools: 20 },
    ],
  },
  {
    id: 'central', name: 'Central Province',
    bg: 'bg-emerald-50', border: 'border-emerald-100', labelColor: 'text-emerald-700',
    dotColor: 'bg-emerald-400',
    districts: [
      { name: 'Kandy',        schools: 18 },
      { name: 'Matale',       schools: 12 },
      { name: 'Nuwara Eliya', schools: 10 },
    ],
  },
  {
    id: 'southern', name: 'Southern Province',
    bg: 'bg-amber-50', border: 'border-amber-100', labelColor: 'text-amber-700',
    dotColor: 'bg-amber-400',
    districts: [
      { name: 'Galle',       schools: 15 },
      { name: 'Matara',      schools: 14 },
      { name: 'Hambantota',  schools: 11 },
    ],
  },
  {
    id: 'northern', name: 'Northern Province',
    bg: 'bg-violet-50', border: 'border-violet-100', labelColor: 'text-violet-700',
    dotColor: 'bg-violet-400',
    districts: [
      { name: 'Jaffna',      schools: 16 },
      { name: 'Kilinochchi', schools: 8  },
      { name: 'Mannar',      schools: 6  },
      { name: 'Vavuniya',    schools: 9  },
      { name: 'Mullaitivu',  schools: 7  },
    ],
  },
  {
    id: 'eastern', name: 'Eastern Province',
    bg: 'bg-cyan-50', border: 'border-cyan-100', labelColor: 'text-cyan-700',
    dotColor: 'bg-cyan-400',
    districts: [
      { name: 'Trincomalee', schools: 13 },
      { name: 'Batticaloa',  schools: 14 },
      { name: 'Ampara',      schools: 12 },
    ],
  },
  {
    id: 'north-western', name: 'North Western Province',
    bg: 'bg-rose-50', border: 'border-rose-100', labelColor: 'text-rose-700',
    dotColor: 'bg-rose-400',
    districts: [
      { name: 'Kurunegala', schools: 20 },
      { name: 'Puttalam',   schools: 15 },
    ],
  },
  {
    id: 'north-central', name: 'North Central Province',
    bg: 'bg-orange-50', border: 'border-orange-100', labelColor: 'text-orange-700',
    dotColor: 'bg-orange-400',
    districts: [
      { name: 'Anuradhapura', schools: 17 },
      { name: 'Polonnaruwa',  schools: 10 },
    ],
  },
  {
    id: 'uva', name: 'Uva Province',
    bg: 'bg-teal-50', border: 'border-teal-100', labelColor: 'text-teal-700',
    dotColor: 'bg-teal-400',
    districts: [
      { name: 'Badulla',    schools: 13 },
      { name: 'Monaragala', schools: 9  },
    ],
  },
  {
    id: 'sabaragamuwa', name: 'Sabaragamuwa Province',
    bg: 'bg-indigo-50', border: 'border-indigo-100', labelColor: 'text-indigo-700',
    dotColor: 'bg-indigo-400',
    districts: [
      { name: 'Ratnapura', schools: 14 },
      { name: 'Kegalle',   schools: 11 },
    ],
  },
];

// ── Derived totals ─────────────────────────────────────────────────────────
const totalNetworkSchools = provinces.reduce(
  (sum, p) => sum + p.districts.reduce((s, d) => s + d.schools, 0), 0
);

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

        {/* Network highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Network Attendance</div>
              <div className="text-3xl font-extrabold text-gray-900">{networkAttendance}%</div>
              <div className="text-xs text-gray-500 mt-0.5">{pilotStats.present.toLocaleString()} present · {pilotStats.absent.toLocaleString()} absent</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Network Avg GPA</div>
              <div className="text-3xl font-extrabold text-gray-900">{pilotStats.avgGPA.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-0.5">Across all {totalNetworkSchools} schools</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Pending Fee Cases</div>
              <div className="text-3xl font-extrabold text-gray-900">{pilotStats.pendingFees}</div>
              <div className="text-xs text-gray-500 mt-0.5">Students across all schools</div>
            </div>
          </div>
        </div>

        {/* Province / district breakdown */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-gray-400" />
            <h2 className="font-bold text-gray-800 text-sm">Schools by Province &amp; District</h2>
            <span className="text-xs text-gray-400 ml-1">({totalNetworkSchools} total)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {provinces.map(province => {
              const provinceTotal = province.districts.reduce((s, d) => s + d.schools, 0);
              return (
                <div
                  key={province.id}
                  className={`bg-white rounded-2xl border ${province.border} shadow-sm overflow-hidden`}
                >
                  {/* Card header */}
                  <div className={`${province.bg} px-5 py-4 flex items-center justify-between`}>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-widest ${province.labelColor}`}>
                        {province.name}
                      </div>
                      <div className="text-2xl font-extrabold text-gray-900 mt-0.5">{provinceTotal}</div>
                      <div className="text-xs text-gray-400">schools</div>
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${province.bg} border ${province.border} flex items-center justify-center`}>
                      <Building2 className={`w-5 h-5 ${province.labelColor}`} />
                    </div>
                  </div>

                  {/* District rows */}
                  <div className="px-5 py-3 divide-y divide-gray-50">
                    {province.districts.map(district => (
                      <div key={district.name} className="py-2.5 flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${province.dotColor}`} />
                        <span className="text-sm text-gray-600 flex-1">{district.name}</span>
                        <span className="text-sm font-bold text-gray-900 text-right">{district.schools}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
