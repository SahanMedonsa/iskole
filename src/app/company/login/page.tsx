'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Building2, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CompanyLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    // TODO: replace with real auth call
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setError('Invalid credentials. Please try again.');
  }

  return (
    <div className="min-h-screen flex">

      {/* Left – branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#212B36] flex-col justify-between p-12 relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/[0.03]" />
          <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-white/[0.03]" />
          <div className="absolute -bottom-24 left-1/4 w-64 h-64 rounded-full bg-[#3E4EFA]/10" />
        </div>

        {/* Logo */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E4EFA] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-extrabold text-xl tracking-tight">iSkole</div>
              <div className="text-white/40 text-xs tracking-widest uppercase">Platform</div>
            </div>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative space-y-6">
          <div>
            <div className="text-white/50 text-sm uppercase tracking-[0.2em] mb-4">Company Admin Portal</div>
            <h1 className="text-white text-4xl font-extrabold leading-tight">
              Manage all your<br />schools from<br />one place.
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-relaxed max-w-xs">
              Monitor students, teachers, attendance, and performance across every school in your network — in real time.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-col gap-2">
            {[
              'Multi-school oversight',
              'Real-time analytics',
              'Centralised reporting',
            ].map(f => (
              <div key={f} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3E4EFA]" />
                <span className="text-white/60 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="relative flex items-center gap-2 text-white/30 text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>Secured with enterprise-grade encryption</span>
        </div>
      </div>

      {/* Right – login form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-[#3E4EFA] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-gray-900 text-lg">iSkole Platform</div>
              <div className="text-gray-400 text-xs">Company Admin Portal</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to your company admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@yourcompany.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30 focus:border-[#3E4EFA] transition-all"
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
                  className="w-full pl-10 pr-11 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3E4EFA]/30 focus:border-[#3E4EFA] transition-all"
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
              className="w-full flex items-center justify-center gap-2 bg-[#3E4EFA] hover:bg-[#2935f7] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Role note */}
          <div className="mt-8 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
            <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              This portal is for <strong>company administrators</strong> only. If you manage a single school, use the{' '}
              <a href="/dashboard" className="underline font-semibold">School Admin panel</a> instead.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} iSkole Platform. All rights reserved.
          </p>

        </div>
      </div>

    </div>
  );
}
