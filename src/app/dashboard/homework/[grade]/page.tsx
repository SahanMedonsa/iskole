
import React from 'react';
import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import ClientGradeClasses from '././ClientGradeClasses';

export default function GradeClassesPage({ params }) {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <ClientGradeClasses grade={params.grade} />
        </main>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Array.from({ length: 13 }, (_, i) => ({ grade: `${i + 1}` }));
}