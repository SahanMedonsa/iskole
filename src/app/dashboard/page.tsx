'use client';
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Users, GraduationCap, BookOpen, UserCheck, UserX, CalendarDays, PlusCircle, AlertTriangle, Bell, Gift, TrendingUp, PieChart, BarChart3, Clock, ClipboardList, Search } from 'lucide-react';
import type { CSSProperties } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartConfig } from '../../components/ui/chart';
import Card from '../../components/Card';

const summaryCards = [
  { label: 'Total Students', value: 1450, icon: Users, color: 'bg-blue-100 text-blue-800', male: 750, female: 700 },
  { label: 'Total Teachers', value: 120, icon: GraduationCap, color: 'bg-green-100 text-green-800', male: 60, female: 60 },
  
  { label: 'Students Present Today', value: 1370, icon: UserCheck, color: 'bg-cyan-100 text-cyan-800', male: 700, female: 670 },
  { label: 'Students Absent Today', value: 80, icon: UserX, color: 'bg-red-100 text-red-800', male: 30, female: 50 },
  { label: 'Teachers Present Today', value: 110, icon: UserCheck, color: 'bg-green-100 text-green-800', male: 55, female: 55 },
  { label: 'Teachers Absent Today', value: 10, icon: UserX, color: 'bg-red-100 text-red-800', male: 4, female: 6 },
 
  { label: 'Total Classes', value: 26, icon: BookOpen, color: 'bg-yellow-100 text-yellow-800' },
 
  { label: 'Upcoming Events', value: 3, icon: CalendarDays, color: 'bg-orange-100 text-orange-800' },
];

const specialEvents = [
  { type: 'event', label: 'Sports Day', date: '2024-10-02', icon: Bell },
  { type: 'notice', label: 'Exam Timetable Released', date: '2024-09-20', icon: ClipboardList },
  { type: 'holiday', label: 'Poya Day', date: '2024-09-29', icon: AlertTriangle },
  { type: 'birthday', label: 'Ayesha Perera (Student)', date: '2024-09-18', icon: Gift },
];

const quickActions = [
  { label: 'Register New Student', icon: PlusCircle },
  { label: 'Register New Teacher', icon: PlusCircle },
  { label: 'Add New Event / Holiday', icon: CalendarDays },
  { label: 'Search Student / Teacher', icon: Search },
];

const recentActivity = [
  { label: 'Admin login', time: '2 min ago' },
  { label: 'Last registered student: Nimal Fernando', time: '10 min ago' },
  { label: 'Last report generated', time: '30 min ago' },
  { label: 'Leave request approved', time: '1 hr ago' },
];

const pendingRequests = [
  { label: 'Teacher leave requests', count: 2 },
  { label: 'Fee dues', count: 5 },
  { label: 'Pending document verifications', count: 3 },
  { label: 'Class changes pending approval', count: 1 },
];

const timetable = [
  { period: 'Maths', teacher: 'Mr. Silva', time: '08:00 - 08:45', status: 'Ongoing' },
  { period: 'Science', teacher: 'Ms. Nadeesha', time: '08:45 - 09:30', status: 'Upcoming' },
  { period: 'Break', teacher: '', time: '09:30 - 09:45', status: 'Break' },
];

// Add resource and special needs data
const resources = [
  { label: 'Desks', value: 500 },
  { label: 'Chairs', value: 500 },
  { label: 'Blackboards', value: 30 },
  { label: 'Projectors', value: 10 },
  { label: 'Computers', value: 40 },
];
const specialNeeds = [
  { label: 'Students with Special Needs', value: 12 },
  { label: 'Wheelchair Accessible Classrooms', value: 8 },
  { label: 'Special Educators', value: 3 },
];
const monthlyEnrollment = [
  { month: 'Jan', value: 10 },
  { month: 'Feb', value: 12 },
  { month: 'Mar', value: 15 },
  { month: 'Apr', value: 8 },
  { month: 'May', value: 20 },
  { month: 'Jun', value: 18 },
  { month: 'Jul', value: 22 },
  { month: 'Aug', value: 17 },
  { month: 'Sep', value: 25 },
  { month: 'Oct', value: 19 },
  { month: 'Nov', value: 14 },
  { month: 'Dec', value: 11 },
];
const genderDist = [
  { label: 'Male', value: 750, color: 'fill-blue-500' },
  { label: 'Female', value: 700, color: 'fill-pink-400' },
];

