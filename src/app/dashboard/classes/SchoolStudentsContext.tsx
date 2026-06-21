'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type SchoolStudent = {
  id: string;
  name: string;
  photo: string;
  currentGrade: string;
};

export type SectionStudent = {
  id: string;
  name: string;
  photo: string;
  rollNo: string;
  attendance: string;
  remark: string;
};

type ContextValue = {
  allStudents: SchoolStudent[];
  getSectionStudents: (sectionKey: string) => SectionStudent[];
  addStudentToSection: (sectionKey: string, student: SchoolStudent) => void;
  isStudentInSection: (sectionKey: string, studentId: string) => boolean;
};

const SchoolStudentsContext = createContext<ContextValue | null>(null);

export const ALL_SCHOOL_STUDENTS: SchoolStudent[] = [
  { id: 'stu-001', name: 'Kavinda Jayawardena', photo: 'https://i.pravatar.cc/150?img=11', currentGrade: 'Grade 6' },
  { id: 'stu-002', name: 'Nimal Rajapaksa', photo: 'https://i.pravatar.cc/150?img=12', currentGrade: 'Grade 7' },
  { id: 'stu-003', name: 'Dilani Fernando', photo: 'https://i.pravatar.cc/150?img=44', currentGrade: 'Grade 6' },
  { id: 'stu-004', name: 'Sachini Wickramasinghe', photo: 'https://i.pravatar.cc/150?img=45', currentGrade: 'Grade 8' },
  { id: 'stu-005', name: 'Thilina Bandara', photo: 'https://i.pravatar.cc/150?img=13', currentGrade: 'Grade 9' },
  { id: 'stu-006', name: 'Malini Senanayake', photo: 'https://i.pravatar.cc/150?img=46', currentGrade: 'Grade 7' },
  { id: 'stu-007', name: 'Ruwan Kumara', photo: 'https://i.pravatar.cc/150?img=14', currentGrade: 'Grade 10' },
  { id: 'stu-008', name: 'Thisara Dissanayake', photo: 'https://i.pravatar.cc/150?img=15', currentGrade: 'Grade 6' },
  { id: 'stu-009', name: 'Isuru Perera', photo: 'https://i.pravatar.cc/150?img=16', currentGrade: 'Grade 11' },
  { id: 'stu-010', name: 'Nadeesha Gunasekara', photo: 'https://i.pravatar.cc/150?img=47', currentGrade: 'Grade 8' },
  { id: 'stu-011', name: 'Chamara Silva', photo: 'https://i.pravatar.cc/150?img=17', currentGrade: 'Grade 9' },
  { id: 'stu-012', name: 'Kumari Pathirana', photo: 'https://i.pravatar.cc/150?img=48', currentGrade: 'Grade 6' },
  { id: 'stu-013', name: 'Dilan Mendis', photo: 'https://i.pravatar.cc/150?img=18', currentGrade: 'Grade 7' },
  { id: 'stu-014', name: 'Priyanka Munasinghe', photo: 'https://i.pravatar.cc/150?img=49', currentGrade: 'Grade 10' },
  { id: 'stu-015', name: 'Kasun Amarasinghe', photo: 'https://i.pravatar.cc/150?img=19', currentGrade: 'Grade 8' },
  { id: 'stu-016', name: 'Sithara Jayasuriya', photo: 'https://i.pravatar.cc/150?img=50', currentGrade: 'Grade 6' },
  { id: 'stu-017', name: 'Ravindu Tennakoon', photo: 'https://i.pravatar.cc/150?img=20', currentGrade: 'Grade 9' },
  { id: 'stu-018', name: 'Imalka Ranasinghe', photo: 'https://i.pravatar.cc/150?img=51', currentGrade: 'Grade 11' },
  { id: 'stu-019', name: 'Asanka Samaraweera', photo: 'https://i.pravatar.cc/150?img=21', currentGrade: 'Grade 7' },
  { id: 'stu-020', name: 'Chandrani Pieris', photo: 'https://i.pravatar.cc/150?img=52', currentGrade: 'Grade 8' },
  { id: 'stu-021', name: 'Lahiru Fonseka', photo: 'https://i.pravatar.cc/150?img=22', currentGrade: 'Grade 6' },
  { id: 'stu-022', name: 'Nadeeka Weerasinghe', photo: 'https://i.pravatar.cc/150?img=53', currentGrade: 'Grade 10' },
  { id: 'stu-023', name: 'Harsha Gunatilleke', photo: 'https://i.pravatar.cc/150?img=23', currentGrade: 'Grade 9' },
  { id: 'stu-024', name: 'Sumedha Alwis', photo: 'https://i.pravatar.cc/150?img=54', currentGrade: 'Grade 7' },
  { id: 'stu-025', name: 'Tharanga Siriwardena', photo: 'https://i.pravatar.cc/150?img=24', currentGrade: 'Grade 11' },
  { id: 'stu-026', name: 'Buddhika Rathnayake', photo: 'https://i.pravatar.cc/150?img=25', currentGrade: 'Grade 6' },
  { id: 'stu-027', name: 'Sanduni Karunaratne', photo: 'https://i.pravatar.cc/150?img=55', currentGrade: 'Grade 8' },
  { id: 'stu-028', name: 'Prabath Wijesuriya', photo: 'https://i.pravatar.cc/150?img=26', currentGrade: 'Grade 9' },
  { id: 'stu-029', name: 'Himasha Abeywickrama', photo: 'https://i.pravatar.cc/150?img=56', currentGrade: 'Grade 10' },
  { id: 'stu-030', name: 'Gayan Madusanka', photo: 'https://i.pravatar.cc/150?img=27', currentGrade: 'Grade 7' },
];

export function SchoolStudentsProvider({ children }: { children: React.ReactNode }) {
  const [sectionStudents, setSectionStudents] = useState<Record<string, SectionStudent[]>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('iskole_section_students');
      if (stored) setSectionStudents(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const getSectionStudents = useCallback(
    (sectionKey: string): SectionStudent[] => sectionStudents[sectionKey] ?? [],
    [sectionStudents]
  );

  const isStudentInSection = useCallback(
    (sectionKey: string, studentId: string): boolean =>
      (sectionStudents[sectionKey] ?? []).some((s) => s.id === studentId),
    [sectionStudents]
  );

  const addStudentToSection = useCallback(
    (sectionKey: string, student: SchoolStudent) => {
      setSectionStudents((prev) => {
        const existing = prev[sectionKey] ?? [];
        if (existing.some((s) => s.id === student.id)) return prev;
        const rollNo = String(existing.length + 1).padStart(2, '0');
        const next: Record<string, SectionStudent[]> = {
          ...prev,
          [sectionKey]: [
            ...existing,
            {
              id: student.id,
              name: student.name,
              photo: student.photo,
              rollNo,
              attendance: '0%',
              remark: 'New student',
            },
          ],
        };
        try {
          localStorage.setItem('iskole_section_students', JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  return (
    <SchoolStudentsContext.Provider
      value={{ allStudents: ALL_SCHOOL_STUDENTS, getSectionStudents, addStudentToSection, isStudentInSection }}
    >
      {children}
    </SchoolStudentsContext.Provider>
  );
}

export function useSchoolStudents() {
  const ctx = useContext(SchoolStudentsContext);
  if (!ctx) throw new Error('useSchoolStudents must be used within SchoolStudentsProvider');
  return ctx;
}
