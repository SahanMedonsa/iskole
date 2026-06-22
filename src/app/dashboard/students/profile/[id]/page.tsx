"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "../../../../../components/Sidebar";
import Navbar from "../../../../../components/Navbar";
import { User, Award, BookOpen, Calendar, TrendingUp, Heart, Star, MapPin, Phone, Mail, Users, Clock, CheckCircle, Pencil, Trash, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const studentData = {
    personalInfo: {
      name: "Sahan Medonsa",
      id: "ST2024001",
      grade: "10A",
      avatar: "/assets/profile.jpg",
      age: 16,
      dateOfBirth: "2008-03-15",
      address: "123 Galle Road, Colombo 03",
      phone: "+94 77 123 4567",
      email: ".sahanperera@email.com",
      parentName: "Mrs. Sunitha Perera",
      parentPhone: "+94 71 987 6543"
    },
    academics: {
      gpa: 3.8,
      rank: 12,
      totalStudents: 120,
      subjects: [
        { name: "Mathematics", grade: "A", percentage: 89, color: "bg-blue-500" },
        { name: "Science", grade: "A-", percentage: 85, color: "bg-green-500" },
        { name: "English", grade: "B+", percentage: 78, color: "bg-purple-500" },
        { name: "History", grade: "A", percentage: 91, color: "bg-orange-500" },
        { name: "Geography", grade: "B", percentage: 74, color: "bg-pink-500" }
      ]
    },
    attendance: {
      overall: 99.8,
      thisMonth: 100,
      daysPresent: 186,
      totalDays: 190,
      punctuality: 98.5
    },
    activities: [
      { name: "Debate Club", role: "President", color: "bg-red-400" },
      { name: "Science Fair", role: "Winner", color: "bg-green-400" },
      { name: "Swimming Team", role: "Captain", color: "bg-blue-400" },
      { name: "Drama Society", role: "Member", color: "bg-purple-400" }
    ],
    achievements: [
      { title: "Best Academic Performance", date: "2024-06", type: "academic" },
      { title: "Perfect Attendance Award", date: "2024-05", type: "attendance" },
      { title: "Inter-school Science Competition Winner", date: "2024-04", type: "competition" },
      { title: "Student Leadership Award", date: "2024-03", type: "leadership" }
    ],
    behavior: {
      score: 95,
      disciplineRecords: 0,
      commendations: 8,
      participationLevel: "Excellent"
    },
    financial: {
      feeStatus: "Paid",
      scholarship: "Merit Scholarship - 50%",
      totalFees: 25000,
      paidAmount: 12500,
      nextDue: "2024-08-15"
    },
    login: {
      username: "sahan.medonsa",
      email: "sahanperera@email.com",
      password: "********"
    }
  };

  const gradeTabs = Array.from({ length: 13 }, (_, i) => `Grade ${i + 1}`);
  const [selectedGrade, setSelectedGrade] = useState(studentData.personalInfo.grade);

  // Mock data for subjects/marks per grade
  const gradeSubjects = {
    'Grade 1': [
      { name: 'Mathematics', mark: 92 },
      { name: 'English', mark: 88 },
      { name: 'Science', mark: 90 },
      { name: 'Art', mark: 95 },
    ],
    'Grade 2': [
      { name: 'Mathematics', mark: 89 },
      { name: 'English', mark: 85 },
      { name: 'Science', mark: 87 },
      { name: 'Art', mark: 93 },
    ],
    // ...repeat for all grades, or use the same for demo
  };
  for (let i = 3; i <= 13; i++) {
    gradeSubjects[`Grade ${i}`] = [
      { name: 'Mathematics', mark: 80 + i },
      { name: 'English', mark: 75 + i },
      { name: 'Science', mark: 78 + i },
      { name: 'History', mark: 70 + i },
      { name: 'Geography', mark: 65 + i },
    ];
  }

  // Add mock remarks for each grade
  const gradeRemarks = {
    'Grade 1': 'Excellent progress and participation in class activities.',
    'Grade 2': 'Shows improvement in reading and writing skills.',
    'Grade 3': 'Needs to focus more on homework completion.',
    'Grade 4': 'Outstanding performance in mathematics.',
    'Grade 5': 'Struggles with science concepts, needs extra help.',
    'Grade 6': 'Very creative and active in group projects.',
    'Grade 7': 'Attendance needs improvement.',
    'Grade 8': 'Consistent and reliable student.',
    'Grade 9': 'Excellent leadership in class.',
    'Grade 10': 'Preparing well for O/L exams, keep it up!',
    'Grade 11': 'Needs to participate more in class discussions.',
    'Grade 12': 'Shows great interest in extracurricular activities.',
    'Grade 13': 'Ready for A/L exams, very focused.',
  };

  // Add mock class teacher and subject teachers for each grade
  const gradeClassTeachers = {
    'Grade 1': 'Ms. Nadeesha Silva',
    'Grade 2': 'Mr. Ruwan Perera',
    'Grade 3': 'Ms. Ishara Fernando',
    'Grade 4': 'Mr. Kasun Jayasuriya',
    'Grade 5': 'Ms. Dilani Senanayake',
    'Grade 6': 'Mr. Tharindu Wijesinghe',
    'Grade 7': 'Ms. Harsha Bandara',
    'Grade 8': 'Mr. Nimal Fernando',
    'Grade 9': 'Ms. Samantha Jayasuriya',
    'Grade 10': 'Mr. Sahan Medonsa',
    'Grade 11': 'Ms. Ruwanthi Senanayake',
    'Grade 12': 'Mr. Dilshan Perera',
    'Grade 13': 'Ms. Nadeesha Herath',
  };
  const gradeSubjectTeachers = {
    'Grade 1': [
      { name: 'Mathematics', teacher: 'Ms. Nadeesha Silva' },
      { name: 'English', teacher: 'Mr. Ruwan Perera' },
      { name: 'Science', teacher: 'Ms. Ishara Fernando' },
      { name: 'Art', teacher: 'Ms. Dilani Senanayake' },
    ],
    'Grade 2': [
      { name: 'Mathematics', teacher: 'Mr. Ruwan Perera' },
      { name: 'English', teacher: 'Ms. Nadeesha Silva' },
      { name: 'Science', teacher: 'Ms. Ishara Fernando' },
      { name: 'Art', teacher: 'Ms. Dilani Senanayake' },
    ],
    // ...repeat for all grades, or use the same for demo
  };
  for (let i = 3; i <= 13; i++) {
    gradeSubjectTeachers[`Grade ${i}`] = [
      { name: 'Mathematics', teacher: 'Mr. Sahan Medonsa' },
      { name: 'English', teacher: 'Ms. Harsha Bandara' },
      { name: 'Science', teacher: 'Ms. Ishara Fernando' },
      { name: 'History', teacher: 'Mr. Kasun Jayasuriya' },
      { name: 'Geography', teacher: 'Ms. Samantha Jayasuriya' },
    ];
  }

  // Add state for form modals
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSpecialForm, setShowSpecialForm] = useState(false);
  const [editActivityIndex, setEditActivityIndex] = useState(null);
  const [editContactType, setEditContactType] = useState(null);

  // Add state for message form and history
  const [messageTitle, setMessageTitle] = useState("");
  const [messageDescription, setMessageDescription] = useState("");
  const [messageHistory, setMessageHistory] = useState([
    { sender: "Admin", title: "Welcome", description: "Welcome to the new term!", time: "2024-06-01 09:00", read: true },
    { sender: "Admin", title: "Assignment Reminder", description: "Please submit your assignment by Friday.", time: "2024-06-01 10:00", read: false },
  ]);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [showMessageForm, setShowMessageForm] = useState(false);
  // Add state for editing messages
  const [editMessageIndex, setEditMessageIndex] = useState(null);
  // Remove setShowSettings and modal logic
  // In the tab bar, when settings tab is clicked, setActiveTab('settings')
  // When activeTab === 'settings', render the settings form as a normal tab panel
  const [username, setUsername] = useState(studentData?.login?.username || "sahan.medonsa");

  function handleEditMessage(idx: number) {
    setEditMessageIndex(idx);
    setMessageTitle(messageHistory[idx].title);
    setMessageDescription(messageHistory[idx].description);
    setShowMessageForm(true);
  }

  function handleDeleteMessage(idx: number) {
    setMessageHistory(messageHistory.filter((_, i) => i !== idx));
    if (editMessageIndex === idx) {
      setShowMessageForm(false);
      setEditMessageIndex(null);
    }
  }

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (messageTitle.trim() && messageDescription.trim()) {
      if (editMessageIndex !== null) {
        // Edit existing message
        setMessageHistory(messageHistory.map((msg, i) =>
          i === editMessageIndex ? { ...msg, title: messageTitle, description: messageDescription } : msg
        ));
        setEditMessageIndex(null);
      } else {
        // Add new message
        setMessageHistory([
          ...messageHistory,
          { sender: "Admin", title: messageTitle, description: messageDescription, time: new Date().toLocaleString(), read: false },
        ]);
      }
      setMessageTitle("");
      setMessageDescription("");
      setShowMessageForm(false);
    }
  }

  // Add color options for activities
  const activityColorOptions = [
    { label: 'Red', value: 'bg-red-400' },
    { label: 'Green', value: 'bg-green-400' },
    { label: 'Blue', value: 'bg-blue-400' },
    { label: 'Purple', value: 'bg-purple-400' },
    { label: 'Pink', value: 'bg-pink-400' },
  ];

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-indigo-700">Loading Student Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-4 px-3 py-2 rounded transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
            {/* Header Section */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
              {/* Remove the gradient overlay */}
              <div className="relative p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <Image
                      src={studentData.personalInfo.avatar}
                      alt={studentData.personalInfo.name}
                      width={128} height={128}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-3 border-white flex items-center justify-center">
                      <CheckCircle size={20} />
                    </div>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h1 className="text-4xl font-bold mb-2 text-gray-900">{studentData.personalInfo.name}</h1>
                    <p className="text-xl text-gray-700 mb-1">Student ID: {studentData.personalInfo.id}</p>
                    <p className="text-lg text-gray-600">Grade {studentData.personalInfo.grade} • Age {studentData.personalInfo.age}</p>
                    <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-800">GPA: {studentData.academics.gpa}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-800">Rank: #{studentData.academics.rank}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                        <Clock className="w-5 h-5 text-green-500" />
                        <span className="text-gray-800">{studentData.attendance.overall}% Attendance</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-2xl p-4">
                      <div className="text-3xl font-bold text-gray-900">{studentData.behavior.score}</div>
                      <div className="text-sm text-gray-600">Behavior Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-lg mb-6 p-2">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'academics', label: 'Academics', icon: BookOpen },
                  { id: 'attendance', label: 'Attendance', icon: Calendar },
                  { id: 'activities', label: 'Activities', icon: Award },
                  { id: 'contact', label: 'Contact', icon: Phone },
                  { id: 'special', label: 'Special Details', icon: Star },
                  { id: 'message', label: 'Message', icon: Mail },
                  { id: 'settings', label: '', icon: Settings },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      aria-label={tab.label}
                    >
                      <Icon size={20} />
                      {tab.label && <span>{tab.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Based on Active Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stat Cards Container */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-2xl p-6 text-blue-900">
                      <div className="flex items-center justify-between mb-4">
                        <BookOpen size={40} className="text-blue-400" />
                        <div className="text-right">
                          <div className="text-3xl font-bold">{studentData.academics.gpa}</div>
                          <div className="opacity-90">Current GPA</div>
                        </div>
                      </div>
                      <div className="text-sm opacity-90">
                        Ranked #{studentData.academics.rank} out of {studentData.academics.totalStudents} students
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6 text-green-900">
                      <div className="flex items-center justify-between mb-4">
                        <Calendar size={40} className="text-green-400" />
                        <div className="text-right">
                          <div className="text-3xl font-bold">{studentData.attendance.overall}%</div>
                          <div className="opacity-90">Attendance</div>
                        </div>
                      </div>
                      <div className="text-sm opacity-90">
                        {studentData.attendance.daysPresent}/{studentData.attendance.totalDays} days present
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-6 text-purple-900">
                      <div className="flex items-center justify-between mb-4">
                        <Award size={40} className="text-purple-400" />
                        <div className="text-right">
                          <div className="text-3xl font-bold">{studentData.achievements.length}</div>
                          <div className="opacity-90">Awards</div>
                        </div>
                      </div>
                      <div className="text-sm opacity-90">This academic year</div>
                    </div>
                    <div className="bg-pink-50 rounded-2xl p-6 text-pink-900">
                      <div className="flex items-center justify-between mb-4">
                        <Heart size={40} className="text-pink-400" />
                        <div className="text-right">
                          <div className="text-3xl font-bold">{studentData.behavior.score}</div>
                          <div className="opacity-90">Behavior</div>
                        </div>
                      </div>
                      <div className="text-sm opacity-90">{studentData.behavior.participationLevel} participation</div>
                    </div>
                  </div>
                </div>
                {/* Recent Achievements */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Star className="text-yellow-500" />
                    Recent Achievements
                  </h3>
                  <div className="space-y-3">
                    {studentData.achievements.slice(0, 4).map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Award size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{achievement.title}</div>
                          <div className="text-xs text-gray-600">{achievement.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'academics' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Grade Row: show selected grade left, dropdown right */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-extrabold text-gray-700">{selectedGrade}</span>
                  <div>
                    <select
                      id="grade-select"
                      value={selectedGrade}
                      onChange={e => setSelectedGrade(e.target.value)}
                      className="border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {gradeTabs.map((grade) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Class Teacher */}
                <div className="mb-4">
                  <span className="font-semibold text-blue-700">Class Teacher: </span>
                  <span className="text-gray-800">{gradeClassTeachers[selectedGrade]}</span>
                </div>
                {/* Subjects Table for Selected Grade */}
                <div className="overflow-x-auto">
                  <table className="min-w-[400px] w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Mark</th>
                        <th className="px-4 py-2 text-left">Teacher</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradeSubjects[selectedGrade]?.map((subject: { name: string; mark: number }, idx: number) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="px-4 py-2 font-medium">{subject.name}</td>
                          <td className="px-4 py-2">{subject.mark}</td>
                          <td className="px-4 py-2">{gradeSubjectTeachers[selectedGrade]?.find((s: { name: string; teacher: string }) => s.name === subject.name)?.teacher || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Totals and Stats */}
                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="bg-blue-50 rounded-xl p-4 flex-1 min-w-[160px]">
                    <div className="text-xs text-blue-600 font-semibold">Total Marks</div>
                    <div className="text-2xl font-bold text-blue-800">{gradeSubjects[selectedGrade]?.reduce((sum: number, s: { mark: number }) => sum + s.mark, 0)}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 flex-1 min-w-[160px]">
                    <div className="text-xs text-green-600 font-semibold">Rank</div>
                    <div className="text-2xl font-bold text-green-800">{studentData.academics.rank}</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 flex-1 min-w-[160px]">
                    <div className="text-xs text-purple-600 font-semibold">Average</div>
                    <div className="text-2xl font-bold text-purple-800">{Math.round((gradeSubjects[selectedGrade]?.reduce((sum: number, s: { mark: number }) => sum + s.mark, 0) / (gradeSubjects[selectedGrade]?.length || 1)) * 10) / 10}</div>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4 flex-1 min-w-[160px]">
                    <div className="text-xs text-pink-600 font-semibold">Total Students</div>
                    <div className="text-2xl font-bold text-pink-800">{studentData.academics.totalStudents}</div>
                  </div>
                </div>
                {/* Remarks Section */}
                <div className="mt-8">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-lg font-bold text-gray-700 mb-2">Remarks</div>
                    <div className="text-base text-gray-600">{gradeRemarks[selectedGrade]}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Attendance Overview</h3>
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#10b981"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${(studentData.attendance.overall / 100) * 351.86} 351.86`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-green-600">{studentData.attendance.overall}%</span>
                      </div>
                    </div>
                    <p className="text-gray-600">Overall Attendance</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Monthly Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                      <span className="font-semibold">This Month</span>
                      <span className="text-green-600 font-bold">{studentData.attendance.thisMonth}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                      <span className="font-semibold">Days Present</span>
                      <span className="text-blue-600 font-bold">{studentData.attendance.daysPresent}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                      <span className="font-semibold">Total Days</span>
                      <span className="text-purple-600 font-bold">{studentData.attendance.totalDays}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl">
                      <span className="font-semibold">Punctuality</span>
                      <span className="text-orange-600 font-bold">{studentData.attendance.punctuality}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Attendance Badge</h3>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Star size={40} className="text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-yellow-600 mb-2">Perfect Attendance</h4>
                    <p className="text-sm text-gray-600">Awarded for maintaining {studentData.attendance.overall}% attendance rate</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Extracurricular Activities</h3>
                    <button onClick={() => { setShowActivityForm(true); setEditActivityIndex(null); }} className="bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition text-xs">Add</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {studentData.activities.map((activity, index) => (
                      <div key={index} className={`${activity.color} rounded-xl p-4 text-white relative`}>
                        <h4 className="font-bold text-lg mb-2">{activity.name}</h4>
                        <p className="opacity-90">{activity.role}</p>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button onClick={() => { setShowActivityForm(true); setEditActivityIndex(index); }} aria-label="Edit" className="bg-white/80 text-blue-700 p-1 rounded hover:bg-white">
                            <Pencil size={16} />
                          </button>
                          <button aria-label="Delete" className="bg-white/80 text-red-700 p-1 rounded hover:bg-white">
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Activity Form Modal */}
                  {showActivityForm && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
                        <button onClick={() => { setShowActivityForm(false); setEditActivityIndex(null); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
                        <h4 className="text-lg font-bold mb-4">{editActivityIndex !== null ? 'Edit Activity' : 'Add Activity'}</h4>
                        <form className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-1">Activity Name</label>
                            <input className="w-full border rounded px-3 py-2" defaultValue={editActivityIndex !== null ? studentData.activities[editActivityIndex].name : ''} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-1">Role</label>
                            <input className="w-full border rounded px-3 py-2" defaultValue={editActivityIndex !== null ? studentData.activities[editActivityIndex].role : ''} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-1">Color</label>
                            <select className="w-full border rounded px-3 py-2" defaultValue={editActivityIndex !== null ? studentData.activities[editActivityIndex].color : activityColorOptions[0].value}>
                              {activityColorOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <div className="flex gap-2 mt-2">
                              {activityColorOptions.map((opt) => (
                                <div key={opt.value} className={`w-6 h-6 rounded ${opt.value} border-2 border-white shadow`} title={opt.label}></div>
                              ))}
                            </div>
                          </div>
                          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Save</button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-6">All Achievements</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {studentData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-xl relative">
                        <Award className="text-yellow-600" size={24} />
                        <div>
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.date}</p>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button aria-label="Edit" className="bg-white/80 text-blue-700 p-1 rounded hover:bg-white">
                            <Pencil size={16} />
                          </button>
                          <button aria-label="Delete" className="bg-white/80 text-red-700 p-1 rounded hover:bg-white">
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold mb-0">Student Information</h3>
                    <button onClick={() => { setShowContactForm(true); setEditContactType('student'); }} className="bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition text-xs">Edit</button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Mail className="text-blue-500" size={24} />
                      <div>
                        <div className="font-semibold">Email</div>
                        <div className="text-gray-600">{studentData.personalInfo.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Phone className="text-green-500" size={24} />
                      <div>
                        <div className="font-semibold">Phone</div>
                        <div className="text-gray-600">{studentData.personalInfo.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <MapPin className="text-red-500" size={24} />
                      <div>
                        <div className="font-semibold">Address</div>
                        <div className="text-gray-600">{studentData.personalInfo.address}</div>
                      </div>
                    </div>
                  </div>
                  {/* Contact Form Modal */}
                  {showContactForm && editContactType === 'student' && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
                        <button onClick={() => { setShowContactForm(false); setEditContactType(null); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
                        <h4 className="text-lg font-bold mb-4">Edit Student Information</h4>
                        <form className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-1">Email</label>
                            <input className="w-full border rounded px-3 py-2" defaultValue={studentData.personalInfo.email} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-1">Phone</label>
                            <input className="w-full border rounded px-3 py-2" defaultValue={studentData.personalInfo.phone} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-1">Address</label>
                            <input className="w-full border rounded px-3 py-2" defaultValue={studentData.personalInfo.address} />
                          </div>
                          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Save</button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold mb-0">Parent/Guardian Information</h3>
                    <button onClick={() => { setShowContactForm(true); setEditContactType('parent'); }} className="bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition text-xs">Edit</button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                      <Users className="text-blue-500" size={24} />
                      <div>
                        <div className="font-semibold">Parent Name</div>
                        <div className="text-gray-600">{studentData.personalInfo.parentName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                      <Phone className="text-blue-500" size={24} />
                      <div>
                        <div className="font-semibold">Parent Phone</div>
                        <div className="text-gray-600">{studentData.personalInfo.parentPhone}</div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                      <h4 className="font-semibold text-green-700 mb-2">Financial Status</h4>
                      <div className="text-sm">
                        <p><span className="font-semibold">Status:</span> {studentData.financial.feeStatus}</p>
                        <p><span className="font-semibold">Scholarship:</span> {studentData.financial.scholarship}</p>
                        <p><span className="font-semibold">Next Due:</span> {studentData.financial.nextDue}</p>
                      </div>
                    </div>
                  </div>
                  {/* Contact Form Modal */}
                  {showContactForm && editContactType === 'parent' && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
                        <button onClick={() => { setShowContactForm(false); setEditContactType(null); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
                        <h4 className="text-lg font-bold mb-4">Edit Parent/Guardian Information</h4>
                        <form className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-1">Parent Name</label>
                            <input className="w-full border rounded px-3 py-2" defaultValue={studentData.personalInfo.parentName} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-1">Parent Phone</label>
                            <input className="w-full border rounded px-3 py-2" defaultValue={studentData.personalInfo.parentPhone} />
                          </div>
                          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Save</button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'special' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-0">
                    <Star className="text-yellow-500" />
                    Special Details
                  </h3>
                  <button onClick={() => setShowSpecialForm(true)} className="bg-blue-600 text-white px-3 py-1 rounded font-semibold hover:bg-blue-700 transition text-xs">Edit</button>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-blue-700 mb-1">Medical Notes</div>
                      <div className="text-gray-700">Allergic to peanuts. Asthma (carries inhaler).</div>
                    </div>
                    <button aria-label="Delete" className="bg-red-100 text-red-700 p-1 rounded hover:bg-red-200">
                      <Trash size={16} />
                    </button>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-green-700 mb-1">Special Education Needs</div>
                      <div className="text-gray-700">Mild dyslexia. Receives extra time for exams.</div>
                    </div>
                    <button aria-label="Delete" className="bg-red-100 text-red-700 p-1 rounded hover:bg-red-200">
                      <Trash size={16} />
                    </button>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-purple-700 mb-1">Other Notes</div>
                      <div className="text-gray-700">Prefers visual learning. Family recently relocated.</div>
                    </div>
                    <button aria-label="Delete" className="bg-red-100 text-red-700 p-1 rounded hover:bg-red-200">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
                {/* Special Details Form Modal */}
                {showSpecialForm && (
                  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
                      <button onClick={() => setShowSpecialForm(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
                      <h4 className="text-lg font-bold mb-4">Edit Special Details</h4>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold mb-1">Medical Notes</label>
                          <textarea className="w-full border rounded px-3 py-2" defaultValue="Allergic to peanuts. Asthma (carries inhaler)." />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-1">Special Education Needs</label>
                          <textarea className="w-full border rounded px-3 py-2" defaultValue="Mild dyslexia. Receives extra time for exams." />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-1">Other Notes</label>
                          <textarea className="w-full border rounded px-3 py-2" defaultValue="Prefers visual learning. Family recently relocated." />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Save</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'message' && (
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Mail className="text-blue-500" />
                  Direct Message
                </h3>
                <div className="flex items-center gap-2 mb-6">
                  <button
                    onClick={() => { setShowMessageForm(true); setEditMessageIndex(null); setMessageTitle(""); setMessageDescription(""); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
                  >
                    New Message
                  </button>
                </div>
                {/* Message List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Message Form */}
                  <div>
                    {showMessageForm && (
                      <div className="bg-white rounded-xl p-6 w-full shadow-xl relative border border-blue-100">
                        <button onClick={() => { setShowMessageForm(false); setEditMessageIndex(null); setMessageTitle(""); setMessageDescription(""); }} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">✕</button>
                        <h4 className="text-lg font-bold mb-4">{editMessageIndex !== null ? 'Edit Message' : 'Send Message'}</h4>
                        <form onSubmit={handleSendMessage} className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-1">Title</label>
                            <input
                              className="w-full border rounded px-3 py-2"
                              placeholder="Message Title"
                              value={messageTitle}
                              onChange={e => setMessageTitle(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-1">Description</label>
                            <textarea
                              className="w-full border rounded px-3 py-2 mb-2"
                              rows={3}
                              placeholder="Type your message to the student..."
                              value={messageDescription}
                              onChange={e => setMessageDescription(e.target.value)}
                            />
                          </div>
                          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">{editMessageIndex !== null ? 'Update' : 'Send'}</button>
                        </form>
                      </div>
                    )}
                  </div>
                  {/* Message List */}
                  <div className="space-y-3">
                    {messageHistory.map((msg, idx) => (
                      <div key={idx} className="flex flex-col items-end">
                        <div className="w-full flex items-center justify-between">
                          <button
                            className="flex-1 text-left bg-blue-100 text-blue-900 px-4 py-2 rounded-xl font-semibold flex justify-between items-center focus:outline-none"
                            onClick={() => setExpandedMessage(expandedMessage === idx ? null : idx)}
                            aria-expanded={expandedMessage === idx}
                          >
                            <span>{msg.title}</span>
                            <span className="flex items-center gap-2 text-xs font-normal">
                              <span className={msg.read ? 'text-green-600' : 'text-gray-400'}>{msg.read ? 'Read' : 'Unread'}</span>
                              <span className="text-gray-500">{msg.time}</span>
                              <svg className={`w-4 h-4 ml-2 transition-transform ${expandedMessage === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                            </span>
                          </button>
                          <div className="flex gap-1 ml-2">
                            <button onClick={() => handleEditMessage(idx)} aria-label="Edit" className="bg-white/80 text-blue-700 p-1 rounded hover:bg-white"><Pencil size={16} /></button>
                            <button onClick={() => handleDeleteMessage(idx)} aria-label="Delete" className="bg-white/80 text-red-700 p-1 rounded hover:bg-white"><Trash size={16} /></button>
                          </div>
                        </div>
                        {expandedMessage === idx && (
                          <div className="w-full bg-white border border-blue-100 rounded-b-xl px-4 py-3 text-gray-700 shadow">
                            {msg.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg mx-auto">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><Settings className="text-blue-500" /> Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Username</label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Gmail</label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      value={studentData?.login?.email || "sahanperera@email.com"}
                      readOnly
                    />
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition w-full">Reset Gmail</button>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Password</label>
                    <input
                      className="w-full border rounded px-3 py-2"
                      value="********"
                      readOnly
                    />
                    <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition w-full">Reset Password</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile; 