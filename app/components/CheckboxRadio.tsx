import React from 'react'

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
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-md border bg-white shadow-inner transition-colors duration-150 ${error ? 'border-red-400 peer-focus:ring-2 peer-focus:ring-red-300' : 'border-slate-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 peer-focus:ring-2 peer-focus:ring-indigo-400 peer-focus:ring-offset-2'}`}
        >
          {props.checked && (
            <svg
              width='16'
              height='16'
              viewBox='0 0 20 20'
              fill='none'
              className='text-white'
            >
              <path
                d='M5 10.5L9 14.5L15 7.5'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
        </span>
        <span
          className={`text-sm ${error ? 'text-red-600' : 'text-slate-700'}`}
        >
          {label}
        </span>
      </label>
      {error && (
        <span
          id={`${props.id || props.name}-error`}
          className='mt-1 block text-xs text-red-600'
        >
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
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border bg-white shadow-inner transition-colors duration-150 ${error ? 'border-red-400 peer-focus:ring-2 peer-focus:ring-red-300' : 'border-slate-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-500 peer-focus:ring-2 peer-focus:ring-indigo-400 peer-focus:ring-offset-2'}`}
        >
          {props.checked && (
            <span className='block h-2.5 w-2.5 rounded-full bg-white' />
          )}
        </span>
        <span
          className={`text-sm ${error ? 'text-red-600' : 'text-slate-700'}`}
        >
          {label}
        </span>
      </label>
      {error && (
        <span
          id={`${props.id || props.name}-error`}
          className='mt-1 block text-xs text-red-600'
        >
          {error}
        </span>
      )}
    </>
  )
}
