import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import { categoryCards } from './data';

export default function ClassesPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Classes</h1>
            <p className="text-gray-600 max-w-2xl">
              Open a class category to manage homework, marks, and student profiles in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryCards.map((card) => (
              <Link key={card.slug} href={`/dashboard/classes/${card.slug}`} className="block group">
                <div className={`h-full rounded-2xl p-6 shadow-lg text-white bg-gradient-to-br ${card.accent} transition-transform group-hover:-translate-y-1`}>
                  <div className="text-sm uppercase tracking-[0.2em] text-white/80 mb-2">Class Category</div>
                  <h2 className="text-2xl font-bold mb-2">{card.label}</h2>
                  <p className="text-white/90 mb-4">{card.description}</p>
                  <div className="text-sm font-semibold bg-white/15 rounded-full inline-flex px-3 py-1">{card.range}</div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
