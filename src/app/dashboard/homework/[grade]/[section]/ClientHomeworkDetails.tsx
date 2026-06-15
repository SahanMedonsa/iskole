"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const mockHomework = [
  {
    id: 1,
    title: 'Math Worksheet 1',
    teacher: 'Mr. Perera',
    subject: 'Mathematics',
    date: '2024-06-01',
    details: 'Complete exercises 1-10 on page 23.'
  },
  {
    id: 2,
    title: 'English Essay',
    teacher: 'Ms. Silva',
    subject: 'English',
    date: '2024-05-28',
    details: 'Write an essay about your favorite book.'
  },
  {
    id: 3,
    title: 'Science Project',
    teacher: 'Mr. Fernando',
    subject: 'Science',
    date: '2024-05-20',
    details: 'Prepare a model of the solar system.'
  }
];

export default function ClientHomeworkDetails({ grade, section }) {
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
          Back to Grade {grade} {section}
        </button>
        <h1 className="text-2xl font-bold text-primary">Homework for Grade {grade} {section}</h1>
      </div>
      <div className="space-y-4">
        {mockHomework.map(hw => (
          <div key={hw.id} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-blue-700">{hw.title}</span>
              <span className="text-sm text-gray-500">{hw.date}</span>
            </div>
            <div className="mb-1 text-gray-700">{hw.details}</div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>Teacher: <span className="font-medium">{hw.teacher}</span></span>
              <span>Subject: <span className="font-medium">{hw.subject}</span></span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}