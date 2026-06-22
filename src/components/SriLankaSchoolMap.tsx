'use client';

import React, { useState } from 'react';
import { Building2, Users, GraduationCap } from 'lucide-react';

export type SchoolPin = {
  id: string;
  name: string;
  location: string;
  type: 'Government' | 'Private' | 'Semi-Government';
  students: number;
  teachers: number;
  // Real lat/lon → converted to SVG coords via helpers below
  lat: number;
  lon: number;
};

// ViewBox: 0 0 260 440
// Covers roughly lon 79.5–82.0, lat 5.8–9.9
const LON_MIN = 79.5,  LON_RANGE = 2.5,  SVG_W = 260;
const LAT_MAX = 9.9,   LAT_RANGE = 4.1,  SVG_H = 440;

function toSvg(lat: number, lon: number): [number, number] {
  const x = ((lon - LON_MIN) / LON_RANGE) * SVG_W;
  const y = ((LAT_MAX - lat) / LAT_RANGE) * SVG_H;
  return [Math.round(x), Math.round(y)];
}

// Simplified but recognisable Sri Lanka coastline (clockwise from N tip)
const SL_PATH = `
  M 76,9
  Q 110,55 136,68
  Q 158,100 180,143
  Q 210,188 229,234
  Q 242,280 242,327
  C 242,350 240,360 239,367
  C 210,385 191,396 191,396
  Q 175,405 169,406
  Q 140,420 114,427
  Q 90,420 75,413
  Q 55,385 50,367
  L 48,356
  Q 38,335 36,319
  Q 30,300 34,289
  Q 28,230 28,179
  Q 35,135 42,100
  Q 30,90 23,86
  Q 40,55 54,26
  Q 65,15 76,9
  Z
`.trim();

const TYPE_COLOR: Record<SchoolPin['type'], string> = {
  'Government':      '#3b82f6',
  'Private':         '#8b5cf6',
  'Semi-Government': '#f59e0b',
};


export default function SriLankaSchoolMap({ schools }: { schools: SchoolPin[] }) {
  const [hovered, setHovered] = useState<SchoolPin | null>(null);
  const [tipPos, setTipPos]   = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const govCount  = schools.filter(s => s.type === 'Government').length;
  const privCount = schools.filter(s => s.type === 'Private').length;
  const semiCount = schools.filter(s => s.type === 'Semi-Government').length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row">

        {/* ── Map ── */}
        <div className="flex-1 min-h-[420px] relative bg-slate-50 border-b lg:border-b-0 lg:border-r border-gray-100 flex items-center justify-center p-6">
          <div className="relative w-full max-w-[280px]">
            <svg
              viewBox="0 0 260 440"
              className="w-full drop-shadow-sm"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))' }}
            >
              {/* Ocean background hint */}
              <rect width="260" height="440" fill="#e8f4fd" rx="8" />

              {/* Sri Lanka land */}
              <path
                d={SL_PATH}
                fill="#d1fae5"
                stroke="#6ee7b7"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* District grid lines (subtle) */}
              <path d={SL_PATH} fill="none" stroke="#a7f3d0" strokeWidth="0.5" />

              {/* School pins */}
              {schools.map(school => {
                const [sx, sy] = toSvg(school.lat, school.lon);
                const color = TYPE_COLOR[school.type];
                return (
                  <g
                    key={school.id}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={e => {
                      setHovered(school);
                      const rect = (e.currentTarget.closest('svg') as SVGSVGElement)
                        ?.getBoundingClientRect();
                      if (rect) {
                        const svgScale = rect.width / 260;
                        setTipPos({ x: sx * svgScale, y: sy * svgScale });
                      }
                    }}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Pulse ring */}
                    <circle cx={sx} cy={sy} r="10" fill={color} opacity="0.15">
                      <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Pin body */}
                    <circle
                      cx={sx} cy={sy} r="6"
                      fill={color}
                      stroke="white"
                      strokeWidth="1.5"
                    />
                    {/* Dot centre */}
                    <circle cx={sx} cy={sy} r="2" fill="white" />
                  </g>
                );
              })}
            </svg>

            {/* Tooltip */}
            {hovered && (
              <div
                className="absolute z-10 bg-white rounded-xl shadow-xl border border-gray-100 p-3 w-52 pointer-events-none"
                style={{ left: tipPos.x + 12, top: tipPos.y - 60, transform: 'translateY(-50%)' }}
              >
                <div className="font-bold text-gray-900 text-sm leading-tight">{hovered.name}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span
                    className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: TYPE_COLOR[hovered.type] }}
                  />
                  <span className="text-xs text-gray-500">{hovered.type}</span>
                </div>
                <div className="mt-1.5 grid grid-cols-2 gap-1 text-xs text-gray-600">
                  <div className="flex items-center gap-1"><Users className="w-3 h-3" />{hovered.students.toLocaleString()} students</div>
                  <div className="flex items-center gap-1"><GraduationCap className="w-3 h-3" />{hovered.teachers} teachers</div>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
            {(Object.entries(TYPE_COLOR) as [SchoolPin['type'], string][]).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
                <span className="text-xs text-gray-500">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats panel ── */}
        <div className="w-full lg:w-72 p-6 flex flex-col gap-4">

          {/* Total connected card */}
          <div className="bg-[#212B36] rounded-2xl p-5 text-white flex flex-col gap-1">
            <div className="text-xs text-white/50 uppercase tracking-widest font-semibold">Schools Connected</div>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-5xl font-extrabold">{schools.length}</span>
              <span className="text-sm text-white/50 mb-1.5">schools</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">All live & synced</span>
            </div>
          </div>

          {/* Type breakdown cards */}
          {[
            { label: 'Government',      count: govCount,  color: TYPE_COLOR['Government'],      bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-100'   },
            { label: 'Private',         count: privCount, color: TYPE_COLOR['Private'],         bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100' },
            { label: 'Semi-Government', count: semiCount, color: TYPE_COLOR['Semi-Government'], bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-100'  },
          ].map(row => (
            <div
              key={row.label}
              className={`${row.bg} border ${row.border} rounded-2xl p-5 flex items-center justify-between`}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: row.color }} />
                <span className={`text-sm font-semibold ${row.text}`}>{row.label}</span>
              </div>
              <span className="text-3xl font-extrabold text-gray-900">{row.count}</span>
            </div>
          ))}

          {/* Total students across all */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 font-medium">Total Students</span>
            </div>
            <span className="text-lg font-extrabold text-gray-900">
              {schools.reduce((a, s) => a + s.students, 0).toLocaleString()}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
