import { useState } from 'react'
import InputField from '../components/InputField'
import { validateRegisterForm } from '../utils/validation'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors = validateRegisterForm(formData)
    if (Object.keys(errors).length > 0) {
      console.log(errors) // Later display these clearly to the user
    } else {
      console.log('Form is valid:', formData)
      // Later save to localStorage clearly here
    }
  }

  return (
    <div className='mx-auto max-w-md py-12'>
      <h1 className='mb-6 text-center text-2xl font-bold'>Register</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <InputField
          name='fullName'
          type='text'
          placeholder='Full Name'
          value={formData.fullName}
          onChange={handleChange}
        />
        <InputField
          name='email'
          type='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          name='password'
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button
          type='submit'
          className='w-full rounded bg-blue-500 py-2 font-bold text-white hover:bg-blue-600'
        >
          Register
        </button>
      </form>
    </div>
  )
}
