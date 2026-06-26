'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users, UserCheck, Phone, GraduationCap,
  Building2, MapPin, User, ChevronDown, Plus, Search,
} from 'lucide-react';
import {
  schools, TYPE_FILTERS, ALL_DISTRICTS, TODAY,
  type TypeFilter,
} from '../_schoolData';

// ── Province / district data ───────────────────────────────────────────────
// Each district stores B/G/M per management type so the section can filter by both dimensions
type SubCounts = { boys: number; girls: number; mixed: number };
type District  = { name: string; govt: SubCounts; pvt: SubCounts; semi: SubCounts };
type Province  = { id: string; name: string; bg: string; border: string; labelColor: string; dotColor: string; districts: District[] };

const d = (name: string, govt: SubCounts, pvt: SubCounts, semi: SubCounts): District => ({ name, govt, pvt, semi });

const provinces: Province[] = [
  { id: 'western',       name: 'Western Province',       bg: 'bg-blue-50',    border: 'border-blue-100',    labelColor: 'text-blue-700',    dotColor: 'bg-blue-400',
    districts: [d('Colombo',      {boys:6,girls:7,mixed:7}, {boys:1,girls:1,mixed:5}, {boys:1,girls:1,mixed:1}),
                d('Gampaha',      {boys:3,girls:4,mixed:11},{boys:1,girls:1,mixed:3}, {boys:0,girls:0,mixed:2}),
                d('Kalutara',     {boys:2,girls:3,mixed:10},{boys:1,girls:1,mixed:1}, {boys:0,girls:0,mixed:2})] },
  { id: 'central',       name: 'Central Province',       bg: 'bg-emerald-50', border: 'border-emerald-100', labelColor: 'text-emerald-700', dotColor: 'bg-emerald-400',
    districts: [d('Kandy',        {boys:4,girls:4,mixed:4}, {boys:1,girls:1,mixed:2}, {boys:0,girls:0,mixed:2}),
                d('Matale',       {boys:1,girls:2,mixed:6}, {boys:1,girls:0,mixed:1}, {boys:0,girls:0,mixed:1}),
                d('Nuwara Eliya', {boys:1,girls:2,mixed:5}, {boys:0,girls:0,mixed:1}, {boys:0,girls:0,mixed:1})] },
  { id: 'southern',      name: 'Southern Province',      bg: 'bg-amber-50',   border: 'border-amber-100',   labelColor: 'text-amber-700',   dotColor: 'bg-amber-400',
    districts: [d('Galle',        {boys:3,girls:3,mixed:4}, {boys:1,girls:1,mixed:1}, {boys:0,girls:0,mixed:2}),
                d('Matara',       {boys:2,girls:2,mixed:6}, {boys:1,girls:1,mixed:1}, {boys:0,girls:0,mixed:1}),
                d('Hambantota',   {boys:1,girls:2,mixed:5}, {boys:0,girls:0,mixed:2}, {boys:0,girls:0,mixed:1})] },
  { id: 'northern',      name: 'Northern Province',      bg: 'bg-violet-50',  border: 'border-violet-100',  labelColor: 'text-violet-700',  dotColor: 'bg-violet-400',
    districts: [d('Jaffna',       {boys:5,girls:4,mixed:3}, {boys:0,girls:1,mixed:2}, {boys:0,girls:0,mixed:1}),
                d('Kilinochchi',  {boys:1,girls:1,mixed:5}, {boys:0,girls:0,mixed:1}, {boys:0,girls:0,mixed:0}),
                d('Mannar',       {boys:1,girls:1,mixed:3}, {boys:0,girls:0,mixed:1}, {boys:0,girls:0,mixed:0}),
                d('Vavuniya',     {boys:2,girls:2,mixed:3}, {boys:0,girls:0,mixed:2}, {boys:0,girls:0,mixed:0}),
                d('Mullaitivu',   {boys:1,girls:1,mixed:4}, {boys:0,girls:0,mixed:1}, {boys:0,girls:0,mixed:0})] },
  { id: 'eastern',       name: 'Eastern Province',       bg: 'bg-cyan-50',    border: 'border-cyan-100',    labelColor: 'text-cyan-700',    dotColor: 'bg-cyan-400',
    districts: [d('Trincomalee',  {boys:2,girls:2,mixed:6}, {boys:1,girls:1,mixed:0}, {boys:0,girls:0,mixed:1}),
                d('Batticaloa',   {boys:2,girls:2,mixed:6}, {boys:1,girls:1,mixed:1}, {boys:0,girls:0,mixed:1}),
                d('Ampara',       {boys:2,girls:2,mixed:5}, {boys:0,girls:0,mixed:2}, {boys:0,girls:0,mixed:1})] },
  { id: 'north-western', name: 'North Western Province', bg: 'bg-rose-50',    border: 'border-rose-100',    labelColor: 'text-rose-700',    dotColor: 'bg-rose-400',
    districts: [d('Kurunegala',   {boys:3,girls:3,mixed:8}, {boys:1,girls:1,mixed:2}, {boys:0,girls:0,mixed:2}),
                d('Puttalam',     {boys:2,girls:2,mixed:7}, {boys:0,girls:1,mixed:2}, {boys:0,girls:0,mixed:1})] },
  { id: 'north-central', name: 'North Central Province', bg: 'bg-orange-50',  border: 'border-orange-100',  labelColor: 'text-orange-700',  dotColor: 'bg-orange-400',
    districts: [d('Anuradhapura', {boys:2,girls:3,mixed:7}, {boys:1,girls:0,mixed:2}, {boys:0,girls:0,mixed:2}),
                d('Polonnaruwa',  {boys:1,girls:2,mixed:5}, {boys:0,girls:0,mixed:1}, {boys:0,girls:0,mixed:1})] },
  { id: 'uva',           name: 'Uva Province',           bg: 'bg-teal-50',    border: 'border-teal-100',    labelColor: 'text-teal-700',    dotColor: 'bg-teal-400',
    districts: [d('Badulla',      {boys:1,girls:2,mixed:6}, {boys:1,girls:1,mixed:0}, {boys:0,girls:0,mixed:2}),
                d('Monaragala',   {boys:1,girls:1,mixed:5}, {boys:0,girls:0,mixed:1}, {boys:0,girls:0,mixed:1})] },
  { id: 'sabaragamuwa',  name: 'Sabaragamuwa Province',  bg: 'bg-indigo-50',  border: 'border-indigo-100',  labelColor: 'text-indigo-700',  dotColor: 'bg-indigo-400',
    districts: [d('Ratnapura',    {boys:1,girls:2,mixed:7}, {boys:1,girls:1,mixed:0}, {boys:0,girls:0,mixed:2}),
                d('Kegalle',      {boys:2,girls:2,mixed:4}, {boys:0,girls:0,mixed:2}, {boys:0,girls:0,mixed:1})] },
];
const dTotal = (dist: District) => dist.govt.boys+dist.govt.girls+dist.govt.mixed + dist.pvt.boys+dist.pvt.girls+dist.pvt.mixed + dist.semi.boys+dist.semi.girls+dist.semi.mixed;
const provinceTotal = provinces.reduce((s, p) => s + p.districts.reduce((a, dist) => a + dTotal(dist), 0), 0);

