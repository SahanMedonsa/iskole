'use client';

import React, { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import Card from '../../../components/Card';
import StudentRegistrationForm from './StudentRegistrationForm';
import TeacherRegistrationForm from './TeacherRegistrationForm';
import PrincipalRegistrationForm from './PrincipalRegistrationForm';
import StaffRegistrationForm from './StaffRegistrationForm';

export default function RegisterPage() {
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showPrincipalForm, setShowPrincipalForm] = useState(false);
  const [showStaffForm, setShowStaffForm] = useState(false);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-primary">Registration Portal</h1>
          <p className="text-muted-foreground mb-8">Select the type of registration you want to perform</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Student Registration Card */}
            <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-l-blue-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Student Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register new students with comprehensive details</p>
                
                <div className="text-left space-y-2 text-xs text-gray-600">
                  <div className="font-medium text-gray-700 mb-2">Information Collected:</div>
                  <div>• Personal & Academic Details</div>
                  <div>• Guardian Information</div>
                  <div>• Health & Transportation</div>
                  <div>• Previous School Records</div>
                </div>
                
                <button 
                  onClick={() => setShowStudentForm(true)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register Student
                </button>
              </div>
            </Card>

            {/* Teacher Registration Card */}
            <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-l-green-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Teacher Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register teaching staff with professional credentials</p>
                
                <div className="text-left space-y-2 text-xs text-gray-600">
                  <div className="font-medium text-gray-700 mb-2">Information Collected:</div>
                  <div>• Personal & Professional Details</div>
                  <div>• Teaching Subjects & Grades</div>
                  <div>• Qualifications & Experience</div>
                  <div>• Employment History</div>
                </div>
                
                <button 
                  onClick={() => setShowTeacherForm(true)}
                  className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Register Teacher
                </button>
              </div>
            </Card>

            {/* Principal Registration Card */}
            <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-l-purple-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Principal Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register school leadership with administrative details</p>
                
                <div className="text-left space-y-2 text-xs text-gray-600">
                  <div className="font-medium text-gray-700 mb-2">Information Collected:</div>
                  <div>• Leadership Credentials</div>
                  <div>• Educational Qualifications</div>
                  <div>• Administrative Experience</div>
                  <div>• Vision & Performance Records</div>
                </div>
                
                <button 
                  onClick={() => setShowPrincipalForm(true)}
                  className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Register Principal
                </button>
              </div>
            </Card>

            {/* Staff Registration Card */}
            <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 border-l-orange-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Staff Registration</h3>
                <p className="text-sm text-gray-600 mb-4">Register non-teaching staff and support personnel</p>
                
                <div className="text-left space-y-2 text-xs text-gray-600">
                  <div className="font-medium text-gray-700 mb-2">Information Collected:</div>
                  <div>• Personal & Job Details</div>
                  <div>• Department & Designation</div>
                  <div>• Working Hours & Status</div>
                  <div>• Performance & Duties</div>
                </div>
                
                <button 
                  onClick={() => setShowStaffForm(true)}
                  className="mt-4 w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Register Staff
                </button>
              </div>
            </Card>
          </div>

          {/* Additional Information Section */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Registration Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-semibold text-blue-600 mb-2">🧒 Students</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Basic Information & Guardian Details</li>
                    <li>• Academic Records & Previous School</li>
                    <li>• Health Issues & Transportation</li>
                    <li>• Medium of Study & Subject Stream</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-green-600 mb-2">👨‍🏫 Teachers</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Personal & Professional Information</li>
                    <li>• Teaching Subjects & Grade Assignments</li>
                    <li>• Qualifications & Years of Experience</li>
                    <li>• Employment Type & Transfer History</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-600 mb-2">👔 Principals</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Leadership Credentials & Qualifications</li>
                    <li>• Administrative Experience & Achievements</li>
                    <li>• Appointment History & Vision Statement</li>
                    <li>• Performance Reviews & Attendance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-orange-600 mb-2">👤 Staff</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Personal Information & Job Details</li>
                    <li>• Department & Designation</li>
                    <li>• Working Hours & Employment Status</li>
                    <li>• Duty Summary & Performance Remarks</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Registration Forms */}
          {showStudentForm && (
            <StudentRegistrationForm onClose={() => setShowStudentForm(false)} />
          )}
          
          {showTeacherForm && (
            <TeacherRegistrationForm onClose={() => setShowTeacherForm(false)} />
          )}
          
          {showPrincipalForm && (
            <PrincipalRegistrationForm onClose={() => setShowPrincipalForm(false)} />
          )}
          
          {showStaffForm && (
            <StaffRegistrationForm onClose={() => setShowStaffForm(false)} />
          )}
        </main>
      </div>
    </div>
  );
} 