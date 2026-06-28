'use client';
import React, { useState, useMemo } from 'react';
import {
  Users, UserCheck, UserX, Clock, Download, FileText,
  Search, X, ChevronDown, CalendarDays, TrendingUp,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from 'recharts';

// ── Data ───────────────────────────────────────────────────────────────────
const GRADE_DATA = [
  { grade:1,  total:120, present:110, absent:10, late:3,  newReg:3,  male:65, female:55 },
  { grade:2,  total:115, present:112, absent:3,  late:2,  newReg:1,  male:60, female:55 },
  { grade:3,  total:130, present:125, absent:5,  late:4,  newReg:2,  male:70, female:60 },
  { grade:4,  total:110, present:108, absent:2,  late:1,  newReg:1,  male:58, female:52 },
  { grade:5,  total:125, present:120, absent:5,  late:3,  newReg:2,  male:65, female:60 },
  { grade:6,  total:115, present:110, absent:5,  late:2,  newReg:1,  male:60, female:55 },
  { grade:7,  total:120, present:115, absent:5,  late:4,  newReg:2,  male:62, female:58 },
  { grade:8,  total:110, present:108, absent:2,  late:1,  newReg:1,  male:57, female:53 },
  { grade:9,  total:120, present:117, absent:3,  late:2,  newReg:2,  male:63, female:57 },
  { grade:10, total:120, present:115, absent:5,  late:3,  newReg:2,  male:60, female:60 },
  { grade:11, total:110, present:108, absent:2,  late:1,  newReg:1,  male:55, female:55 },
  { grade:12, total:115, present:110, absent:5,  late:2,  newReg:1,  male:58, female:57 },
  { grade:13, total:100, present:97,  absent:3,  late:1,  newReg:2,  male:52, female:48 },
];

type StudentStatus = 'Present' | 'Absent' | 'Late';

const STUDENTS: { reg:string; name:string; grade:number; section:string; status:StudentStatus; arrival:string; reason:string }[] = [
  { reg:'S1001', name:'Ayesha Perera',      grade:10, section:'A', status:'Present', arrival:'07:32', reason:'—'         },
  { reg:'S1002', name:'Kasun Silva',         grade:10, section:'A', status:'Absent',  arrival:'—',     reason:'Sick'      },
  { reg:'S1003', name:'Nimal Fernando',      grade:10, section:'A', status:'Late',    arrival:'08:12', reason:'Bus Delay' },
  { reg:'S1004', name:'Dulani Rajapaksa',    grade:10, section:'B', status:'Present', arrival:'07:45', reason:'—'         },
  { reg:'S1005', name:'Chamara Bandara',     grade:11, section:'A', status:'Present', arrival:'07:50', reason:'—'         },
  { reg:'S1006', name:'Ishara Wickramasinghe',grade:11,section:'A', status:'Absent',  arrival:'—',     reason:'Family'    },
  { reg:'S1007', name:'Malith Jayawardena',  grade:9,  section:'B', status:'Late',    arrival:'08:25', reason:'Transport' },
  { reg:'S1008', name:'Sithmi Rathnayake',   grade:9,  section:'A', status:'Present', arrival:'07:40', reason:'—'         },
];

const PAST_ATTENDANCE = [
  { date:'2026-06-25', present:1365, absent:82,  late:11, pct:94.1 },
  { date:'2026-06-24', present:1358, absent:88,  late:14, pct:93.7 },
  { date:'2026-06-23', present:1372, absent:76,  late:9,  pct:94.6 },
  { date:'2026-06-20', present:1345, absent:98,  late:15, pct:93.0 },
  { date:'2026-06-19', present:1380, absent:68,  late:8,  pct:95.2 },
  { date:'2026-06-18', present:1390, absent:58,  late:6,  pct:95.9 },
  { date:'2026-06-17', present:1361, absent:85,  late:12, pct:93.9 },
];

const TREND_DATA = PAST_ATTENDANCE.slice().reverse().map(d => ({
  date: d.date.slice(5),
  pct: d.pct,
}));

const STATUS_STYLE: Record<StudentStatus, string> = {
  Present: 'bg-emerald-100 text-emerald-700',
  Absent:  'bg-red-100 text-red-700',
  Late:    'bg-amber-100 text-amber-700',
};

const GENDER_COLORS = ['#3b82f6', '#ec4899'];

// ── Component ───────────────────────────────────────────────────────────────
export default function StudentAttendancePage() {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);

  // table filters
  const [filterGrade, setFilterGrade]     = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterStatus, setFilterStatus]   = useState('');
  const [search, setSearch]               = useState('');

  const totalStudents = GRADE_DATA.reduce((a, g) => a + g.total,   0);
  const totalPresent  = GRADE_DATA.reduce((a, g) => a + g.present, 0);
  const totalAbsent   = GRADE_DATA.reduce((a, g) => a + g.absent,  0);
  const totalLate     = GRADE_DATA.reduce((a, g) => a + g.late,    0);
  const totalMale     = GRADE_DATA.reduce((a, g) => a + g.male,    0);
  const totalFemale   = GRADE_DATA.reduce((a, g) => a + g.female,  0);
  const attendancePct = ((totalPresent / totalStudents) * 100).toFixed(1);

  const genderData = [
    { name:`Male (${totalMale})`,   value:totalMale   },
    { name:`Female (${totalFemale})`, value:totalFemale },
  ];

  const filteredStudents = useMemo(() => STUDENTS.filter(s => {
    if (filterGrade   && s.grade !== parseInt(filterGrade)) return false;
    if (filterSection && s.section !== filterSection)       return false;
    if (filterStatus  && s.status  !== filterStatus)        return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())
               && !s.reg.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [filterGrade, filterSection, filterStatus, search]);

  const clearFilters = () => {
    setFilterGrade(''); setFilterSection(''); setFilterStatus(''); setSearch('');
  };
  const hasFilters = filterGrade || filterSection || filterStatus || search;

  return (
    <div className="space-y-6">

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Students', value:totalStudents, icon:Users,      bg:'bg-blue-50',    color:'text-blue-600',    border:'border-blue-100'    },
          { label:'Present Today',  value:totalPresent,  icon:UserCheck,  bg:'bg-emerald-50', color:'text-emerald-600', border:'border-emerald-100' },
          { label:'Absent Today',   value:totalAbsent,   icon:UserX,      bg:'bg-red-50',     color:'text-red-500',     border:'border-red-100'     },
          { label:'Late Arrivals',  value:totalLate,     icon:Clock,      bg:'bg-amber-50',   color:'text-amber-600',   border:'border-amber-100'   },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className={`bg-white rounded-2xl border ${k.border} shadow-sm p-5 flex items-center gap-4`}>
              <div className={`w-11 h-11 rounded-2xl ${k.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${k.color}`} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{k.value.toLocaleString()}</div>
                <div className="text-xs text-gray-400 font-medium mt-0.5">{k.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Attendance % bar + date picker ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div>
            <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-1">Attendance Rate</div>
            <div className="text-3xl font-extrabold text-emerald-600">{attendancePct}%</div>
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>{totalPresent.toLocaleString()} present</span>
              <span>{totalAbsent} absent · {totalLate} late</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden flex">
              <div className="bg-emerald-400 h-full transition-all" style={{ width:`${(totalPresent/totalStudents)*100}%` }} />
              <div className="bg-amber-400 h-full transition-all"   style={{ width:`${(totalLate/totalStudents)*100}%`    }} />
              <div className="bg-red-400 h-full transition-all"     style={{ width:`${(totalAbsent/totalStudents)*100}%`  }} />
            </div>
            <div className="flex gap-4 text-[10px] font-semibold">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Present</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400  inline-block" />Late</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400    inline-block" />Absent</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <CalendarDays className="w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30"
          />
        </div>
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bar chart: present vs absent per grade */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-800 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" /> Students per Grade
          </h3>
          <p className="text-xs text-gray-400 mb-4">Present vs Absent by grade</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={GRADE_DATA.map(g => ({ grade:`G${g.grade}`, present:g.present, absent:g.absent, late:g.late }))}
              barSize={7} margin={{ top:0, right:0, left:-28, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="grade" tick={{ fontSize:9, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:9, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius:12, border:'1px solid #e5e7eb', fontSize:11 }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize:11 }} />
              <Bar dataKey="present" name="Present" fill="#34d399" radius={[3,3,0,0]} stackId="a" />
              <Bar dataKey="late"    name="Late"    fill="#fbbf24" radius={[0,0,0,0]} stackId="a" />
              <Bar dataKey="absent"  name="Absent"  fill="#f87171" radius={[3,3,0,0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart: gender distribution */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-gray-800 mb-1 self-start">Gender Distribution</h3>
          <p className="text-xs text-gray-400 mb-4 self-start">All enrolled students</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={genderData} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                dataKey="value" paddingAngle={3}>
                {genderData.map((_, i) => <Cell key={i} fill={GENDER_COLORS[i]} />)}
              </Pie>
              <Legend iconSize={8} wrapperStyle={{ fontSize:11 }} />
              <Tooltip contentStyle={{ borderRadius:12, border:'1px solid #e5e7eb', fontSize:11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Per grade table ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">Per Grade Overview</h3>
          <p className="text-xs text-gray-400 mt-0.5">Today's attendance breakdown by grade</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Grade','Total','Present','Absent','Late','New Reg.','Male','Female','Rate',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {GRADE_DATA.map(row => {
                const pct = Math.round((row.present / row.total) * 100);
                return (
                  <tr key={row.grade} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-800">G{row.grade}</td>
                    <td className="px-4 py-3 text-gray-600">{row.total}</td>
                    <td className="px-4 py-3 text-emerald-600 font-semibold">{row.present}</td>
                    <td className="px-4 py-3 text-red-500 font-semibold">{row.absent}</td>
                    <td className="px-4 py-3 text-amber-600 font-semibold">{row.late}</td>
                    <td className="px-4 py-3 text-gray-500">{row.newReg}</td>
                    <td className="px-4 py-3 text-blue-500">{row.male}</td>
                    <td className="px-4 py-3 text-pink-500">{row.female}</td>
                    <td className="px-4 py-3 min-w-[100px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div className={`h-full rounded-full ${pct>=95?'bg-emerald-400':pct>=85?'bg-amber-400':'bg-red-400'}`}
                            style={{ width:`${pct}%` }} />
                        </div>
                        <span className={`text-[11px] font-bold ${pct>=95?'text-emerald-600':pct>=85?'text-amber-600':'text-red-500'}`}>{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-[11px] font-semibold text-[#3E4EFA] bg-[#3E4EFA]/10 px-3 py-1 rounded-lg hover:bg-[#3E4EFA]/20 transition">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Footer totals */}
            <tfoot>
              <tr className="bg-gray-50 border-t border-gray-200">
                <td className="px-4 py-3 font-extrabold text-gray-800 text-xs uppercase tracking-wide">Total</td>
                <td className="px-4 py-3 font-bold text-gray-800">{totalStudents}</td>
                <td className="px-4 py-3 font-bold text-emerald-600">{totalPresent}</td>
                <td className="px-4 py-3 font-bold text-red-500">{totalAbsent}</td>
                <td className="px-4 py-3 font-bold text-amber-600">{totalLate}</td>
                <td className="px-4 py-3 font-bold text-gray-500">{GRADE_DATA.reduce((a,g)=>a+g.newReg,0)}</td>
                <td className="px-4 py-3 font-bold text-blue-500">{totalMale}</td>
                <td className="px-4 py-3 font-bold text-pink-500">{totalFemale}</td>
                <td className="px-4 py-3 font-extrabold text-emerald-600">{attendancePct}%</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── Student list ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Student List</h3>
            <p className="text-xs text-gray-400 mt-0.5">{filteredStudents.length} students shown</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Name or reg. no."
                className="pl-9 pr-7 py-2 text-sm border border-gray-200 rounded-xl w-44 focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30" />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
            </div>
            {/* Grade */}
            <div className="relative">
              <select value={filterGrade} onChange={e => setFilterGrade(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30">
                <option value="">All Grades</option>
                {[...Array(13)].map((_,i) => <option key={i+1} value={i+1}>Grade {i+1}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
            {/* Section */}
            <div className="relative">
              <select value={filterSection} onChange={e => setFilterSection(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30">
                <option value="">All Sections</option>
                {['A','B','C','D'].map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
            {/* Status */}
            <div className="relative">
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30">
                <option value="">All Status</option>
                {(['Present','Absent','Late'] as StudentStatus[]).map(s => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
            {hasFilters && (
              <button onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-red-500 font-semibold px-3 py-2 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 transition">
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Name','Reg. No','Grade','Status','Arrival','Reason',''].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.map(s => (
                <tr key={s.reg} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3 font-semibold text-gray-800">{s.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-500">{s.reg}</td>
                  <td className="px-5 py-3 text-gray-500">G{s.grade}-{s.section}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${STATUS_STYLE[s.status]}`}>{s.status}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-500 font-mono text-xs">{s.arrival !== '—' ? s.arrival : <span className="text-gray-300">—</span>}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs">{s.reason}</td>
                  <td className="px-5 py-3">
                    <button className="text-[11px] font-semibold text-[#3E4EFA] hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-gray-400 text-sm">No students match the filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action buttons */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-wrap gap-2">
          <button className="flex items-center gap-2 bg-[#3E4EFA] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#2d3ce8] transition shadow-sm">
            <UserCheck className="w-3.5 h-3.5" /> Mark Attendance
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition">
            <Download className="w-3.5 h-3.5 text-gray-400" /> Export CSV
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition">
            <Download className="w-3.5 h-3.5 text-gray-400" /> Export PDF
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition">
            <FileText className="w-3.5 h-3.5 text-gray-400" /> Generate Report
          </button>
        </div>
      </div>

      {/* ── Past attendance ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Past Attendance</h3>
            <p className="text-xs text-gray-400 mt-0.5">Daily attendance history</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="date" className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30" />
            <div className="relative">
              <select className="appearance-none pl-3 pr-7 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
            <button className="bg-[#3E4EFA] text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#2d3ce8] transition">View</button>
          </div>
        </div>

        {/* Trend mini-chart */}
        <div className="px-6 pt-4">
          <p className="text-xs text-gray-400 mb-3">7-day attendance trend</p>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={TREND_DATA} margin={{ top:0, right:0, left:-35, bottom:0 }}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3E4EFA" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3E4EFA" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize:9, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis domain={[90,100]} tick={{ fontSize:9, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius:12, border:'1px solid #e5e7eb', fontSize:11 }} formatter={(v:number) => `${v}%`} />
              <Area type="monotone" dataKey="pct" name="Attendance %" stroke="#3E4EFA" strokeWidth={2}
                fill="url(#trendGrad)" dot={{ r:3, fill:'#3E4EFA' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="overflow-x-auto px-2 pb-2">
          <table className="w-full text-sm mt-2">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Date','Present','Absent','Late','Attendance %'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PAST_ATTENDANCE.map(row => (
                <tr key={row.date} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs text-gray-600">{row.date}</td>
                  <td className="px-5 py-3 text-emerald-600 font-semibold">{row.present.toLocaleString()}</td>
                  <td className="px-5 py-3 text-red-500 font-semibold">{row.absent}</td>
                  <td className="px-5 py-3 text-amber-600 font-semibold">{row.late}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className={`h-full rounded-full ${row.pct>=95?'bg-emerald-400':row.pct>=90?'bg-amber-400':'bg-red-400'}`}
                          style={{ width:`${row.pct}%` }} />
                      </div>
                      <span className={`text-xs font-bold ${row.pct>=95?'text-emerald-600':row.pct>=90?'text-amber-600':'text-red-500'}`}>{row.pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
