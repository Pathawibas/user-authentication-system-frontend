import { useState } from 'react'
import InputField from '../components/InputField'
import { validateRegisterForm } from '../utils/validation'
import { hashPassword } from '../utils/hash'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    bio: '',
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors = validateRegisterForm(formData)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')

    if (users.some((user: any) => user.email === formData.email)) {
      setFormErrors({ email: 'Email already registered.' })
      return
    }

    const hashedPassword = await hashPassword(formData.password)

    const newUser = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      password: hashedPassword,
      phone: formData.phone,
      bio: formData.bio,
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    alert('✅ Registration successful!')

    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      bio: '',
    })
    setFormErrors({})
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md'>
        {/* Decorative blurred shapes for skeuomorphic depth */}
        <div className='pointer-events-none absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-60 blur-2xl'></div>
        <div className='pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-200 via-white to-transparent opacity-40 blur-2xl'></div>
        <div className='pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 opacity-30 blur-3xl'></div>
        {/* Content */}
        <div className='relative z-10 w-full'>
          <h1 className='mb-6 text-center text-3xl font-extrabold text-slate-900 drop-shadow-sm'>
            Register
          </h1>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <InputField
              label='Full Name'
              name='fullName'
              type='text'
              placeholder='Your full name'
              value={formData.fullName}
              onChange={handleChange}
              withAsterisk
            />
            {formErrors.fullName && (
              <p className='text-sm text-red-500'>{formErrors.fullName}</p>
            )}
            <InputField
              label='Email'
              name='email'
              type='email'
              placeholder='you@example.com'
              value={formData.email}
              onChange={handleChange}
              withAsterisk
              autoComplete='email'
            />
            {formErrors.email && (
              <p className='text-sm text-red-500'>{formErrors.email}</p>
            )}
            <InputField
              label='Password'
              name='password'
              type='password'
              placeholder='Enter password'
              value={formData.password}
              onChange={handleChange}
              withAsterisk
              autoComplete='new-password'
            />
            {formErrors.password && (
              <p className='text-sm text-red-500'>{formErrors.password}</p>
            )}
            <InputField
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              placeholder='Confirm your password'
              value={formData.confirmPassword}
              onChange={handleChange}
              withAsterisk
              autoComplete='new-password'
            />
            {formErrors.confirmPassword && (
              <p className='text-sm text-red-500'>
                {formErrors.confirmPassword}
              </p>
            )}
            <InputField
              label='Phone Number (Optional)'
              name='phone'
              type='text'
              placeholder='0XXXXXXXXX'
              value={formData.phone}
              onChange={handleChange}
            />
            {formErrors.phone && (
              <p className='text-sm text-red-500'>{formErrors.phone}</p>
            )}
            <div>
              <label
                className='mb-1 block text-sm font-semibold text-slate-700 drop-shadow-sm'
                htmlFor='bio'
              >
                Bio (Optional, max 150 chars)
              </label>
              <textarea
                id='bio'
                name='bio'
                placeholder='Tell us about yourself'
                className='block w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-2 text-slate-900 shadow-inner backdrop-blur transition-all duration-150 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white/90 focus:ring-2 focus:ring-indigo-200/60 focus:outline-none'
                maxLength={150}
                value={formData.bio}
                onChange={handleChange}
              />
              {formErrors.bio && (
                <p className='text-sm text-red-500'>{formErrors.bio}</p>
              )}
            </div>
            <button
              type='submit'
              className='w-full cursor-pointer rounded-xl border border-indigo-300/30 bg-indigo-500/80 px-4 py-2 font-bold text-white shadow-inner backdrop-blur transition-colors duration-150 hover:bg-indigo-600/90'
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
