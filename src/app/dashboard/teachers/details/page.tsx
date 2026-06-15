"use client";
import React, { useState } from "react";
import Navbar from "../../../../components/Navbar";
import Sidebar from "../../../../components/Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const mockTeachers = [
  { id: "T001", name: "Sahan Medonsa", age: 35, status: "Active" },
  { id: "T002", name: "Charindu Neshmika", age: 29, status: "Active" },
  { id: "T003", name: "Nadeesha Silva", age: 41, status: "On Leave" },
  { id: "T004", name: "Ruwan Perera", age: 38, status: "Active" },
  { id: "T005", name: "Ishara Fernando", age: 33, status: "Retired" },
  { id: "T006", name: "Ruwanthi Senanayake", age: 30, status: "Active" },
  { id: "T007", name: "Tharindu Wijesinghe", age: 36, status: "Active" },
  { id: "T008", name: "Samantha Jayasuriya", age: 28, status: "Active" },
];

export default function TeacherDetailsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Search Bar */}
          
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <button
                  onClick={() => router.back()}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mr-3 px-2 py-2 rounded transition cursor-pointer"
                  aria-label="Back"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <h1 className="text-3xl font-bold text-primary ml-2">Teacher Details</h1>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search teachers..."
                  className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition flex items-center gap-1">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">Teacher ID</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Age</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTeachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b last:border-0">
                      <td className="px-4 py-2 font-medium">{teacher.id}</td>
                      <td className="px-4 py-2">{teacher.name}</td>
                      <td className="px-4 py-2">{teacher.age}</td>
                      <td className="px-4 py-2">
                        <span className={
                          teacher.status === "Active"
                            ? "text-green-700 font-semibold"
                            : teacher.status === "On Leave"
                            ? "text-yellow-700 font-semibold"
                            : "text-gray-500 font-semibold"
                        }>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <Link href={`/dashboard/teachers/profile/${teacher.id}`}>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition text-xs cursor-pointer">Profile</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 