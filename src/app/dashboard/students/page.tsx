"use client";
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import {
  Users, UserCheck, UserX, UserPlus, TrendingUp,
  BookOpen, Award, AlertCircle, Download, Printer,
  ArrowUpRight,
} from 'lucide-react';

const gradeData = [
  { grade: 1,  total: 120, present: 110, absent: 10, male: 65,  female: 55  },
  { grade: 2,  total: 115, present: 112, absent: 3,  male: 60,  female: 55  },
  { grade: 3,  total: 130, present: 125, absent: 5,  male: 70,  female: 60  },
  { grade: 4,  total: 110, present: 108, absent: 2,  male: 58,  female: 52  },
  { grade: 5,  total: 125, present: 120, absent: 5,  male: 65,  female: 60  },
  { grade: 6,  total: 115, present: 110, absent: 5,  male: 60,  female: 55  },
  { grade: 7,  total: 120, present: 115, absent: 5,  male: 62,  female: 58  },
  { grade: 8,  total: 110, present: 108, absent: 2,  male: 57,  female: 53  },
  { grade: 9,  total: 120, present: 117, absent: 3,  male: 63,  female: 57  },
  { grade: 10, total: 120, present: 115, absent: 5,  male: 60,  female: 60  },
  { grade: 11, total: 110, present: 108, absent: 2,  male: 55,  female: 55  },
  { grade: 12, total: 115, present: 110, absent: 5,  male: 58,  female: 57  },
  { grade: 13, total: 100, present: 97,  absent: 3,  male: 52,  female: 48  },
];

const totalStudents  = gradeData.reduce((a, g) => a + g.total, 0);
const totalPresent   = gradeData.reduce((a, g) => a + g.present, 0);
const totalAbsent    = gradeData.reduce((a, g) => a + g.absent, 0);
const totalMale      = gradeData.reduce((a, g) => a + g.male, 0);
const totalFemale    = gradeData.reduce((a, g) => a + g.female, 0);
const attendanceRate = ((totalPresent / totalStudents) * 100).toFixed(1);

