interface InputFieldProps {
  type: string
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputField({
  type,
  name,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className='w-full rounded border px-3 py-2'
      value={value}
      onChange={onChange}
    />
  )
}
