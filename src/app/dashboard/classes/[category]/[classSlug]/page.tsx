import Navbar from '../../../../../components/Navbar';
import Sidebar from '../../../../../components/Sidebar';
import ClientGradeHubPage from '../ClientGradeHubPage';
import ClientClassDetailPage from './ClientClassDetailPage';
import { categoryCards, classDetailsMap, type ClassCategorySlug } from '../../data';

type PageParams = {
  params: {
    category: ClassCategorySlug;
    classSlug: string;
  };
};

export default function ClassDetailPage({ params }: PageParams) {
  if (params.category === 'secondary') {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8">
            <ClientGradeHubPage gradeSlug={params.classSlug} />
          </main>
        </div>
      </div>
    );
  }

  const classDetails = classDetailsMap[params.category]?.[params.classSlug];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <ClientClassDetailPage
            category={params.category}
            classSlug={params.classSlug}
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