const statCards = [
  { label: 'Total Students',  value: totalStudents.toLocaleString(), sub: `${totalMale}M  ${totalFemale}F`, icon: Users,      color: 'text-blue-600',   bg: 'bg-blue-50'   },
  { label: 'Present Today',   value: totalPresent.toLocaleString(),  sub: `${attendanceRate}% attendance`,  icon: UserCheck,  color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Absent Today',    value: totalAbsent.toLocaleString(),   sub: 'across all grades',              icon: UserX,      color: 'text-red-500',    bg: 'bg-red-50'    },
  { label: 'New This Month',  value: '25',                           sub: 'new admissions',                 icon: UserPlus,   color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Top Performers',  value: '156',                          sub: 'GPA above 3.8',                  icon: Award,      color: 'text-amber-600',  bg: 'bg-amber-50'  },
  { label: 'At Risk',         value: '23',                           sub: 'GPA below 2.0',                  icon: AlertCircle,color: 'text-orange-600', bg: 'bg-orange-50' },
];

const quickActions = [
  { label: 'View All Students', href: '/dashboard/students/details', icon: Users,    primary: true  },
  { label: 'Register Student',  href: '#',                           icon: UserPlus, primary: false },
  { label: 'Export List',       href: '#',                           icon: Download, primary: false },
  { label: 'Print ID Cards',    href: '#',                           icon: Printer,  primary: false },
];

export default function StudentsPage() {
  const [gradeFilter, setGradeFilter] = useState('');

  const filteredGrades = gradeFilter
    ? gradeData.filter(g => g.grade.toString() === gradeFilter)
    : gradeData;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">

          {/* Hero */}
          <div className="bg-gradient-to-br from-[#212B36] via-slate-700 to-slate-600 px-8 pt-10 pb-10 text-white">
            <div className="flex items-start justify-between max-w-5xl">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-7 h-7 text-white/70" />
                  <span className="text-xs uppercase tracking-[0.25em] text-white/50">School Management</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Students</h1>
                <p className="text-sm text-white/50 mt-1">{today}</p>
              </div>
              <div className="flex gap-3 mt-1">
                {quickActions.map(a => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.label}
                      href={a.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        a.primary
                          ? 'bg-white text-[#212B36] hover:bg-white/90'
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {a.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="px-8 pt-8 pb-16 space-y-8">

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
              {statCards.map(card => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-3">
                    <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${card.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-gray-900">{card.value}</div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5 leading-tight">{card.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Grade Table + Side Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Grade-wise Breakdown Table */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-800">Grade-wise Breakdown</span>
                  </div>
                  <select
                    value={gradeFilter}
                    onChange={e => setGradeFilter(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Grades</option>
                    {gradeData.map(g => (
                      <option key={g.grade} value={g.grade}>Grade {g.grade}</option>
                    ))}
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wide">
                        <th className="text-left px-6 py-3 font-semibold">Grade</th>
                        <th className="text-center px-4 py-3 font-semibold">Total</th>
                        <th className="text-center px-4 py-3 font-semibold text-emerald-600">Present</th>
                        <th className="text-center px-4 py-3 font-semibold text-red-500">Absent</th>
                        <th className="text-center px-4 py-3 font-semibold text-blue-500">Male</th>
                        <th className="text-center px-4 py-3 font-semibold text-pink-500">Female</th>
                        <th className="text-center px-4 py-3 font-semibold">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGrades.map((row, i) => {
                        const rate = ((row.present / row.total) * 100).toFixed(0);
                        return (
                          <tr key={row.grade} className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                            <td className="px-6 py-3 font-semibold text-gray-800">Grade {row.grade}</td>
                            <td className="px-4 py-3 text-center font-medium text-gray-700">{row.total}</td>
                            <td className="px-4 py-3 text-center font-medium text-emerald-600">{row.present}</td>
                            <td className="px-4 py-3 text-center font-medium text-red-500">{row.absent}</td>
                            <td className="px-4 py-3 text-center text-blue-500">{row.male}</td>
                            <td className="px-4 py-3 text-center text-pink-500">{row.female}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                Number(rate) >= 95 ? 'bg-emerald-100 text-emerald-700' :
                                Number(rate) >= 85 ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-600'
                              }`}>
                                {rate}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#212B36]/5 border-t-2 border-gray-200 font-bold text-sm">
                        <td className="px-6 py-3 text-gray-800">Total</td>
                        <td className="px-4 py-3 text-center text-gray-800">{totalStudents}</td>
                        <td className="px-4 py-3 text-center text-emerald-600">{totalPresent}</td>
                        <td className="px-4 py-3 text-center text-red-500">{totalAbsent}</td>
                        <td className="px-4 py-3 text-center text-blue-500">{totalMale}</td>
                        <td className="px-4 py-3 text-center text-pink-500">{totalFemale}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{attendanceRate}%</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Side Panel */}
              <div className="flex flex-col gap-4">

                {/* Attendance Overview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-800 text-sm">Attendance Overview</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Today",          value: `${attendanceRate}%`, sub: `${totalPresent} present`, color: 'bg-emerald-500' },
                      { label: "Monthly Avg",    value: "92.3%",              sub: "Last 30 days",           color: 'bg-blue-500'    },
                      { label: "Chronic Absent", value: "45",                 sub: "Below 75%",              color: 'bg-red-400'     },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className={`w-1.5 h-8 rounded-full ${item.color} flex-shrink-0`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500">{item.label}</div>
                          <div className="text-sm font-bold text-gray-800">{item.value}</div>
                        </div>
                        <div className="text-xs text-gray-400 text-right">{item.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gender Distribution */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-800 text-sm">Gender Split</span>
                  </div>
                  <div className="flex rounded-xl overflow-hidden h-3 mb-3">
                    <div className="bg-blue-400" style={{ width: `${(totalMale / totalStudents * 100).toFixed(1)}%` }} />
                    <div className="bg-pink-400 flex-1" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                        <span className="text-gray-600 text-xs">Male</span>
                      </div>
                      <div className="font-bold text-gray-800 mt-0.5">{totalMale} <span className="text-xs text-gray-400 font-normal">({(totalMale/totalStudents*100).toFixed(1)}%)</span></div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-400 inline-block" />
                        <span className="text-gray-600 text-xs">Female</span>
                      </div>
                      <div className="font-bold text-gray-800 mt-0.5">{totalFemale} <span className="text-xs text-gray-400 font-normal">({(totalFemale/totalStudents*100).toFixed(1)}%)</span></div>
                    </div>
                  </div>
                </div>

                {/* Academic Snapshot */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-800 text-sm">Academic Snapshot</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'School Average GPA', value: '3.4',  icon: TrendingUp,  color: 'text-blue-500'   },
                      { label: 'Top Performers',      value: '156',  icon: Award,       color: 'text-amber-500'  },
                      { label: 'At-Risk Students',    value: '23',   icon: AlertCircle, color: 'text-red-500'    },
                      { label: 'Special Needs',       value: '23',   icon: Users,       color: 'text-violet-500' },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                            <span className="text-xs text-gray-600">{item.label}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-800">{item.value}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Link
                    href="#"
                    className="mt-4 flex items-center gap-1.5 text-xs text-blue-500 font-semibold hover:text-blue-600 transition-colors"
                  >
                    View full report <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
