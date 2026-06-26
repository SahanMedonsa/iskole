'use client';

import React, { useState, useMemo } from 'react';
import {
  Package, Monitor, FlaskConical, BookOpen, Trophy,
  Building2, CheckCircle, AlertTriangle, Wrench,
} from 'lucide-react';

// ── Resource items with condition breakdown ────────────────────────────────
type CategoryKey = 'all' | 'classroom' | 'digital' | 'lab' | 'library' | 'sports' | 'infrastructure';

type ResourceItem = {
  name: string;
  emoji: string;
  category: CategoryKey;
  total: number;
  good: number;
  fair: number;
  repair: number;
};

const RESOURCES: ResourceItem[] = [
  // Classroom
  { name:'Classrooms',          emoji:'🏫', category:'classroom',      total:200,   good:150,  fair:40,   repair:10  },
  { name:'Chairs',              emoji:'🪑', category:'classroom',      total:8430,  good:5901, fair:1855, repair:674 },
  { name:'Desks',               emoji:'🗂️', category:'classroom',      total:8430,  good:6070, fair:1686, repair:674 },
  { name:'Whiteboards',         emoji:'📋', category:'classroom',      total:264,   good:172,  fair:66,   repair:26  },
  { name:'Fans',                emoji:'💨', category:'classroom',      total:424,   good:288,  fair:102,  repair:34  },
  { name:'Air-conditioners',    emoji:'❄️', category:'classroom',      total:55,    good:45,   fair:8,    repair:2   },
  // Digital
  { name:'Smart Boards',        emoji:'🖥️', category:'digital',        total:98,    good:86,   fair:10,   repair:2   },
  { name:'Projectors',          emoji:'📽️', category:'digital',        total:114,   good:89,   fair:18,   repair:7   },
  { name:'Computers',           emoji:'💻', category:'digital',        total:520,   good:416,  fair:78,   repair:26  },
  { name:'Tablets',             emoji:'📱', category:'digital',        total:298,   good:253,  fair:36,   repair:9   },
  { name:'Printers',            emoji:'🖨️', category:'digital',        total:76,    good:55,   fair:15,   repair:6   },
  { name:'Servers',             emoji:'🗄️', category:'digital',        total:14,    good:12,   fair:2,    repair:0   },
  // Laboratory
  { name:'Lab Rooms',           emoji:'🔬', category:'lab',            total:22,    good:17,   fair:4,    repair:1   },
  { name:'Lab Benches',         emoji:'🧪', category:'lab',            total:264,   good:196,  fair:53,   repair:15  },
  { name:'Microscopes',         emoji:'🔭', category:'lab',            total:212,   good:161,  fair:38,   repair:13  },
  { name:'Lab Kits',            emoji:'🧫', category:'lab',            total:680,   good:476,  fair:150,  repair:54  },
  { name:'Chemical Sets',       emoji:'⚗️', category:'lab',            total:485,   good:412,  fair:58,   repair:15  },
  { name:'Safety Kits',         emoji:'🦺', category:'lab',            total:74,    good:65,   fair:7,    repair:2   },
  // Library
  { name:'Books',               emoji:'📚', category:'library',        total:51600, good:37152,fair:10320,repair:4128},
  { name:'Library Seats',       emoji:'💺', category:'library',        total:360,   good:274,  fair:65,   repair:21  },
  { name:'Bookshelves',         emoji:'🗃️', category:'library',        total:200,   good:156,  fair:34,   repair:10  },
  { name:'e-Readers',           emoji:'📖', category:'library',        total:139,   good:117,  fair:18,   repair:4   },
  // Sports
  { name:'Sports Fields',       emoji:'🏟️', category:'sports',         total:13,    good:9,    fair:3,    repair:1   },
  { name:'Basketball Courts',   emoji:'🏀', category:'sports',         total:9,     good:6,    fair:2,    repair:1   },
  { name:'Volleyball Nets',     emoji:'🏐', category:'sports',         total:13,    good:9,    fair:3,    repair:1   },
  { name:'Cricket Kits',        emoji:'🏏', category:'sports',         total:27,    good:20,   fair:5,    repair:2   },
  { name:'Footballs',           emoji:'⚽', category:'sports',         total:79,    good:60,   fair:14,   repair:5   },
  { name:'Athletics Equipment', emoji:'🏃', category:'sports',         total:309,   good:222,  fair:62,   repair:25  },
  // Infrastructure
  { name:'Offices',             emoji:'🏢', category:'infrastructure', total:37,    good:30,   fair:6,    repair:1   },
  { name:'Staff Rooms',         emoji:'🧑‍💼', category:'infrastructure', total:18,    good:14,   fair:3,    repair:1   },
  { name:'Canteens',            emoji:'🍽️', category:'infrastructure', total:10,    good:8,    fair:2,    repair:0   },
  { name:'Washrooms',           emoji:'🚿', category:'infrastructure', total:104,   good:71,   fair:25,   repair:8   },
  { name:'Security Cameras',    emoji:'📷', category:'infrastructure', total:188,   good:162,  fair:23,   repair:3   },
  { name:'Fire Extinguishers',  emoji:'🧯', category:'infrastructure', total:206,   good:181,  fair:21,   repair:4   },
];

