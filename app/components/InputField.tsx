interface InputFieldProps {
  label: string
  type: string
  name: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  withAsterisk?: boolean
  autoComplete?: string
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
}: InputFieldProps) {
  return (
    <div className='w-full'>
      <label
        className='mb-1 block text-sm font-semibold text-slate-700 drop-shadow-sm'
        htmlFor={name}
      >
        {label} {withAsterisk && <span className='text-red-500'>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className='block w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-slate-900 shadow-inner backdrop-blur transition-all duration-150 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white/90 focus:ring-2 focus:ring-indigo-200/60 focus:outline-none'
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  )
}
