'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft,
  Building2, GraduationCap, ShieldCheck,
} from 'lucide-react';

type Role = 'school-admin' | 'teacher' | 'company-admin';

const roles = [
  {
    id: 'school-admin' as Role,
    label: 'School Admin',
    description: 'Manage students, classes, attendance & school operations',
    icon: Building2,
    accent: 'border-sky-400 bg-sky-50',
    iconBg: 'bg-sky-500',
    badge: 'bg-sky-100 text-sky-700',
    redirect: '/dashboard',
  },
  {
    id: 'teacher' as Role,
    label: 'Teacher',
    description: 'View classes, mark attendance, upload homework & marks',
    icon: GraduationCap,
    accent: 'border-emerald-400 bg-emerald-50',
    iconBg: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700',
    redirect: '/dashboard',
  },
  {
    id: 'company-admin' as Role,
    label: 'Company Admin',
    description: 'Oversee all schools, analytics, billing & platform settings',
    icon: ShieldCheck,
    accent: 'border-violet-400 bg-violet-50',
    iconBg: 'bg-violet-600',
    badge: 'bg-violet-100 text-violet-700',
    redirect: '/company/dashboard',
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  const router     = useRouter();
  const activeRole = roles.find(r => r.id === selectedRole);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    if (activeRole) router.push(activeRole.redirect);
  }

  function reset() {
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setError('');
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#212B36] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/[0.025]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#3E4EFA]/10" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3E4EFA] flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-extrabold text-xl tracking-tight">iSkole</div>
            <div className="text-white/40 text-[10px] uppercase tracking-widest">School Management</div>
          </div>
        </div>

        {/* Copy */}
        <div className="relative space-y-8">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">Welcome back</p>
            <h1 className="text-white text-4xl font-extrabold leading-tight">
              Your school,<br />your dashboard.
            </h1>
            <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-xs">
              A single platform for school admins, teachers, and company administrators to manage everything that matters.
            </p>
          </div>

          {/* Role pills */}
          <div className="space-y-2">
            {roles.map(r => {
              const Icon = r.icon;
              return (
                <div
                  key={r.id}
                  className={`flex items-center gap-3 transition-all duration-200 ${
                    selectedRole === r.id ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg ${r.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium">{r.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative flex items-center gap-2 text-white/25 text-xs">
          <Lock className="w-3.5 h-3.5" />
          <span>End-to-end encrypted &nbsp;·&nbsp; {new Date().getFullYear()} iSkole</span>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-[#3E4EFA] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="font-extrabold text-gray-900 text-lg">iSkole</div>
          </div>

          {/* ── STEP 1: Role selection ── */}
          {!selectedRole && (
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Sign in</h2>
              <p className="text-gray-500 text-sm mt-1 mb-8">Choose how you&apos;re signing in today</p>

              <div className="space-y-3">
                {roles.map(r => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRole(r.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 bg-white hover:border-gray-200 hover:shadow-md text-left transition-all duration-200 group`}
                    >
                      <div className={`w-11 h-11 rounded-xl ${r.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-sm">{r.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5 leading-snug">{r.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 2: Login form ── */}
          {selectedRole && activeRole && (
            <div>
              {/* Back */}
              <button
                onClick={reset}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {/* Role indicator */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl ${activeRole.iconBg} flex items-center justify-center`}>
                  <activeRole.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-extrabold text-gray-900 text-lg">{activeRole.label}</div>
                  <div className="text-xs text-gray-400">Enter your credentials to continue</div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/25 focus:border-[#3E4EFA] transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-semibold text-gray-700">Password</label>
                    <button type="button" className="text-xs text-[#3E4EFA] font-medium hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-11 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/25 focus:border-[#3E4EFA] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center gap-2 ${activeRole.iconBg} hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all text-sm mt-2`}
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign in as {activeRole.label}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
