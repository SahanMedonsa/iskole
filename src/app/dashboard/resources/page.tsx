'use client';

import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import { Package, AlertTriangle, CheckCircle, Users } from 'lucide-react';

const resourceTypes = [
  { key: 'chairs',      label: 'Chairs',       emoji: '🪑', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { key: 'desks',       label: 'Desks',        emoji: '🗂️', color: 'bg-green-100 text-green-800 border-green-200' },
  { key: 'whiteboards', label: 'Whiteboards',  emoji: '📋', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { key: 'smartBoards', label: 'Smart Boards', emoji: '🖥️', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { key: 'fans',        label: 'Fans',         emoji: '💨', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  { key: 'projectors',  label: 'Projectors',   emoji: '📽️', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { key: 'computers',   label: 'Computers',    emoji: '💻', color: 'bg-red-100 text-red-800 border-red-200' },
  { key: 'lockers',     label: 'Lockers',      emoji: '🔒', color: 'bg-pink-100 text-pink-800 border-pink-200' },
] as const;

type ResourceKey = typeof resourceTypes[number]['key'];

type ClassResource = {
  id: string;
  name: string;
  grade: number;
  section: string;
  category: 'Primary' | 'Secondary' | 'Advanced';
  students: number;
  chairType: 'small' | 'standard';
  chairs: number;
  desks: number;
  whiteboards: number;
  smartBoards: number;
  fans: number;
  projectors: number;
  computers: number;
  lockers: number;
};

const classResources: ClassResource[] = [
  // Primary – Grades 1–5 (small chairs & desks)
  { id: '1A',    name: 'Grade 1 – A',         grade: 1,  section: 'A',        category: 'Primary',   students: 39, chairType: 'small',    chairs: 36, desks: 36, whiteboards: 1, smartBoards: 0, fans: 3, projectors: 0, computers: 2,  lockers: 0  },
  { id: '1B',    name: 'Grade 1 – B',         grade: 1,  section: 'B',        category: 'Primary',   students: 34, chairType: 'small',    chairs: 34, desks: 34, whiteboards: 1, smartBoards: 1, fans: 3, projectors: 1, computers: 2,  lockers: 0  },
  { id: '2A',    name: 'Grade 2 – A',         grade: 2,  section: 'A',        category: 'Primary',   students: 37, chairType: 'small',    chairs: 35, desks: 35, whiteboards: 1, smartBoards: 0, fans: 3, projectors: 0, computers: 2,  lockers: 0  },
  { id: '2B',    name: 'Grade 2 – B',         grade: 2,  section: 'B',        category: 'Primary',   students: 35, chairType: 'small',    chairs: 33, desks: 33, whiteboards: 1, smartBoards: 1, fans: 3, projectors: 1, computers: 2,  lockers: 0  },
  { id: '3A',    name: 'Grade 3 – A',         grade: 3,  section: 'A',        category: 'Primary',   students: 35, chairType: 'small',    chairs: 36, desks: 36, whiteboards: 2, smartBoards: 0, fans: 3, projectors: 0, computers: 3,  lockers: 0  },
  { id: '3B',    name: 'Grade 3 – B',         grade: 3,  section: 'B',        category: 'Primary',   students: 39, chairType: 'small',    chairs: 35, desks: 35, whiteboards: 2, smartBoards: 1, fans: 3, projectors: 1, computers: 3,  lockers: 0  },
  { id: '4A',    name: 'Grade 4 – A',         grade: 4,  section: 'A',        category: 'Primary',   students: 38, chairType: 'small',    chairs: 38, desks: 38, whiteboards: 2, smartBoards: 0, fans: 4, projectors: 0, computers: 2,  lockers: 5  },
  { id: '4B',    name: 'Grade 4 – B',         grade: 4,  section: 'B',        category: 'Primary',   students: 41, chairType: 'small',    chairs: 36, desks: 36, whiteboards: 2, smartBoards: 1, fans: 4, projectors: 1, computers: 2,  lockers: 5  },
  { id: '5A',    name: 'Grade 5 – A',         grade: 5,  section: 'A',        category: 'Primary',   students: 40, chairType: 'small',    chairs: 40, desks: 40, whiteboards: 2, smartBoards: 1, fans: 4, projectors: 1, computers: 4,  lockers: 5  },
  { id: '5B',    name: 'Grade 5 – B',         grade: 5,  section: 'B',        category: 'Primary',   students: 43, chairType: 'small',    chairs: 38, desks: 38, whiteboards: 2, smartBoards: 1, fans: 4, projectors: 1, computers: 4,  lockers: 5  },
  // Secondary – Grades 6–11 (standard chairs & desks)
  { id: '6A',    name: 'Grade 6 – A',         grade: 6,  section: 'A',        category: 'Secondary', students: 42, chairType: 'standard', chairs: 42, desks: 42, whiteboards: 2, smartBoards: 1, fans: 4, projectors: 1, computers: 5,  lockers: 10 },
  { id: '6B',    name: 'Grade 6 – B',         grade: 6,  section: 'B',        category: 'Secondary', students: 46, chairType: 'standard', chairs: 40, desks: 40, whiteboards: 2, smartBoards: 1, fans: 4, projectors: 1, computers: 5,  lockers: 10 },
  { id: '7A',    name: 'Grade 7 – A',         grade: 7,  section: 'A',        category: 'Secondary', students: 42, chairType: 'standard', chairs: 42, desks: 42, whiteboards: 2, smartBoards: 1, fans: 4, projectors: 1, computers: 5,  lockers: 12 },
  { id: '7B',    name: 'Grade 7 – B',         grade: 7,  section: 'B',        category: 'Secondary', students: 47, chairType: 'standard', chairs: 40, desks: 40, whiteboards: 2, smartBoards: 0, fans: 4, projectors: 0, computers: 5,  lockers: 12 },
  { id: '8A',    name: 'Grade 8 – A',         grade: 8,  section: 'A',        category: 'Secondary', students: 45, chairType: 'standard', chairs: 45, desks: 45, whiteboards: 2, smartBoards: 1, fans: 5, projectors: 1, computers: 6,  lockers: 15 },
  { id: '8B',    name: 'Grade 8 – B',         grade: 8,  section: 'B',        category: 'Secondary', students: 49, chairType: 'standard', chairs: 43, desks: 43, whiteboards: 2, smartBoards: 1, fans: 5, projectors: 1, computers: 6,  lockers: 15 },
  { id: '9A',    name: 'Grade 9 – A',         grade: 9,  section: 'A',        category: 'Secondary', students: 43, chairType: 'standard', chairs: 45, desks: 45, whiteboards: 2, smartBoards: 1, fans: 5, projectors: 1, computers: 6,  lockers: 15 },
  { id: '9B',    name: 'Grade 9 – B',         grade: 9,  section: 'B',        category: 'Secondary', students: 43, chairType: 'standard', chairs: 43, desks: 43, whiteboards: 2, smartBoards: 1, fans: 5, projectors: 1, computers: 6,  lockers: 15 },
  { id: '10A',   name: 'Grade 10 – A',        grade: 10, section: 'A',        category: 'Secondary', students: 44, chairType: 'standard', chairs: 44, desks: 44, whiteboards: 2, smartBoards: 1, fans: 5, projectors: 1, computers: 8,  lockers: 15 },
  { id: '10B',   name: 'Grade 10 – B',        grade: 10, section: 'B',        category: 'Secondary', students: 47, chairType: 'standard', chairs: 42, desks: 42, whiteboards: 2, smartBoards: 1, fans: 5, projectors: 1, computers: 8,  lockers: 15 },
  { id: '11A',   name: 'Grade 11 – A',        grade: 11, section: 'A',        category: 'Secondary', students: 44, chairType: 'standard', chairs: 44, desks: 44, whiteboards: 2, smartBoards: 1, fans: 5, projectors: 1, computers: 8,  lockers: 18 },
  { id: '11B',   name: 'Grade 11 – B',        grade: 11, section: 'B',        category: 'Secondary', students: 46, chairType: 'standard', chairs: 42, desks: 42, whiteboards: 2, smartBoards: 0, fans: 5, projectors: 0, computers: 8,  lockers: 18 },
  // Advanced – Grades 12–13 (standard chairs & desks)
  { id: '12Sc',  name: 'Grade 12 – Science',  grade: 12, section: 'Science',  category: 'Advanced',  students: 32, chairType: 'standard', chairs: 32, desks: 32, whiteboards: 2, smartBoards: 2, fans: 4, projectors: 2, computers: 15, lockers: 20 },
  { id: '12Art', name: 'Grade 12 – Arts',     grade: 12, section: 'Arts',     category: 'Advanced',  students: 34, chairType: 'standard', chairs: 30, desks: 30, whiteboards: 2, smartBoards: 1, fans: 4, projectors: 1, computers: 8,  lockers: 18 },
  { id: '12Com', name: 'Grade 12 – Commerce', grade: 12, section: 'Commerce', category: 'Advanced',  students: 30, chairType: 'standard', chairs: 30, desks: 30, whiteboards: 2, smartBoards: 1, fans: 4, projectors: 1, computers: 10, lockers: 18 },
  { id: '13Sc',  name: 'Grade 13 – Science',  grade: 13, section: 'Science',  category: 'Advanced',  students: 28, chairType: 'standard', chairs: 30, desks: 30, whiteboards: 2, smartBoards: 2, fans: 4, projectors: 2, computers: 15, lockers: 20 },
  { id: '13Art', name: 'Grade 13 – Arts',     grade: 13, section: 'Arts',     category: 'Advanced',  students: 32, chairType: 'standard', chairs: 28, desks: 28, whiteboards: 2, smartBoards: 1, fans: 3, projectors: 1, computers: 8,  lockers: 18 },
  { id: '13Com', name: 'Grade 13 – Commerce', grade: 13, section: 'Commerce', category: 'Advanced',  students: 28, chairType: 'standard', chairs: 28, desks: 28, whiteboards: 2, smartBoards: 1, fans: 3, projectors: 1, computers: 10, lockers: 18 },
];

type CategoryFilter = 'All' | 'Primary' | 'Secondary' | 'Advanced';

const categoryAccent: Record<CategoryFilter, string> = {
  All:       'bg-[#212B36] text-white',
  Primary:   'bg-emerald-600 text-white',
  Secondary: 'bg-sky-600 text-white',
  Advanced:  'bg-violet-600 text-white',
};

const categoryBadge: Record<string, string> = {
  Primary:   'bg-emerald-100 text-emerald-800',
  Secondary: 'bg-sky-100 text-sky-800',
  Advanced:  'bg-violet-100 text-violet-800',
};

function sum(rows: ClassResource[], key: ResourceKey) {
  return rows.reduce((acc, r) => acc + r[key], 0);
}

function chairShortage(r: ClassResource) { return Math.max(0, r.students - r.chairs); }
function deskShortage(r: ClassResource)  { return Math.max(0, r.students - r.desks); }
function hasShortage(r: ClassResource)   { return chairShortage(r) > 0 || deskShortage(r) > 0; }

export default function ResourcesPage() {
  const [filter, setFilter] = useState<CategoryFilter>('All');

  const filtered = filter === 'All' ? classResources : classResources.filter(r => r.category === filter);

  const schoolTotal = (key: ResourceKey) => sum(classResources, key);

  const categoryTotal = (cat: 'Primary' | 'Secondary' | 'Advanced', key: ResourceKey) =>
    sum(classResources.filter(r => r.category === cat), key);
  const categoryStudents = (cat: 'Primary' | 'Secondary' | 'Advanced') =>
    classResources.filter(r => r.category === cat).reduce((a, r) => a + r.students, 0);

  const filters: CategoryFilter[] = ['All', 'Primary', 'Secondary', 'Advanced'];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">

          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-[#212B36] via-slate-700 to-slate-600 px-8 pt-10 pb-10 text-white">
            <div className="max-w-5xl">
              <div className="flex items-center gap-3 mb-2">
                <Package className="w-8 h-8 text-white/80" />
                <span className="text-xs uppercase tracking-[0.25em] text-white/60">School Management</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">Resources</h1>
            </div>
          </div>

          <div className="px-8 pt-8 pb-16 space-y-10">

            {/* School-wide Resource Totals */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">School-wide Resource Totals</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4">
                {resourceTypes.map(rt => (
                  <div key={rt.key} className={`rounded-xl border-2 p-4 flex flex-col items-center gap-1 shadow-sm ${rt.color}`}>
                    <span className="text-3xl">{rt.emoji}</span>
                    <span className="text-2xl font-extrabold">{schoolTotal(rt.key as ResourceKey).toLocaleString()}</span>
                    <span className="text-xs font-semibold text-center leading-tight">{rt.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Category Summary */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Summary by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(['Primary', 'Secondary', 'Advanced'] as const).map(cat => {
                  const catRows    = classResources.filter(r => r.category === cat);
                  const catShort   = catRows.filter(hasShortage);
                  const catStudents = categoryStudents(cat);
                  return (
                    <div key={cat} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                      <div className={`px-5 py-3 font-bold text-base flex items-center justify-between ${categoryAccent[cat]}`}>
                        <span>
                          {cat}
                          {cat === 'Primary' && (
                            <span className="ml-2 text-xs font-normal opacity-80">(small chairs & desks)</span>
                          )}
                        </span>
                        {catShort.length > 0 ? (
                          <span className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5 text-xs font-semibold">
                            <AlertTriangle className="w-3 h-3" />
                            {catShort.length} shortage{catShort.length > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <CheckCircle className="w-4 h-4 opacity-70" />
                        )}
                      </div>
                      <div className="px-5 pt-3 pb-1 text-sm text-gray-500 flex gap-4 border-b border-gray-50">
                        <span><strong className="text-gray-800">{catRows.length}</strong> classes</span>
                        <span><strong className="text-gray-800">{catStudents}</strong> students</span>
                      </div>
                      <div className="p-5 grid grid-cols-2 gap-3">
                        {resourceTypes.map(rt => {
                          const total = categoryTotal(cat, rt.key as ResourceKey);
                          const isSeating = rt.key === 'chairs' || rt.key === 'desks';
                          const shortfall = isSeating ? Math.max(0, catStudents - total) : 0;
                          return (
                            <div key={rt.key} className="flex items-center gap-2">
                              <span className="text-lg">{rt.emoji}</span>
                              <div>
                                <div className="text-xs text-gray-500">{rt.label}</div>
                                <div className={`font-bold ${shortfall > 0 ? 'text-red-600' : 'text-gray-800'}`}>
                                  {total.toLocaleString()}
                                  {shortfall > 0 && (
                                    <span className="ml-1 text-xs text-red-500 font-semibold">(–{shortfall})</span>
                                  )}
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
            </section>

            {/* Class-wise Table */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-gray-800">Class-wise Resource Summary</h2>
                <div className="flex gap-2 flex-wrap">
                  {filters.map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                        filter === f ? categoryAccent[f] : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-[#212B36] text-white">
                        <th className="text-left px-5 py-3 font-semibold whitespace-nowrap">Class</th>
                        <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Category</th>
                        <th className="text-center px-4 py-3 font-semibold whitespace-nowrap">
                          <Users className="w-3.5 h-3.5 inline-block mr-1" />Students
                        </th>
                        {resourceTypes.map(rt => (
                          <th key={rt.key} className="text-center px-4 py-3 font-semibold whitespace-nowrap">
                            {rt.emoji} {rt.label}
                          </th>
                        ))}
                        <th className="text-center px-4 py-3 font-semibold whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((row, i) => {
                        const cs = chairShortage(row);
                        const ds = deskShortage(row);
                        const shortage = cs > 0 || ds > 0;
                        return (
                          <tr
                            key={row.id}
                            className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                              shortage ? 'bg-red-50/40' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                            }`}
                          >
                            <td className="px-5 py-3 whitespace-nowrap">
                              <div className="font-semibold text-gray-800">{row.name}</div>
                              {row.chairType === 'small' && (
                                <div className="text-xs text-blue-500 mt-0.5">small chairs & desks</div>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryBadge[row.category]}`}>
                                {row.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center font-bold text-gray-800">{row.students}</td>
                            {resourceTypes.map(rt => {
                              const val = row[rt.key as ResourceKey];
                              const isChair = rt.key === 'chairs';
                              const isDesk  = rt.key === 'desks';
                              const short   = isChair ? cs : isDesk ? ds : 0;
                              return (
                                <td key={rt.key} className="px-4 py-3 text-center">
                                  <span className={`font-medium ${short > 0 ? 'text-red-600 font-bold' : 'text-gray-700'}`}>
                                    {val}
                                  </span>
                                  {short > 0 && (
                                    <span className="ml-1 text-xs font-bold text-red-500 bg-red-100 rounded px-1">
                                      –{short}
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                            <td className="px-4 py-3 text-center">
                              {shortage ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                                  <AlertTriangle className="w-3 h-3" /> Shortage
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                                  <CheckCircle className="w-3 h-3" /> OK
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#212B36]/10 border-t-2 border-[#212B36]/20 font-bold">
                        <td className="px-5 py-3 text-gray-800 whitespace-nowrap">
                          Total ({filtered.length} {filtered.length === 1 ? 'class' : 'classes'})
                        </td>
                        <td className="px-4 py-3" />
                        <td className="px-4 py-3 text-center text-[#212B36]">
                          {filtered.reduce((a, r) => a + r.students, 0)}
                        </td>
                        {resourceTypes.map(rt => (
                          <td key={rt.key} className="px-4 py-3 text-center text-[#212B36]">
                            {sum(filtered, rt.key as ResourceKey).toLocaleString()}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center text-xs text-gray-500">
                          {filtered.filter(hasShortage).length > 0
                            ? <span className="text-red-600 font-semibold">{filtered.filter(hasShortage).length} with shortage</span>
                            : <span className="text-emerald-600 font-semibold">All OK</span>
                          }
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
