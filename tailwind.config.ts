/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Deep Indigo
        primary: {
          50: '#f0f3ff',
          100: '#e6eaff',
          200: '#d1d8ff',
          300: '#b3bdff',
          400: '#8a98ff',
          500: '#3E4EFA',
          600: '#2935f7',
          700: '#1e26e3',
          800: '#1b21b8',
          900: '#1c1f91',
          950: '#121457',
        },
        
        // Secondary Colors - Slate Gray
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        
        // Accent Colors - Emerald Green
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        
        // Status Colors
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F59E0B',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#EF4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        
        // Neutral/Gray Scale
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6B7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        
        // Background Colors
        background: {
          primary: '#FFFFFF',
          secondary: '#f8fafc',
          tertiary: '#f1f5f9',
          dark: '#0f172a',
          'dark-secondary': '#1e293b',
          'dark-tertiary': '#334155',
        },
        
        // Text Colors
        text: {
          primary: '#1e293b',
          secondary: '#6B7280',
          tertiary: '#64748b',
          inverse: '#ffffff',
          muted: '#94a3b8',
          'dark-primary': '#f8fafc',
          'dark-secondary': '#cbd5e1',
          'dark-tertiary': '#94a3b8',
        },
        
        // Border Colors
        border: {
          primary: '#E5E7EB',
          secondary: '#cbd5e1',
          tertiary: '#94a3b8',
          dark: '#334155',
          'dark-secondary': '#475569',
        },
        
        // Sidebar Specific Colors
        sidebar: {
          background: '#0f172a',
          'background-hover': '#1e293b',
          'background-active': '#3E4EFA',
          text: '#f8fafc',
          'text-secondary': '#cbd5e1',
          'text-muted': '#94a3b8',
          border: '#334155',
          accent: '#3E4EFA',
        },
        
        // Card Colors
        card: {
          background: '#FFFFFF',
          'background-hover': '#f8fafc',
          border: '#E5E7EB',
          shadow: 'rgba(15, 23, 42, 0.08)',
          'dark-background': '#1e293b',
          'dark-border': '#334155',
        },
        
        // Input Colors
        input: {
          background: '#FFFFFF',
          border: '#E5E7EB',
          'border-focus': '#3E4EFA',
          text: '#1e293b',
          placeholder: '#6B7280',
          'dark-background': '#334155',
          'dark-border': '#475569',
          'dark-text': '#f8fafc',
        },
        
        // Button Colors
        button: {
          primary: '#3E4EFA',
          'primary-hover': '#2935f7',
          'primary-active': '#1e26e3',
          secondary: '#f1f5f9',
          'secondary-hover': '#e2e8f0',
          'secondary-active': '#cbd5e1',
          danger: '#EF4444',
          'danger-hover': '#dc2626',
          'danger-active': '#b91c1c',
        },
        
        // Additional Colors (from your original config)
        'secondary-text': '#6B7280',
        'card-bg': '#FFFFFF',
        hover: '#E0E7FF',
      },
      
      // Typography
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      // Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Box Shadow
      boxShadow: {
        'card': '0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 4px 6px rgba(15, 23, 42, 0.12), 0 2px 4px rgba(15, 23, 42, 0.08)',
        'sidebar': '0 0 15px rgba(15, 23, 42, 0.1)',
        'modal': '0 10px 25px rgba(15, 23, 42, 0.15)',
      },
      
      // Border Radius
      borderRadius: {
        'card': '0.75rem',
        'button': '0.5rem',
      },
      
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
}