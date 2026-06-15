"use client";
import React, { useState } from "react";
import { 
  ArrowLeft, User, Briefcase, Book, Presentation, Shuffle, 
  ClipboardList, DollarSign, FileText, Mail, Settings,
  Phone, MapPin, Calendar, Award, GraduationCap,
  Clock, Users, Target, TrendingUp, Star, Download, Printer, CheckCircle, Upload, Eye, CalendarDays, Pencil, Trash
} from "lucide-react";
import Sidebar from "../../../../../components/Sidebar";
import { useRouter } from "next/navigation";
import Navbar from "../../../../../components/Navbar";

const mockTeacher = {
  id: "TCH-0085",
  fullName: "Mr. Nirosha Dissanayake",
  dob: "1982-06-14",
  age: 42,
  gender: "Female",
  nic: "827654321V",
  maritalStatus: "Married",
  profilePhoto: "/assets/profile.jpg", // Use a placeholder or uploaded image path
  address: "45/1, Lake Road, Kandy",
  contact: "071-2345678",
  email: "nirosha.d@email.com",
  emergencyContact: { name: "Chaminda Dissanayake", number: "077-9876543", relation: "Spouse" },
  designation: "Senior Science Teacher",
  subjects: [
    { subject: "Science", grades: [6, 9] },
    { subject: "Health Science", grades: [6, 9] },
  ],
  gradeAssigned: "Grade 6, Grade 9",
  experience: 17,
  employmentType: "Permanent",
  status: "Active",
  qualifications: [
    { degree: "B.Sc. in Biology", institute: "University of Peradeniya", year: 2005 },
    { degree: "PGDE (Science)", institute: "NIE Maharagama", year: 2006 },
    { degree: "M.Ed. (Curriculum)", institute: "Open University of Sri Lanka", year: 2012 },
  ],
  certifications: [],
  specializations: ["Science Education", "Curriculum Development"],
  joiningDate: "2008-01-15",
  school: "Central Girls' School - Kandy",
  previousSchools: [
    { name: "St. Anne’s College", period: "2006–2008", position: "Science Teacher" }
  ],
  experienceSummary: "Science teaching Grades 6-11",
  timetable: [
    { day: "Monday", periods: [" Science (Grade 6)", "Period 2: Health Science (Grade 9)", "Period 5: Science Club"] },
    { day: "Tuesday", periods: ["Period 3: Science (Grade 9)", "Period 4: Health Science (Grade 6)", "Period 6: Netball Practice"] },
    { day: "Wednesday", periods: ["Period 2: Science (Grade 6)", "Period 5: Health Science (Grade 9)"] },
    { day: "Thursday", periods: ["Period 1: Science (Grade 9)", "Period 3: Health Science (Grade 6)"] },
    { day: "Friday", periods: ["Period 2: Science (Grade 6)", "Period 4: Health Science (Grade 9)"] },
  ],
  extracurricular: [
    { activity: "Science Club", role: "Coordinator", since: "2010" },
    { activity: "Netball", role: "Coach", since: "2012" },
  ],
  achievements: [
    { title: "Recognized for excellent O/L results", year: "2022", organization: "Central Girls' School" },
    { title: "Best Science Teacher", year: "2018", organization: "Provincial Education Department" },
  ],
  transferHistory: [
    { from: "St. Anne’s College", to: "Central Girls' School - Kandy", date: "2008-01-15", reason: "Career advancement" },
  ],
  promotionHistory: [
    { title: "Senior Teacher", date: "2016-01-01", grade: "Senior" },
  ],
  transferRemarks: "Recognized for excellent O/L results in 2022.",
  leaveRecords: [
    { type: "Sick Leave", taken: 5, allocated: 20, year: "2024", requestDate: "2024-02-10", approvedBy: "Principal", status: "Accepted" },
    { type: "Annual Leave", taken: 2, allocated: 21, year: "2024", requestDate: "2024-01-15", approvedBy: "Admin", status: "Pending" },
    { type: "Medical Leave", taken: 1, allocated: 7, year: "2024", requestDate: "2024-03-05", approvedBy: "Vice Principal", status: "Accepted" },
  ],
  attendanceSummary: { present: 187, total: 189, percentage: 98.7 },
  performanceReviews: [
    { year: 2023, rating: "Excellent", score: 94, review: "Rated Excellent (2023)" },
  ],
  disciplinaryActions: [],
  adminRemarks: "Well-disciplined and committed.",
  salary: {
    bank: "BOC - 123456789",
    basic: 86000,
    allowances: 5000,
    deductions: 0,
    netSalary: 91000,
    grade: "Senior",
    increment: "Annual - 3%",
    epf: "EPF123456",
    etf: "ETF654321",
  },
  documents: [
    { name: "CV", file: "/docs/cv-nirosha-dissanayake.pdf", size: "2.1 MB", uploaded: "2024-01-10" },
    { name: "NIC Scan", file: "/docs/nic-nirosha.pdf", size: "0.7 MB", uploaded: "2024-01-10" },
    { name: "Degree Certificates", file: "/docs/degrees-nirosha.pdf", size: "2.5 MB", uploaded: "2024-01-10" },
    { name: "Appointment Letter", file: "/docs/appointment-nirosha.pdf", size: "1.0 MB", uploaded: "2008-01-15" },
  ],
};

