'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Building2, User, Phone, MapPin, Users,
  GraduationCap, Upload, CheckCircle, Globe, Clock,
  BookOpen, CreditCard, Camera, Layers, Info,
} from 'lucide-react';

// ── Constants ──────────────────────────────────────────────────────────────
const PROVINCES_DISTRICTS: Record<string, string[]> = {
  'Western':       ['Colombo', 'Gampaha', 'Kalutara'],
  'Central':       ['Kandy', 'Matale', 'Nuwara Eliya'],
  'Southern':      ['Galle', 'Matara', 'Hambantota'],
  'Northern':      ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'],
  'Eastern':       ['Batticaloa', 'Ampara', 'Trincomalee'],
  'North Western': ['Kurunegala', 'Puttalam'],
  'North Central': ['Anuradhapura', 'Polonnaruwa'],
  'Uva':           ['Badulla', 'Monaragala'],
  'Sabaragamuwa':  ['Ratnapura', 'Kegalle'],
};

const ALL_SUBJECTS = [
  'Science', 'Mathematics', 'English', 'Sinhala', 'Tamil',
  'History', 'ICT', 'Commerce', 'Arts', 'Music',
  'Physical Education', 'Buddhism', 'Hinduism', 'Islam',
  'Christianity', 'Geography', 'Health Science', 'Agriculture',
];
const ALL_EXTRA = ['Sports', 'Music', 'Drama', 'Debate', 'Art', 'Scouts', 'Cadets', 'Environmental'];
const ALL_CLUBS = ['Science Club', 'Prefects', 'Scouts', 'Art Society', 'Drama Society', 'Music Club', 'Computer Club', 'Environmental Club'];

// ── Types ──────────────────────────────────────────────────────────────────
type FormData = {
  coverPhoto: File | null;  coverPreview: string | null;
  logoFile:   File | null;  logoPreview:  string | null;
  schoolName: string; motto: string;
  schoolId: string; ownershipType: string; affiliationBoard: string;
  educationLevels: string; establishmentYear: string;
  genderComposition: string; administrativeType: string; gradeStreamType: string;
  mediumOfInstruction: string[]; religiousAffiliation: string;
  address: string; city: string; province: string; district: string;
  zipCode: string; phone: string; email: string; website: string;
  lat: string; lng: string;
  principalPhoto: File | null; principalPreview: string | null;
  principalName: string; principalPhone: string; principalEmail: string;
  totalStudents: string; totalTeachers: string; classrooms: string;
  nonAcademicStaff: string; schoolTimings: string; schoolCode: string;
  subjectsOffered: string[]; curriculum: string;
  schoolCalendar: File | null; extraCurricular: string[];
  clubs: string[]; languagesTaught: string[];
  bankDetails: string; feeStructure: File | null; paymentModes: string[];
};

const INITIAL: FormData = {
  coverPhoto: null, coverPreview: null,
  logoFile: null,   logoPreview: null,
  schoolName: '', motto: '',
  schoolId: '', ownershipType: '', affiliationBoard: '', educationLevels: '', establishmentYear: '',
  genderComposition: '', administrativeType: '', gradeStreamType: '',
  mediumOfInstruction: [], religiousAffiliation: '',
  address: '', city: '', province: '', district: '',
  zipCode: '', phone: '', email: '', website: '', lat: '', lng: '',
  principalPhoto: null, principalPreview: null,
  principalName: '', principalPhone: '', principalEmail: '',
  totalStudents: '', totalTeachers: '', classrooms: '',
  nonAcademicStaff: '', schoolTimings: '', schoolCode: '',
  subjectsOffered: [], curriculum: '', schoolCalendar: null,
  extraCurricular: [], clubs: [], languagesTaught: [],
  bankDetails: '', feeStructure: null, paymentModes: [],
};

// ── Shared UI helpers ──────────────────────────────────────────────────────
const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/25 focus:border-[#3E4EFA] bg-white';
const labelCls = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      {children}
    </div>
  );
}

function SelectField({ value, onChange, required, children }: {
  value: string; onChange: (v: string) => void;
  required?: boolean; children: React.ReactNode;
}) {
  return (
    <select required={required} value={value} onChange={e => onChange(e.target.value)} className={inputCls}>
      {children}
    </select>
  );
}

