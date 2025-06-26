interface InputFieldProps {
  label: string
  type: string
  name: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isRequired?: boolean
}

export default function InputField({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  isRequired: withAsterisk = false,
}: InputFieldProps) {
  console.log('InputField rendered:', { label, type, name, value })

  const halperText = {
    fullName: 'Enter your full name',
  }

  return (
    <div>
      <label
        className='mb-1 block text-sm font-medium text-gray-700'
        htmlFor={name}
      >
        {label} {withAsterisk && <span className='text-red-500'>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-indigo-500'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