export default function ProfessionalTeacherProfile() {
  const teacher = mockTeacher;
  const [activeTab, setActiveTab] = useState("Overview");
  const router = useRouter();
  
  const tabs = [
    { label: "Overview", icon: User },
    { label: "Personal Information", icon: User },
    { label: "Time Table", icon: Calendar },
    { label: "Teaching Portfolio", icon: Presentation },
    { label: "Attendance", icon: CalendarDays },
    { label: "Salary & HR", icon: DollarSign },
    { label: "Documents", icon: FileText },
    { label: "Settings", icon: Settings },
  ];

  const StatCard = ({ icon: Icon, value, label, sublabel, color = "blue" }) => (
    <div className={`bg-${color}-50 border border-${color}-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex justify-center mb-3">
        <Icon className={`w-8 h-8 text-${color}-600`} />
      </div>
      <div className={`text-3xl font-bold text-${color}-700 mb-1`}>{value}</div>
      <div className="font-semibold text-gray-800">{label}</div>
      {sublabel && <div className="text-xs text-gray-500 mt-1">{sublabel}</div>}
    </div>
  );

  // Add mock payment history for demonstration
  const paymentHistory = [
    { month: "2024-05", basic: 86000, allowances: 5000, deductions: "ETF, EPF", net: 91000, paid: "2024-05-30", year: "2024", slip: { uploaded: true, file: "/docs/slip-2024-05.pdf" } },
    { month: "2024-04", basic: 86000, allowances: 5000, deductions: "ETF, EPF", net: 91000, paid: "2024-04-30", year: "2024", slip: { uploaded: false, file: null } },
    { month: "2024-03", basic: 86000, allowances: 5000, deductions: "ETF, EPF", net: 91000, paid: "2024-03-30", year: "2024", slip: { uploaded: true, file: "/docs/slip-2024-03.pdf" } },
    { month: "2023-12", basic: 86000, allowances: 5000, deductions: "ETF, EPF", net: 91000, paid: "2023-12-30", year: "2023", slip: { uploaded: false, file: null } },
    { month: "2023-11", basic: 86000, allowances: 5000, deductions: "ETF, EPF", net: 91000, paid: "2023-11-30", year: "2023", slip: { uploaded: true, file: "/docs/slip-2023-11.pdf" } },
  ];
  const availableYears = Array.from(new Set(paymentHistory.map(p => p.year)));
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const filteredPayments = paymentHistory.filter(p => p.year === selectedYear);

  // Enhance leaveRecords with mock request/approval/status data
  // (If not already present, add these fields for demonstration)
  const leaveRecords = teacher.leaveRecords;

  // Calculate leave summary
  const leaveTypes = [
    { type: 'Annual Leave', allocated: 21 },
    { type: 'Sick Leave', allocated: 14 },
    { type: 'Medical Leave', allocated: 7 },
    { type: 'Half Day', allocated: 4 },
    { type: 'Study Leave', allocated: 7 },
  ];
  const leaveSummary = leaveTypes.map(lt => {
    const taken = leaveRecords.filter(l => l.type === lt.type).reduce((a, l) => a + l.taken, 0);
    return { ...lt, taken, remaining: lt.allocated - taken };
  });

  // Helper to get month name from YYYY-MM
  function getMonthName(ym) {
    const [year, month] = ym.split('-');
    return new Date(year, parseInt(month, 10) - 1).toLocaleString('default', { month: 'long' });
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mr-3 px-2 py-2 rounded transition"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
          </div>

          
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              
              <div className="px-8 pb-8 py-10">
                <div className="flex items-start gap-6 -mt-16">
                  <img 
                    src={teacher.profilePhoto} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover mt-20"
                  />
                  <div className="flex-1 mt-16">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{teacher.fullName}</h1>
                        <p className="text-lg text-gray-600 mb-3">{teacher.designation}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            ID: {teacher.id}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {teacher.status}
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                            {teacher.experience} Years Experience
                          </span>
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                            {teacher.employmentType}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-4">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Star className="w-5 h-5 text-yellow-600" />
                            <span className="text-2xl font-bold text-yellow-700">4.8</span>
                          </div>
                          <div className="text-sm text-gray-600">Performance Rating</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{teacher.school}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{teacher.contact}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {teacher.joiningDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 mr-5 ml-5">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${
                          activeTab === tab.label 
                            ? "border-blue-600 text-blue-600 bg-blue-50" 
                            : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6 m-5 ">
                {activeTab === "Overview" && (
                  <div className="space-y-8">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <StatCard 
                        icon={Clock} 
                        value={teacher.experience} 
                        label="Years Experience" 
                        sublabel={`Since ${teacher.joiningDate}`}
                        color="blue"
                      />
                      <StatCard 
                        icon={Target} 
                        value={`${teacher.attendanceSummary.percentage}%`} 
                        label="Attendance Rate" 
                        sublabel={`${teacher.attendanceSummary.present}/${teacher.attendanceSummary.total} days`}
                        color="green"
                      />
                      <StatCard 
                        icon={GraduationCap} 
                        value={teacher.qualifications.length} 
                        label="Qualifications" 
                        sublabel="Including PhD"
                        color="purple"
                      />
                      <StatCard 
                        icon={Award} 
                        value={teacher.achievements.length} 
                        label="Awards" 
                        sublabel="Recognition & Honors"
                        color="yellow"
                      />
                    </div>

                    {/* Recent Achievements & Quick Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-600" />
                          Recent Achievements
                        </h3>
                        <div className="space-y-3">
                          {teacher.achievements.slice(0, 4).map((achievement, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <div>
                                <div className="font-semibold text-gray-900">{achievement.title}</div>
                                <div className="text-sm text-gray-600">{achievement.organization} • {achievement.year}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          Current Responsibilities
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-700">Primary Grade Assignment</span>
                            <span className="font-semibold text-gray-900">{teacher.gradeAssigned}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-700">Subjects Teaching</span>
                            <span className="font-semibold text-gray-900">{teacher.subjects.length} Subjects</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-700">Extracurricular Activities</span>
                            <span className="font-semibold text-gray-900">{teacher.extracurricular.length} Activities</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-700">Department Role</span>
                            <span className="font-semibold text-gray-900">Department Head</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Personal Information" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                          <span className="font-medium text-gray-700">Full Name</span>
                          <span className="col-span-2 text-gray-900">{teacher.fullName}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                          <span className="font-medium text-gray-700">Date of Birth</span>
                          <span className="col-span-2 text-gray-900">{teacher.dob}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                          <span className="font-medium text-gray-700">Age</span>
                          <span className="col-span-2 text-gray-900">{teacher.age} years</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                          <span className="font-medium text-gray-700">Gender</span>
                          <span className="col-span-2 text-gray-900">{teacher.gender}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                          <span className="font-medium text-gray-700">NIC Number</span>
                          <span className="col-span-2 text-gray-900 font-mono">{teacher.nic}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3">
                          <span className="font-medium text-gray-700">Marital Status</span>
                          <span className="col-span-2 text-gray-900">{teacher.maritalStatus}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                          <span className="font-medium text-gray-700">Address</span>
                          <span className="col-span-2 text-gray-900">{teacher.address}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                          <span className="font-medium text-gray-700">Contact Number</span>
                          <span className="col-span-2 text-gray-900 font-mono">{teacher.contact}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                          <span className="font-medium text-gray-700">Email Address</span>
                          <span className="col-span-2 text-gray-900 font-mono">{teacher.email}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 py-3">
                          <span className="font-medium text-gray-700">Emergency Contact</span>
                          <div className="col-span-2">
                            <div className="text-gray-900">{teacher.emergencyContact.name}</div>
                            <div className="text-sm text-gray-600">{teacher.emergencyContact.relation}</div>
                            <div className="text-sm text-gray-600 font-mono">{teacher.emergencyContact.number}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Academic Qualifications */}
                    <div className="mt-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                        Academic Qualifications
                      </h3>
                      <div className="space-y-4">
                        {teacher.qualifications.map((qual, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                              <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{qual.degree}</div>
                              <div className="text-gray-600">{qual.institute}</div>
                              <div className="text-sm text-gray-500">Completed: {qual.year}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Specializations */}
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-2">Areas of Specialization</h4>
                        <div className="flex flex-wrap gap-2">
                          {teacher.specializations.map((spec, idx) => (
                            <span key={idx} className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Teaching Portfolio" && (
                  <div className="space-y-6">
                    {/* Joining Date, School, Previous Schools, Experience Summary */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Teaching Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-40">Joining Date</span>
                            <span className="text-gray-900">{teacher.joiningDate}</span>
                          </div>
                          <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-40">School/Branch Name</span>
                            <span className="text-gray-900">{teacher.school}</span>
                          </div>
                          <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700 w-40">Previous Schools</span>
                            <span className="text-gray-900">{teacher.previousSchools.map(s => `${s.name} (${s.period})`).join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-4 py-2">
                            <span className="font-medium text-gray-700 w-40">Experience Summary</span>
                            <span className="text-gray-900">{teacher.experienceSummary}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Extracurricular Involvement */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Extracurricular Involvement</h3>
                      <ul className="flex flex-wrap gap-4">
                        {teacher.extracurricular.map((item, idx) => (
                          <li key={idx} className="bg-green-50 border border-green-100 rounded-lg px-4 py-2 text-green-800 font-medium">
                            {item.activity} <span className="text-xs text-gray-500">({item.role}, since {item.since})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Comment Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Comments</h3>
                      <CommentSection />
                    </div>
                  </div>
                )}
                {activeTab === "Time Table" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8" id="print-timetable">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Weekly Timetable</h2>
                      <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        aria-label="Print Timetable"
                      >
                        <Printer className="w-5 h-5" />
                        <span className="hidden sm:inline">Print</span>
                      </button>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 overflow-x-auto">
                      <table className="min-w-[700px] w-full text-sm">
                        <thead>
                          <tr>
                            <th className="text-left font-semibold text-blue-700 pb-2 w-16">Period</th>
                            <th className="text-center font-semibold text-blue-700 pb-2">Monday</th>
                            <th className="text-center font-semibold text-blue-700 pb-2">Tuesday</th>
                            <th className="text-center font-semibold text-blue-700 pb-2">Wednesday</th>
                            <th className="text-center font-semibold text-blue-700 pb-2">Thursday</th>
                            <th className="text-center font-semibold text-blue-700 pb-2">Friday</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 8 }, (_, periodIdx) => (
                            <tr key={periodIdx} className="border-t border-blue-100">
                              <td className="py-2 font-semibold text-gray-800 text-center">{periodIdx + 1}</td>
                              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                                // Find the subject for this period and day
                                const dayData = teacher.timetable.find(t => t.day === day);
                                let subject = '';
                                if (dayData && dayData.periods[periodIdx]) {
                                  subject = dayData.periods[periodIdx].replace(/^Period \d+:\s*/, '');
                                }
                                return (
                                  <td key={day} className="py-2 text-gray-700 text-center min-w-[120px]">
                                    {subject || ''}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeTab === "Attendance" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <CalendarDays className="w-6 h-6 text-blue-600" />
                      Attendance Summary
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center shadow">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{teacher.attendanceSummary.percentage}%</div>
                        <div className="font-semibold text-gray-700">Attendance Rate</div>
                        <div className="text-xs text-gray-500 mt-1">{teacher.attendanceSummary.present}/{teacher.attendanceSummary.total} days present</div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow">
                        <div className="text-3xl font-bold text-green-600 mb-2">{leaveRecords.reduce((a, l) => a + l.taken, 0)}</div>
                        <div className="font-semibold text-gray-700">Total Leaves Taken</div>
                        <div className="text-xs text-gray-500 mt-1">{leaveRecords.map(l => `${l.type}: ${l.taken}`).join(", ")}</div>
                      </div>
                      <div className="bg-yellow-50 rounded-xl p-6 flex flex-col items-center shadow">
                        <div className="text-3xl font-bold text-yellow-600 mb-2">{teacher.attendanceSummary.total}</div>
                        <div className="font-semibold text-gray-700">Total Working Days</div>
                        <div className="text-xs text-gray-500 mt-1">Academic Year</div>
                      </div>
                    </div>
                    {/* New Leave Type Table */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">Leave Type Summary</h4>
                      <table className="min-w-[300px] w-auto text-sm border border-gray-200 rounded-lg">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Leave Type</th>
                            <th className="px-4 py-2 text-center font-semibold text-gray-700">Taken</th>
                            <th className="px-4 py-2 text-center font-semibold text-gray-700">Allocated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaveSummary.map((l, idx) => (
                            <tr key={idx} className="border-t border-gray-100">
                              <td className="px-4 py-2">{l.type}</td>
                              <td className="px-4 py-2 text-center">{l.taken}</td>
                              <td className="px-4 py-2 text-center">{l.allocated}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Leave Breakdown</h3>
                      <table className="min-w-[600px] w-auto text-sm border border-gray-200 rounded-lg">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Leave Type</th>
                            <th className="px-4 py-2 text-center font-semibold text-gray-700">Taken</th>
                            <th className="px-4 py-2 text-center font-semibold text-gray-700">Allocated</th>
                            <th className="px-4 py-2 text-center font-semibold text-gray-700">Year</th>
                            <th className="px-4 py-2 text-center font-semibold text-gray-700">Request Date</th>
                            <th className="px-4 py-2 text-center font-semibold text-gray-700">Approved By</th>
                            <th className="px-4 py-2 text-center font-semibold text-gray-700">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaveRecords.map((l, idx) => (
                            <tr key={idx} className="border-t border-gray-100">
                              <td className="px-4 py-2">{l.type}</td>
                              <td className="px-4 py-2 text-center">{l.taken}</td>
                              <td className="px-4 py-2 text-center">{l.allocated}</td>
                              <td className="px-4 py-2 text-center">{l.year}</td>
                              <td className="px-4 py-2 text-center">{l.requestDate}</td>
                              <td className="px-4 py-2 text-center">{l.approvedBy}</td>
                              <td className="px-4 py-2 text-center">
                                {l.status === 'Accepted' ? (
                                  <span className="inline-flex items-center gap-1 text-green-600 font-semibold">Accepted</span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-yellow-600 font-semibold">Pending</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {activeTab === "Salary & HR" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      Salary & HR Details (Admin Only)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700 w-48">Bank Account Details</span>
                          <span className="text-gray-900">{teacher.salary.bank}</span>
                        </div>
                        <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700 w-48">Basic Salary</span>
                          <span className="text-gray-900">LKR {teacher.salary.basic.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700 w-48">Allowances</span>
                          <span className="text-gray-900">Travel Allowance - LKR {teacher.salary.allowances.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700 w-48">Deductions</span>
                          <span className="text-gray-900">ETF, EPF</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700 w-48">EPF Number</span>
                          <span className="text-gray-900">{teacher.salary.epf}</span>
                        </div>
                        <div className="flex items-center gap-4 py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700 w-48">ETF Number</span>
                          <span className="text-gray-900">{teacher.salary.etf}</span>
                        </div>
                        <div className="flex items-center gap-4 py-2">
                          <span className="font-medium text-gray-700 w-48">Net Salary</span>
                          <span className="text-gray-900">LKR {teacher.salary.netSalary.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    {/* Past Payment Details */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Past Payment Details</h3>
                        <div>
                          <label htmlFor="year-select" className="mr-2 font-medium text-gray-700">Year:</label>
                          <select
                            id="year-select"
                            value={selectedYear}
                            onChange={e => setSelectedYear(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {availableYears.map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-[400px] w-full text-sm border border-gray-200 rounded-lg">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="px-4 py-2 text-left font-semibold text-gray-700">Month</th>
                              <th className="px-4 py-2 text-left font-semibold text-gray-700">Basic</th>
                              <th className="px-4 py-2 text-left font-semibold text-gray-700">Allowances</th>
                              <th className="px-4 py-2 text-left font-semibold text-gray-700">Deductions</th>
                              <th className="px-4 py-2 text-left font-semibold text-gray-700">Net Salary</th>
                              <th className="px-4 py-2 text-left font-semibold text-gray-700">Paid Date</th>
                              <th className="px-4 py-2 text-center font-semibold text-gray-700">Slip</th>
                              <th className="px-4 py-2 text-center font-semibold text-gray-700">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPayments.map((row, idx) => (
                              <tr key={idx}>
                                <td className="px-4 py-2">{getMonthName(row.month)}</td>
                                <td className="px-4 py-2">LKR {row.basic.toLocaleString()}</td>
                                <td className="px-4 py-2">LKR {row.allowances.toLocaleString()}</td>
                                <td className="px-4 py-2">{row.deductions}</td>
                                <td className="px-4 py-2">LKR {row.net.toLocaleString()}</td>
                                <td className="px-4 py-2">{row.paid}</td>
                                <td className="px-4 py-2 text-center">
                                  {row.slip.uploaded && row.slip.file ? (
                                    <a href={row.slip.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline"><Eye className="w-4 h-4" /> View</a>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                  <div className="mt-1">
                                    <button className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium">
                                      <Upload className="w-4 h-4" /> Upload
                                    </button>
                                  </div>
                                </td>
                                <td className="px-4 py-2 text-center">
                                  {row.slip.uploaded ? (
                                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold"><CheckCircle className="w-4 h-4" /> Uploaded</span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 text-red-500 font-semibold">Not Uploaded</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                            {filteredPayments.length === 0 && (
                              <tr><td colSpan={6} className="text-center text-gray-400 py-4">No payment records for this year.</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Documents" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents</h2>
                    <table className="min-w-[400px] w-full text-sm border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-left font-semibold text-gray-700">Document Type</th>
                          <th className="px-4 py-2 text-center font-semibold text-gray-700">Status</th>
                          <th className="px-4 py-2 text-center font-semibold text-gray-700">Preview</th>
                          <th className="px-4 py-2 text-center font-semibold text-gray-700">Upload</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "CV", uploaded: true, file: "/docs/cv-nirosha-dissanayake.pdf" },
                          { name: "NIC Scan", uploaded: true, file: "/docs/nic-nirosha.pdf" },
                          { name: "Degree Certificates", uploaded: true, file: "/docs/degrees-nirosha.pdf" },
                          { name: "Appointment Letter", uploaded: true, file: "/docs/appointment-nirosha.pdf" },
                        ].map((doc, idx) => (
                          <tr key={idx} className="border-t border-gray-100">
                            <td className="px-4 py-2 font-medium text-gray-800">{doc.name}</td>
                            <td className="px-4 py-2 text-center">
                              {doc.uploaded ? (
                                <span className="inline-flex items-center gap-1 text-green-600 font-semibold"><CheckCircle className="w-4 h-4" /> Uploaded</span>
                              ) : (
                                <span className="text-red-500 font-semibold">Not Uploaded</span>
                              )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {doc.uploaded ? (
                                <a href={doc.file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:underline"><Eye className="w-4 h-4" /> Preview</a>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <button className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs font-medium">
                                <Upload className="w-4 h-4" /> Upload
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === "Settings" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto space-y-10">
          
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                    <SettingsForm />
                    <div className="mt-10">
                      <DirectMessageSection />
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </main>
        </div>
      </div>
    
  );
} 

function CommentSection() {
  const [comments, setComments] = useState([
    { author: "Admin", title: "Outstanding!", description: "Excellent performance in 2023!", type: "good", color: "green", date: "2024-01-10" },
    { author: "Principal", title: "Leadership", description: "Great leadership in Science Club.", type: "good", color: "blue", date: "2023-12-15" },
    { author: "Supervisor", title: "Needs Improvement", description: "Should focus more on punctuality.", type: "bad", color: "red", date: "2023-11-10" },
    // Previous school comments
    { author: "St. Anne's Admin", title: "Dedicated Teacher", description: "Nirosha was a dedicated teacher at our school.", type: "good", color: "green", date: "2008-01-20" },
    { author: "St. Anne's Principal", title: "O/L Results", description: "Excellent results in O/L Science.", type: "good", color: "blue", date: "2007-12-10" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", type: "good", color: "green" });

  const handleAdd = () => {
    if (form.title.trim() && form.description.trim()) {
      setComments([
        { author: "You", ...form, date: new Date().toISOString().slice(0, 10) },
        ...comments,
      ]);
      setForm({ title: "", description: "", type: "good", color: "green" });
      setShowForm(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(v => !v)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition"
      >
        {showForm ? "Cancel" : "Add New Comment"}
      </button>
      {showForm && (
        <div className="mb-6 bg-gray-50 border border-gray-200 rounded p-4">
          <div className="mb-3">
            <label className="block font-medium mb-1">Title</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Title"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Description"
            />
          </div>
          <div className="mb-3 flex gap-4 items-center">
            <label className="font-medium">Type:</label>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            >
              <option value="good">Good</option>
              <option value="bad">Bad</option>
            </select>
            <label className="font-medium ml-4">Color:</label>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={form.color}
              onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
            >
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
              <option value="gray">Gray</option>
            </select>
          </div>
          <button
            onClick={handleAdd}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      )}
      <div className="space-y-3">
        {comments.length === 0 && <div className="text-gray-400">No comments yet.</div>}
        {comments.map((c, idx) => (
          <div
            key={idx}
            className={`border-l-4 bg-gray-50 border-${c.color}-500 border rounded p-3`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-semibold capitalize text-${c.color}-700`}>{c.title} ({c.type})</span>
              <span className="text-xs text-gray-500">{c.date}</span>
            </div>
            <div className="text-gray-800 mb-1">{c.description}</div>
            <div className="text-xs text-gray-500">By: {c.author}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 

function SettingsForm() {
  const [username, setUsername] = useState("nirosha.d");
  const [gmail, setGmail] = useState("nirosha.d@email.com");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleUpdate = (e) => {
    e.preventDefault();
    setMessage("Account updated (demo only)");
  };
  const handleReset = () => {
    setPassword("");
    setMessage("Password reset link sent (demo only)");
  };
  return (
    <form onSubmit={handleUpdate} className="space-y-6">
      <div>
        <label className="block font-medium mb-1">Username</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Gmail</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={gmail}
          onChange={e => setGmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="flex gap-4 items-center">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition">Update</button>
        <button type="button" onClick={handleReset} className="px-4 py-2 bg-yellow-500 text-white rounded font-medium hover:bg-yellow-600 transition">Reset Password</button>
      </div>
      {message && <div className="text-green-600 font-medium mt-2">{message}</div>}
    </form>
  );
} 

function DirectMessageSection() {
  const [messages, setMessages] = useState([
    { id: 1, title: "Welcome", content: "Welcome to the system!", status: "Read", date: "2024-06-01 09:00", read: true },
    { id: 2, title: "Assignment Reminder", content: "Don't forget the assignment.", status: "Unread", date: "2024-06-01 10:00", read: false },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newMsg, setNewMsg] = useState({ title: "", content: "" });
  const handleAdd = () => {
    if (newMsg.title.trim()) {
      setMessages([
        { id: Date.now(), title: newMsg.title, content: newMsg.content, status: "Unread", date: new Date().toISOString().slice(0, 16).replace("T", " "), read: false },
        ...messages,
      ]);
      setNewMsg({ title: "", content: "" });
      setShowForm(false);
    }
  };
  const handleDelete = (id) => setMessages(messages.filter(m => m.id !== id));
  const handleEdit = (id) => {
    const msg = messages.find(m => m.id === id);
    if (msg) {
      setNewMsg({ title: msg.title, content: msg.content });
      setShowForm(true);
      setMessages(messages.filter(m => m.id !== id));
    }
  };
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Mail className="w-6 h-6 text-blue-500" />
        <h3 className="text-2xl font-bold text-gray-900">Direct Message</h3>
      </div>
      <button
        className="bg-blue-600 text-white font-semibold rounded-lg px-8 py-3 mb-6 hover:bg-blue-700 transition"
        onClick={() => setShowForm(v => !v)}
      >
        New Message
      </button>
      {showForm && (
        <div className="mb-6 bg-gray-50 border border-gray-200 rounded p-4 max-w-md">
          <div className="mb-3">
            <label className="block font-medium mb-1">Title</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newMsg.title}
              onChange={e => setNewMsg(n => ({ ...n, title: e.target.value }))}
              placeholder="Title"
            />
          </div>
          <div className="mb-3">
            <label className="block font-medium mb-1">Message</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={newMsg.content}
              onChange={e => setNewMsg(n => ({ ...n, content: e.target.value }))}
              placeholder="Message"
            />
          </div>
          <button
            onClick={handleAdd}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      )}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-center justify-between bg-blue-100/40 rounded-2xl px-6 py-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-blue-900 text-lg">{msg.title}</span>
                <span className={`text-sm font-semibold ${msg.read ? 'text-green-600' : 'text-gray-400'}`}>{msg.read ? 'Read' : 'Unread'}</span>
                <span className="text-gray-400 text-xs">{msg.date}</span>
              </div>
              <div className="text-blue-900 font-medium text-base">{msg.content}</div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button onClick={() => handleEdit(msg.id)} className="text-blue-600 hover:text-blue-800"><Pencil className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(msg.id)} className="text-red-600 hover:text-red-800"><Trash className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 