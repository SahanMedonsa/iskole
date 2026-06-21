import { SchoolStudentsProvider } from './SchoolStudentsContext';

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return <SchoolStudentsProvider>{children}</SchoolStudentsProvider>;
}
