'use client';

import React, { use, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, MapPin, Phone, User, Users, GraduationCap,
  UserCheck, Building2, ChevronRight, Package,
  AlertTriangle, CheckCircle, Mail, Globe, Calendar, Hash, BookOpen,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { schools, TODAY, type GradeRow, type School, type TeacherDetails } from '../../_schoolData';

// ── Resource types ─────────────────────────────────────────────────────────
const RESOURCE_TYPES = [
  { key: 'chairs',      label: 'Chairs',       icon: '🪑', color: 'bg-blue-50 text-blue-700 border-blue-100'     },
  { key: 'desks',       label: 'Desks',        icon: '🗂️', color: 'bg-green-50 text-green-700 border-green-100'   },
  { key: 'whiteboards', label: 'Whiteboards',  icon: '📋', color: 'bg-yellow-50 text-yellow-700 border-yellow-100'},
  { key: 'smartBoards', label: 'Smart Boards', icon: '🖥️', color: 'bg-purple-50 text-purple-700 border-purple-100'},
  { key: 'fans',        label: 'Fans',         icon: '💨', color: 'bg-cyan-50 text-cyan-700 border-cyan-100'      },
  { key: 'projectors',  label: 'Projectors',   icon: '📽️', color: 'bg-orange-50 text-orange-700 border-orange-100'},
  { key: 'computers',   label: 'Computers',    icon: '💻', color: 'bg-red-50 text-red-700 border-red-100'         },
  { key: 'lockers',     label: 'Lockers',      icon: '🔒', color: 'bg-pink-50 text-pink-700 border-pink-100'      },
] as const;
type RKey = typeof RESOURCE_TYPES[number]['key'];

type ClassResource = {
  id: string; name: string; grade: number; section: string;
  category: 'Primary' | 'Secondary' | 'Advanced';
  students: number; chairType: 'small' | 'standard';
  chairs: number; desks: number; whiteboards: number; smartBoards: number;
  fans: number; projectors: number; computers: number; lockers: number;
};
// Generate per-class resources deterministically from a school's grade data
function buildClassResources(school: School): ClassResource[] {
  const rows: ClassResource[] = [];
  for (const g of school.students.grades) {
    const gradeNum = parseInt(g.grade.replace('G', ''));
    const category: ClassResource['category'] =
      gradeNum <= 5 ? 'Primary' : gradeNum <= 11 ? 'Secondary' : 'Advanced';
    const sections = g.total > 44 ? 2 : 1;
    for (let si = 0; si < sections; si++) {
      const sLabel  = String.fromCharCode(65 + si);
      const stu     = si === sections - 1
        ? g.total - Math.floor(g.total / sections) * (sections - 1)
        : Math.floor(g.total / sections);
      // Deterministic mild shortage in some classes (no Math.random)
      const shortage = (gradeNum + si) % 5 === 0 ? 2 : 0;
      rows.push({
        id:          `${g.grade}${sLabel}`,
        name:        `Grade ${gradeNum} – ${sLabel}`,
        grade:       gradeNum,
        section:     sLabel,
        category,
        students:    stu,
        chairType:   gradeNum <= 5 ? 'small' : 'standard',
        chairs:      stu - shortage,
        desks:       stu - shortage,
        whiteboards: gradeNum >= 6 ? 2 : 1,
        smartBoards: gradeNum >= 10 ? 1 : 0,
        fans:        gradeNum >= 6 ? 4 : 3,
        projectors:  gradeNum >= 10 ? 1 : 0,
        computers:   gradeNum >= 12 ? 12 : gradeNum >= 6 ? 5 : 2,
        lockers:     gradeNum >= 4 ? 10 : 0,
      });
    }
  }
  return rows;
}

function rsum(rows: ClassResource[], key: RKey) {
  return rows.reduce((s, r) => s + r[key], 0);
}
function chairShort(r: ClassResource) { return Math.max(0, r.students - r.chairs); }
function deskShort(r: ClassResource)  { return Math.max(0, r.students - r.desks);  }
function hasShort(r: ClassResource)   { return chairShort(r) > 0 || deskShort(r) > 0; }

const CAT_ACCENT: Record<string, string> = {
  Primary:   'bg-emerald-600 text-white',
  Secondary: 'bg-sky-600 text-white',
  Advanced:  'bg-violet-600 text-white',
};

// ── Teachers section ──────────────────────────────────────────────────────
function TeachersSection({ td }: { td: TeacherDetails }) {
  const levels = [
    { label: 'Primary',   sub: 'Grade 1–5',   data: td.levels.primary,   bg: 'bg-sky-50',    border: 'border-sky-100'    },
    { label: 'Secondary', sub: 'Grade 6–11',  data: td.levels.secondary, bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { label: 'Advanced',  sub: 'Grade 12–13', data: td.levels.advanced,  bg: 'bg-purple-50', border: 'border-purple-100' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-gray-800 text-sm flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-gray-400" />
        Teachers
      </h2>

      {/* Total + M/F card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Total Teachers</span>
        </div>
        <div className="text-4xl font-extrabold text-gray-900 mb-3">{td.total}</div>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span className="text-sm text-gray-500">Male</span>
            <span className="text-sm font-bold text-gray-800">{td.male}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
            <span className="text-sm text-gray-500">Female</span>
            <span className="text-sm font-bold text-gray-800">{td.female}</span>
          </div>
        </div>
      </div>

      {/* Level breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {levels.map(lv => (
          <div key={lv.label} className={`${lv.bg} border ${lv.border} rounded-2xl p-5`}>
            <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">{lv.label}</div>
            <div className="text-xs text-gray-400 mb-3">{lv.sub}</div>
            <div className="text-3xl font-extrabold text-gray-900 mb-4">{lv.data.total}</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm text-gray-600">Male</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{lv.data.male}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400" />
                  <span className="text-sm text-gray-600">Female</span>
                </div>
                <span className="text-sm font-bold text-gray-800">{lv.data.female}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subject table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 text-sm mb-5">Teachers by Subject</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          {td.subjects.sort((a, b) => b.count - a.count).map(s => (
            <div key={s.subject} className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600">{s.subject}</span>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-blue-500 font-semibold">{s.male}M</span>
                <span className="text-pink-500 font-semibold">{s.female}F</span>
                <span className="font-extrabold text-gray-900 w-5 text-right">{s.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Chart tooltip ──────────────────────────────────────────────────────────
const ChartTooltip = ({
  active, payload, label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; fill: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + p.value, 0);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-xs min-w-[130px]">
      <div className="font-bold text-gray-700 mb-2">Grade {label?.replace('G', '')}</div>
      {payload.map(p => (
        <div key={p.name} className="flex justify-between gap-4 mb-0.5">
          <span style={{ color: p.fill }} className="font-semibold">{p.name}</span>
          <span className="font-bold text-gray-800">{p.value}</span>
        </div>
      ))}
      <div className="border-t border-gray-100 mt-1.5 pt-1.5 flex justify-between">
        <span className="text-gray-400">Total</span>
        <span className="font-extrabold text-gray-900">{total}</span>
      </div>
    </div>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────
export default function SchoolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id }  = use(params);
  const router  = useRouter();
  const school  = useMemo(() => schools.find(s => s.id === id), [id]);
  const [tab, setTab] = useState<'students' | 'teachers' | 'resources'>('students');

  const gradeChartData: GradeRow[] = useMemo(() => {
    if (!school) return [];
    const map = new Map<string, GradeRow>();
    for (let i = 1; i <= 13; i++) map.set(`G${i}`, { grade: `G${i}`, male: 0, female: 0, total: 0 });
    for (const g of school.students.grades) {
      const row = map.get(g.grade);
      if (row) { row.male = g.male; row.female = g.female; row.total = g.total; }
    }
    return Array.from(map.values());
  }, [school]);

  const classResources = useMemo(() => school ? buildClassResources(school) : [], [school]);

  if (!school) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <Building2 className="w-12 h-12 text-gray-300" />
        <p className="text-gray-500 font-semibold">School not found</p>
        <button
          onClick={() => router.push('/company/dashboard/schools')}
          className="text-sm text-[#3E4EFA] font-semibold hover:underline"
        >
          Back to Schools
        </button>
      </div>
    );
  }

  const presentCount       = school.attendance[TODAY] ?? 0;
  const attendancePct      = ((presentCount / school.students.total) * 100).toFixed(1);
  const teacherPresentCount = school.teachersPresent;
  const teacherPct          = ((teacherPresentCount / school.teachers) * 100).toFixed(1);

  const levels = [
    { label: 'Primary',   sub: 'Grade 1–5',   data: school.students.levels.primary,   bg: 'bg-sky-50',    border: 'border-sky-100'    },
    { label: 'Secondary', sub: 'Grade 6–11',  data: school.students.levels.secondary, bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { label: 'Advanced',  sub: 'Grade 12–13', data: school.students.levels.advanced,  bg: 'bg-purple-50', border: 'border-purple-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <button
          onClick={() => router.push('/company/dashboard/schools')}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#3E4EFA] font-medium transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Schools
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700">{school.name}</span>
        </button>

        <div className="flex items-center gap-4">
          {school.isKV ? (
            <Image
              src="/assets/kalutara vidyalaya.png"
              alt={school.name}
              width={56} height={56}
              className="w-14 h-14 rounded-2xl object-contain p-1 bg-white border border-gray-100 flex-shrink-0"
            />
          ) : (
            <div className={`w-14 h-14 rounded-2xl ${school.logoBg ?? 'bg-gray-100'} flex items-center justify-center flex-shrink-0`}>
              <span className={`text-base font-extrabold ${school.logoColor ?? 'text-gray-700'}`}>{school.initials}</span>
            </div>
          )}
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">{school.name}</h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500">{school.location} · {school.district} District · {school.province} Province</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${school.typeBadge}`}>
                {school.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat cards (always visible) ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-8 py-6 max-w-[1400px] mx-auto space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Students',         value: school.students.total.toLocaleString(), pct: null,          Icon: Users,         bg: 'bg-blue-50',    ic: 'text-blue-500'    },
              { label: 'Total Teachers',          value: school.teachers.toLocaleString(),        pct: null,          Icon: GraduationCap, bg: 'bg-emerald-50', ic: 'text-emerald-500' },
              { label: 'Students Present Today',  value: presentCount.toLocaleString(),           pct: attendancePct, Icon: UserCheck,     bg: 'bg-green-50',   ic: 'text-green-500'   },
              { label: 'Teachers Present Today',  value: teacherPresentCount.toLocaleString(),    pct: teacherPct,    Icon: UserCheck,     bg: 'bg-cyan-50',    ic: 'text-cyan-500'    },
            ].map(c => (
              <div key={c.label} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
                <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
                  <c.Icon className={`w-4 h-4 ${c.ic}`} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-2xl font-extrabold text-gray-900">{c.value}</div>
                    {c.pct && <div className="text-sm font-bold text-emerald-500">{c.pct}%</div>}
                  </div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">{c.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* School Info + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* School Information */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
              <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                School Information
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Established</div>
                    <div className="text-sm font-semibold text-gray-800">{school.established}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Hash className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Registration No.</div>
                    <div className="text-sm font-semibold text-gray-800 font-mono">{school.registrationNo}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Total Classes</div>
                    <div className="text-sm font-semibold text-gray-800">{school.classes}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Address</div>
                    <div className="text-sm font-semibold text-gray-800">{school.address}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{school.district} District · {school.province} Province</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
              <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                Contact Information
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Principal</div>
                    <div className="text-sm font-semibold text-gray-800">{school.principal}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Phone</div>
                    <div className="text-sm font-semibold text-gray-800">{school.contact}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Email</div>
                    <div className="text-sm font-semibold text-gray-800">{school.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-gray-400">Website</div>
                    <div className="text-sm font-semibold text-[#3E4EFA]">{school.website}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white border-b border-gray-100 px-8">
        <div className="max-w-[1400px] mx-auto flex gap-1">
          {([
            { key: 'students',  label: 'Students',  Icon: Users         },
            { key: 'teachers',  label: 'Teachers',  Icon: GraduationCap },
            { key: 'resources', label: 'Resources', Icon: Package       },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-[#3E4EFA] text-[#3E4EFA]'
                  : 'border-transparent text-gray-400 hover:text-gray-700'
              }`}
            >
              <t.Icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="px-8 py-8 space-y-6 max-w-[1400px] mx-auto">

        {/* STUDENTS TAB */}
        {tab === 'students' && (
          <>
            {/* Students by level */}
            <div>
              <h2 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                Students by Level
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {levels.map(lv => (
                  <div key={lv.label} className={`${lv.bg} border ${lv.border} rounded-2xl p-5`}>
                    <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">{lv.label}</div>
                    <div className="text-xs text-gray-400 mb-3">{lv.sub}</div>
                    <div className="text-3xl font-extrabold text-gray-900 mb-4">{lv.data.total.toLocaleString()}</div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400" />
                          <span className="text-sm text-gray-600">Male</span>
                        </div>
                        <span className="text-sm font-bold text-gray-800">{lv.data.male.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-pink-400" />
                          <span className="text-sm text-gray-600">Female</span>
                        </div>
                        <span className="text-sm font-bold text-gray-800">{lv.data.female.toLocaleString()}</span>
                      </div>
                      <div className="mt-2 h-1.5 bg-white/60 rounded-full overflow-hidden flex">
                        <div className="h-full bg-blue-400 rounded-l-full" style={{ width: `${(lv.data.male / (lv.data.total || 1)) * 100}%` }} />
                        <div className="h-full bg-pink-400 flex-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="font-extrabold text-gray-900 text-base">Students by Grade</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Grade 1 – 13 distribution</p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-blue-400" />
                    <span className="text-xs text-gray-500 font-medium">Male</span>
                    <span className="text-xs font-extrabold text-gray-800">{school.students.male.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-pink-400" />
                    <span className="text-xs text-gray-500 font-medium">Female</span>
                    <span className="text-xs font-extrabold text-gray-800">{school.students.female.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-gray-300" />
                    <span className="text-xs text-gray-500 font-medium">Total</span>
                    <span className="text-xs font-extrabold text-gray-800">{school.students.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeChartData} barCategoryGap="30%" margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis
                    dataKey="grade"
                    axisLine={false} tickLine={false} height={52}
                    tick={(props: { x: number; y: number; payload: { value: string } }) => {
                      const { x, y, payload } = props;
                      const row = gradeChartData.find(g => g.grade === payload.value);
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text x={0} y={0} dy={14} textAnchor="middle" fill="#9ca3af" fontSize={11}>
                            {payload.value.replace('G', 'G ')}
                          </text>
                          <text x={0} y={0} dy={30} textAnchor="middle" fill="#374151" fontSize={11} fontWeight="bold">
                            {row?.total ?? ''}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f9fafb' }} />
                  <Bar dataKey="male"   name="Male"   fill="#60a5fa" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="female" name="Female" fill="#f472b6" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Attendance */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="w-4 h-4 text-gray-400" />
                <h2 className="font-bold text-gray-800 text-sm">Today's Attendance</h2>
              </div>
              <div className="flex items-end gap-6 mb-4">
                <div>
                  <div className="text-4xl font-extrabold text-gray-900">{presentCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-0.5">present out of {school.students.total.toLocaleString()}</div>
                </div>
                <div className="text-2xl font-extrabold text-emerald-500 pb-1">{attendancePct}%</div>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all duration-700" style={{ width: `${attendancePct}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{presentCount.toLocaleString()} present</span>
                <span>{(school.students.total - presentCount).toLocaleString()} absent</span>
              </div>
            </div>
          </>
        )}

        {/* TEACHERS TAB */}
        {tab === 'teachers' && <TeachersSection td={school.teacherDetails} />}

        {/* RESOURCES TAB */}
        {tab === 'resources' && (
          <>
            {/* Resource totals */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {RESOURCE_TYPES.map(rt => (
                <div key={rt.key} className={`border rounded-2xl p-3 flex flex-col items-center gap-1 ${rt.color}`}>
                  <span className="text-2xl">{rt.icon}</span>
                  <span className="text-xl font-extrabold">{rsum(classResources, rt.key).toLocaleString()}</span>
                  <span className="text-[10px] font-semibold text-center leading-tight">{rt.label}</span>
                </div>
              ))}
            </div>

            {/* Category summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['Primary', 'Secondary', 'Advanced'] as const).map(cat => {
                const catRows  = classResources.filter(r => r.category === cat);
                const catShort = catRows.filter(hasShort);
                const catStu   = catRows.reduce((s, r) => s + r.students, 0);
                return (
                  <div key={cat} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className={`px-5 py-3 font-bold text-sm flex items-center justify-between ${CAT_ACCENT[cat]}`}>
                      <span>{cat}{cat === 'Primary' ? <span className="ml-2 text-xs font-normal opacity-70">(small chairs)</span> : ''}</span>
                      {catShort.length > 0 ? (
                        <span className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5 text-xs font-semibold">
                          <AlertTriangle className="w-3 h-3" /> {catShort.length} shortage{catShort.length > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <CheckCircle className="w-4 h-4 opacity-70" />
                      )}
                    </div>
                    <div className="px-5 pt-3 pb-1 text-sm text-gray-500 flex gap-4 border-b border-gray-50">
                      <span><strong className="text-gray-800">{catRows.length}</strong> classes</span>
                      <span><strong className="text-gray-800">{catStu}</strong> students</span>
                    </div>
                    <div className="p-5 grid grid-cols-2 gap-3">
                      {RESOURCE_TYPES.map(rt => {
                        const total   = rsum(catRows, rt.key);
                        const isSeats = rt.key === 'chairs' || rt.key === 'desks';
                        const short   = isSeats ? Math.max(0, catStu - total) : 0;
                        return (
                          <div key={rt.key} className="flex items-center gap-2">
                            <span className="text-base">{rt.icon}</span>
                            <div>
                              <div className="text-[11px] text-gray-400">{rt.label}</div>
                              <div className={`text-sm font-bold ${short > 0 ? 'text-red-600' : 'text-gray-800'}`}>
                                {total.toLocaleString()}
                                {short > 0 && <span className="ml-1 text-xs text-red-500">(–{short})</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
