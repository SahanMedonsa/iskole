'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap, UserCheck, BookOpen, UserPlus, Users,
  Phone, Building2, MapPin, Search, X, ChevronDown,
} from 'lucide-react';
import {
  schools, TYPE_FILTERS,
  type TypeFilter,
} from '../_schoolData';

import { TEACHERS } from './_teacherData';

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

const TEACHER_SUBJECTS: string[] = [...new Set<string>(TEACHERS.map(t => t.subject))].sort();

// ── Page ───────────────────────────────────────────────────────────────────
export default function CompanyTeachersPage() {
  const router = useRouter();
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [view, setView] = useState<'overview' | 'list'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const filteredTeachers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return TEACHERS.filter(t => {
      const matchType    = typeFilter === 'all' || t.type === typeFilter;
      const matchSubject = subjectFilter === 'all' || t.subject === subjectFilter;
      const matchSearch  = !q || t.name.toLowerCase().includes(q) || t.serviceNo.toLowerCase().includes(q);
      return matchType && matchSubject && matchSearch;
    });
  }, [typeFilter, subjectFilter, searchQuery]);

  const filtered = useMemo(
    () => typeFilter === 'all' ? schools : schools.filter(s => s.type === typeFilter),
    [typeFilter],
  );

  const totals = useMemo(() => {
    const sum = (fn: (s: typeof schools[0]) => number) => filtered.reduce((a, sc) => a + fn(sc), 0);
    return {
      teachers: sum(sc => sc.teacherDetails.total),
      male:     sum(sc => sc.teacherDetails.male),
      female:   sum(sc => sc.teacherDetails.female),
      present:  sum(sc => sc.teachersPresent),
      primary:   {
        total:  sum(sc => sc.teacherDetails.levels.primary.total),
        male:   sum(sc => sc.teacherDetails.levels.primary.male),
        female: sum(sc => sc.teacherDetails.levels.primary.female),
      },
      secondary: {
        total:  sum(sc => sc.teacherDetails.levels.secondary.total),
        male:   sum(sc => sc.teacherDetails.levels.secondary.male),
        female: sum(sc => sc.teacherDetails.levels.secondary.female),
      },
      advanced: {
        total:  sum(sc => sc.teacherDetails.levels.advanced.total),
        male:   sum(sc => sc.teacherDetails.levels.advanced.male),
        female: sum(sc => sc.teacherDetails.levels.advanced.female),
      },
    };
  }, [filtered]);

  // Aggregate subjects across all filtered schools
  const subjectData = useMemo(() => {
    const map = new Map<string, { count: number; male: number; female: number }>();
    for (const sc of filtered) {
      for (const sub of sc.teacherDetails.subjects) {
        const e = map.get(sub.subject) ?? { count: 0, male: 0, female: 0 };
        map.set(sub.subject, {
          count:  e.count  + sub.count,
          male:   e.male   + sub.male,
          female: e.female + sub.female,
        });
      }
    }
    return Array.from(map.entries())
      .map(([subject, d]) => ({ subject, ...d }))
      .sort((a, b) => b.count - a.count);
  }, [filtered]);

  // Province / district teacher breakdown
  const provinceTeacherData = useMemo(() => {
    return PROVINCE_CONFIG.map(prov => {
      const districtMap: Record<string, { teachers: number; male: number; female: number }> = {};
      for (const d of PROVINCE_DISTRICTS[prov.id] ?? []) {
        districtMap[d] = { teachers: 0, male: 0, female: 0 };
      }
      for (const sc of filtered.filter(s => s.province === prov.id)) {
        if (!districtMap[sc.district]) districtMap[sc.district] = { teachers: 0, male: 0, female: 0 };
        districtMap[sc.district].teachers += sc.teacherDetails.total;
        districtMap[sc.district].male     += sc.teacherDetails.male;
        districtMap[sc.district].female   += sc.teacherDetails.female;
      }
      const districts     = (PROVINCE_DISTRICTS[prov.id] ?? []).map(name => ({ name, ...districtMap[name] }));
      const totalTeachers = districts.reduce((s, d) => s + d.teachers, 0);
      const totalMale     = districts.reduce((s, d) => s + d.male,     0);
      const totalFemale   = districts.reduce((s, d) => s + d.female,   0);
      return { ...prov, districts, totalTeachers, totalMale, totalFemale };
    });
  }, [filtered]);

  const attendancePct = totals.teachers ? ((totals.present / totals.teachers) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Teachers</h1>
          <p className="text-xs text-gray-400 mt-0.5">Overview of teachers across all connected schools</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView(v => v === 'list' ? 'overview' : 'list')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all flex items-center gap-1.5 ${
              view === 'list'
                ? 'bg-[#3E4EFA] text-white border-[#3E4EFA] shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#3E4EFA] hover:text-[#3E4EFA]'
            }`}
          >
            <Users className="w-4 h-4" /> Teachers
          </button>
          <button
            onClick={() => router.push('/company/dashboard/teachers/register')}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#3E4EFA] text-white flex items-center gap-1.5 hover:bg-[#2E3ED9] transition-colors shadow-sm"
          >
            <UserPlus className="w-4 h-4" /> Register Teacher
          </button>
        </div>
      </div>

      <div className="px-8 py-8 space-y-6 max-w-[1400px] mx-auto">

        {/* ── Filters ── */}
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

        {/* ── List view search + subject filter ── */}
        <div className={view === 'overview' ? 'hidden' : 'flex flex-col sm:flex-row gap-3'}>
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name or teacher ID…"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#3E4EFA] focus:ring-1 focus:ring-[#3E4EFA]/20 bg-white transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {/* Subject filter */}
          <div className="relative">
            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
              className="pl-3.5 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-[#3E4EFA] focus:ring-1 focus:ring-[#3E4EFA]/20 bg-white transition-all appearance-none min-w-[160px]"
            >
              <option value="all">All Subjects</option>
              {TEACHER_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {/* Result count */}
          <div className="flex items-center">
            <span className="text-sm text-gray-400 whitespace-nowrap">{filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* ── Teacher cards list ── */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 ${view === 'overview' ? 'hidden' : ''}`}>
          {filteredTeachers.length === 0 ? (
            <div className="sm:col-span-2 xl:col-span-3 flex flex-col items-center justify-center py-16 text-gray-400">
              <GraduationCap className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm font-medium">No teachers match your filters</p>
              <button onClick={() => { setSearchQuery(''); setSubjectFilter('all'); }} className="mt-3 text-xs text-[#3E4EFA] hover:underline">Clear filters</button>
            </div>
          ) : filteredTeachers.map(t => (
            <div key={t.id} onClick={() => router.push(`/company/dashboard/teachers/${t.id}`)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-[#3E4EFA]/20 transition-all cursor-pointer">
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl ${t.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-sm font-extrabold ${t.color}`}>{t.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 text-sm leading-tight truncate">{t.name}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{t.serviceNo}</div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.status === 'Active' ? 'bg-green-100 text-green-700' : t.status === 'On Leave' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{t.status}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.type === 'Government' ? 'bg-blue-100 text-blue-700' : t.type === 'Private' ? 'bg-violet-100 text-violet-700' : 'bg-amber-100 text-amber-700'}`}>{t.type}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 border-t border-gray-50 pt-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-medium flex-1">{t.subject}</span>
                  <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full whitespace-nowrap">{t.grade}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600 truncate">{t.school}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-500">{t.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{t.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-500">{t.exp} yrs experience · {t.gender}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Overview sections ── */}
        <div className={`space-y-6 ${view === 'list' ? 'hidden' : ''}`}>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Total teachers */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Total Teachers</span>
            </div>
            <div className="text-4xl font-extrabold text-gray-900 mb-3">{totals.teachers.toLocaleString()}</div>
            <div className="flex gap-6 mb-3">
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
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-400 rounded-l-full" style={{ width: `${(totals.male / (totals.teachers || 1)) * 100}%` }} />
              <div className="h-full bg-pink-400 flex-1" />
            </div>
          </div>

          {/* Present today */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Present Today</span>
            </div>
            <div className="text-4xl font-extrabold text-gray-900 mb-3">{totals.present.toLocaleString()}</div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-gray-500">Attendance rate</span>
              <span className="text-sm font-extrabold text-emerald-600">{attendancePct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${(totals.present / (totals.teachers || 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Level cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Primary Level',   sub: 'Grade 1 – 5',   level: totals.primary,   bg: 'bg-sky-50',    border: 'border-sky-100'    },
            { label: 'Secondary Level', sub: 'Grade 6 – 11',  level: totals.secondary, bg: 'bg-indigo-50', border: 'border-indigo-100' },
            { label: 'Advanced Level',  sub: 'Grade 12 – 13', level: totals.advanced,  bg: 'bg-purple-50', border: 'border-purple-100' },
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

        {/* ── Teachers by Subject ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <h2 className="font-bold text-gray-800 text-sm">Teachers by Subject</h2>
            <span className="text-xs text-gray-400 ml-1">({subjectData.length} subjects · {totals.teachers} teachers)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mb-1">
            {[0, 1].map(col => (
              <div key={col} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-gray-400 pb-1 border-b border-gray-100">
                <span className="flex-1">Subject</span>
                <span className="w-8 text-right text-blue-400">Male</span>
                <span className="w-10 text-right text-pink-400">Female</span>
                <span className="w-10 text-right">Total</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0.5 mt-2">
            {subjectData.map(sub => (
              <div key={sub.subject} className="py-2.5 border-b border-gray-50 flex items-center gap-2">
                <span className="text-sm text-gray-700 font-medium flex-1">{sub.subject}</span>
                <span className="text-xs font-semibold text-blue-500 w-8 text-right">{sub.male}</span>
                <span className="text-xs font-semibold text-pink-500 w-10 text-right">{sub.female}</span>
                <span className="text-sm font-bold text-gray-900 w-10 text-right">{sub.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Teachers by Province & District ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <h2 className="font-bold text-gray-800 text-sm">Teachers by Province &amp; District</h2>
            <span className="text-xs text-gray-400 ml-1">({totals.teachers.toLocaleString()} total)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {provinceTeacherData.map(prov => (
              <div key={prov.id} className={`bg-white rounded-2xl border ${prov.border} shadow-sm overflow-hidden`}>
                <div className={`${prov.bg} px-5 py-4 flex items-center justify-between`}>
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-widest ${prov.labelColor}`}>{prov.name}</div>
                    <div className="text-2xl font-extrabold text-gray-900 mt-0.5">{prov.totalTeachers.toLocaleString()}</div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-blue-500 font-semibold">{prov.totalMale} M</span>
                      <span className="text-xs text-pink-500 font-semibold">{prov.totalFemale} F</span>
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${prov.bg} border ${prov.border} flex items-center justify-center`}>
                    <GraduationCap className={`w-5 h-5 ${prov.labelColor}`} />
                  </div>
                </div>
                <div className="px-5 pt-2 pb-1 flex items-center gap-2 border-b border-gray-50">
                  <div className="w-1.5 flex-shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 flex-1">District</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-blue-400 w-8 text-right">Male</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-pink-400 w-12 text-right">Female</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-10 text-right">Total</span>
                </div>
                <div className="px-5 py-2 divide-y divide-gray-50">
                  {prov.districts.map(d => (
                    <div key={d.name} className="py-2 flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${prov.dotColor}`} />
                      <span className="text-sm text-gray-600 flex-1">{d.name}</span>
                      <span className="text-xs font-semibold text-blue-500 w-8 text-right">{d.male}</span>
                      <span className="text-xs font-semibold text-pink-500 w-12 text-right">{d.female}</span>
                      <span className="text-sm font-bold text-gray-900 w-10 text-right">{d.teachers}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        </div>{/* end overview wrapper */}
      </div>
    </div>
  );
}
