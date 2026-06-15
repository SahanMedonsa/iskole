"use client";
import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "../../../../components/Sidebar";
import Navbar from "../../../../components/Navbar";
import { useRouter } from "next/navigation";

const mockStudents = [
  {
    id: 1,
    name: "Ayesha Perera",
    dob: "2009-03-15",
    gender: "Female",
    class: "10",
    section: "A",
    status: "Active",
    rollNumber: "S1001",
    phone: "077-1234567",
    guardianName: "Sunil Perera",
    guardianRelation: "Father",
    guardianContact: "077-9876543",
    address: "Colombo, Western",
    lastAttendance: "2024-06-01",
    feeStatus: "Paid",
    admissionDate: "2015-01-10",
  },
  {
    id: 2,
    name: "Kasun Silva",
    dob: "2007-08-22",
    gender: "Male",
    class: "12",
    section: "B",
    status: "Active",
    rollNumber: "S1002",
    phone: "071-5551234",
    guardianName: "Nimal Silva",
    guardianRelation: "Father",
    guardianContact: "071-5556789",
    address: "Gampaha, Western",
    lastAttendance: "2024-05-31",
    feeStatus: "Due",
    admissionDate: "2013-05-20",
  },
  {
    id: 3,
    name: "Nimal Fernando",
    dob: "2010-11-10",
    gender: "Male",
    class: "8",
    section: "C",
    status: "Inactive",
    rollNumber: "S1003",
    phone: "072-3334444",
    guardianName: "Rohana Fernando",
    guardianRelation: "Father",
    guardianContact: "072-3335555",
    address: "Kandy, Central",
    lastAttendance: "2024-05-28",
    feeStatus: "Overdue",
    admissionDate: "2016-09-15",
  },
  // ...add more students as needed
];

function calculateAge(dob) {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default function StudentsDetailPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const router = useRouter();

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.class.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || student.status === statusFilter;
    const matchesClass = !classFilter || student.class === classFilter;
    return matchesSearch && matchesStatus && matchesClass;
  });

  const uniqueClasses = Array.from(new Set(mockStudents.map((s) => s.class)));

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <div className="rounded-l-2xl overflow-hidden">
          <Sidebar />
        </div>
        <main className="flex-1 flex flex-col p-8 overflow-y-auto">
          <div className="max-w-8xl mx-auto w-full flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mr-3 px-2 py-2 rounded transition"
              aria-label="Back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-primary">Students Detail</h1>
          </div>
          {/* Search & Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or class..."
              className="border border-gray-300 rounded px-3 py-2 w-64"
            />
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Classes</option>
              {uniqueClasses.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {/* Students Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-1 text-left">SID</th>
                  <th className="px-4 py-1 text-left">Student Name</th>
                  <th className="px-4 py-1 text-left">Age</th>
                  <th className="px-4 py-1 text-left">Gender</th>
                  <th className="px-4 py-1 text-left">Class</th>
                  <th className="px-4 py-1 text-left">Section</th>
                  <th className="px-4 py-1 text-left">Status</th>
                  <th className="px-4 py-1 text-left">Phone Number</th>
                  <th className="px-4 py-1 text-left">Address</th>
                  <th className="px-4 py-1 text-left">Last Attendance</th>
                  <th className="px-4 py-1 text-left">Fee Status</th>
                  <th className="px-4 py-1 text-left">Admission Date</th>
                  <th className="px-4 py-1 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center py-4 text-gray-500">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b last:border-0">
                      <td className="px-4 py-3">{student.rollNumber}</td>
                      <td className="px-4 py-3 font-medium">{student.name}</td>
                      <td className="px-4 py-3">{calculateAge(student.dob)}</td>
                      <td className="px-4 py-3">{student.gender}</td>
                      <td className="px-4 py-3">{student.class}</td>
                      <td className="px-4 py-3">{student.section || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={
                          student.status === "Active"
                            ? "text-green-700 font-semibold"
                            : student.status === "Inactive"
                            ? "text-red-700 font-semibold"
                            : "text-yellow-700 font-semibold"
                        }>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{student.guardianContact || student.phone}</td>
                      <td className="px-4 py-3">{student.address}</td>
                      <td className="px-4 py-3">{student.lastAttendance}</td>
                      <td className="px-4 py-3">
                        <span className={
                          student.feeStatus === "Paid"
                            ? "bg-green-100 text-green-800 px-2 py-1 rounded"
                            : student.feeStatus === "Due"
                            ? "bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                            : "bg-red-100 text-red-800 px-2 py-1 rounded"
                        }>
                          {student.feeStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">{student.admissionDate}</td>
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/students/profile/${student.id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition text-xs">Profile</button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
} 