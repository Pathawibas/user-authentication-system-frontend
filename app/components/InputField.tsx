import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { tv } from 'tailwind-variants'

interface InputFieldProps {
  label: string
  type: string
  name: string
  placeholder?: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  withAsterisk?: boolean
  autoComplete?: string
  error?: string
  icon?: React.ReactNode
  textarea?: boolean
  maxLength?: number
}

const inputField = tv({
  base: [
    'block w-full rounded-xl border bg-white/80 py-3 text-slate-900 shadow-inner backdrop-blur transition-all duration-200 placeholder:text-slate-400/70 focus:outline-none',
  ],
  variants: {
    withIcon: {
      true: 'pl-10',
      false: 'pl-4',
    },
    withPassword: {
      true: 'pr-10',
      false: 'pr-4',
    },
    error: {
      true: 'border-red-300 bg-red-50/40 focus:border-red-400 focus:ring-2 focus:ring-red-200',
      false:
        'border-indigo-100/80 focus:border-indigo-400 focus:bg-white/90 focus:ring-2 focus:ring-indigo-200/60',
    },
  },
  defaultVariants: {
    withIcon: false,
    withPassword: false,
    error: false,
  },
})

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
  textarea = false,
  maxLength,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = type === 'password' && showPassword ? 'text' : type

  const togglePasswordVisibility = () => setShowPassword((v) => !v)

  return (
    <div className='relative'>
      {label && (
        <label
          htmlFor={name}
          className='mb-1 block text-sm font-semibold text-slate-700'
        >
          {label}
          {withAsterisk && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}

      {/* Input Container - Modern Skeuomorphic */}
      <div className='relative'>
        {textarea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            className={
              inputField({
                withIcon: !!icon,
                error: !!error,
              }) + ' min-h-[60px] resize-none py-2'
            }
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={inputType}
            placeholder={placeholder}
            className={inputField({
              withIcon: !!icon,
              withPassword: type === 'password',
              error: !!error,
            })}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            maxLength={maxLength}
          />
        )}

        {/* Left Icon */}
        {icon && !textarea && (
          <div className='absolute top-1/2 left-3 -translate-y-1/2'>{icon}</div>
        )}

        {/* Password Toggle Icon */}
        {type === 'password' && !textarea && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-indigo-500 transition-colors hover:text-indigo-700 focus:outline-none'
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={18} className='opacity-70 hover:opacity-100' />
            ) : (
              <Eye size={18} className='opacity-70 hover:opacity-100' />
            )}
          </button>
        )}
        <div className='pointer-events-none absolute inset-x-0 top-0 h-[30%] rounded-t-xl bg-white/30'></div>
      </div>
      {textarea && maxLength && (
        <div className='mt-1 text-right text-xs text-slate-400'>
          {value.length}/{maxLength}
        </div>
      )}
      {error && (
        <p
          id={`${name}-error`}
          className='animate-fade-in-slide mt-2 flex items-center text-xs text-red-600 transition-all duration-300'
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
