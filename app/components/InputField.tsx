interface InputFieldProps {
  label: string
  type: string
  name: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  withAsterisk?: boolean
  autoComplete?: string
  error?: string // Add error prop
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
}: InputFieldProps) {
  return (
    <div className='w-full'>
      <label
        className={`mb-1 block text-sm font-semibold drop-shadow-sm ${error ? 'text-red-600' : 'text-slate-700'}`}
        htmlFor={name}
      >
        {label} {withAsterisk && <span className='text-red-500'>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`block w-full rounded-xl border bg-white/70 px-4 py-2 text-slate-900 shadow-inner backdrop-blur transition-all duration-150 placeholder:text-slate-400 focus:outline-none ${error ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-300' : 'border-slate-200 focus:border-indigo-400 focus:bg-white/90 focus:ring-2 focus:ring-indigo-200/60'}`}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className='mt-1 text-xs text-red-600'>
          {error}
        </p>
      )}
    </div>
  )
}
