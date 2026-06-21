import Navbar from '../../../../../../components/Navbar';
import Sidebar from '../../../../../../components/Sidebar';
import ClientSectionDetailPage from './ClientSectionDetailPage';
import { primarySectionDetailsMap, secondarySectionDetailsMap, type ClassCategorySlug } from '../../../data';

type PageParams = {
  params: Promise<{
    category: ClassCategorySlug;
    classSlug: string;
    sectionSlug: string;
  }>;
};

export default async function SectionDetailPage({ params }: PageParams) {
  const { category, classSlug, sectionSlug } = await params;

  const map = category === 'primary' ? primarySectionDetailsMap : secondarySectionDetailsMap;
  const sectionDetails = map[`${classSlug}/${sectionSlug}`];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <ClientSectionDetailPage
            sectionDetails={sectionDetails}
            gradeSlug={classSlug}
            sectionSlug={sectionSlug}
            category={category}
          />
        </main>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const secondary = Object.keys(secondarySectionDetailsMap).map((key) => {
    const [classSlug, sectionSlug] = key.split('/');
    return { category: 'secondary', classSlug, sectionSlug };
  });

  const primary = Object.keys(primarySectionDetailsMap).map((key) => {
    const [classSlug, sectionSlug] = key.split('/');
    return { category: 'primary', classSlug, sectionSlug };
  });

  return [...secondary, ...primary];
}
