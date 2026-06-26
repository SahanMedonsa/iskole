'use client';

import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Pencil, Save, X, User, Phone, Briefcase,
  GraduationCap, Building2, Heart, FileText, ShieldCheck,
  Camera, MapPin, BookOpen, UserCheck,
} from 'lucide-react';
import { TEACHERS, type Teacher } from '../_teacherData';

// ── Helpers ────────────────────────────────────────────────────────────────
const inputCls = 'w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#3E4EFA] focus:ring-1 focus:ring-[#3E4EFA]/20 bg-white transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-default';
const selectCls = 'w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#3E4EFA] focus:ring-1 focus:ring-[#3E4EFA]/20 bg-white transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-default appearance-none';

function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50/60">
        <div className="w-8 h-8 rounded-xl bg-[#3E4EFA]/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#3E4EFA]" />
        </div>
        <h2 className="text-sm font-bold text-gray-800">{title}</h2>
      </div>
      <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {children}
      </div>
    </div>
  );
}

function Field({
  label, field, form, editing, onChange, type = 'text', options,
}: {
  label: string;
  field: keyof Teacher;
  form: Teacher;
  editing: boolean;
  onChange: (k: keyof Teacher, v: string) => void;
  type?: 'text' | 'date' | 'select' | 'textarea';
  options?: string[];
}) {
  const value = String(form[field] ?? '');
  if (!editing) {
    return (
      <div>
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</div>
        <div className="text-sm text-gray-800 font-medium">{value || '—'}</div>
      </div>
    );
  }
  if (type === 'select' && options) {
    return (
      <div>
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">{label}</label>
        <select value={value} onChange={e => onChange(field, e.target.value)} className={selectCls}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  if (type === 'textarea') {
    return (
      <div className="sm:col-span-2">
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">{label}</label>
        <textarea rows={3} value={value} onChange={e => onChange(field, e.target.value)} className={`${inputCls} resize-none`} />
      </div>
    );
  }
  return (
    <div>
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">{label}</label>
      <input type={type} value={value} onChange={e => onChange(field, e.target.value)} className={inputCls} />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function TeacherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const original = TEACHERS.find(t => t.id === id);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Teacher | null>(original ?? null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(original?.photo);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string;
      setPhotoPreview(dataUrl);
      setForm(prev => prev ? { ...prev, photo: dataUrl } : prev);
    };
    reader.readAsDataURL(file);
  };

  if (!form || !original) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Teacher not found.</p>
          <button onClick={() => router.back()} className="mt-4 text-[#3E4EFA] text-sm font-semibold hover:underline">Go back</button>
        </div>
      </div>
    );
  }

  const update = (k: keyof Teacher, v: string) => setForm(prev => prev ? { ...prev, [k]: v } : prev);

  const handleSave = () => {
    // In production this would call an API; for now just commit locally
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(original);
    setPhotoPreview(original.photo);
    setEditing(false);
  };

  const statusColors: Record<string, string> = {
    Active:    'bg-green-100 text-green-700',
    'On Leave':'bg-amber-100 text-amber-700',
    Retired:   'bg-gray-100 text-gray-500',
  };
  const typeColors: Record<string, string> = {
    Government:      'bg-blue-100 text-blue-700',
    Private:         'bg-violet-100 text-violet-700',
    'Semi-Government':'bg-amber-100 text-amber-700',
  };

  const f = (label: string, field: keyof Teacher, type?: 'text' | 'date' | 'select' | 'textarea', options?: string[]) => (
    <Field key={field} label={label} field={field} form={form} editing={editing} onChange={update} type={type} options={options} />
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className={`w-9 h-9 rounded-xl ${form.bg} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
            {photoPreview
              ? <img src={photoPreview} alt={form.name} className="w-full h-full object-cover" />
              : <span className={`text-xs font-extrabold ${form.color}`}>{form.initials}</span>
            }
          </div>
          <div>
            <h1 className="text-base font-extrabold text-gray-900 leading-tight">{form.name}</h1>
            <p className="text-xs text-gray-400">{form.serviceNo}</p>
          </div>
          <span className={`hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[form.status] ?? 'bg-gray-100 text-gray-500'}`}>{form.status}</span>
          <span className={`hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[form.type] ?? 'bg-gray-100 text-gray-500'}`}>{form.type}</span>
        </div>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <button onClick={handleCancel} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                <X className="w-4 h-4" /> Cancel
              </button>
              <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3E4EFA] text-white text-sm font-semibold hover:bg-[#2f3ed8] transition-colors shadow-sm">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3E4EFA] text-white text-sm font-semibold hover:bg-[#2f3ed8] transition-colors shadow-sm">
              <Pencil className="w-4 h-4" /> Edit
            </button>
          )}
        </div>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto space-y-5">

        {/* ── Profile photo card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Photo with edit overlay */}
            <div className="relative flex-shrink-0">
              <div className={`w-28 h-28 rounded-2xl ${form.bg} flex items-center justify-center overflow-hidden border-4 border-white shadow-md`}>
                {photoPreview
                  ? <img src={photoPreview} alt={form.name} className="w-full h-full object-cover" />
                  : <span className={`text-3xl font-extrabold ${form.color}`}>{form.initials}</span>
                }
              </div>
              {editing && (
                <label className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-[#3E4EFA] flex items-center justify-center cursor-pointer shadow-md hover:bg-[#2f3ed8] transition-colors border-2 border-white">
                  <Camera className="w-4 h-4 text-white" />
                  <input type="file" accept="image/*" className="sr-only" onChange={handlePhotoChange} />
                </label>
              )}
            </div>
            {/* Summary info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-extrabold text-gray-900">{form.name}</h2>
              <p className="text-xs text-gray-400 mt-0.5 font-mono">{form.serviceNo}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusColors[form.status] ?? 'bg-gray-100 text-gray-500'}`}>{form.status}</span>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${typeColors[form.type] ?? 'bg-gray-100 text-gray-500'}`}>{form.type}</span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-center gap-2 text-sm text-gray-600"><BookOpen className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /><span>{form.subject} · {form.grade}</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-600"><Building2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /><span>{form.school}</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /><span>{form.district} District</span></div>
                <div className="flex items-center gap-2 text-sm text-gray-600"><UserCheck className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /><span>{form.exp} years experience · {form.gender}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Personal Information */}
        <SectionCard icon={User} title="Personal Information">
          {f('Full Name', 'name')}
          {f('NIC Number', 'nic')}
          {f('Date of Birth', 'dob', 'date')}
          {f('Gender', 'gender', 'select', ['Male', 'Female'])}
          {f('Religion', 'religion', 'select', ['Buddhism', 'Hinduism', 'Islam', 'Christianity', 'Other'])}
          {f('Ethnicity', 'ethnicity', 'select', ['Sinhalese', 'Sri Lanka Tamil', 'Indian Tamil', 'Sri Lanka Moor', 'Burgher', 'Malay', 'Other'])}
          {f('Nationality', 'nationality')}
          {f('Marital Status', 'maritalStatus', 'select', ['Single', 'Married', 'Divorced', 'Widowed'])}
        </SectionCard>

        {/* 2. Contact & Address */}
        <SectionCard icon={Phone} title="Contact & Address">
          {f('Mobile', 'phone')}
          {f('Email', 'email')}
          <Field label="Permanent Address" field="permanentAddress" form={form} editing={editing} onChange={update} type="textarea" />
          <Field label="Current / Residential Address" field="currentAddress" form={form} editing={editing} onChange={update} type="textarea" />
          {f('Emergency Contact Name', 'emergencyContactName')}
          {f('Emergency Contact Phone', 'emergencyContactPhone')}
        </SectionCard>

        {/* 3. Professional Details */}
        <SectionCard icon={Briefcase} title="Professional / Employment Details">
          {f('Service Number', 'serviceNo')}
          {f('Date of First Appointment', 'firstAppointmentDate', 'date')}
          {f('Date of Appointment to Current School', 'currentSchoolDate', 'date')}
          {f('Employment Type', 'employmentType', 'select', ['Permanent', 'Graduate Trainee', 'Contract', 'Visiting'])}
          {f('Service Category', 'serviceCategory')}
          {f('Salary Grade', 'salaryGrade')}
          {f('Subject(s)', 'subject')}
          {f('Grade Levels', 'gradesTaught')}
          {f('Medium of Instruction', 'medium', 'select', ['Sinhala', 'Tamil', 'English'])}
          {f('Class Teacher (if any)', 'classTeacher')}
          <Field label="Additional Roles" field="additionalRoles" form={form} editing={editing} onChange={update} type="textarea" />
        </SectionCard>

        {/* 4. Academic Qualifications */}
        <SectionCard icon={GraduationCap} title="Academic & Professional Qualifications">
          {f('Highest Qualification', 'highestQual', 'select', ["Bachelor's Degree", "Master's Degree", "Doctoral Degree", "Diploma", "Certificate", "Other"])}
          <Field label="Degree(s)" field="degrees" form={form} editing={editing} onChange={update} type="textarea" />
          {f('Teaching Qualification', 'teachingQual')}
          <Field label="Other Certifications" field="otherCerts" form={form} editing={editing} onChange={update} type="textarea" />
          {f('Years of Experience', 'exp')}
        </SectionCard>

        {/* 5. Previous Employment */}
        <SectionCard icon={Building2} title="Previous Employment">
          <Field label="Previous Schools" field="previousSchools" form={form} editing={editing} onChange={update} type="textarea" />
          <Field label="Transfer History" field="transferHistory" form={form} editing={editing} onChange={update} type="textarea" />
          <Field label="Reason for Transfer" field="transferReason" form={form} editing={editing} onChange={update} type="textarea" />
        </SectionCard>

        {/* 6. Health Information */}
        <SectionCard icon={Heart} title="Health Information">
          {f('Blood Group', 'bloodGroup', 'select', ['A+', 'A–', 'B+', 'B–', 'O+', 'O–', 'AB+', 'AB–'])}
          {f('Medical Conditions', 'medicalConditions')}
          {f('Disability Status', 'disabilityStatus', 'select', ['None', 'Physical', 'Visual', 'Hearing', 'Cognitive', 'Other'])}
        </SectionCard>

        {/* 7. Documents */}
        <SectionCard icon={FileText} title="Documents">
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'NIC Copy', 'Birth Certificate', 'Degree Certificate(s)',
              'Appointment Letter', 'Transfer Letter', 'Medical Certificate', 'Police Clearance',
            ].map(doc => (
              <div key={doc} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-dashed border-gray-200">
                <span className="text-xs font-medium text-gray-600">{doc}</span>
                <label className={`text-[11px] font-semibold px-3 py-1 rounded-lg border transition-colors ${editing ? 'border-[#3E4EFA] text-[#3E4EFA] cursor-pointer hover:bg-[#3E4EFA]/5' : 'border-gray-200 text-gray-400 cursor-default'}`}>
                  {editing ? 'Upload' : 'View'}
                  {editing && <input type="file" className="sr-only" />}
                </label>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 8. System / Account */}
        <SectionCard icon={ShieldCheck} title="System / Account">
          {f('Login Email', 'loginEmail')}
          {f('Role / Permission Level', 'roleLevel', 'select', ['Teacher', 'Head of Department', 'Deputy Principal', 'Principal', 'Admin'])}
          {f('Account Status', 'status', 'select', ['Active', 'On Leave', 'Retired', 'Suspended'])}
          {editing && (
            <div>
              <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1 block">New Password</label>
              <input type="password" placeholder="Leave blank to keep current" className={inputCls} />
            </div>
          )}
        </SectionCard>

        {/* Bottom action row */}
        {editing && (
          <div className="flex justify-end gap-3 pt-2 pb-6">
            <button onClick={handleCancel} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3E4EFA] text-white text-sm font-semibold hover:bg-[#2f3ed8] transition-colors shadow-sm">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