// ── Logo components ────────────────────────────────────────────────────────
function KVLogo() {
  return (
    <Image
      src="/assets/kalutara vidyalaya.png"
      alt="Kalutara Vidyalaya"
      width={64} height={64}
      className="w-16 h-16 rounded-2xl object-contain p-1 bg-white flex-shrink-0"
    />
  );
}
function InitialsLogo({ initials, bg, color }: { initials: string; bg: string; color: string }) {
  return (
    <div className={`w-16 h-16 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
      <span className={`text-lg font-extrabold tracking-tight ${color}`}>{initials}</span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function CompanySchoolsPage() {
  const router = useRouter();
  const [typeFilter, setTypeFilter]         = useState<TypeFilter>('all');
  const [districtFilter, setDistrictFilter] = useState('');
  const [search, setSearch]                 = useState('');
  const [showProvinces, setShowProvinces]   = useState(true);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return schools.filter(s => {
      const typeOk     = typeFilter === 'all' || s.type === typeFilter;
      const districtOk = districtFilter === '' || s.district === districtFilter;
      const searchOk   = q === '' || s.name.toLowerCase().includes(q);
      return typeOk && districtOk && searchOk;
    });
  }, [typeFilter, districtFilter, search]);

  const counts = {
    total:   schools.length,
    govt:    schools.filter(s => s.type === 'Government').length,
    private: schools.filter(s => s.type === 'Private').length,
    semi:    schools.filter(s => s.type === 'Semi-Government').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Schools</h1>
          <p className="text-xs text-gray-400 mt-0.5">All connected schools in the iSkole network</p>
        </div>
        <Link
          href="/company/dashboard/schools/new"
          className="flex items-center gap-2 bg-[#3E4EFA] hover:bg-[#2f3fe8] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add New School
        </Link>
      </div>

      <div className="px-8 py-8 space-y-6 max-w-[1400px] mx-auto">

        {/* ── Type summary cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Schools',   value: counts.total,   bg: 'bg-[#3E4EFA]', text: 'text-white',      sub: 'text-blue-200'   },
            { label: 'Government',      value: counts.govt,    bg: 'bg-blue-50',   text: 'text-blue-700',   sub: 'text-blue-400'   },
            { label: 'Private',         value: counts.private, bg: 'bg-violet-50', text: 'text-violet-700', sub: 'text-violet-400' },
            { label: 'Semi-Government', value: counts.semi,    bg: 'bg-amber-50',  text: 'text-amber-700',  sub: 'text-amber-400'  },
          ].map(c => (
            <div key={c.label} className={`${c.bg} rounded-2xl px-5 py-4 flex flex-col gap-1`}>
              <span className={`text-[11px] font-semibold uppercase tracking-wide ${c.sub}`}>{c.label}</span>
              <span className={`text-3xl font-extrabold ${c.text}`}>{c.value}</span>
              <span className={`text-xs ${c.sub}`}>{c.value === 1 ? 'school' : 'schools'}</span>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Type pills */}
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

          {/* Search + district — only affect school cards */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search schools…"
                className="bg-white border border-gray-200 rounded-xl pl-9 pr-8 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/25 focus:border-[#3E4EFA] shadow-sm w-52"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={districtFilter}
                onChange={e => setDistrictFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl pl-9 pr-8 py-2 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/25 focus:border-[#3E4EFA] shadow-sm cursor-pointer"
              >
                <option value="">All Districts</option>
                {ALL_DISTRICTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ── Province / District breakdown (collapsible) ── */}
        <div>
          <button
            onClick={() => setShowProvinces(v => !v)}
            className="flex items-center gap-2 mb-4 w-full group"
          >
            <Building2 className="w-4 h-4 text-gray-400" />
            <h2 className="font-bold text-gray-800 text-sm">Schools by Province &amp; District</h2>
            <span className="text-xs text-gray-400 ml-1">({provinceTotal} total)</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 ml-auto transition-transform duration-200 ${showProvinces ? 'rotate-180' : ''}`} />
          </button>
          {showProvinces && <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {provinces.map(p => {
              // pick the right sub-counts based on active type filter
              const sub = (dist: District): SubCounts =>
                typeFilter === 'Government' ? dist.govt
                : typeFilter === 'Private'  ? dist.pvt
                : typeFilter === 'Semi-Government' ? dist.semi
                : { boys: dist.govt.boys+dist.pvt.boys+dist.semi.boys,
                    girls: dist.govt.girls+dist.pvt.girls+dist.semi.girls,
                    mixed: dist.govt.mixed+dist.pvt.mixed+dist.semi.mixed };

              const pBoys  = p.districts.reduce((s, dist) => s + sub(dist).boys,  0);
              const pGirls = p.districts.reduce((s, dist) => s + sub(dist).girls, 0);
              const pMixed = p.districts.reduce((s, dist) => s + sub(dist).mixed, 0);
              const total  = pBoys + pGirls + pMixed;

              return (
                <div key={p.id} className={`bg-white rounded-2xl border ${p.border} shadow-sm overflow-hidden`}>
                  {/* Province header */}
                  <div className={`${p.bg} px-5 py-4 flex items-center justify-between`}>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-widest ${p.labelColor}`}>{p.name}</div>
                      <div className="text-2xl font-extrabold text-gray-900 mt-0.5">{total}</div>
                      <div className="text-xs text-gray-400 mb-2">schools</div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-blue-600 bg-white/70 px-2 py-0.5 rounded-full">B {pBoys}</span>
                        <span className="text-[11px] font-bold text-pink-600 bg-white/70 px-2 py-0.5 rounded-full">G {pGirls}</span>
                        <span className="text-[11px] font-bold text-purple-600 bg-white/70 px-2 py-0.5 rounded-full">M {pMixed}</span>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-xl ${p.bg} border ${p.border} flex items-center justify-center self-start`}>
                      <Building2 className={`w-5 h-5 ${p.labelColor}`} />
                    </div>
                  </div>

                  {/* Column header */}
                  <div className="px-5 pt-2 pb-1 flex items-center gap-2 border-b border-gray-50">
                    <div className="w-1.5 flex-shrink-0" />
                    <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 flex-1">District</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-blue-400 w-8 text-right">Boys</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-pink-400 w-8 text-right">Girls</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-purple-400 w-10 text-right">Mixed</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400 w-8 text-right">Total</span>
                  </div>

                  {/* District rows */}
                  <div className="px-5 py-2 divide-y divide-gray-50">
                    {p.districts.map(dist => {
                      const s = sub(dist);
                      const rowTotal = s.boys + s.girls + s.mixed;
                      return (
                        <div key={dist.name} className="py-2 flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.dotColor}`} />
                          <span className="text-sm text-gray-600 flex-1">{dist.name}</span>
                          <span className="text-xs font-semibold text-blue-500 w-8 text-right">{s.boys}</span>
                          <span className="text-xs font-semibold text-pink-500 w-8 text-right">{s.girls}</span>
                          <span className="text-xs font-semibold text-purple-500 w-10 text-right">{s.mixed}</span>
                          <span className="text-sm font-bold text-gray-900 w-8 text-right">{rowTotal}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>}
        </div>

        {/* ── School cards ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-4 h-4 text-gray-400" />
            <span className="font-bold text-gray-800 text-sm">
              {districtFilter
                ? `${districtFilter} District`
                : typeFilter === 'all' ? 'All Schools' : `${typeFilter} Schools`}
            </span>
            <span className="text-xs text-gray-400">({filtered.length})</span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <Building2 className="w-10 h-10 opacity-30" />
              <p className="text-sm font-medium">No schools found for the selected filters</p>
              <button
                onClick={() => { setTypeFilter('all'); setDistrictFilter(''); }}
                className="text-xs text-[#3E4EFA] font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(school => {
                const presentCount = school.attendance[TODAY] ?? 0;
                return (
                  <div key={school.id} onClick={() => router.push(`/company/dashboard/schools/${school.id}`)} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">

                    <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-gray-50">
                      {school.isKV ? (
                        <KVLogo />
                      ) : (
                        <InitialsLogo initials={school.initials} bg={school.logoBg ?? 'bg-gray-100'} color={school.logoColor ?? 'text-gray-700'} />
                      )}
                      <div className="min-w-0">
                        <div className="font-extrabold text-gray-900 leading-tight">{school.name}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span className="text-xs text-gray-400">{school.district} District</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${school.typeBadge}`}>
                            {school.type}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            school.gender === 'Boys'  ? 'bg-blue-100 text-blue-700' :
                            school.gender === 'Girls' ? 'bg-pink-100 text-pink-700' :
                                                        'bg-purple-100 text-purple-700'
                          }`}>
                            {school.gender}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">Principal</div>
                          <div className="text-sm font-semibold text-gray-800 truncate">{school.principal}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">Contact</div>
                          <div className="text-sm font-semibold text-gray-800">{school.contact}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <Users className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">Students</div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-sm font-extrabold text-gray-900">{school.students.total.toLocaleString()}</span>
                            <span className="text-xs text-blue-500 font-bold">{school.students.male}M</span>
                            <span className="text-xs text-pink-500 font-bold">{school.students.female}F</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">Teachers</div>
                          <div className="text-sm font-semibold text-gray-800">{school.teachers}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mx-6 mb-5 bg-emerald-50 rounded-xl px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs text-emerald-700 font-semibold">Present Today</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-emerald-700">{presentCount.toLocaleString()}</span>
                        <span className="text-[11px] text-emerald-500">
                          ({((presentCount / school.students.total) * 100).toFixed(0)}%)
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