// Example attendance data for weekly, monthly, and annual views
const attendanceData = {
  weekly: [
    { grade: 1, male: 85, female: 90 },
    { grade: 2, male: 80, female: 88 },
    { grade: 3, male: 78, female: 85 },
    { grade: 4, male: 82, female: 87 },
    { grade: 5, male: 88, female: 92 },
    { grade: 6, male: 90, female: 93 },
    { grade: 7, male: 84, female: 89 },
    { grade: 8, male: 79, female: 86 },
    { grade: 9, male: 81, female: 88 },
    { grade: 10, male: 83, female: 90 },
    { grade: 11, male: 77, female: 84 },
    { grade: 12, male: 80, female: 85 },
    { grade: 13, male: 75, female: 82 },
  ],
  monthly: [
    { grade: 1, male: 88, female: 91 },
    { grade: 2, male: 85, female: 89 },
    { grade: 3, male: 82, female: 87 },
    { grade: 4, male: 86, female: 90 },
    { grade: 5, male: 90, female: 94 },
    { grade: 6, male: 92, female: 95 },
    { grade: 7, male: 87, female: 91 },
    { grade: 8, male: 83, female: 88 },
    { grade: 9, male: 85, female: 90 },
    { grade: 10, male: 88, female: 92 },
    { grade: 11, male: 80, female: 86 },
    { grade: 12, male: 84, female: 89 },
    { grade: 13, male: 78, female: 85 },
  ],
  annual: [
    { grade: 1, male: 90, female: 93 },
    { grade: 2, male: 88, female: 92 },
    { grade: 3, male: 85, female: 90 },
    { grade: 4, male: 89, female: 93 },
    { grade: 5, male: 93, female: 96 },
    { grade: 6, male: 95, female: 97 },
    { grade: 7, male: 90, female: 94 },
    { grade: 8, male: 86, female: 91 },
    { grade: 9, male: 88, female: 93 },
    { grade: 10, male: 91, female: 95 },
    { grade: 11, male: 84, female: 90 },
    { grade: 12, male: 88, female: 92 },
    { grade: 13, male: 82, female: 88 },
  ],
};

const classAttendanceData = [
  { grade: 1, boys: 85, girls: 90 },
  { grade: 2, boys: 80, girls: 88 },
  { grade: 3, boys: 78, girls: 85 },
  { grade: 4, boys: 82, girls: 87 },
  { grade: 5, boys: 88, girls: 92 },
  { grade: 6, boys: 90, girls: 93 },
  { grade: 7, boys: 84, girls: 89 },
  { grade: 8, boys: 79, girls: 86 },
  { grade: 9, boys: 81, girls: 88 },
  { grade: 10, boys: 83, girls: 90 },
  { grade: 11, boys: 77, girls: 84 },
  { grade: 12, boys: 80, girls: 85 },
  { grade: 13, boys: 75, girls: 82 },
];

const classAttendanceConfig: ChartConfig = {
  boys: {
    label: 'Boys',
    color: '#3b82f6',
  },
  girls: {
    label: 'Girls',
    color: '#ec4899',
  },
};

// Helper for bar style
const getBarStyle = (value: number, color: string): CSSProperties => ({
  height: `${value}%`,
  minHeight: '50px',
  backgroundColor: color,
  borderRadius: '0.5rem 0.5rem 0 0',
  boxShadow: '0 2px 6px 0 rgba(0,0,0,0.08)',
  border: '1.5px solid #e5e7eb',
  position: 'relative' as CSSProperties['position'],
  width: '1rem',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
});

