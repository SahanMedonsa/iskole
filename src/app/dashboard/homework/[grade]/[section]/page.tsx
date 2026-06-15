import Navbar from '../../../../../components/Navbar';
import Sidebar from '../../../../../components/Sidebar';
import ClientHomeworkDetails from '././ClientHomeworkDetails';

export default function HomeworkDetailsPage({ params }) {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <ClientHomeworkDetails grade={params.grade} section={params.section} />
        </main>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const grades = Array.from({ length: 13 }, (_, i) => `${i + 1}`);
  const sections = ['A', 'B', 'C'];
  return grades.flatMap(grade => sections.map(section => ({ grade, section })));
}