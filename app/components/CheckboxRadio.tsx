import React from 'react'
import { Check } from 'lucide-react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  error?: string
}

export function Checkbox({
  label,
  className = '',
  error,
  ...props
}: CheckboxProps) {
  return (
    <>
      <label
        className={`inline-flex cursor-pointer items-center gap-2 select-none ${className}`}
      >
        <input
          type='checkbox'
          className={`peer absolute h-0 w-0 opacity-0`}
          {...props}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${props.id || props.name}-error` : undefined
          }
        />

        {/* Modern Skeuomorphic Checkbox */}
        <span
          className={`relative flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-150 ${
            error
              ? 'border-red-400 bg-red-50/50 peer-focus:ring-2 peer-focus:ring-red-300'
              : `border-indigo-200 bg-white/80 shadow-inner backdrop-blur-sm peer-checked:border-indigo-500 peer-checked:bg-gradient-to-b peer-checked:from-indigo-400/90 peer-checked:to-indigo-500/90 peer-hover:border-indigo-300 peer-focus:ring-2 peer-focus:ring-indigo-300 peer-focus:ring-offset-1 peer-active:translate-y-[0.5px] peer-active:shadow-inner`
          }`}
        >
          {/* Top Highlight - More subtle now */}
          <span className='pointer-events-none absolute inset-x-0 top-0 h-[35%] rounded-t-sm bg-white/30 opacity-70'></span>

          {/* Checkmark with Animation */}
          {props.checked && (
            <Check
              size={14}
              strokeWidth={2.5}
              className='animate-[fadeIn_0.15s_ease-in-out] text-white drop-shadow-sm'
            />
          )}
        </span>

        <span
          className={`text-sm ${error ? 'text-red-600' : 'text-slate-700'}`}
        >
          {label}
        </span>
      </label>

      {/* Error Message */}
      {error && (
        <span
          id={`${props.id || props.name}-error`}
          className='mt-2 block flex items-center text-xs text-red-600'
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
        </span>
      )}
    </>
  )
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  error?: string
}

export function Radio({ label, className = '', error, ...props }: RadioProps) {
  return (
    <>
      <label
        className={`inline-flex cursor-pointer items-center gap-2 select-none ${className}`}
      >
        <input
          type='radio'
          className='peer absolute h-0 w-0 opacity-0'
          {...props}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${props.id || props.name}-error` : undefined
          }
        />

        {/* Modern Skeuomorphic Radio Button */}
        <span
          className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-150 ${
            error
              ? 'border-red-400 bg-red-50/50 peer-focus:ring-2 peer-focus:ring-red-300'
              : `border-indigo-200 bg-white/80 shadow-inner backdrop-blur-sm peer-checked:border-indigo-500 peer-checked:bg-gradient-to-b peer-checked:from-indigo-400/90 peer-checked:to-indigo-500/90 peer-hover:border-indigo-300 peer-focus:ring-2 peer-focus:ring-indigo-300 peer-focus:ring-offset-1 peer-active:translate-y-[0.5px] peer-active:shadow-inner`
          }`}
        >
          {/* Top Highlight - More subtle now */}
          <span className='pointer-events-none absolute inset-x-0 top-0 h-[35%] rounded-t-full bg-white/30 opacity-70'></span>

          {/* Radio Indicator with Animation */}
          {props.checked && (
            <span className='block h-2.5 w-2.5 animate-[fadeIn_0.15s_ease-in-out] rounded-full bg-white shadow-sm' />
          )}
        </span>

        <span
          className={`text-sm ${error ? 'text-red-600' : 'text-slate-700'}`}
        >
          {label}
        </span>
      </label>

      {/* Error Message */}
      {error && (
        <span
          id={`${props.id || props.name}-error`}
          className='mt-2 block flex items-center text-xs text-red-600'
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
        </span>
      )}
    </>
  )
}
