import React from 'react';
import CompanySidebar from '../../../components/CompanySidebar';

export default function CompanyDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <CompanySidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
