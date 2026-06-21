import Navbar from '../../../../../components/Navbar';
import Sidebar from '../../../../../components/Sidebar';
import ClientGradeHubPage from '../ClientGradeHubPage';
import ClientClassDetailPage from './ClientClassDetailPage';
import { categoryCards, classDetailsMap, type ClassCategorySlug } from '../../data';

type PageParams = {
  params: Promise<{
    category: ClassCategorySlug;
    classSlug: string;
  }>;
};

export default async function ClassDetailPage({ params }: PageParams) {
  const { category, classSlug } = await params;

  if (category === 'secondary' || category === 'primary') {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8">
            <ClientGradeHubPage gradeSlug={classSlug} category={category} />
          </main>
        </div>
      </div>
    );
  }

  const classDetails = classDetailsMap[category]?.[classSlug];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <ClientClassDetailPage
            category={category}
            classSlug={classSlug}
            classDetails={classDetails}
          />
        </main>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return categoryCards.flatMap((category) =>
    Object.keys(classDetailsMap[category.slug]).map((classSlug) => ({
      category: category.slug,
      classSlug,
    }))
  );
}
