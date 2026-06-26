'use client';

import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend,
} from 'recharts';
import {
  Users, UserCheck, UserX, TrendingUp, Wallet,
  Building2, MapPin, ChevronUp,
} from 'lucide-react';

// ── Constants ──────────────────────────────────────────────────────────────
const RATE = 100; // Rs. per parent per month

// ── Monthly trend (app launched Jul 2025) ─────────────────────────────────
const MONTHLY = [
  { month:'Jul 25', active:850,  revenue:85000  },
  { month:'Aug 25', active:1230, revenue:123000 },
  { month:'Sep 25', active:1820, revenue:182000 },
  { month:'Oct 25', active:2450, revenue:245000 },
  { month:'Nov 25', active:2940, revenue:294000 },
  { month:'Dec 25', active:3210, revenue:321000 },
  { month:'Jan 26', active:3540, revenue:354000 },
  { month:'Feb 26', active:3820, revenue:382000 },
  { month:'Mar 26', active:4050, revenue:405000 },
  { month:'Apr 26', active:4180, revenue:418000 },
  { month:'May 26', active:4320, revenue:432000 },
  { month:'Jun 26', active:4450, revenue:445000 },
];

// ── Per-school data ─────────────────────────────────────────────────────────
const SCHOOLS = [
  {
    id:'SCH001', name:'Kalutara Vidyalaya',         district:'Kalutara',
    province:'Western',  type:'Government'      as const,
    students:1450, registered:1180, active:920,  declined:260,
  },
  {
    id:'SCH002', name:'Colombo Central School',     district:'Colombo',
    province:'Western',  type:'Government'      as const,
    students:2100, registered:1820, active:1450, declined:370,
  },
  {
    id:'SCH003', name:'Galle International Academy',district:'Galle',
    province:'Southern', type:'Private'         as const,
    students:850,  registered:780,  active:680,  declined:100,
  },
  {
    id:'SCH004', name:'Kandy Heritage School',      district:'Kandy',
    province:'Central',  type:'Semi-Government' as const,
    students:1200, registered:1020, active:780,  declined:240,
  },
  {
    id:'SCH005', name:'Jaffna Model School',        district:'Jaffna',
    province:'Northern', type:'Government'      as const,
    students:980,  registered:840,  active:620,  declined:220,
  },
];

