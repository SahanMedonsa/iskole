'use client';
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import ClassAttendanceStatus from '../../components/ClassAttendanceStatus';
import {
  Users, GraduationCap, UserCheck, CalendarDays, Bell, FileText,
  UserPlus, AlertTriangle, TrendingUp, BookOpen, ClipboardList,
  Clock, Upload, ChevronRight, PinIcon, Megaphone,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// ── Data ───────────────────────────────────────────────────────────────────
const KPI = [
  { label:'Total Students',        value:'1,450', sub:'750 M · 700 F',  icon:Users,         color:'text-blue-600',    bg:'bg-blue-50'    },
  { label:'Total Teachers',        value:'120',   sub:'60 M · 60 F',    icon:GraduationCap, color:'text-emerald-600', bg:'bg-emerald-50' },
  { label:"Today's Attendance",    value:'94.5%', sub:'1,370 present',  icon:UserCheck,     color:'text-cyan-600',    bg:'bg-cyan-50'    },
  { label:'New Registrations',     value:'23',    sub:'this month',     icon:UserPlus,      color:'text-violet-600',  bg:'bg-violet-50'  },
  { label:'Active Notices',        value:'8',     sub:'2 urgent',       icon:Bell,          color:'text-amber-600',   bg:'bg-amber-50'   },
  { label:'Upcoming Events',       value:'5',     sub:'next 30 days',   icon:CalendarDays,  color:'text-rose-600',    bg:'bg-rose-50'    },
];

const QUICK_ACTIONS = [
  { label:'Register Student', icon:UserPlus,      color:'text-blue-600',    bg:'bg-blue-50',    border:'border-blue-200',    href:'#' },
  { label:'Register Teacher', icon:GraduationCap, color:'text-emerald-600', bg:'bg-emerald-50', border:'border-emerald-200', href:'#' },
  { label:'Post a Notice',    icon:Megaphone,     color:'text-amber-600',   bg:'bg-amber-50',   border:'border-amber-200',   href:'#' },
  { label:'Generate Report',  icon:FileText,      color:'text-violet-600',  bg:'bg-violet-50',  border:'border-violet-200',  href:'#' },
];

const ATTENDANCE_TREND = [
  { week:'W1 May', students:88, teachers:91 },
  { week:'W2 May', students:91, teachers:94 },
  { week:'W3 May', students:89, teachers:93 },
  { week:'W4 May', students:93, teachers:96 },
  { week:'W1 Jun', students:90, teachers:92 },
  { week:'W2 Jun', students:92, teachers:95 },
  { week:'W3 Jun', students:94, teachers:97 },
  { week:'W4 Jun', students:94, teachers:97 },
];

const STUDENTS_BY_GRADE = [
  { grade:'G1', boys:40, girls:39 },{ grade:'G2', boys:38, girls:36 },
  { grade:'G3', boys:37, girls:35 },{ grade:'G4', boys:39, girls:38 },
  { grade:'G5', boys:41, girls:40 },{ grade:'G6', boys:42, girls:46 },
  { grade:'G7', boys:42, girls:47 },{ grade:'G8', boys:45, girls:49 },
  { grade:'G9', boys:43, girls:43 },{ grade:'G10',boys:44, girls:47 },
  { grade:'G11',boys:44, girls:46 },{ grade:'G12',boys:49, girls:47 },
  { grade:'G13',boys:44, girls:43 },
];

const PASS_RATES = [
  { year:'2021', oLevel:74, aLevel:82 },
  { year:'2022', oLevel:78, aLevel:85 },
  { year:'2023', oLevel:76, aLevel:87 },
  { year:'2024', oLevel:81, aLevel:89 },
  { year:'2025', oLevel:83, aLevel:91 },
];

const STREAMS = [
  { name:'Science', g12:32, g13:28, color:'#3b82f6' },
  { name:'Arts',    g12:34, g13:32, color:'#8b5cf6' },
  { name:'Commerce',g12:30, g13:28, color:'#f59e0b' },
];

const NOTICES = [
  { title:'Term 3 Examination Schedule',     date:'20 Jun', type:'Exam',    urgent:true  },
  { title:'Parent-Teacher Meeting – Jul 5',  date:'22 Jun', type:'Meeting', urgent:true  },
  { title:'Sports Day Preparation Notice',   date:'25 Jun', type:'Event',   urgent:false },
  { title:'Poya Day – School Closed',        date:'29 Jun', type:'Holiday', urgent:false },
  { title:'Annual Prize Giving Registration',date:'01 Jul', type:'Notice',  urgent:false },
];

const NOTICE_TYPE_STYLE: Record<string, string> = {
  Exam:    'bg-red-100 text-red-700',
  Meeting: 'bg-blue-100 text-blue-700',
  Event:   'bg-amber-100 text-amber-700',
  Holiday: 'bg-emerald-100 text-emerald-700',
  Notice:  'bg-gray-100 text-gray-600',
};

const EVENTS = [
  { title:'Parent-Teacher Meeting',  date:'28 Jun', day:'Sat', type:'meeting'  },
  { title:'Poya Day (Holiday)',       date:'29 Jun', day:'Sun', type:'holiday'  },
  { title:'Sports Day',               date:'02 Jul', day:'Wed', type:'event'    },
  { title:'Term 3 Exams Begin',       date:'07 Jul', day:'Mon', type:'exam'     },
  { title:'Staff Development Day',    date:'11 Jul', day:'Fri', type:'meeting'  },
  { title:'Term 3 Results Released',  date:'15 Aug', day:'Sat', type:'result'   },
];

const EVENT_STYLE: Record<string, { dot:string; badge:string }> = {
  meeting: { dot:'bg-blue-400',    badge:'bg-blue-100 text-blue-700'     },
  holiday: { dot:'bg-emerald-400', badge:'bg-emerald-100 text-emerald-700' },
  event:   { dot:'bg-amber-400',   badge:'bg-amber-100 text-amber-700'   },
  exam:    { dot:'bg-red-400',     badge:'bg-red-100 text-red-700'       },
  result:  { dot:'bg-violet-400',  badge:'bg-violet-100 text-violet-700' },
};

const ALERTS = [
  { label:'Students with attendance < 75%',   count:12, urgent:true,  icon:UserCheck   },
  { label:'Medical certificates expiring',     count:5,  urgent:true,  icon:Upload      },
  { label:'Pending registration approvals',    count:3,  urgent:false, icon:ClipboardList },
  { label:'Teachers on leave today',           count:10, urgent:false, icon:GraduationCap },
  { label:'Fee dues unpaid this term',         count:8,  urgent:false, icon:AlertTriangle },
];

const ACTIVITY = [
  { action:'Student registered',   name:'Kavinda Perera',           time:'5 min ago',  type:'student'  },
  { action:'Notice posted',        name:'Term 3 Exam Schedule',     time:'22 min ago', type:'notice'   },
  { action:'Profile updated',      name:'Mrs. Kumari Perera',       time:'1 hr ago',   type:'teacher'  },
  { action:'Document uploaded',    name:'NIC — Mr. Anura Bandara',  time:'2 hr ago',   type:'document' },
  { action:'Student registered',   name:'Sachini Fernando',         time:'3 hr ago',   type:'student'  },
  { action:'Report generated',     name:'May Attendance Report',    time:'4 hr ago',   type:'report'   },
];

const ACTIVITY_STYLE: Record<string, { icon: React.ElementType; bg:string; color:string }> = {
  student:  { icon:UserPlus,      bg:'bg-blue-50',    color:'text-blue-500'   },
  notice:   { icon:Bell,          bg:'bg-amber-50',   color:'text-amber-500'  },
  teacher:  { icon:GraduationCap, bg:'bg-emerald-50', color:'text-emerald-500'},
  document: { icon:Upload,        bg:'bg-violet-50',  color:'text-violet-500' },
  report:   { icon:FileText,      bg:'bg-gray-100',   color:'text-gray-500'   },
};

// ── Page ───────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [trendView, setTrendView] = useState<'weekly'|'monthly'>('weekly');

  const today = new Date().toLocaleDateString('en-US', {
    weekday:'long', year:'numeric', month:'long', day:'numeric',
  });

  const totalStudents = STUDENTS_BY_GRADE.reduce((a, g) => a + g.boys + g.girls, 0);
  const totalBoys     = STUDENTS_BY_GRADE.reduce((a, g) => a + g.boys, 0);
  const totalGirls    = STUDENTS_BY_GRADE.reduce((a, g) => a + g.girls, 0);
  const boysPct       = Math.round((totalBoys  / totalStudents) * 100);
  const girlsPct      = Math.round((totalGirls / totalStudents) * 100);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-6 py-7 space-y-6">

          {/* ── Header ── */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">School Dashboard</h1>
              <p className="text-sm text-gray-400 mt-0.5">{today}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-gray-500 font-medium">Live</span>
            </div>
          </div>

          {/* ── KPI cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
            {KPI.map(k => {
              const Icon = k.icon;
              return (
                <div key={k.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2.5">
                  <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${k.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900 leading-tight">{k.value}</div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5 leading-tight">{k.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{k.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Quick actions ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map(a => {
              const Icon = a.icon;
              return (
                <button key={a.label} className={`flex items-center gap-3 bg-white border ${a.border} rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md transition-all group`}>
                  <div className={`w-9 h-9 rounded-xl ${a.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${a.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 text-left leading-tight">{a.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Main content grid ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* LEFT (2/3) */}
            <div className="xl:col-span-2 space-y-6">

              {/* Attendance trend */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#3E4EFA]" /> Attendance Trend
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">Student & teacher weekly attendance %</p>
                  </div>
                  <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                    {(['weekly','monthly'] as const).map(v => (
                      <button key={v} onClick={() => setTrendView(v)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${trendView===v ? 'bg-white text-[#3E4EFA] shadow-sm' : 'text-gray-500'}`}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={ATTENDANCE_TREND} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                    <defs>
                      <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#3E4EFA" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#3E4EFA" stopOpacity={0}    />
                      </linearGradient>
                      <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#10b981" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize:10, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[80,100]} tick={{ fontSize:10, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius:12, border:'1px solid #e5e7eb', fontSize:11 }} formatter={(v:number) => `${v}%`} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize:11 }} />
                    <Area type="monotone" dataKey="students" name="Students" stroke="#3E4EFA" strokeWidth={2} fill="url(#gS)" dot={false} activeDot={{ r:4 }} />
                    <Area type="monotone" dataKey="teachers" name="Teachers" stroke="#10b981" strokeWidth={2} fill="url(#gT)" dot={false} activeDot={{ r:4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Students by grade + Gender ratio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* Students by grade */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" /> Students by Grade
                  </h2>
                  <p className="text-xs text-gray-400 mb-4">Boys vs Girls per grade</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={STUDENTS_BY_GRADE} barSize={6} margin={{ top:0, right:0, left:-28, bottom:0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey="grade" tick={{ fontSize:9, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize:9, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius:10, border:'1px solid #e5e7eb', fontSize:11 }} />
                      <Bar dataKey="boys"  name="Boys"  fill="#3b82f6" radius={[3,3,0,0]} />
                      <Bar dataKey="girls" name="Girls" fill="#ec4899" radius={[3,3,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Gender ratio + S:T ratio + streams */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

                  {/* Gender ratio */}
                  <div>
                    <h2 className="text-sm font-bold text-gray-800 mb-3">Gender Ratio</h2>
                    <div className="flex rounded-full overflow-hidden h-3 mb-2">
                      <div className="bg-blue-400 transition-all" style={{ width:`${boysPct}%` }} />
                      <div className="bg-pink-400 transition-all" style={{ width:`${girlsPct}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-blue-500">Boys {totalBoys} ({boysPct}%)</span>
                      <span className="text-pink-500">Girls {totalGirls} ({girlsPct}%)</span>
                    </div>
                  </div>

                  {/* Student-to-teacher ratio */}
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <div className="text-lg font-extrabold text-gray-900">1 : {Math.round(totalStudents / 120)}</div>
                      <div className="text-[11px] text-gray-400 font-medium">Student-to-Teacher Ratio</div>
                    </div>
                  </div>

                  {/* Subject streams */}
                  <div>
                    <h2 className="text-xs font-bold text-gray-700 mb-2">Senior Stream Distribution (G12–13)</h2>
                    {STREAMS.map(s => {
                      const total = s.g12 + s.g13;
                      return (
                        <div key={s.name} className="mb-2">
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="font-semibold text-gray-700">{s.name}</span>
                            <span className="text-gray-500">{total} students</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width:`${(total/184)*100}%`, backgroundColor:s.color }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Pass rate trends */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-emerald-500" /> Pass Rate Trends
                </h2>
                <p className="text-xs text-gray-400 mb-5">O/Level & A/Level annual results (%)</p>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={PASS_RATES} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fontSize:10, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[60,100]} tick={{ fontSize:10, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius:12, border:'1px solid #e5e7eb', fontSize:11 }} formatter={(v:number) => `${v}%`} />
                    <Legend iconSize={8} wrapperStyle={{ fontSize:11 }} />
                    <Line type="monotone" dataKey="oLevel" name="O/Level" stroke="#f59e0b" strokeWidth={2.5} dot={{ r:4, fill:'#f59e0b' }} />
                    <Line type="monotone" dataKey="aLevel" name="A/Level" stroke="#3E4EFA" strokeWidth={2.5} dot={{ r:4, fill:'#3E4EFA' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Class attendance status */}
              <ClassAttendanceStatus />

            </div>

            {/* RIGHT (1/3) */}
            <div className="space-y-6">

              {/* Alerts */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" /> Alerts & Flags
                </h2>
                <ul className="space-y-2">
                  {ALERTS.map(a => {
                    const Icon = a.icon;
                    return (
                      <li key={a.label} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${a.urgent ? 'bg-red-50 border border-red-100' : 'bg-gray-50 border border-gray-100'}`}>
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${a.urgent ? 'text-red-400' : 'text-gray-400'}`} />
                        <span className={`text-xs font-medium flex-1 leading-tight ${a.urgent ? 'text-red-700' : 'text-gray-600'}`}>{a.label}</span>
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${a.urgent ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>{a.count}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Notices */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-500" /> Notices
                  </h2>
                  <a href="/dashboard/notices" className="text-[11px] font-semibold text-[#3E4EFA] hover:underline flex items-center gap-0.5">
                    View all <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
                <ul className="space-y-2.5">
                  {NOTICES.map(n => (
                    <li key={n.title} className={`rounded-xl p-3 border ${n.urgent ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-start gap-2">
                        {n.urgent && <PinIcon className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />}
                        <span className={`text-xs font-semibold leading-tight flex-1 ${n.urgent ? 'text-red-800' : 'text-gray-700'}`}>{n.title}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${NOTICE_TYPE_STYLE[n.type]}`}>{n.type}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1.5 ml-0">{n.date}</div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upcoming events */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-rose-500" /> Upcoming Events
                </h2>
                <ul className="space-y-2.5">
                  {EVENTS.map(ev => {
                    const st = EVENT_STYLE[ev.type];
                    return (
                      <li key={ev.title} className="flex items-center gap-3">
                        <div className="flex flex-col items-center w-10 flex-shrink-0">
                          <div className={`w-2 h-2 rounded-full ${st.dot}`} />
                          <div className="w-px flex-1 bg-gray-100 my-0.5" />
                        </div>
                        <div className="flex-1 pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold text-gray-700 leading-tight">{ev.title}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${st.badge}`}>{ev.type}</span>
                          </div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{ev.day} · {ev.date}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
          </div>

          {/* ── Recent activity feed ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" /> Recent Activity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {ACTIVITY.map((a, i) => {
                const st = ACTIVITY_STYLE[a.type];
                const Icon = st.icon;
                return (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <div className={`w-8 h-8 rounded-xl ${st.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-3.5 h-3.5 ${st.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-gray-500 font-medium">{a.action}</div>
                      <div className="text-xs font-bold text-gray-800 truncate">{a.name}</div>
                    </div>
                    <div className="text-[10px] text-gray-400 whitespace-nowrap">{a.time}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