export default function DashboardPage() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  const [attendanceView, setAttendanceView] = useState('monthly');
  const [subFilter, setSubFilter] = useState('');

  // Sub-filter options
  const weekOptions = [
    { value: '1', label: '1st Week' },
    { value: '2', label: '2nd Week' },
    { value: '3', label: '3rd Week' },
    { value: '4', label: '4th Week' },
  ];
  const monthOptions = [
    { value: 'jan', label: 'January' },
    { value: 'feb', label: 'February' },
    { value: 'mar', label: 'March' },
    { value: 'apr', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'jun', label: 'June' },
    { value: 'jul', label: 'July' },
    { value: 'aug', label: 'August' },
    { value: 'sep', label: 'September' },
    { value: 'oct', label: 'October' },
    { value: 'nov', label: 'November' },
    { value: 'dec', label: 'December' },
  ];
  const yearOptions = [
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
    { value: '2028', label: '2028' },
    { value: '2029', label: '2029' },
    { value: '2030', label: '2030' },
  ];
  let subFilterOptions = [];
  if (attendanceView === 'weekly') subFilterOptions = weekOptions;
  else if (attendanceView === 'monthly') subFilterOptions = monthOptions;
  else if (attendanceView === 'annual') subFilterOptions = yearOptions;

  // For demo, use the same data for all sub-filters
  const chartData = attendanceData[attendanceView];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="rounded-l-2xl overflow-hidden">
          <Sidebar />
        </div>
        <main className="flex-1 flex flex-col p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
              <div className="text-lg text-gray-500 mt-1">{formattedDate}</div>
            </div>
            <div className="flex flex-wrap gap-4">
              {quickActions.map(action => (
                <button key={action.label} className="flex items-center gap-2 bg-blue-200 text-blue-900 px-4 py-2 rounded font-semibold shadow hover:bg-blue-300 transition">
                  <action.icon className="w-5 h-5" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {summaryCards.map(card => (
              <div key={card.label} className={`rounded-xl shadow-lg flex flex-col justify-center py-6 gap-2 ${card.color}`}>
                <div className="flex flex-row items-center justify-center gap-2 mb-2">
                  <card.icon className="w-7 h-7" />
                  <span className="text-lg font-semibold">{card.label}</span>
                </div>
                <div className="flex flex-row items-center w-full px-6">
                  <div className="flex-1 text-3xl font-bold text-left">{card.value}</div>
                  {card.male !== undefined && card.female !== undefined && (
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-semibold text-blue-600">Male - {card.male}</span>
                      <span className="text-sm font-semibold text-pink-500">Female - {card.female}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Class Attendance by Grade - Boys vs Girls as a status card */}
            <Card className="col-span-1 md:col-span-2 lg:col-span-4 p-0 overflow-x-auto h-[420px]">
              <div className="font-semibold text-lg mb-2 flex items-center gap-2 px-6 pt-6">
                Class Attendance by Grade
                <select
                  className="ml-auto px-2 py-1 border rounded text-base text-gray-700"
                  value={attendanceView}
                  onChange={e => {
                    setAttendanceView(e.target.value);
                    setSubFilter('');
                  }}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </select>
                <select
                  className="ml-2 px-2 py-1 border rounded text-base text-gray-700"
                  value={subFilter}
                  onChange={e => setSubFilter(e.target.value)}
                >
                  <option value="">{attendanceView === 'weekly' ? 'Select Week' : attendanceView === 'monthly' ? 'Select Month' : 'Select Year'}</option>
                  {subFilterOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="px-2 pb-4">
                <ChartContainer config={classAttendanceConfig} className="h-[200px] w-full bg-transparent shadow-none p-0">
                  <BarChart data={chartData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="grade"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      domain={[1, 13]}
                      ticks={[1,2,3,4,5,6,7,8,9,10,11,12,13]}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend config={classAttendanceConfig} />
                    <Bar dataKey="male" fill={classAttendanceConfig.boys.color} radius={4} />
                    <Bar dataKey="female" fill={classAttendanceConfig.girls.color} radius={4} />
                  </BarChart>
                </ChartContainer>
              </div>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="font-bold text-lg mb-4 flex items-center gap-2">🪑 Resources Summary</div>
              <ul className="space-y-2">
                {resources.map(r => (
                  <li key={r.label} className="flex items-center gap-2">
                    <span className="font-semibold">{r.label}:</span>
                    <span className="text-primary font-bold">{r.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="font-bold text-lg mb-4 flex items-center gap-2">🧑‍🦽 Special Needs</div>
              <ul className="space-y-2">
                {specialNeeds.map(s => (
                  <li key={s.label} className="flex items-center gap-2">
                    <span className="font-semibold">{s.label}:</span>
                    <span className="text-primary font-bold">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Special Events / Notices / Announcements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">📢</span>
               
                <span className="text-primary">Special Events & Notices</span>
              </div>
              <ul className="space-y-2">
                {specialEvents.map(ev => (
                  <li key={ev.label} className="flex items-center gap-2">
                    <ev.icon className="w-5 h-5" />
                    <span className="font-semibold">{ev.label}</span>
                    <span className="text-xs text-gray-500 ml-4">{ev.date}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="font-semibold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Pending Requests / Alerts</div>
              <ul className="space-y-2">
                {pendingRequests.map(req => (
                  <li key={req.label} className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold">{req.label}</span>
                    <span className="ml-2 text-xs text-gray-500">{req.count} pending</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Recent Activity Feed */}
         
          </div>

          {/* Pending Requests or Alerts & Timetable Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
            
          </div>

          {/* Resources and Special Needs */}
          
        </main>
      </div>
    </div>
  );
} 