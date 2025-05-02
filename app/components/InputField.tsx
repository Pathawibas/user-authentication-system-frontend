import React from 'react'

interface InputFieldProps {
  label: string
  type: string
  name: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  withAsterisk?: boolean
  autoComplete?: string
  error?: string
  icon?: React.ReactNode // New prop for icon
}

export default function InputField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  withAsterisk = false,
  autoComplete,
  error,
  icon,
}: InputFieldProps) {
  return (
    <div className='w-full'>
      {/* Label - Enhanced styling */}
      <label
        className={`mb-2 block text-sm font-medium drop-shadow-sm ${
          error ? 'text-red-600' : 'text-slate-700'
        }`}
        htmlFor={name}
      >
        {label} {withAsterisk && <span className='text-red-500'>*</span>}
      </label>

      {/* Input Container - Modern Skeuomorphic */}
      <div className='relative'>
        {/* Input Field with enhanced styling */}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`block w-full rounded-xl border bg-white/80 px-4 py-3 ${
            icon ? 'pl-10' : 'pl-4'
          } text-slate-900 shadow-inner backdrop-blur transition-all duration-200 placeholder:text-slate-400/70 focus:outline-none ${
            error
              ? 'border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-2 focus:ring-red-200'
              : 'border-indigo-100/80 focus:border-indigo-400 focus:bg-white/90 focus:ring-2 focus:ring-indigo-200/60'
          }`}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        {/* Icon - Left positioned */}
        {icon && (
          <div className='absolute top-1/2 left-3 -translate-y-1/2'>{icon}</div>
        )}

        {/* Top inset highlight for skeuomorphic effect */}
        <div className='pointer-events-none absolute inset-x-0 top-0 h-[30%] rounded-t-xl bg-white/30'></div>
      </div>

      {/* Error Message - Enhanced */}
      {error && (
        <p
          id={`${name}-error`}
          className='mt-2 flex items-center text-xs text-red-600'
        >
          <svg
            className='mr-1 h-3 w-3'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <circle cx='12' cy='12' r='10'></circle>
            <line x1='12' y1='8' x2='12' y2='12'></line>
            <line x1='12' y1='16' x2='12.01' y2='16'></line>
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