function CheckGrid({ options, selected, onChange }: {
  options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt]);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map(opt => (
        <label key={opt} onClick={() => toggle(opt)}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border cursor-pointer transition-all text-sm ${
            selected.includes(opt)
              ? 'border-[#3E4EFA] bg-[#3E4EFA]/5 text-[#3E4EFA] font-semibold'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}>
          <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${
            selected.includes(opt) ? 'bg-[#3E4EFA] border-[#3E4EFA]' : 'border-gray-300'
          }`}>
            {selected.includes(opt) && (
              <svg viewBox="0 0 10 8" className="w-2.5 h-2.5">
                <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          {opt}
        </label>
      ))}
    </div>
  );
}

function RadioGroup({ options, value, onChange }: {
  options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-xl border text-sm transition-all ${
            value === opt
              ? 'border-[#3E4EFA] bg-[#3E4EFA] text-white font-semibold'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function SectionCard({ icon, title, children }: {
  icon: React.ReactNode; title: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-50">
        <div className="w-8 h-8 rounded-lg bg-[#3E4EFA]/10 flex items-center justify-center text-[#3E4EFA]">
          {icon}
        </div>
        <span className="font-bold text-gray-800">{title}</span>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function AddNewSchoolPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const districts = PROVINCES_DISTRICTS[form.province] ?? [];

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleFileUpload(
    fileField: keyof FormData,
    previewField: keyof FormData | null,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0] ?? null;
    setForm(f => ({
      ...f,
      [fileField]: file,
      ...(previewField && file ? { [previewField]: URL.createObjectURL(file) } : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  // ── Success screen ──────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 flex flex-col items-center gap-4 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">School Registered!</h2>
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-gray-700">{form.schoolName}</span> has been successfully added to the iSkole network.
          </p>
          <div className="flex gap-3 mt-2 w-full">
            <button onClick={() => router.push('/company/dashboard/schools')}
              className="flex-1 bg-[#3E4EFA] text-white font-semibold py-2.5 rounded-xl hover:bg-[#2f3fe8] transition-colors">
              Back to Schools
            </button>
            <button onClick={() => { setForm(INITIAL); setSubmitted(false); }}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-200 transition-colors">
              Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center gap-4 sticky top-0 z-10">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">Add New School</h1>
          <p className="text-xs text-gray-400 mt-0.5">Register a school in the iSkole network</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-8 max-w-4xl mx-auto space-y-6">

        {/* ── 1. School Profile ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Cover photo */}
          <div className="relative h-44 bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden">
            {form.coverPreview
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={form.coverPreview} alt="Cover" className="w-full h-full object-cover" />
              : <div className="absolute inset-0 flex flex-col items-center justify-center text-blue-300 gap-2">
                  <Camera className="w-10 h-10" />
                  <span className="text-xs font-medium">School Cover Photo</span>
                </div>
            }
            <label className="absolute top-3 right-3 cursor-pointer flex items-center gap-1.5 bg-black/40 hover:bg-black/55 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
              <Upload className="w-3.5 h-3.5" /> Upload Cover
              <input type="file" accept="image/*" className="hidden"
                onChange={e => handleFileUpload('coverPhoto', 'coverPreview', e)} />
            </label>
          </div>

          {/* Logo + name */}
          <div className="px-6 pb-6 flex flex-col items-center -mt-10">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl border-4 border-white shadow-md bg-gray-100 overflow-hidden flex items-center justify-center">
                {form.logoPreview
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={form.logoPreview} alt="Logo" className="w-full h-full object-cover" />
                  : <Building2 className="w-7 h-7 text-gray-300" />
                }
              </div>
              <label className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#3E4EFA] flex items-center justify-center cursor-pointer shadow-md hover:bg-[#2f3fe8] transition-colors">
                <Upload className="w-3.5 h-3.5 text-white" />
                <input type="file" accept="image/*" className="hidden"
                  onChange={e => handleFileUpload('logoFile', 'logoPreview', e)} />
              </label>
            </div>
            <div className="mt-5 w-full max-w-lg space-y-3 text-center">
              <input required value={form.schoolName} onChange={e => set('schoolName', e.target.value)}
                placeholder="School Name *"
                className="w-full border-0 border-b-2 border-gray-200 focus:border-[#3E4EFA] text-center text-xl font-extrabold text-gray-900 py-1 focus:outline-none placeholder-gray-300 bg-transparent" />
              <input value={form.motto} onChange={e => set('motto', e.target.value)}
                placeholder="School Motto (optional)"
                className="w-full border-0 border-b border-gray-100 focus:border-gray-300 text-center text-sm italic text-gray-500 py-1 focus:outline-none placeholder-gray-200 bg-transparent" />
            </div>
          </div>
        </div>

        {/* ── 2. Basic Information ── */}
        <SectionCard icon={<Info className="w-4 h-4" />} title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="School ID / Reg. No">
              <input value={form.schoolId} onChange={e => set('schoolId', e.target.value)}
                placeholder="e.g. 123456" className={inputCls} />
            </Field>
            <Field label="School Code">
              <input value={form.schoolCode} onChange={e => set('schoolCode', e.target.value)}
                placeholder="e.g. KVNS-001" className={inputCls} />
            </Field>
            <Field label="Ownership Type" required>
              <SelectField required value={form.ownershipType} onChange={v => set('ownershipType', v)}>
                <option value="">Select…</option>
                <option>Government</option>
                <option>Private</option>
                <option>Semi-Government</option>
              </SelectField>
            </Field>
            <Field label="Affiliation Board">
              <SelectField value={form.affiliationBoard} onChange={v => set('affiliationBoard', v)}>
                <option value="">Select…</option>
                <option>National</option>
                <option>Provincial</option>
                <option>International</option>
              </SelectField>
            </Field>
            <Field label="Establishment Year">
              <input type="number" min="1800" max={new Date().getFullYear()}
                value={form.establishmentYear} onChange={e => set('establishmentYear', e.target.value)}
                placeholder="e.g. 1890" className={inputCls} />
            </Field>
            <Field label="School Timings">
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={form.schoolTimings} onChange={e => set('schoolTimings', e.target.value)}
                  placeholder="e.g. 7:30 AM – 1:30 PM" className={`${inputCls} pl-10`} />
              </div>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Education Levels">
                <RadioGroup
                  options={['Primary Only', 'Secondary Only', 'A/L Only', 'Primary & Secondary', 'Primary, Secondary & A/L']}
                  value={form.educationLevels}
                  onChange={v => set('educationLevels', v)}
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        {/* ── 3. Classification ── */}
        <SectionCard icon={<Layers className="w-4 h-4" />} title="School Classification">
          <div className="space-y-5">
            <Field label="Gender Composition" required>
              <RadioGroup
                options={["Boys' School", "Girls' School", 'Mixed / Co-educational']}
                value={form.genderComposition}
                onChange={v => set('genderComposition', v)}
              />
            </Field>
            <Field label="Administrative Type" required>
              <div className="flex flex-wrap gap-2">
                {[
                  'National School', 'Provincial School', 'Private School',
                  'International School', 'Pirivena (Monastic)', 'Special School',
                ].map(opt => (
                  <button key={opt} type="button" onClick={() => set('administrativeType', opt)}
                    className={`px-4 py-2 rounded-xl border text-sm transition-all ${
                      form.administrativeType === opt
                        ? 'border-[#3E4EFA] bg-[#3E4EFA] text-white font-semibold'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}>
                    {opt}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Grade / Stream Type (Ministry Classification)" required>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: 'Type 1AB', desc: 'Grades 1–13 (National)' },
                  { value: 'Type 1C',  desc: 'Grades 1–13 (Provincial)' },
                  { value: 'Type 2',   desc: 'Grades 1–11' },
                  { value: 'Type 3',   desc: 'Grades 1–8' },
                ].map(opt => (
                  <button key={opt.value} type="button" onClick={() => set('gradeStreamType', opt.value)}
                    className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${
                      form.gradeStreamType === opt.value
                        ? 'border-[#3E4EFA] bg-[#3E4EFA]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <span className={`text-sm font-bold ${form.gradeStreamType === opt.value ? 'text-[#3E4EFA]' : 'text-gray-800'}`}>
                      {opt.value}
                    </span>
                    <span className="text-[11px] text-gray-400 mt-0.5">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Medium of Instruction">
              <CheckGrid
                options={['Sinhala', 'Tamil', 'English']}
                selected={form.mediumOfInstruction}
                onChange={v => set('mediumOfInstruction', v)}
              />
            </Field>
            <Field label="Religious Affiliation">
              <RadioGroup
                options={['Buddhist', 'Catholic', 'Anglican', 'Hindu', 'Muslim', 'None']}
                value={form.religiousAffiliation}
                onChange={v => set('religiousAffiliation', v)}
              />
            </Field>
          </div>
        </SectionCard>

        {/* ── 4. Location & Contact ── */}
        <SectionCard icon={<MapPin className="w-4 h-4" />} title="Location & Contact">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Street Address">
                <input value={form.address} onChange={e => set('address', e.target.value)}
                  placeholder="e.g. 123 Main Street" className={inputCls} />
              </Field>
            </div>
            <Field label="Province" required>
              <SelectField required value={form.province}
                onChange={v => { set('province', v); set('district', ''); }}>
                <option value="">Select province…</option>
                {Object.keys(PROVINCES_DISTRICTS).map(p => <option key={p}>{p}</option>)}
              </SelectField>
            </Field>
            <Field label="District" required>
              <SelectField required value={form.district} onChange={v => set('district', v)}>
                <option value="">Select district…</option>
                {districts.map(d => <option key={d}>{d}</option>)}
              </SelectField>
            </Field>
            <Field label="City / Town" required>
              <input required value={form.city} onChange={e => set('city', e.target.value)}
                placeholder="e.g. Kalutara" className={inputCls} />
            </Field>
            <Field label="Zip Code">
              <input value={form.zipCode} onChange={e => set('zipCode', e.target.value)}
                placeholder="e.g. 12000" className={inputCls} />
            </Field>
            <Field label="Phone" required>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input required value={form.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="+94 XX XXX XXXX" className={`${inputCls} pl-10`} />
              </div>
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                placeholder="info@school.lk" className={inputCls} />
            </Field>
            <Field label="Website">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={form.website} onChange={e => set('website', e.target.value)}
                  placeholder="kalutaravidyalaya.lk" className={`${inputCls} pl-10`} />
              </div>
            </Field>
            <Field label="Country">
              <input value="Sri Lanka" readOnly
                className={`${inputCls} opacity-60 cursor-not-allowed`} />
            </Field>
            <Field label="GPS Latitude">
              <input value={form.lat} onChange={e => set('lat', e.target.value)}
                placeholder="e.g. 6.5833" className={inputCls} />
            </Field>
            <Field label="GPS Longitude">
              <input value={form.lng} onChange={e => set('lng', e.target.value)}
                placeholder="e.g. 79.9500" className={inputCls} />
            </Field>
          </div>
        </SectionCard>

        {/* ── 5. Principal / Head ── */}
        <SectionCard icon={<User className="w-4 h-4" />} title="Principal / Head Information">
          <div className="flex gap-5 items-start flex-wrap sm:flex-nowrap">
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                {form.principalPreview
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={form.principalPreview} alt="Principal" className="w-full h-full object-cover" />
                  : <User className="w-7 h-7 text-gray-300" />
                }
              </div>
              <label className="cursor-pointer text-xs text-[#3E4EFA] font-semibold hover:underline">
                Upload Photo
                <input type="file" accept="image/*" className="hidden"
                  onChange={e => handleFileUpload('principalPhoto', 'principalPreview', e)} />
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div className="sm:col-span-2">
                <Field label="Full Name" required>
                  <input required value={form.principalName} onChange={e => set('principalName', e.target.value)}
                    placeholder="e.g. Mr. D. R. Jayasuriya" className={inputCls} />
                </Field>
              </div>
              <Field label="Phone">
                <input value={form.principalPhone} onChange={e => set('principalPhone', e.target.value)}
                  placeholder="+94 34 222 5678" className={inputCls} />
              </Field>
              <Field label="Email">
                <input type="email" value={form.principalEmail} onChange={e => set('principalEmail', e.target.value)}
                  placeholder="principal@school.lk" className={inputCls} />
              </Field>
            </div>
          </div>
        </SectionCard>

        {/* ── 6. Administrative Details ── */}
        <SectionCard icon={<GraduationCap className="w-4 h-4" />} title="Administrative Details">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Field label="Total Students">
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="number" min="0" value={form.totalStudents}
                  onChange={e => set('totalStudents', e.target.value)}
                  placeholder="0" className={`${inputCls} pl-10`} />
              </div>
            </Field>
            <Field label="Total Teachers">
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="number" min="0" value={form.totalTeachers}
                  onChange={e => set('totalTeachers', e.target.value)}
                  placeholder="0" className={`${inputCls} pl-10`} />
              </div>
            </Field>
            <Field label="Classrooms">
              <input type="number" min="0" value={form.classrooms}
                onChange={e => set('classrooms', e.target.value)}
                placeholder="0" className={inputCls} />
            </Field>
            <Field label="Non-Academic Staff">
              <input type="number" min="0" value={form.nonAcademicStaff}
                onChange={e => set('nonAcademicStaff', e.target.value)}
                placeholder="0" className={inputCls} />
            </Field>
            <Field label="School Code">
              <input value={form.schoolCode} onChange={e => set('schoolCode', e.target.value)}
                placeholder="e.g. KVNS-001" className={inputCls} />
            </Field>
            <Field label="School Timings">
              <input value={form.schoolTimings} onChange={e => set('schoolTimings', e.target.value)}
                placeholder="7:30 AM – 1:30 PM" className={inputCls} />
            </Field>
          </div>
        </SectionCard>

        {/* ── 7. Academic Information ── */}
        <SectionCard icon={<BookOpen className="w-4 h-4" />} title="Academic Information">
          <div className="space-y-5">
            <Field label="Subjects Offered">
              <CheckGrid options={ALL_SUBJECTS} selected={form.subjectsOffered}
                onChange={v => set('subjectsOffered', v)} />
            </Field>
            <Field label="Curriculum">
              <RadioGroup
                options={['National Curriculum', 'Cambridge (IGCSE)', 'Edexcel', 'IB', 'Other']}
                value={form.curriculum}
                onChange={v => set('curriculum', v)}
              />
            </Field>
            <Field label="Languages Taught">
              <CheckGrid
                options={['Sinhala', 'Tamil', 'English', 'Arabic', 'French', 'Pali']}
                selected={form.languagesTaught}
                onChange={v => set('languagesTaught', v)}
              />
            </Field>
            <Field label="Extra-Curricular Activities">
              <CheckGrid options={ALL_EXTRA} selected={form.extraCurricular}
                onChange={v => set('extraCurricular', v)} />
            </Field>
            <Field label="Clubs & Societies">
              <CheckGrid options={ALL_CLUBS} selected={form.clubs}
                onChange={v => set('clubs', v)} />
            </Field>
            <Field label="School Calendar / Year Plan (PDF)">
              <label className="flex items-center gap-3 border border-dashed border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-[#3E4EFA] transition-colors group">
                <Upload className="w-4 h-4 text-gray-400 group-hover:text-[#3E4EFA]" />
                <span className="text-sm text-gray-500">
                  {form.schoolCalendar ? form.schoolCalendar.name : 'Click to upload PDF…'}
                </span>
                <input type="file" accept="application/pdf" className="hidden"
                  onChange={e => handleFileUpload('schoolCalendar', null, e)} />
              </label>
            </Field>
          </div>
        </SectionCard>

        {/* ── 8. Payment & Fees ── */}
        <SectionCard icon={<CreditCard className="w-4 h-4" />} title="Payment & Fees">
          <div className="space-y-4">
            <Field label="Bank Details">
              <textarea rows={2} value={form.bankDetails} onChange={e => set('bankDetails', e.target.value)}
                placeholder="Bank name, branch, account number…"
                className={`${inputCls} resize-none`} />
            </Field>
            <Field label="Payment Modes">
              <CheckGrid
                options={['Cash', 'Bank Transfer', 'Online Payment', 'Cheque']}
                selected={form.paymentModes}
                onChange={v => set('paymentModes', v)}
              />
            </Field>
            <Field label="Fee Structure (PDF)">
              <label className="flex items-center gap-3 border border-dashed border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-[#3E4EFA] transition-colors group">
                <Upload className="w-4 h-4 text-gray-400 group-hover:text-[#3E4EFA]" />
                <span className="text-sm text-gray-500">
                  {form.feeStructure ? form.feeStructure.name : 'Click to upload PDF…'}
                </span>
                <input type="file" accept="application/pdf" className="hidden"
                  onChange={e => handleFileUpload('feeStructure', null, e)} />
              </label>
            </Field>
          </div>
        </SectionCard>

        {/* ── Actions ── */}
        <div className="flex items-center justify-end gap-3 pb-10">
          <button type="button" onClick={() => router.back()}
            className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3E4EFA] hover:bg-[#2f3fe8] text-white text-sm font-semibold transition-colors shadow-sm disabled:opacity-60">
            {loading ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : <CheckCircle className="w-4 h-4" />}
            {loading ? 'Saving…' : 'Register School'}
          </button>
        </div>

      </form>
    </div>
  );
}
