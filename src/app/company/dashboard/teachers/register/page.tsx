'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, User, MapPin, Briefcase, GraduationCap,
  History, Heart, Upload, Shield, Save,
} from 'lucide-react';

const SECTIONS = [
  { id: 'personal',     label: 'Personal Information',    icon: User          },
  { id: 'contact',      label: 'Contact & Address',       icon: MapPin        },
  { id: 'professional', label: 'Professional Details',    icon: Briefcase     },
  { id: 'academic',     label: 'Qualifications',          icon: GraduationCap },
  { id: 'previous',     label: 'Previous Employment',     icon: History       },
  { id: 'health',       label: 'Health Information',      icon: Heart         },
  { id: 'documents',    label: 'Documents',               icon: Upload        },
  { id: 'account',      label: 'System / Account',        icon: Shield        },
];

function Field({ label, required, children, span }: { label: string; required?: boolean; children: React.ReactNode; span?: boolean }) {
  return (
    <div className={span ? 'sm:col-span-2' : ''}>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#3E4EFA] focus:ring-1 focus:ring-[#3E4EFA]/20 bg-white transition-all';
const selectCls = 'w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#3E4EFA] focus:ring-1 focus:ring-[#3E4EFA]/20 bg-white transition-all';

function SectionCard({ id, num, title, children }: { id: string; num: number; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-24">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-7 h-7 rounded-lg bg-[#3E4EFA]/10 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-[#3E4EFA]">{num}</span>
        </div>
        <h2 className="font-bold text-gray-900">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}

function FileField({ label, hint }: { label: string; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <label className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-gray-200 rounded-xl p-4 cursor-pointer hover:border-[#3E4EFA]/50 hover:bg-[#3E4EFA]/5 transition-all">
        <Upload className="w-4 h-4 text-gray-400" />
        <span className="text-xs text-gray-500 font-medium">Click to upload</span>
        {hint && <span className="text-[10px] text-gray-400">{hint}</span>}
        <input type="file" className="hidden" />
      </label>
    </div>
  );
}

export default function TeacherRegisterPage() {
  const [activeSection, setActiveSection] = useState('personal');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/company/dashboard/teachers" className="text-gray-400 hover:text-gray-700 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Register Teacher</h1>
            <p className="text-xs text-gray-400 mt-0.5">Complete all sections to register a new teacher</p>
          </div>
        </div>
        <button className="px-5 py-2.5 bg-[#3E4EFA] text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#2E3ED9] transition-colors shadow-sm">
          <Save className="w-4 h-4" /> Save Teacher
        </button>
      </div>

      <div className="flex max-w-[1200px] mx-auto px-8 py-8 gap-6 items-start">

        {/* Sidebar */}
        <div className="w-56 flex-shrink-0 sticky top-24">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
            {SECTIONS.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                    activeSection === s.id
                      ? 'bg-[#3E4EFA]/10 text-[#3E4EFA] font-semibold'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="leading-tight text-xs">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form sections */}
        <div className="flex-1 space-y-5 min-w-0">

          {/* 1. Personal Information */}
          <SectionCard id="personal" num={1} title="Personal Information">
            <Field label="Full Name (as per NIC)" required>
              <input className={inputCls} placeholder="e.g. Kumari Devi Perera" />
            </Field>
            <Field label="NIC Number" required>
              <input className={inputCls} placeholder="e.g. 198556204520V" />
            </Field>
            <Field label="Date of Birth" required>
              <input type="date" className={inputCls} />
            </Field>
            <Field label="Gender" required>
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </Field>
            <Field label="Religion">
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select religion</option>
                <option>Buddhism</option>
                <option>Hinduism</option>
                <option>Islam</option>
                <option>Christianity</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Ethnicity">
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select ethnicity</option>
                <option>Sinhalese</option>
                <option>Sri Lanka Tamil</option>
                <option>Indian Tamil</option>
                <option>Sri Lanka Moor</option>
                <option>Burgher</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Nationality">
              <input className={inputCls} defaultValue="Sri Lankan" />
            </Field>
            <Field label="Marital Status">
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select status</option>
                <option>Single</option>
                <option>Married</option>
                <option>Divorced</option>
                <option>Widowed</option>
              </select>
            </Field>
            <Field label="Profile Photo" span>
              <FileField label="" hint="JPG or PNG · max 2 MB" />
            </Field>
          </SectionCard>

          {/* 2. Contact & Address */}
          <SectionCard id="contact" num={2} title="Contact & Address">
            <Field label="Permanent Address" required span>
              <textarea className={`${inputCls} resize-none`} rows={2} placeholder="No., Street, City, Postal Code" />
            </Field>
            <Field label="Current / Residential Address (if different)" span>
              <textarea className={`${inputCls} resize-none`} rows={2} placeholder="Leave blank if same as permanent address" />
            </Field>
            <Field label="Mobile Number" required>
              <input type="tel" className={inputCls} placeholder="+94 7X XXX XXXX" />
            </Field>
            <Field label="Email Address">
              <input type="email" className={inputCls} placeholder="teacher@school.edu.lk" />
            </Field>
            <Field label="Emergency Contact Name" required>
              <input className={inputCls} placeholder="Full name" />
            </Field>
            <Field label="Emergency Contact Number" required>
              <input type="tel" className={inputCls} placeholder="+94 7X XXX XXXX" />
            </Field>
          </SectionCard>

          {/* 3. Professional / Employment Details */}
          <SectionCard id="professional" num={3} title="Professional / Employment Details">
            <Field label="Teacher Service Number" required>
              <input className={inputCls} placeholder="e.g. MOE-T-2010-045678" />
            </Field>
            <Field label="Date of First Appointment" required>
              <input type="date" className={inputCls} />
            </Field>
            <Field label="Date of Appointment to Current School">
              <input type="date" className={inputCls} />
            </Field>
            <Field label="Employment Type" required>
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select type</option>
                <option>Permanent</option>
                <option>Temporary</option>
                <option>Visiting</option>
                <option>Graduate Trainee</option>
              </select>
            </Field>
            <Field label="Service Category">
              <input className={inputCls} placeholder="e.g. SLTS Grade II" />
            </Field>
            <Field label="Salary Grade / Step">
              <input className={inputCls} placeholder="e.g. MN-1, Step 3" />
            </Field>
            <Field label="Subject(s) Taught" required span>
              <input className={inputCls} placeholder="e.g. Mathematics, Combined Mathematics" />
            </Field>
            <Field label="Grade Levels Taught">
              <input className={inputCls} placeholder="e.g. Grades 6–11" />
            </Field>
            <Field label="Medium of Instruction">
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select medium</option>
                <option>Sinhala</option>
                <option>Tamil</option>
                <option>English</option>
              </select>
            </Field>
            <Field label="Class Teacher Assignment">
              <input className={inputCls} placeholder="e.g. Grade 9B" />
            </Field>
            <Field label="Additional Roles" span>
              <input className={inputCls} placeholder="e.g. Head of Department, Sports Master, Prefect Master" />
            </Field>
          </SectionCard>

          {/* 4. Academic & Professional Qualifications */}
          <SectionCard id="academic" num={4} title="Academic & Professional Qualifications">
            <Field label="Highest Educational Qualification">
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select qualification</option>
                <option>G.C.E. O/L</option>
                <option>G.C.E. A/L</option>
                <option>Diploma</option>
                <option>{"Bachelor's Degree"}</option>
                <option>{"Master's Degree"}</option>
                <option>Doctorate (PhD)</option>
              </select>
            </Field>
            <Field label="Years of Teaching Experience">
              <input type="number" className={inputCls} min={0} max={50} placeholder="e.g. 12" />
            </Field>
            <Field label="Degree(s)" span>
              <input className={inputCls} placeholder="e.g. B.Sc. Mathematics – University of Colombo (2nd Class Upper)" />
            </Field>
            <Field label="Teaching Qualification" span>
              <input className={inputCls} placeholder="e.g. PGDE – National Institute of Education, 2012" />
            </Field>
            <Field label="Other Certifications / Training" span>
              <textarea className={`${inputCls} resize-none`} rows={3} placeholder="List any additional certifications or professional development courses" />
            </Field>
          </SectionCard>

          {/* 5. Previous Employment */}
          <SectionCard id="previous" num={5} title="Previous Employment">
            <Field label="Previous School(s) & Zones Served" span>
              <textarea className={`${inputCls} resize-none`} rows={3} placeholder="School name, zone, period of service" />
            </Field>
            <Field label="Transfer History" span>
              <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Chronological record of transfers" />
            </Field>
            <Field label="Reason for Transfer (if applicable)" span>
              <input className={inputCls} placeholder="e.g. Request transfer, promotion, zonal restructuring" />
            </Field>
          </SectionCard>

          {/* 6. Health Information */}
          <SectionCard id="health" num={6} title="Health Information">
            <Field label="Blood Group">
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select blood group</option>
                {['A+','A–','B+','B–','AB+','AB–','O+','O–'].map(g => <option key={g}>{g}</option>)}
              </select>
            </Field>
            <Field label="Disability Status">
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select</option>
                <option>None</option>
                <option>Physical disability</option>
                <option>Visual impairment</option>
                <option>Hearing impairment</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Known Medical Conditions / Allergies" span>
              <textarea className={`${inputCls} resize-none`} rows={3} placeholder="List any known medical conditions or allergies" />
            </Field>
          </SectionCard>

          {/* 7. Documents */}
          <div id="documents" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-[#3E4EFA]/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#3E4EFA]">7</span>
              </div>
              <h2 className="font-bold text-gray-900">Documents to Upload</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FileField label="NIC Copy" hint="PDF or image · max 5 MB" />
              <FileField label="Birth Certificate" hint="PDF or image · max 5 MB" />
              <FileField label="Degree / Diploma Certificates" hint="PDF · max 10 MB" />
              <FileField label="Teaching Service Appointment Letter" hint="PDF · max 5 MB" />
              <FileField label="Transfer Letter (if transferred)" hint="PDF · max 5 MB" />
              <FileField label="Medical Certificate" hint="PDF · max 5 MB" />
              <FileField label="Police Clearance / Character Certificate" hint="PDF · max 5 MB" />
            </div>
          </div>

          {/* 8. System / Account */}
          <SectionCard id="account" num={8} title="System / Account Fields">
            <Field label="Login Email" required>
              <input type="email" className={inputCls} placeholder="teacher@iskole.lk" />
            </Field>
            <Field label="Temporary Password">
              <input type="password" className={inputCls} placeholder="Will be sent via email if blank" />
            </Field>
            <Field label="Role / Permission Level" required>
              <select className={selectCls} defaultValue="">
                <option value="" disabled>Select role</option>
                <option>Teacher</option>
                <option>Head of Department</option>
                <option>Deputy Principal</option>
                <option>Principal</option>
                <option>Admin</option>
              </select>
            </Field>
            <Field label="Account Status" required>
              <select className={selectCls} defaultValue="Active">
                <option>Active</option>
                <option>On Leave</option>
                <option>Resigned</option>
                <option>Retired</option>
              </select>
            </Field>
          </SectionCard>

          {/* Actions */}
          <div className="flex justify-end gap-3 pb-8">
            <Link
              href="/company/dashboard/teachers"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Cancel
            </Link>
            <button className="px-6 py-2.5 bg-[#3E4EFA] text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-[#2E3ED9] transition-colors shadow-sm">
              <Save className="w-4 h-4" /> Save Teacher
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
