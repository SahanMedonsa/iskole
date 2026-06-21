import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import { categoryCards, classGroupsByCategory } from './data';

const categoryIcons: Record<string, string> = {
  primary: '🌱',
  secondary: '📚',
  advanced: '🎓',
};

const categoryStats: Record<string, { label: string; value: string }[]> = {
  primary: [
    { label: 'Grades', value: '1 – 5' },
    { label: 'Classes', value: `${classGroupsByCategory.primary.length}` },
    { label: 'Students', value: `${classGroupsByCategory.primary.reduce((s, g) => s + g.studentCount, 0)}` },
  ],
  secondary: [
    { label: 'Grades', value: '6 – 11' },
    { label: 'Classes', value: `${classGroupsByCategory.secondary.length}` },
    { label: 'Students', value: `${classGroupsByCategory.secondary.reduce((s, g) => s + g.studentCount, 0)}` },
  ],
  advanced: [
    { label: 'Streams', value: '4' },
    { label: 'Classes', value: `${classGroupsByCategory.advanced.length}` },
    { label: 'Students', value: `${classGroupsByCategory.advanced.reduce((s, g) => s + g.studentCount, 0)}` },
  ],
};

export default function ClassesPage() {
  const totalStudents = Object.values(classGroupsByCategory).flat().reduce((s, g) => s + g.studentCount, 0);
  const totalClasses = Object.values(classGroupsByCategory).flat().length;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-sky-600 via-sky-500 to-cyan-500 px-8 pt-10 pb-10 text-white">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-extrabold mb-6 tracking-tight">Classes</h1>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                  <div className="text-3xl font-extrabold">{totalStudents.toLocaleString()}</div>
                  <div className="text-sm text-white/70 mt-0.5">Total Students</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                  <div className="text-3xl font-extrabold">{totalClasses}</div>
                  <div className="text-sm text-white/70 mt-0.5">Class Groups</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                  <div className="text-3xl font-extrabold">3</div>
                  <div className="text-sm text-white/70 mt-0.5">Categories</div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mx-8" />

          {/* Category Cards */}
          <div className="px-8 pt-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryCards.map((card) => {
                const stats = categoryStats[card.slug];
                const icon = categoryIcons[card.slug];
                return (
                  <Link key={card.slug} href={`/dashboard/classes/${card.slug}`} className="block group">
                    <div className={`h-full rounded-3xl shadow-xl overflow-hidden bg-gradient-to-br ${card.accent} text-white transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                      <div className="p-6 pb-4">
                        <div className="text-4xl mb-4">{icon}</div>
                        <div className="text-xs uppercase tracking-[0.25em] text-white/60 mb-1">Class Category</div>
                        <h2 className="text-2xl font-extrabold mb-2">{card.label}</h2>
                        <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-semibold mb-3">
                          {card.range}
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed">{card.description}</p>
                      </div>
                      <div className="border-t border-white/20 grid grid-cols-3 divide-x divide-white/20">
                        {stats.map((stat) => (
                          <div key={stat.label} className="px-4 py-3 text-center">
                            <div className="text-lg font-extrabold">{stat.value}</div>
                            <div className="text-[11px] text-white/60 uppercase tracking-wide">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="px-6 pb-5 pt-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white transition">
                          <span>Open category</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
