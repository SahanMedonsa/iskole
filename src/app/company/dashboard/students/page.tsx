'use client';

import React, { useState, useMemo } from 'react';
import { Users, UserCheck, Calendar } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  schools, TYPE_FILTERS, TODAY, MIN_DATE,
  type TypeFilter, type GradeRow,
} from '../_schoolData';

// ── Province → all districts mapping ──────────────────────────────────────
const PROVINCE_DISTRICTS: Record<string, string[]> = {
  'Western':       ['Colombo', 'Gampaha', 'Kalutara'],
  'Central':       ['Kandy', 'Matale', 'Nuwara Eliya'],
  'Southern':      ['Galle', 'Matara', 'Hambantota'],
  'Northern':      ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'],
  'Eastern':       ['Batticaloa', 'Ampara', 'Trincomalee'],
  'North Western': ['Kurunegala', 'Puttalam'],
  'North Central': ['Anuradhapura', 'Polonnaruwa'],
  'Uva':           ['Badulla', 'Monaragala'],
  'Sabaragamuwa':  ['Ratnapura', 'Kegalle'],
};

// ── Province colour config (no counts — computed from school data) ──────────
const PROVINCE_CONFIG = [
  { id: 'Western',       name: 'Western Province',       bg: 'bg-blue-50',    border: 'border-blue-100',    labelColor: 'text-blue-700',    dotColor: 'bg-blue-400'    },
  { id: 'Central',       name: 'Central Province',       bg: 'bg-emerald-50', border: 'border-emerald-100', labelColor: 'text-emerald-700', dotColor: 'bg-emerald-400' },
  { id: 'Southern',      name: 'Southern Province',      bg: 'bg-amber-50',   border: 'border-amber-100',   labelColor: 'text-amber-700',   dotColor: 'bg-amber-400'   },
  { id: 'Northern',      name: 'Northern Province',      bg: 'bg-violet-50',  border: 'border-violet-100',  labelColor: 'text-violet-700',  dotColor: 'bg-violet-400'  },
  { id: 'Eastern',       name: 'Eastern Province',       bg: 'bg-cyan-50',    border: 'border-cyan-100',    labelColor: 'text-cyan-700',    dotColor: 'bg-cyan-400'    },
  { id: 'North Western', name: 'North Western Province', bg: 'bg-rose-50',    border: 'border-rose-100',    labelColor: 'text-rose-700',    dotColor: 'bg-rose-400'    },
  { id: 'North Central', name: 'North Central Province', bg: 'bg-orange-50',  border: 'border-orange-100',  labelColor: 'text-orange-700',  dotColor: 'bg-orange-400'  },
  { id: 'Uva',           name: 'Uva Province',           bg: 'bg-teal-50',    border: 'border-teal-100',    labelColor: 'text-teal-700',    dotColor: 'bg-teal-400'    },
  { id: 'Sabaragamuwa',  name: 'Sabaragamuwa Province',  bg: 'bg-indigo-50',  border: 'border-indigo-100',  labelColor: 'text-indigo-700',  dotColor: 'bg-indigo-400'  },
];

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
export default function CompanyStudentsPage() {
  const [typeFilter, setTypeFilter]     = useState<TypeFilter>('all');
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const isToday = selectedDate === TODAY;

  const filtered = useMemo(
    () => typeFilter === 'all' ? schools : schools.filter(s => s.type === typeFilter),
    [typeFilter],
  );

  const totals = useMemo(() => {
    const sum = (fn: (s: typeof schools[0]) => number) => filtered.reduce((a, sc) => a + fn(sc), 0);
    return {
      students:  sum(sc => sc.students.total),
      male:      sum(sc => sc.students.male),
      female:    sum(sc => sc.students.female),
      present:   sum(sc => sc.attendance[selectedDate] ?? sc.attendance[TODAY] ?? 0),
      primary:   { total: sum(sc => sc.students.levels.primary.total),   male: sum(sc => sc.students.levels.primary.male),   female: sum(sc => sc.students.levels.primary.female)   },
      secondary: { total: sum(sc => sc.students.levels.secondary.total), male: sum(sc => sc.students.levels.secondary.male), female: sum(sc => sc.students.levels.secondary.female) },
      advanced:  { total: sum(sc => sc.students.levels.advanced.total),  male: sum(sc => sc.students.levels.advanced.male),  female: sum(sc => sc.students.levels.advanced.female)  },
    };
  }, [filtered, selectedDate]);

  const gradeChartData = useMemo(() => {
    const map = new Map<string, GradeRow>();
    for (let i = 1; i <= 13; i++) map.set(`G${i}`, { grade: `G${i}`, male: 0, female: 0, total: 0 });
    for (const sc of filtered) {
      for (const g of sc.students.grades) {
        const row = map.get(g.grade);
        if (row) { row.male += g.male; row.female += g.female; row.total += g.total; }
      }
    }
    return Array.from(map.values());
  }, [filtered]);

  // Province / district student counts derived from filtered schools
  const provinceStudentData = useMemo(() => {
    return PROVINCE_CONFIG.map(prov => {
      // Seed every district with zeros so all rows are always visible
      const districtMap: Record<string, { students: number; male: number; female: number }> = {};
      for (const d of PROVINCE_DISTRICTS[prov.id] ?? []) {
        districtMap[d] = { students: 0, male: 0, female: 0 };
      }
      // Accumulate from filtered schools
      for (const sc of filtered.filter(s => s.province === prov.id)) {
        if (!districtMap[sc.district]) districtMap[sc.district] = { students: 0, male: 0, female: 0 };
        districtMap[sc.district].students += sc.students.total;
        districtMap[sc.district].male     += sc.students.male;
        districtMap[sc.district].female   += sc.students.female;
      }
      const districts    = (PROVINCE_DISTRICTS[prov.id] ?? []).map(name => ({ name, ...districtMap[name] }));
      const totalStudents = districts.reduce((s, d) => s + d.students, 0);
      const totalMale     = districts.reduce((s, d) => s + d.male,     0);
      const totalFemale   = districts.reduce((s, d) => s + d.female,   0);
      return { ...prov, districts, totalStudents, totalMale, totalFemale };
    });
  }, [filtered]);

  const gradeTotal  = gradeChartData.reduce((s, g) => s + g.total,  0);
  const gradeMale   = gradeChartData.reduce((s, g) => s + g.male,   0);
  const gradeFemale = gradeChartData.reduce((s, g) => s + g.female, 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <h1 className="text-xl font-extrabold text-gray-900">Students</h1>
        <p className="text-xs text-gray-400 mt-0.5">Overview of students across all connected schools</p>
      </div>

      <div className="px-8 py-8 space-y-6 max-w-[1400px] mx-auto">

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {TYPE_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setTypeFilter(f.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                  typeFilter === f.value
                    ? 'bg-[#3E4EFA] text-white border-[#3E4EFA] shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#3E4EFA] hover:text-[#3E4EFA]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="date" value={selectedDate}
              min={MIN_DATE} max={TODAY}
              onChange={e => setSelectedDate(e.target.value)}
              className="text-sm text-gray-700 font-medium focus:outline-none bg-transparent"
            />
          </div>
        </div>

        {/* ── Row 1: Total students + Present ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Total Students</span>
            </div>
            <div className="text-4xl font-extrabold text-gray-900 mb-3">{totals.students.toLocaleString()}</div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                <span className="text-sm text-gray-500">Male</span>
                <span className="text-sm font-bold text-gray-800">{totals.male.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
                <span className="text-sm text-gray-500">Female</span>
                <span className="text-sm font-bold text-gray-800">{totals.female.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-400 rounded-l-full" style={{ width: `${(totals.male / (totals.students || 1)) * 100}%` }} />
              <div className="h-full bg-pink-400 flex-1" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                {isToday ? 'Present Today' : `Present — ${selectedDate}`}
              </span>
            </div>
            <div className="text-4xl font-extrabold text-gray-900 mb-3">{totals.present.toLocaleString()}</div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-gray-500">Attendance rate</span>
              <span className="text-sm font-extrabold text-emerald-600">
                {totals.students ? ((totals.present / totals.students) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${totals.students ? (totals.present / totals.students) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Row 2: Level cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Primary Students',   sub: 'Grade 1 – 5',   level: totals.primary,   bg: 'bg-sky-50',    border: 'border-sky-100'    },
            { label: 'Secondary Students', sub: 'Grade 6 – 11',  level: totals.secondary, bg: 'bg-indigo-50', border: 'border-indigo-100' },
            { label: 'Advanced Level',     sub: 'Grade 12 – 13', level: totals.advanced,  bg: 'bg-purple-50', border: 'border-purple-100' },
          ].map(row => (
            <div key={row.label} className={`${row.bg} border ${row.border} rounded-2xl shadow-sm p-5`}>
              <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">{row.label}</div>
              <div className="text-xs text-gray-400 mb-3">{row.sub}</div>
              <div className="text-3xl font-extrabold text-gray-900 mb-4">{row.level.total.toLocaleString()}</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm text-gray-600">Male</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{row.level.male.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    <span className="text-sm text-gray-600">Female</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{row.level.female.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Grade-wise column chart ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="font-extrabold text-gray-900 text-base">Students by Grade</h2>
              <p className="text-xs text-gray-400 mt-0.5">Grade 1 – 13 distribution across selected schools</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-blue-400" />
                <span className="text-xs text-gray-500 font-medium">Male</span>
                <span className="text-xs font-extrabold text-gray-800">{gradeMale.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-pink-400" />
                <span className="text-xs text-gray-500 font-medium">Female</span>
                <span className="text-xs font-extrabold text-gray-800">{gradeFemale.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-gray-300" />
                <span className="text-xs text-gray-500 font-medium">Total</span>
                <span className="text-xs font-extrabold text-gray-800">{gradeTotal.toLocaleString()}</span>
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

        {/* ── Students by Province & District ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-gray-400" />
            <h2 className="font-bold text-gray-800 text-sm">Students by Province &amp; District</h2>
            <span className="text-xs text-gray-400 ml-1">({totals.students.toLocaleString()} total)</span>
          </div>

          {provinceStudentData.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-gray-400 text-sm">
              No student data for the selected filter
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {provinceStudentData.map(prov => (
                <div key={prov.id} className={`bg-white rounded-2xl border ${prov.border} shadow-sm overflow-hidden`}>
                  {/* Province header */}
                  <div className={`${prov.bg} px-5 py-4 flex items-center justify-between`}>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-widest ${prov.labelColor}`}>{prov.name}</div>
                      <div className="text-2xl font-extrabold text-gray-900 mt-0.5">{prov.totalStudents.toLocaleString()}</div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-blue-500 font-semibold">{prov.totalMale.toLocaleString()} M</span>
                        <span className="text-xs text-pink-500 font-semibold">{prov.totalFemale.toLocaleString()} F</span>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${prov.bg} border ${prov.border} flex items-center justify-center`}>
                      <Users className={`w-5 h-5 ${prov.labelColor}`} />
                    </div>
                  </div>

                  {/* District rows */}
                  <div className="px-5 py-3 divide-y divide-gray-50">
                    {prov.districts.map(d => (
                      <div key={d.name} className="py-2.5 flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${prov.dotColor}`} />
                        <span className="text-sm text-gray-600 flex-1">{d.name}</span>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-blue-500 font-semibold">{d.male}M</span>
                          <span className="text-pink-500 font-semibold">{d.female}F</span>
                          <span className="font-bold text-gray-900 w-10 text-right">{d.students.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
