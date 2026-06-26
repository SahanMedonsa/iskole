'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import {
  Users, UserCheck, UserX, Plane, Briefcase, Clock,
  UserPlus, CheckCircle2, XCircle, Bell,
  AlertTriangle, Search, X, ChevronDown, Filter, Eye,
  CalendarDays, FileText, Shuffle, ChevronRight,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
type TodayStatus = 'Present' | 'On Leave' | 'Absent' | 'On Duty' | 'Late';
type EmployType   = 'Permanent' | 'Temporary' | 'Visiting';

interface Teacher {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  serviceNo: string;
  subjects: string[];
  grades: string[];
  status: TodayStatus;
  checkIn: string | null;
  employType: EmployType;
  leaveBalance: { casual: [number,number]; medical: [number,number]; duty: [number,number] };
  substitute: string | null;
  docExpiry: string | null;
}

interface LeaveRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  substitute: string | null;
}

// ── Mock data ──────────────────────────────────────────────────────────────
const TEACHERS: Teacher[] = [
  { id:'TCH-001', name:'Mrs. Nirosha Dissanayake', initials:'ND', avatarColor:'bg-blue-200 text-blue-700',   serviceNo:'SVC-10281', subjects:['Science'],          grades:['G6','G9'],       status:'Present',  checkIn:'07:52', employType:'Permanent',  leaveBalance:{ casual:[3,21],  medical:[1,14], duty:[2,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-002', name:'Mr. Ruwan Senanayake',     initials:'RS', avatarColor:'bg-emerald-200 text-emerald-700', serviceNo:'SVC-10095', subjects:['Mathematics'],    grades:['G10','G11'],     status:'On Leave', checkIn:null,    employType:'Permanent',  leaveBalance:{ casual:[8,21],  medical:[3,14], duty:[1,7] }, substitute:'Mrs. Fathima N.', docExpiry:null         },
  { id:'TCH-003', name:'Mrs. Kumari Perera',       initials:'KP', avatarColor:'bg-violet-200 text-violet-700',  serviceNo:'SVC-10312', subjects:['English'],        grades:['G7','G8'],       status:'Present',  checkIn:'08:01', employType:'Permanent',  leaveBalance:{ casual:[2,21],  medical:[0,14], duty:[3,7] }, substitute:null,               docExpiry:'2026-07-15' },
  { id:'TCH-004', name:'Mr. Anura Bandara',        initials:'AB', avatarColor:'bg-amber-200 text-amber-700',    serviceNo:'SVC-10174', subjects:['History'],         grades:['G8','G9'],       status:'On Duty',  checkIn:'07:48', employType:'Permanent',  leaveBalance:{ casual:[5,21],  medical:[2,14], duty:[7,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-005', name:'Mrs. Fathima Nusrath',     initials:'FN', avatarColor:'bg-pink-200 text-pink-700',      serviceNo:'SVC-10206', subjects:['Islam','Ethics'],  grades:['G6','G7','G8'],  status:'Present',  checkIn:'07:55', employType:'Temporary',  leaveBalance:{ casual:[0,21],  medical:[0,14], duty:[0,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-006', name:'Mr. Balakrishnan Thiru.',  initials:'BT', avatarColor:'bg-teal-200 text-teal-700',      serviceNo:'SVC-10088', subjects:['Tamil'],          grades:['G6','G7','G8'],  status:'Absent',   checkIn:null,    employType:'Permanent',  leaveBalance:{ casual:[12,21], medical:[4,14], duty:[0,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-007', name:'Mrs. Chandra Gunawardena', initials:'CG', avatarColor:'bg-rose-200 text-rose-700',      serviceNo:'SVC-10143', subjects:['Art'],            grades:['G1','G2','G3'],  status:'Present',  checkIn:'07:58', employType:'Permanent',  leaveBalance:{ casual:[1,21],  medical:[0,14], duty:[1,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-008', name:'Mr. Saman Jayasinghe',     initials:'SJ', avatarColor:'bg-cyan-200 text-cyan-700',      serviceNo:'SVC-10255', subjects:['P.E.'],           grades:['G4','G5','G6'],  status:'Late',     checkIn:'08:42', employType:'Permanent',  leaveBalance:{ casual:[4,21],  medical:[1,14], duty:[0,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-009', name:'Ms. Priya Subramaniam',    initials:'PS', avatarColor:'bg-indigo-200 text-indigo-700',  serviceNo:'SVC-10319', subjects:['Commerce'],       grades:['G12','G13'],     status:'Present',  checkIn:'07:50', employType:'Permanent',  leaveBalance:{ casual:[6,21],  medical:[2,14], duty:[4,7] }, substitute:null,               docExpiry:'2026-08-01' },
  { id:'TCH-010', name:'Mrs. Dilini Wijesinghe',   initials:'DW', avatarColor:'bg-orange-200 text-orange-700',  serviceNo:'SVC-10227', subjects:['Sinhala'],        grades:['G1','G2','G3'],  status:'Present',  checkIn:'07:53', employType:'Permanent',  leaveBalance:{ casual:[2,21],  medical:[0,14], duty:[2,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-011', name:'Mr. Kamal Fernando',       initials:'KF', avatarColor:'bg-lime-200 text-lime-700',      serviceNo:'SVC-10161', subjects:['ICT'],            grades:['G9','G10','G11'],status:'Present',  checkIn:'07:57', employType:'Temporary',  leaveBalance:{ casual:[3,21],  medical:[0,14], duty:[1,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-012', name:'Mrs. Sandamali Rodrigo',   initials:'SR', avatarColor:'bg-fuchsia-200 text-fuchsia-700',serviceNo:'SVC-10102', subjects:['Music'],          grades:['G4','G5'],       status:'On Leave', checkIn:null,    employType:'Permanent',  leaveBalance:{ casual:[9,21],  medical:[6,14], duty:[3,7] }, substitute:'Mr. Kamal F.',    docExpiry:null         },
  { id:'TCH-013', name:'Mr. Nimal Dias',           initials:'ND', avatarColor:'bg-sky-200 text-sky-700',        serviceNo:'SVC-10340', subjects:['Science (A/L)'],  grades:['G12','G13'],     status:'Present',  checkIn:'07:49', employType:'Permanent',  leaveBalance:{ casual:[1,21],  medical:[0,14], duty:[0,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-014', name:'Mrs. Renuka Jayawardena',  initials:'RJ', avatarColor:'bg-red-200 text-red-700',        serviceNo:'SVC-10187', subjects:['Geography'],      grades:['G8','G9','G10'], status:'Absent',   checkIn:null,    employType:'Visiting',   leaveBalance:{ casual:[0,21],  medical:[0,14], duty:[0,7] }, substitute:null,               docExpiry:null         },
  { id:'TCH-015', name:'Mr. Pradeep Kumara',       initials:'PK', avatarColor:'bg-emerald-200 text-emerald-700',serviceNo:'SVC-10298', subjects:['Maths (A/L)'],   grades:['G12','G13'],     status:'Present',  checkIn:'07:54', employType:'Permanent',  leaveBalance:{ casual:[0,21],  medical:[0,14], duty:[0,7] }, substitute:null,               docExpiry:null         },
];

const LEAVE_REQUESTS: LeaveRequest[] = [
  { id:'LR-001', teacherId:'TCH-001', teacherName:'Mrs. Nirosha Dissanayake', type:'Casual Leave',  from:'2026-07-02', to:'2026-07-03', days:2, reason:'Personal matter',           status:'Pending',  substitute:'Mrs. Kumari P.'   },
  { id:'LR-002', teacherId:'TCH-008', teacherName:'Mr. Saman Jayasinghe',     type:'Sick Leave',    from:'2026-06-30', to:'2026-06-30', days:1, reason:'Medical appointment',        status:'Pending',  substitute:null                },
  { id:'LR-003', teacherId:'TCH-005', teacherName:'Mrs. Fathima Nusrath',     type:'Duty Leave',    from:'2026-07-07', to:'2026-07-09', days:3, reason:'Provincial training program', status:'Pending',  substitute:'Mrs. Dilini W.'    },
  { id:'LR-004', teacherId:'TCH-002', teacherName:'Mr. Ruwan Senanayake',     type:'Casual Leave',  from:'2026-06-25', to:'2026-06-27', days:3, reason:'Family function',            status:'Approved', substitute:'Mrs. Fathima N.'   },
  { id:'LR-005', teacherId:'TCH-012', teacherName:'Mrs. Sandamali Rodrigo',   type:'Medical Leave', from:'2026-06-23', to:'2026-06-28', days:6, reason:'Medical procedure',          status:'Approved', substitute:'Mr. Kamal F.'      },
  { id:'LR-006', teacherId:'TCH-014', teacherName:'Mrs. Renuka Jayawardena',  type:'Casual Leave',  from:'2026-06-25', to:'2026-06-25', days:1, reason:'Not provided',              status:'Pending',  substitute:null                },
];

const STATUS_STYLE: Record<TodayStatus, string> = {
  Present:  'bg-emerald-100 text-emerald-700',
  'On Leave':'bg-blue-100 text-blue-700',
  Absent:   'bg-red-100 text-red-700',
  'On Duty':'bg-amber-100 text-amber-700',
  Late:     'bg-orange-100 text-orange-700',
};

const EMPLOY_STYLE: Record<EmployType, string> = {
  Permanent: 'bg-violet-100 text-violet-700',
  Temporary: 'bg-gray-100 text-gray-600',
  Visiting:  'bg-cyan-100 text-cyan-700',
};

const ALL_SUBJECTS = [...new Set<string>(TEACHERS.flatMap(t => t.subjects))].sort();
const ALL_GRADES   = [...new Set<string>(TEACHERS.flatMap(t => t.grades))].sort((a,b) => {
  const n = (s:string) => parseInt(s.replace('G',''));
  return n(a)-n(b);
});

// ── Page ───────────────────────────────────────────────────────────────────
export default function TeacherDashboard() {
  const router = useRouter();

  // table filters
  const [search, setSearch]           = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterStatus, setFilterStatus]   = useState('');
  const [filterEmploy, setFilterEmploy]   = useState('');

  // leave panel tab
  const [leaveTab, setLeaveTab] = useState<'pending'|'upcoming'|'balances'>('pending');

  // leave request actions (local state)
  const [leaveActions, setLeaveActions] = useState<Record<string,string>>({});

  const act = (id: string, action: 'Approved'|'Rejected') =>
    setLeaveActions(prev => ({ ...prev, [id]: action }));

  const pending  = LEAVE_REQUESTS.filter(r => (leaveActions[r.id] ?? r.status) === 'Pending');
  const upcoming = LEAVE_REQUESTS.filter(r => (leaveActions[r.id] ?? r.status) === 'Approved');

  // KPI
  const total    = TEACHERS.length;
  const present  = TEACHERS.filter(t => t.status === 'Present').length;
  const onLeave  = TEACHERS.filter(t => t.status === 'On Leave').length;
  const absent   = TEACHERS.filter(t => t.status === 'Absent').length;
  const onDuty   = TEACHERS.filter(t => t.status === 'On Duty').length;
  const late     = TEACHERS.filter(t => t.status === 'Late').length;

  // alerts
  const noSubstitute = TEACHERS.filter(t => (t.status==='On Leave'||t.status==='Absent') && !t.substitute);
  const expiringDocs = TEACHERS.filter(t => t.docExpiry);
  const overLeave    = TEACHERS.filter(t => t.leaveBalance.casual[0] > 15);
  const pendingApprovals = pending.length;

  // filtered teachers
  const filteredTeachers = useMemo(() => TEACHERS.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())
        && !t.serviceNo.toLowerCase().includes(search.toLowerCase())
        && !t.subjects.join(' ').toLowerCase().includes(search.toLowerCase())) return false;
    if (filterSubject && !t.subjects.includes(filterSubject)) return false;
    if (filterGrade   && !t.grades.includes(filterGrade))    return false;
    if (filterStatus  && t.status !== filterStatus)           return false;
    if (filterEmploy  && t.employType !== filterEmploy)       return false;
    return true;
  }), [search, filterSubject, filterGrade, filterStatus, filterEmploy]);

  const clearFilters = () => {
    setSearch(''); setFilterSubject(''); setFilterGrade('');
    setFilterStatus(''); setFilterEmploy('');
  };
  const hasFilters = search||filterSubject||filterGrade||filterStatus||filterEmploy;

  const today = new Date().toLocaleDateString('en-US', {
    weekday:'long', year:'numeric', month:'long', day:'numeric',
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-6 py-7 space-y-6">

          {/* ── Header ── */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Teachers</h1>
              <p className="text-sm text-gray-400 mt-0.5">{today}</p>
            </div>
            {/* Quick actions */}
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 bg-[#3E4EFA] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:bg-[#2d3ce8] transition">
                <UserPlus className="w-3.5 h-3.5" /> Register Teacher
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition">
                <Shuffle className="w-3.5 h-3.5 text-amber-500" /> Assign Substitute
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition">
                <Bell className="w-3.5 h-3.5 text-blue-500" /> Send Notice
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 transition">
                <FileText className="w-3.5 h-3.5 text-violet-500" /> Export
              </button>
            </div>
          </div>

          {/* ── KPI cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
            {[
              { label:'Total Teachers',   value:total,   icon:Users,      bg:'bg-blue-50',    color:'text-blue-600',    sub:'on staff'       },
              { label:'Present Today',    value:present, icon:UserCheck,  bg:'bg-emerald-50', color:'text-emerald-600', sub:`${Math.round(present/total*100)}% attendance` },
              { label:'On Leave',         value:onLeave, icon:Plane,      bg:'bg-blue-50',    color:'text-blue-500',    sub:'approved leave'  },
              { label:'Absent',           value:absent,  icon:UserX,      bg:'bg-red-50',     color:'text-red-500',     sub:'no record'       },
              { label:'On Official Duty', value:onDuty,  icon:Briefcase,  bg:'bg-amber-50',   color:'text-amber-600',   sub:'training/duty'   },
              { label:'Late Arrivals',    value:late,    icon:Clock,      bg:'bg-orange-50',  color:'text-orange-500',  sub:'after 08:30'     },
            ].map(k => {
              const Icon = k.icon;
              return (
                <div key={k.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2.5">
                  <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${k.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900 leading-tight">{k.value}</div>
                    <div className="text-[11px] text-gray-500 font-semibold mt-0.5">{k.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{k.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Teacher table ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table header + filters */}
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search name, ID, subject…"
                    className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Subject filter */}
                <div className="relative">
                  <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30 bg-white">
                    <option value="">All Subjects</option>
                    {ALL_SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                {/* Grade filter */}
                <div className="relative">
                  <select value={filterGrade} onChange={e => setFilterGrade(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30 bg-white">
                    <option value="">All Grades</option>
                    {ALL_GRADES.map(g => <option key={g}>{g}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                {/* Status filter */}
                <div className="relative">
                  <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30 bg-white">
                    <option value="">All Statuses</option>
                    {(['Present','On Leave','Absent','On Duty','Late'] as TodayStatus[]).map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                {/* Employment filter */}
                <div className="relative">
                  <select value={filterEmploy} onChange={e => setFilterEmploy(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30 bg-white">
                    <option value="">All Types</option>
                    {(['Permanent','Temporary','Visiting'] as EmployType[]).map(t => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                {hasFilters && (
                  <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-red-500 font-semibold px-3 py-2 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 transition">
                    <X className="w-3 h-3" /> Clear
                  </button>
                )}

                <div className="ml-auto flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">{filteredTeachers.length} of {total}</span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Teacher</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Service No.</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Subject(s)</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Grade(s)</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Today</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Type</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wide">Cover</th>
                    <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredTeachers.map(t => (
                    <tr key={t.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${t.avatarColor}`}>
                            {t.initials}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                            <div className="text-[10px] text-gray-400">{t.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-600">{t.serviceNo}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {t.subjects.map(s => (
                            <span key={s} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {t.grades.map(g => (
                            <span key={g} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full font-medium">{g}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full self-start ${STATUS_STYLE[t.status]}`}>{t.status}</span>
                          {t.checkIn && <span className="text-[10px] text-gray-400">{t.checkIn}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${EMPLOY_STYLE[t.employType]}`}>{t.employType}</span>
                      </td>
                      <td className="px-4 py-3">
                        {t.substitute
                          ? <span className="text-[10px] text-emerald-700 font-semibold">{t.substitute}</span>
                          : (t.status==='On Leave'||t.status==='Absent')
                            ? <span className="text-[10px] text-red-500 font-semibold">Not assigned</span>
                            : <span className="text-[10px] text-gray-300">—</span>
                        }
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => router.push(`/dashboard/teachers/profile/${t.id}`)}
                            className="flex items-center gap-1 text-[10px] font-semibold text-[#3E4EFA] bg-[#3E4EFA]/10 px-2 py-1 rounded-lg hover:bg-[#3E4EFA]/20 transition"
                          >
                            <Eye className="w-3 h-3" /> View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredTeachers.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">
                        No teachers match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bottom grid: Leave management + Alerts ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Leave management (2/3) */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-blue-500" /> Leave Management
                </h2>
              </div>
              {/* Tabs */}
              <div className="flex border-b border-gray-100 bg-gray-50/50">
                {([
                  { key:'pending',  label:`Pending Requests`, badge:pending.length },
                  { key:'upcoming', label:'Upcoming Approved', badge:null          },
                  { key:'balances', label:'Leave Balances',    badge:null          },
                ] as { key:'pending'|'upcoming'|'balances'; label:string; badge:number|null }[]).map(tab => (
                  <button key={tab.key} onClick={() => setLeaveTab(tab.key)}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold transition-colors ${leaveTab===tab.key ? 'text-[#3E4EFA] border-b-2 border-[#3E4EFA] bg-white -mb-px' : 'text-gray-500 hover:text-gray-700'}`}>
                    {tab.label}
                    {tab.badge !== null && tab.badge > 0 && (
                      <span className="bg-red-100 text-red-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">{tab.badge}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Pending requests */}
              <div className={leaveTab === 'pending' ? '' : 'hidden'}>
                {pending.length === 0 ? (
                  <div className="px-6 py-12 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-300" />
                    No pending leave requests
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-50">
                    {LEAVE_REQUESTS.filter(r => (leaveActions[r.id] ?? r.status) === 'Pending').map(r => (
                      <li key={r.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-gray-800">{r.teacherName}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{r.type}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{r.days} day{r.days>1?'s':''}</span>
                          </div>
                          <div className="text-xs text-gray-500">{r.from} → {r.to} · <span className="italic">{r.reason}</span></div>
                          <div className="text-[10px] text-gray-400">
                            Cover: {r.substitute
                              ? <span className="text-emerald-600 font-semibold">{r.substitute}</span>
                              : <span className="text-red-500 font-semibold">Not assigned</span>}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button onClick={() => act(r.id,'Approved')}
                            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl hover:bg-emerald-100 transition">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button onClick={() => act(r.id,'Rejected')}
                            className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl hover:bg-red-100 transition">
                            <XCircle className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Upcoming approved leaves */}
              <div className={leaveTab === 'upcoming' ? '' : 'hidden'}>
                {upcoming.length === 0 ? (
                  <div className="px-6 py-12 text-center text-gray-400 text-sm">No upcoming approved leaves</div>
                ) : (
                  <ul className="divide-y divide-gray-50">
                    {upcoming.map(r => (
                      <li key={r.id} className="px-6 py-4 flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-800">{r.teacherName}</div>
                          <div className="text-xs text-gray-500">{r.type} · {r.from} to {r.to} ({r.days} days)</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">
                            Cover: {r.substitute
                              ? <span className="text-emerald-600 font-semibold">{r.substitute}</span>
                              : <span className="text-red-500 font-semibold">Not assigned</span>}
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Approved</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Leave balances */}
              <div className={leaveTab === 'balances' ? '' : 'hidden'}>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 rounded-xl">
                        <th className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">Teacher</th>
                        <th className="px-4 py-2.5 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">Casual (21)</th>
                        <th className="px-4 py-2.5 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">Medical (14)</th>
                        <th className="px-4 py-2.5 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">Duty (7)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {TEACHERS.map(t => {
                        const bal = (used:number, total:number) => {
                          const pct = Math.round(used/total*100);
                          const color = pct>=80?'bg-red-400':pct>=50?'bg-amber-400':'bg-emerald-400';
                          return (
                            <div className="flex items-center gap-2 justify-center">
                              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${color} rounded-full`} style={{ width:`${pct}%` }} />
                              </div>
                              <span className={`font-semibold ${used>=total?'text-red-500':'text-gray-600'}`}>{used}/{total}</span>
                            </div>
                          );
                        };
                        return (
                          <tr key={t.id} className="hover:bg-gray-50/50">
                            <td className="px-4 py-2.5 font-medium text-gray-700">{t.name}</td>
                            <td className="px-4 py-2.5">{bal(...t.leaveBalance.casual)}</td>
                            <td className="px-4 py-2.5">{bal(...t.leaveBalance.medical)}</td>
                            <td className="px-4 py-2.5">{bal(...t.leaveBalance.duty)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Alerts (1/3) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-5">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Alerts & Flags
              </h2>

              {/* No cover assigned */}
              {noSubstitute.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-red-500 uppercase tracking-wide">No Cover Assigned</div>
                  {noSubstitute.map(t => (
                    <div key={t.id} className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                      <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-red-800 leading-tight">{t.name}</div>
                        <div className="text-[10px] text-red-500">{t.status} · {t.grades.join(', ')} · {t.subjects.join(', ')}</div>
                      </div>
                      <button className="text-[9px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full hover:bg-red-200 transition whitespace-nowrap">
                        Assign
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Pending approvals */}
              {pendingApprovals > 0 && (
                <div className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-amber-800">{pendingApprovals} leave request{pendingApprovals>1?'s':''} pending</div>
                    <div className="text-[10px] text-amber-600">Needs admin approval</div>
                  </div>
                  <button onClick={() => setLeaveTab('pending')} className="text-[9px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full hover:bg-amber-200 transition">
                    Review
                  </button>
                </div>
              )}

              {/* Expiring documents */}
              {expiringDocs.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-orange-500 uppercase tracking-wide">Expiring Documents</div>
                  {expiringDocs.map(t => (
                    <div key={t.id} className="flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5">
                      <FileText className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-orange-800 leading-tight">{t.name}</div>
                        <div className="text-[10px] text-orange-500">Medical cert expires {t.docExpiry}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Over leave quota */}
              {overLeave.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-violet-500 uppercase tracking-wide">Exceeding Leave Quota</div>
                  {overLeave.map(t => (
                    <div key={t.id} className="flex items-center gap-3 bg-violet-50 border border-violet-100 rounded-xl px-3 py-2.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-violet-800 leading-tight">{t.name}</div>
                        <div className="text-[10px] text-violet-500">{t.leaveBalance.casual[0]}/{t.leaveBalance.casual[1]} casual leaves used</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {noSubstitute.length===0 && pendingApprovals===0 && expiringDocs.length===0 && overLeave.length===0 && (
                <div className="py-10 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-300" />
                  All clear — no flags today
                </div>
              )}

              <button className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-[#3E4EFA] hover:underline">
                View all alerts <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