// ── Derived aggregates ─────────────────────────────────────────────────────
function groupBy<T>(arr: T[], key: (item: T) => string) {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

function agg(rows: typeof SCHOOLS) {
  return rows.reduce(
    (a, s) => ({
      registered: a.registered + s.registered,
      active:     a.active     + s.active,
      declined:   a.declined   + s.declined,
      revenue:    a.revenue    + s.active * RATE,
    }),
    { registered:0, active:0, declined:0, revenue:0 },
  );
}

const byType     = groupBy(SCHOOLS, s => s.type);
const byProvince = groupBy(SCHOOLS, s => s.province);

const TYPE_CONFIG: Record<string, { badge: string; dot: string }> = {
  'Government':      { badge:'bg-blue-100 text-blue-700',   dot:'bg-blue-400'   },
  'Private':         { badge:'bg-violet-100 text-violet-700',dot:'bg-violet-400' },
  'Semi-Government': { badge:'bg-amber-100 text-amber-700',  dot:'bg-amber-400'  },
};

const PROVINCE_COLOR: Record<string, string> = {
  Western:  'text-blue-600',
  Southern: 'text-amber-600',
  Central:  'text-emerald-600',
  Northern: 'text-violet-600',
};

// ── Helpers ────────────────────────────────────────────────────────────────
const rs = (n: number) =>
  'Rs. ' + n.toLocaleString('en-LK');

function MoMBadge({ now, prev }: { now: number; prev: number }) {
  const diff = now - prev;
  const pct  = prev === 0 ? 0 : Math.round((diff / prev) * 100);
  if (diff === 0) return null;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-2
      ${diff > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
      <ChevronUp className={`w-2.5 h-2.5 ${diff < 0 ? 'rotate-180' : ''}`} />
      {Math.abs(pct)}%
    </span>
  );
}

// ── Recharts formatters ─────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fmtRevenue = (v: any) => `Rs. ${Number(v).toLocaleString()}`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fmtActive  = (v: any) => `${Number(v).toLocaleString()} parents`;

// ── Page ───────────────────────────────────────────────────────────────────
export default function CompanyEarningsPage() {
  const [chartType, setChartType] = useState<'revenue' | 'users'>('revenue');

  const current  = MONTHLY[MONTHLY.length - 1];
  const previous = MONTHLY[MONTHLY.length - 2];
  const netTotal = agg(SCHOOLS);
  const annualRR = current.active * RATE * 12;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Earnings</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Parent app subscriptions · Rs. {RATE}/parent/month · as of June 2026
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2">
          <Wallet className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-extrabold text-emerald-700">{rs(current.revenue)}</span>
          <span className="text-xs text-emerald-500 font-medium">this month</span>
        </div>
      </div>

      <div className="px-8 py-8 max-w-[1400px] mx-auto space-y-8">

        {/* ── KPI cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              label:'Monthly Revenue', icon: Wallet, color:'text-emerald-600', bg:'bg-emerald-50',
              value: rs(current.revenue),
              sub: <MoMBadge now={current.revenue} prev={previous.revenue} />,
            },
            {
              label:'Active Subscribers', icon: UserCheck, color:'text-blue-600', bg:'bg-blue-50',
              value: current.active.toLocaleString(),
              sub: <MoMBadge now={current.active} prev={previous.active} />,
            },
            {
              label:'Total Registered', icon: Users, color:'text-slate-600', bg:'bg-slate-100',
              value: netTotal.registered.toLocaleString(),
              sub: <span className="text-[10px] text-gray-400 ml-1">across {SCHOOLS.length} schools</span>,
            },
            {
              label:'Declined / Inactive', icon: UserX, color:'text-red-500', bg:'bg-red-50',
              value: netTotal.declined.toLocaleString(),
              sub: <span className="text-[10px] text-red-400 ml-1">{Math.round(netTotal.declined/netTotal.registered*100)}% of registered</span>,
            },
            {
              label:'Annual Run Rate', icon: TrendingUp, color:'text-violet-600', bg:'bg-violet-50',
              value: rs(annualRR),
              sub: <span className="text-[10px] text-gray-400 ml-1">if current stays</span>,
            },
          ].map(c => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <div className="flex items-baseline flex-wrap gap-y-0.5">
                  <span className="text-xl font-extrabold text-gray-900 leading-tight">{c.value}</span>
                  {c.sub}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">{c.label}</div>
              </div>
            );
          })}
        </div>

        {/* ── Monthly trend chart ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Monthly Growth</h2>
              <p className="text-xs text-gray-400 mt-0.5">Jul 2025 – Jun 2026 (12 months since app launch)</p>
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {(['revenue','users'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setChartType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    chartType === t ? 'bg-white text-[#3E4EFA] shadow-sm' : 'text-gray-500'
                  }`}
                >
                  {t === 'revenue' ? 'Revenue' : 'Active Users'}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            {chartType === 'revenue' ? (
              <AreaChart data={MONTHLY} margin={{ top:5, right:10, left:10, bottom:0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3E4EFA" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3E4EFA" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `Rs.${(v/1000).toFixed(0)}k`} tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={fmtRevenue} labelStyle={{ fontWeight:700 }} contentStyle={{ borderRadius:12, border:'1px solid #e5e7eb', fontSize:12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#3E4EFA" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r:5, fill:'#3E4EFA' }} />
              </AreaChart>
            ) : (
              <AreaChart data={MONTHLY} margin={{ top:5, right:10, left:10, bottom:0 }}>
                <defs>
                  <linearGradient id="usrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:11, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={fmtActive} labelStyle={{ fontWeight:700 }} contentStyle={{ borderRadius:12, border:'1px solid #e5e7eb', fontSize:12 }} />
                <Area type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2.5} fill="url(#usrGrad)" dot={false} activeDot={{ r:5, fill:'#10b981' }} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* ── By school type + by province ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* By school type */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <h2 className="text-sm font-bold text-gray-800">By School Type</h2>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(byType).map(([type, schools]) => {
                const t = agg(schools);
                const activePct = Math.round(t.active / t.registered * 100);
                const cfg = TYPE_CONFIG[type];
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                        <span className="text-sm font-semibold text-gray-800">{type}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{schools.length} school{schools.length>1?'s':''}</span>
                      </div>
                      <span className="text-sm font-extrabold text-gray-900">{rs(t.revenue)}</span>
                    </div>
                    <div className="flex rounded-full overflow-hidden h-2 bg-gray-100 mb-1.5">
                      <div className="bg-[#3E4EFA] transition-all" style={{ width:`${activePct}%` }} />
                      <div className="bg-red-300 transition-all"   style={{ width:`${100-activePct}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-500">
                      <span><span className="font-bold text-[#3E4EFA]">{t.active.toLocaleString()}</span> active &nbsp;·&nbsp; <span className="font-bold text-red-400">{t.declined.toLocaleString()}</span> declined</span>
                      <span>{t.registered.toLocaleString()} registered</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Mini bar chart */}
            <div className="px-6 pb-6">
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={Object.entries(byType).map(([type, schools]) => {
                  const t = agg(schools);
                  return { name: type.replace('Semi-Government','Semi-Govt'), active: t.active, declined: t.declined };
                })} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize:10, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize:10, fill:'#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius:10, border:'1px solid #e5e7eb', fontSize:11 }} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize:10 }} />
                  <Bar dataKey="active"   name="Active"   fill="#3E4EFA" radius={[4,4,0,0]} />
                  <Bar dataKey="declined" name="Declined" fill="#fca5a5" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* By province */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <h2 className="text-sm font-bold text-gray-800">By Province</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-[11px] font-semibold uppercase tracking-wide">
                    <th className="text-left px-6 py-3">Province</th>
                    <th className="text-center px-4 py-3">Registered</th>
                    <th className="text-center px-4 py-3">Active</th>
                    <th className="text-center px-4 py-3">Declined</th>
                    <th className="text-right px-6 py-3">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(byProvince).map(([province, schools], i) => {
                    const t = agg(schools);
                    const activePct = Math.round(t.active / t.registered * 100);
                    const col = PROVINCE_COLOR[province] ?? 'text-gray-600';
                    return (
                      <tr key={province} className={`border-b border-gray-50 ${i%2===0?'bg-white':'bg-gray-50/30'}`}>
                        <td className="px-6 py-3.5">
                          <div className={`text-sm font-bold ${col}`}>{province}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{schools.length} school{schools.length>1?'s':''}</div>
                        </td>
                        <td className="px-4 py-3.5 text-center font-semibold text-gray-700">{t.registered.toLocaleString()}</td>
                        <td className="px-4 py-3.5 text-center">
                          <div className="font-bold text-[#3E4EFA]">{t.active.toLocaleString()}</div>
                          <div className="text-[10px] text-gray-400">{activePct}%</div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`font-bold ${t.declined>0?'text-red-500':'text-gray-300'}`}>{t.declined.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-3.5 text-right font-extrabold text-gray-900">{rs(t.revenue)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-[#3E4EFA]/5 border-t-2 border-[#3E4EFA]/15">
                    <td className="px-6 py-3.5 font-extrabold text-gray-800 text-xs">Total</td>
                    <td className="px-4 py-3.5 text-center font-extrabold text-gray-800">{netTotal.registered.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-center font-extrabold text-[#3E4EFA]">{netTotal.active.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-center font-extrabold text-red-500">{netTotal.declined.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-right font-extrabold text-[#3E4EFA]">{rs(netTotal.revenue)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* ── Per-school breakdown ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800">Per-School Subscriber Breakdown</h2>
            <p className="text-xs text-gray-400 mt-0.5">Rs. {RATE} / active parent / month</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#3E4EFA] text-white text-xs font-semibold">
                  <th className="text-left px-6 py-3.5">School</th>
                  <th className="text-center px-4 py-3.5">Province</th>
                  <th className="text-center px-4 py-3.5">Type</th>
                  <th className="text-center px-4 py-3.5">Students</th>
                  <th className="text-center px-4 py-3.5">Registered</th>
                  <th className="text-center px-4 py-3.5">Active</th>
                  <th className="text-center px-4 py-3.5">Declined</th>
                  <th className="text-center px-4 py-3.5">Active Rate</th>
                  <th className="text-right px-6 py-3.5">Monthly Revenue</th>
                </tr>
              </thead>
              <tbody>
                {SCHOOLS.map((s, i) => {
                  const activePct = Math.round(s.active / s.registered * 100);
                  const cfg = TYPE_CONFIG[s.type];
                  const col = PROVINCE_COLOR[s.province] ?? 'text-gray-600';
                  return (
                    <tr key={s.id} className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${i%2===0?'bg-white':'bg-gray-50/30'}`}>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 text-xs leading-tight">{s.name}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{s.district} District</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-xs font-semibold ${col}`}>{s.province}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{s.type.replace('Semi-Government','Semi-Govt')}</span>
                      </td>
                      <td className="px-4 py-4 text-center font-semibold text-gray-600">{s.students.toLocaleString()}</td>
                      <td className="px-4 py-4 text-center font-semibold text-gray-700">{s.registered.toLocaleString()}</td>
                      <td className="px-4 py-4 text-center font-bold text-[#3E4EFA]">{s.active.toLocaleString()}</td>
                      <td className="px-4 py-4 text-center font-bold text-red-500">{s.declined.toLocaleString()}</td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full bg-[#3E4EFA] rounded-full" style={{ width:`${activePct}%` }} />
                          </div>
                          <span className="text-xs font-bold text-gray-700">{activePct}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-extrabold text-gray-900">{rs(s.active * RATE)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-[#3E4EFA]/8 border-t-2 border-[#3E4EFA]/20">
                  <td colSpan={4} className="px-6 py-3.5 font-extrabold text-gray-800 text-xs">Network Total</td>
                  <td className="px-4 py-3.5 text-center font-extrabold text-gray-800">{netTotal.registered.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-center font-extrabold text-[#3E4EFA]">{netTotal.active.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-center font-extrabold text-red-500">{netTotal.declined.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-center font-extrabold text-gray-700">
                    {Math.round(netTotal.active / netTotal.registered * 100)}%
                  </td>
                  <td className="px-6 py-3.5 text-right font-extrabold text-[#3E4EFA]">{rs(netTotal.revenue)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
