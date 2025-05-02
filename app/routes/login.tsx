import { useState } from 'react'
import { useNavigate } from 'react-router'
import InputField from '../components/InputField'
import { verifyPassword } from '../utils/hash'

interface User {
  id: string
  email: string
  password: string
  fullName: string
}

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u) => u.email === formData.email)

    if (!user) {
      setError('User not found.')
      return
    }

    const isPasswordValid = await verifyPassword(
      formData.password,
      user.password,
    )

    if (!isPasswordValid) {
      setError('Incorrect password.')
      return
    }

    // Generate simple token
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }))
    if (rememberMe) {
      localStorage.setItem('authToken', token)
    } else {
      sessionStorage.setItem('authToken', token)
    }

    navigate('/profile')
  }

  return (
    <div className='mx-auto my-10 max-w-lg rounded-lg bg-white p-8 shadow-md'>
      <h1 className='mb-6 text-center text-2xl font-bold'>Login</h1>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <InputField
          label='Email'
          name='email'
          type='email'
          placeholder='your@email.com'
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          label='Password'
          name='password'
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
        />

        <div className='mb-4 flex items-center'>
          <input
            type='checkbox'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
          />
          <label className='ml-2 text-sm text-gray-700'>Remember Me</label>
        </div>

        {error && <p className='text-sm text-red-500'>{error}</p>}

        <button
          type='submit'
          className='w-full cursor-pointer rounded-md bg-indigo-500 px-4 py-2 font-bold text-white shadow-sm select-none hover:bg-indigo-600'
        >
          Login
        </button>
      </form>
    </div>
  )
}
