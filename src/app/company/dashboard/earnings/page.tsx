'use client';

import { DollarSign } from 'lucide-react';

export default function CompanyEarningsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <h1 className="text-xl font-extrabold text-gray-900">Earnings</h1>
        <p className="text-xs text-gray-400 mt-0.5">Revenue and billing across all schools</p>
      </div>
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-gray-400">
        <DollarSign className="w-12 h-12 opacity-30" />
        <p className="text-sm font-medium">Earnings page — coming soon</p>
      </div>
    </div>
  );
}
