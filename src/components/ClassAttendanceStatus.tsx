'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export type ClassStatus = {
  id: string;
  name: string;
  teacher: string;
  category: 'Primary' | 'Secondary' | 'Advanced';
  markedAt?: string;
};

export const TODAY_CLASSES: ClassStatus[] = [
  // Primary
  { id:'1A',    name:'Grade 1 – A',         teacher:'Mrs. Sandamali R.',   category:'Primary',   markedAt:'07:58' },
  { id:'1B',    name:'Grade 1 – B',         teacher:'Mr. Nimal D.',        category:'Primary',   markedAt:'08:05' },
  { id:'2A',    name:'Grade 2 – A',         teacher:'Mrs. Kumari P.',      category:'Primary',   markedAt:'08:02' },
  { id:'2B',    name:'Grade 2 – B',         teacher:'Mrs. Fathima N.',     category:'Primary'                    },
  { id:'3A',    name:'Grade 3 – A',         teacher:'Mr. Anura B.',        category:'Primary',   markedAt:'08:10' },
  { id:'3B',    name:'Grade 3 – B',         teacher:'Mrs. Chandra G.',     category:'Primary',   markedAt:'08:15' },
  { id:'4A',    name:'Grade 4 – A',         teacher:'Mr. Ruwan S.',        category:'Primary'                    },
  { id:'4B',    name:'Grade 4 – B',         teacher:'Mr. Kamal F.',        category:'Primary',   markedAt:'08:07' },
  { id:'5A',    name:'Grade 5 – A',         teacher:'Mrs. Dilini W.',      category:'Primary',   markedAt:'08:12' },
  { id:'5B',    name:'Grade 5 – B',         teacher:'Mr. Saman J.',        category:'Primary'                    },
  // Secondary
  { id:'6A',    name:'Grade 6 – A',         teacher:'Mr. Balakrishnan T.', category:'Secondary', markedAt:'08:03' },
  { id:'6B',    name:'Grade 6 – B',         teacher:'Mrs. Kumari P.',      category:'Secondary', markedAt:'08:18' },
  { id:'7A',    name:'Grade 7 – A',         teacher:'Mrs. Sandamali R.',   category:'Secondary', markedAt:'08:01' },
  { id:'7B',    name:'Grade 7 – B',         teacher:'Ms. Priya S.',        category:'Secondary'                  },
  { id:'8A',    name:'Grade 8 – A',         teacher:'Mrs. Fathima N.',     category:'Secondary', markedAt:'08:09' },
  { id:'8B',    name:'Grade 8 – B',         teacher:'Mr. Ruwan S.',        category:'Secondary', markedAt:'08:22' },
  { id:'9A',    name:'Grade 9 – A',         teacher:'Mr. Kamal F.',        category:'Secondary'                  },
  { id:'9B',    name:'Grade 9 – B',         teacher:'Mr. Anura B.',        category:'Secondary', markedAt:'08:11' },
  { id:'10A',   name:'Grade 10 – A',        teacher:'Mrs. Chandra G.',     category:'Secondary', markedAt:'08:06' },
  { id:'10B',   name:'Grade 10 – B',        teacher:'Mr. Saman J.',        category:'Secondary', markedAt:'08:19' },
  { id:'11A',   name:'Grade 11 – A',        teacher:'Mrs. Dilini W.',      category:'Secondary', markedAt:'08:14' },
  { id:'11B',   name:'Grade 11 – B',        teacher:'Mr. Balakrishnan T.', category:'Secondary'                  },
  // Advanced
  { id:'12Sc',  name:'Grade 12 – Science',  teacher:'Mrs. Chandra G.',     category:'Advanced',  markedAt:'08:08' },
  { id:'12Art', name:'Grade 12 – Arts',     teacher:'Ms. Priya S.',        category:'Advanced',  markedAt:'08:20' },
  { id:'12Com', name:'Grade 12 – Commerce', teacher:'Mr. Saman J.',        category:'Advanced'                   },
  { id:'13Sc',  name:'Grade 13 – Science',  teacher:'Mr. Balakrishnan T.', category:'Advanced',  markedAt:'08:04' },
  { id:'13Art', name:'Grade 13 – Arts',     teacher:'Mrs. Kumari P.',      category:'Advanced',  markedAt:'08:16' },
  { id:'13Com', name:'Grade 13 – Commerce', teacher:'Mr. Ruwan S.',        category:'Advanced',  markedAt:'08:25' },
];

type Filter = 'all' | 'marked' | 'pending';

const CAT_BADGE: Record<string, string> = {
  Primary:   'bg-emerald-100 text-emerald-700',
  Secondary: 'bg-sky-100 text-sky-700',
  Advanced:  'bg-violet-100 text-violet-700',
};

export default function ClassAttendanceStatus() {
  const [filter, setFilter] = useState<Filter>('all');

  const marked  = TODAY_CLASSES.filter(c => !!c.markedAt);
  const pending = TODAY_CLASSES.filter(c => !c.markedAt);
  const total   = TODAY_CLASSES.length;
  const markedPct = Math.round((marked.length / total) * 100);

  const visible =
    filter === 'marked'  ? marked  :
    filter === 'pending' ? pending :
    TODAY_CLASSES;

  const today = new Date().toLocaleDateString('en-US', {
    weekday:'long', year:'numeric', month:'long', day:'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#3E4EFA]" />
            Today's Attendance Status
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">{today}</p>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-3 min-w-[220px]">
          <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all"
              style={{ width:`${markedPct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
            {marked.length}/{total} marked
          </span>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 border-b border-gray-100">
        {[
          { key:'all'    as Filter, label:'All Classes',  count:total,          color:'text-gray-700',    active:'bg-gray-50'     },
          { key:'marked' as Filter, label:'Marked',       count:marked.length,  color:'text-emerald-600', active:'bg-emerald-50'  },
          { key:'pending'as Filter, label:'Not Marked',   count:pending.length, color:'text-red-500',     active:'bg-red-50'      },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`py-3 text-center transition-colors ${filter === tab.key ? tab.active : 'hover:bg-gray-50'}`}
          >
            <div className={`text-xl font-extrabold ${tab.color}`}>{tab.count}</div>
            <div className="text-[10px] text-gray-400 font-medium mt-0.5">{tab.label}</div>
          </button>
        ))}
      </div>

      {/* Class grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
        {visible.map(cls => {
          const done = !!cls.markedAt;
          return (
            <div
              key={cls.id}
              className={`rounded-xl border p-3 flex flex-col gap-1.5 transition-colors ${
                done
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start justify-between gap-1">
                <span className="text-xs font-bold text-gray-800 leading-tight">{cls.name}</span>
                {done
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  : <XCircle     className="w-3.5 h-3.5 text-red-400    flex-shrink-0 mt-0.5" />
                }
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full self-start ${CAT_BADGE[cls.category]}`}>
                {cls.category}
              </span>
              <div className="text-[10px] text-gray-500 truncate leading-tight">{cls.teacher}</div>
              {done
                ? <div className="text-[10px] font-semibold text-emerald-600">Marked {cls.markedAt}</div>
                : <div className="text-[10px] font-semibold text-red-400">Pending</div>
              }
            </div>
          );
        })}
      </div>

      {pending.length > 0 && (
        <div className="px-4 pb-4">
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-xs font-semibold text-red-700">{pending.length} class{pending.length>1?'es':''} yet to mark attendance:</span>
            {pending.map(c => (
              <span key={c.id} className="text-[11px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">{c.name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
