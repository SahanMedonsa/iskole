import Navbar from '../../../../../../components/Navbar';
import Sidebar from '../../../../../../components/Sidebar';
import ClientSectionDetailPage from './ClientSectionDetailPage';
import { secondarySectionDetailsMap } from '../../../data';

type PageParams = {
  params: {
    category: string;
    classSlug: string;
    sectionSlug: string;
  };
};

export default function SectionDetailPage({ params }: PageParams) {
  const sectionDetails = secondarySectionDetailsMap[`${params.classSlug}/${params.sectionSlug}`];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <ClientSectionDetailPage sectionDetails={sectionDetails} gradeSlug={params.classSlug} />
        </main>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(secondarySectionDetailsMap).map((key) => {
    const [classSlug, sectionSlug] = key.split('/');
    return {
      category: 'secondary',
      classSlug,
      sectionSlug,
    };
  });
}
