"use client";

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';

const gradeTabs = Array.from({ length: 13 }, (_, i) => `Grade ${i + 1}`);
const sectionLetters = ['A', 'B', 'C'];
const getSectionsForGrade = (grade) => sectionLetters.map(letter => `${grade}-${letter}`);

// Update allSubjects
const allSubjects = ['Sinhala', 'Mathematics', 'Science', 'History', 'Geography', 'Aesthetic', 'ICT', 'Life Skills'];
// Update mock students and marks for each section
const sectionStudents = {
  'Grade 6-A': [
    { name: 'Ayesha Perera', marks: { Sinhala: 90, Mathematics: 92, Science: 88, History: 85, Geography: 87, Aesthetic: 95, ICT: 89, 'Life Skills': 93 } },
    { name: 'Kasun Silva', marks: { Sinhala: 85, Mathematics: 85, Science: 80, History: 82, Geography: 84, Aesthetic: 90, ICT: 86, 'Life Skills': 88 } },
  ],
  'Grade 6-B': [
    { name: 'Nimal Fernando', marks: { Sinhala: 88, Mathematics: 90, Science: 87, History: 89, Geography: 90, Aesthetic: 92, ICT: 91, 'Life Skills': 90 } },
    { name: 'Samantha Jayasuriya', marks: { Sinhala: 92, Mathematics: 88, Science: 85, History: 90, Geography: 91, Aesthetic: 94, ICT: 92, 'Life Skills': 95 } },
  ],
  'Grade 6-C': [
    { name: 'Dilshan Perera', marks: { Sinhala: 80, Mathematics: 80, Science: 82, History: 78, Geography: 79, Aesthetic: 85, ICT: 83, 'Life Skills': 87 } },
    { name: 'Ishara Gunasekara', marks: { Sinhala: 84, Mathematics: 84, Science: 86, History: 83, Geography: 85, Aesthetic: 88, ICT: 87, 'Life Skills': 89 } },
  ],
  // ...add more for other grades/sections as needed
};
// Mock class teacher and subject teachers
const sectionClassTeachers = {
  'Grade 6-A': 'Ms. Nadeesha Silva',
  'Grade 6-B': 'Mr. Ruwan Perera',
  'Grade 6-C': 'Ms. Ishara Fernando',
};
// Update subjectTeachers for unique names
const subjectTeachers = {
  Sinhala: 'Nadeesha Silva',
  Mathematics: 'Sahan Medonsa',
  Science: 'Charindu Neshmika',
  History: 'Ruwan Perera',
  Geography: 'Ishara Fernando',
  Aesthetic: 'Ruwanthi Senanayake',
  ICT: 'Tharindu Wijesinghe',
  'Life Skills': 'Samantha Jayasuriya',
};

// Helper to group subjects by teacher
function getTeacherSubjects(subjectTeachers, allSubjects) {
  const teacherMap = {};
  allSubjects.forEach(subj => {
    const teacher = subjectTeachers[subj];
    if (!teacherMap[teacher]) teacherMap[teacher] = [];
    teacherMap[teacher].push(subj);
  });
  return teacherMap;
}

export default function MarksPage() {
  const [selectedGrade, setSelectedGrade] = useState('Grade 6');
  const [selectedSection, setSelectedSection] = useState('');
  const sections = getSectionsForGrade(selectedGrade);
  const termOptions = ['Term 1', 'Term 2', 'Term 3'];
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const teacherSubjects = getTeacherSubjects(subjectTeachers, allSubjects);
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4 text-primary">Marks</h1>
          {/* Grade Dropdown */}
          <div className="mb-6">
            <label htmlFor="grade-select" className="block text-sm font-semibold text-gray-700 mb-2">Select Grade</label>
            <select
              id="grade-select"
              value={selectedGrade}
              onChange={e => { setSelectedGrade(e.target.value); setSelectedSection(''); }}
              className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {gradeTabs.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          {/* Section Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {sections.map(section => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`rounded-xl shadow transition border-2 flex flex-col items-center p-4 text-center cursor-pointer hover:shadow-lg ${selectedSection === section ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
              >
                <div className="text-lg font-bold text-blue-700 mb-1">{section}</div>
              </button>
            ))}
          </div>
          {selectedSection && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Section/Term Heading at the top */}
              <h2 className="text-2xl font-extrabold mb-6 text-primary">{selectedSection} - {selectedTerm} - Students & Subject Marks</h2>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <div>
                  <div className="font-bold text-blue-800 text-lg">Class Teacher: <span className="text-gray-900 font-bold">{sectionClassTeachers[selectedSection] || '-'}</span></div>
                </div>
                <div className="flex items-center gap-4">
                  <select
                    value={selectedTerm}
                    onChange={e => setSelectedTerm(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {termOptions.map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition h-fit">Download PDF</button>
                </div>
              </div>
              {/* Teacher-Subject Summary */}
              <div className="mb-4">
                <div className="font-semibold text-gray-700 mb-1">Subject Teachers:</div>
                <ul className="flex flex-wrap gap-4">
                  {allSubjects.map(subj => (
                    <li key={subj} className="bg-gray-100 rounded px-3 py-1 text-sm text-gray-800">
                      <span className="font-semibold text-blue-700">{subj}:</span> {subjectTeachers[subj]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-[400px] w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Student Name</th>
                      {allSubjects.map(subj => (
                        <th key={subj} className="px-4 py-2 text-left">{subj}</th>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-1 text-left text-xs font-normal text-gray-500">&nbsp;</th>
                      {allSubjects.map(subj => (
                        <th key={subj} className="px-4 py-1 text-left text-xs font-normal text-gray-500">{subjectTeachers[subj]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(sectionStudents[selectedSection] || []).map((student, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="px-4 py-2 font-medium">{student.name}</td>
                        {allSubjects.map(subj => (
                          <td key={subj} className="px-4 py-2">{student.marks[subj] ?? '-'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 