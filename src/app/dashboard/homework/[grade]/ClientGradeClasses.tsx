"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const mockSections = ['A', 'B', 'C'];

export default function ClientGradeClasses({ grade }) {
  const router = useRouter();
  return (
    <>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold px-2 py-2 rounded transition cursor-pointer mb-2"
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Homework
        </button>
        <h1 className="text-2xl font-bold text-primary">Grade {grade} - Classes</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mockSections.map(section => (
          <Link key={section} href={`/dashboard/homework/${grade}/${section}`} className="block">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center hover:bg-blue-50 transition cursor-pointer">
              <span className="text-xl font-bold text-blue-700">Class {grade} {section}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}