// ── Category config ────────────────────────────────────────────────────────
const CATEGORIES: { key: CategoryKey; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { key:'all',            label:'All',            icon:Package,      color:'text-slate-600',   bg:'bg-slate-100'   },
  { key:'classroom',      label:'Classroom',      icon:Building2,    color:'text-blue-600',    bg:'bg-blue-50'     },
  { key:'digital',        label:'Digital',        icon:Monitor,      color:'text-violet-600',  bg:'bg-violet-50'   },
  { key:'lab',            label:'Laboratory',     icon:FlaskConical, color:'text-emerald-600', bg:'bg-emerald-50'  },
  { key:'library',        label:'Library',        icon:BookOpen,     color:'text-amber-600',   bg:'bg-amber-50'    },
  { key:'sports',         label:'Sports',         icon:Trophy,       color:'text-rose-600',    bg:'bg-rose-50'     },
  { key:'infrastructure', label:'Infrastructure', icon:Building2,    color:'text-cyan-600',    bg:'bg-cyan-50'     },
];

function pct(n: number, total: number) {
  return total === 0 ? 0 : Math.round((n / total) * 100);
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function CompanyResourcesPage() {
  const [category, setCategory] = useState<CategoryKey>('all');

  const filtered = useMemo(
    () => category === 'all' ? RESOURCES : RESOURCES.filter(r => r.category === category),
    [category],
  );

  // Network-wide totals
  const netTotal  = filtered.reduce((a, r) => a + r.total,  0);
  const netGood   = filtered.reduce((a, r) => a + r.good,   0);
  const netFair   = filtered.reduce((a, r) => a + r.fair,   0);
  const netRepair = filtered.reduce((a, r) => a + r.repair, 0);

  // Category summary for the overview cards
  const catSummary = useMemo(() =>
    CATEGORIES.slice(1).map(cat => {
      const rows  = RESOURCES.filter(r => r.category === cat.key);
      const tot   = rows.reduce((a, r) => a + r.total,  0);
      const good  = rows.reduce((a, r) => a + r.good,   0);
      const fair  = rows.reduce((a, r) => a + r.fair,   0);
      const rep   = rows.reduce((a, r) => a + r.repair, 0);
      return { ...cat, tot, good, fair, rep };
    }),
  []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <h1 className="text-xl font-extrabold text-gray-900">Resources</h1>
        <p className="text-xs text-gray-400 mt-0.5">Network inventory — 5 pilot schools · {RESOURCES.length} resource types</p>
      </div>

      <div className="px-8 py-8 max-w-[1400px] mx-auto space-y-8">

        {/* ── Summary stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:'Total Items',   value: RESOURCES.reduce((a, r) => a + r.total,  0).toLocaleString(), icon: Package,       color:'text-slate-600',   bg:'bg-slate-100'   },
            { label:'Good Condition',value: RESOURCES.reduce((a, r) => a + r.good,   0).toLocaleString(), icon: CheckCircle,   color:'text-emerald-600', bg:'bg-emerald-50'  },
            { label:'Fair Condition',value: RESOURCES.reduce((a, r) => a + r.fair,   0).toLocaleString(), icon: AlertTriangle, color:'text-amber-600',   bg:'bg-amber-50'    },
            { label:'Needs Repair',  value: RESOURCES.reduce((a, r) => a + r.repair, 0).toLocaleString(), icon: Wrench,        color:'text-red-500',     bg:'bg-red-50'      },
          ].map(c => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-gray-900">{c.value}</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">{c.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Category summary cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {catSummary.map(cat => {
            const Icon = cat.icon;
            const goodPct = pct(cat.good, cat.tot);
            const fairPct = pct(cat.fair, cat.tot);
            const repPct  = pct(cat.rep,  cat.tot);
            return (
              <button
                key={cat.key}
                onClick={() => setCategory(prev => prev === cat.key ? 'all' : cat.key)}
                className={`bg-white rounded-2xl border shadow-sm p-4 text-left transition-all hover:shadow-md ${
                  category === cat.key ? 'border-[#3E4EFA] ring-1 ring-[#3E4EFA]/20' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-xl ${cat.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${cat.color}`} />
                  </div>
                  <span className="text-xs font-bold text-gray-700">{cat.label}</span>
                </div>
                <div className="text-lg font-extrabold text-gray-900 mb-2">{cat.tot.toLocaleString()}</div>
                {/* Condition bar */}
                <div className="flex rounded-full overflow-hidden h-1.5 mb-2 gap-px">
                  <div className="bg-emerald-400" style={{ width:`${goodPct}%` }} />
                  <div className="bg-amber-400"   style={{ width:`${fairPct}%` }} />
                  <div className="bg-red-400"     style={{ width:`${repPct}%`  }} />
                </div>
                <div className="flex justify-between text-[10px] font-semibold">
                  <span className="text-emerald-600">{goodPct}% Good</span>
                  <span className="text-red-500">{cat.rep} Repair</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Resource detail table ── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">All Resources</h2>
              {category !== 'all' && (
                <p className="text-xs text-[#3E4EFA] mt-0.5 font-medium">
                  Filtered: {CATEGORIES.find(c => c.key === category)?.label}
                  <button onClick={() => setCategory('all')} className="ml-2 underline hover:no-underline">Clear</button>
                </p>
              )}
            </div>
            {/* Filter pills */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(c => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.key}
                    onClick={() => setCategory(c.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      category === c.key
                        ? 'bg-[#3E4EFA] text-white border-[#3E4EFA] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#3E4EFA] hover:text-[#3E4EFA]'
                    }`}
                  >
                    <Icon className="w-3 h-3" />{c.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#3E4EFA] text-white">
                    <th className="text-left px-5 py-3.5 font-semibold whitespace-nowrap w-56">Resource</th>
                    <th className="text-center px-4 py-3.5 font-semibold whitespace-nowrap">Total</th>
                    <th className="text-center px-4 py-3.5 font-semibold whitespace-nowrap">
                      <span className="flex items-center justify-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Good</span>
                    </th>
                    <th className="text-center px-4 py-3.5 font-semibold whitespace-nowrap">
                      <span className="flex items-center justify-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Fair</span>
                    </th>
                    <th className="text-center px-4 py-3.5 font-semibold whitespace-nowrap">
                      <span className="flex items-center justify-center gap-1"><Wrench className="w-3.5 h-3.5" /> Repair</span>
                    </th>
                    <th className="px-5 py-3.5 font-semibold whitespace-nowrap min-w-[200px]">Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => {
                    const goodPct = pct(r.good,   r.total);
                    const fairPct = pct(r.fair,   r.total);
                    const repPct  = pct(r.repair, r.total);
                    return (
                      <tr key={r.name} className={`border-b border-gray-50 hover:bg-gray-50/60 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className="text-base mr-2">{r.emoji}</span>
                          <span className="font-semibold text-gray-800">{r.name}</span>
                        </td>
                        <td className="px-4 py-3.5 text-center font-extrabold text-gray-900">
                          {r.total.toLocaleString()}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <div className="font-bold text-emerald-600">{r.good.toLocaleString()}</div>
                          <div className="text-[10px] text-gray-400">{goodPct}%</div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <div className="font-bold text-amber-500">{r.fair.toLocaleString()}</div>
                          <div className="text-[10px] text-gray-400">{fairPct}%</div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          {r.repair > 0
                            ? <><div className="font-bold text-red-500">{r.repair.toLocaleString()}</div><div className="text-[10px] text-gray-400">{repPct}%</div></>
                            : <div className="text-gray-300 font-bold">—</div>
                          }
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="flex flex-1 rounded-full overflow-hidden h-2 bg-gray-100 gap-px">
                              <div className="bg-emerald-400 transition-all" style={{ width:`${goodPct}%` }} />
                              <div className="bg-amber-400 transition-all"   style={{ width:`${fairPct}%` }} />
                              <div className="bg-red-400 transition-all"     style={{ width:`${repPct}%`  }} />
                            </div>
                            <span className={`text-[11px] font-bold w-10 text-right ${goodPct >= 80 ? 'text-emerald-600' : goodPct >= 65 ? 'text-amber-500' : 'text-red-500'}`}>
                              {goodPct}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-[#3E4EFA]/8 border-t-2 border-[#3E4EFA]/20">
                    <td className="px-5 py-3.5 font-extrabold text-gray-800 whitespace-nowrap">
                      Total ({filtered.length} types)
                    </td>
                    <td className="px-4 py-3.5 text-center font-extrabold text-[#3E4EFA]">{netTotal.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="font-extrabold text-emerald-600">{netGood.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400">{pct(netGood, netTotal)}%</div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="font-extrabold text-amber-500">{netFair.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400">{pct(netFair, netTotal)}%</div>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="font-extrabold text-red-500">{netRepair.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400">{pct(netRepair, netTotal)}%</div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-1 rounded-full overflow-hidden h-2 bg-gray-100 gap-px">
                          <div className="bg-emerald-400" style={{ width:`${pct(netGood,  netTotal)}%` }} />
                          <div className="bg-amber-400"   style={{ width:`${pct(netFair,  netTotal)}%` }} />
                          <div className="bg-red-400"     style={{ width:`${pct(netRepair,netTotal)}%` }} />
                        </div>
                        <span className="text-[11px] font-extrabold text-emerald-600 w-10 text-right">{pct(netGood, netTotal)}%</span>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
