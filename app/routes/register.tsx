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
    <div className='mx-auto my-10 max-w-lg rounded-lg bg-white p-8 shadow-md'>
      <h1 className='mb-6 text-center text-2xl font-bold text-gray-900'>
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
        />
        {formErrors.confirmPassword && (
          <p className='text-sm text-red-500'>{formErrors.confirmPassword}</p>
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
            className='mb-1 block text-sm font-medium text-gray-700'
            htmlFor='bio'
          >
            Bio (Optional, max 150 chars)
          </label>
          <textarea
            id='bio'
            name='bio'
            placeholder='Tell us about yourself'
            className='block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
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
          className='w-full rounded-md bg-indigo-500 px-4 py-2 font-bold text-white shadow-sm hover:bg-indigo-600'
        >
          Register
        </button>
      </form>
    </div>
  )
}
