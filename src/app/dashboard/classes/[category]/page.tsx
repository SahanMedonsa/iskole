import Navbar from '../../../../components/Navbar';
import Sidebar from '../../../../components/Sidebar';
import ClientClassCategoryPage from './ClientClassCategoryPage';
import ClientSecondaryCategoryPage from './ClientSecondaryCategoryPage';
import { categoryCards, type ClassCategorySlug } from '../data';

type PageParams = {
  params: Promise<{
    category: ClassCategorySlug;
  }>;
};

export default async function ClassCategoryPage({ params }: PageParams) {
  const { category } = await params;

  if (category === 'secondary') {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8">
            <ClientSecondaryCategoryPage />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <ClientClassCategoryPage category={category} />
        </main>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return categoryCards.map((card) => ({ category: card.slug }));
}
