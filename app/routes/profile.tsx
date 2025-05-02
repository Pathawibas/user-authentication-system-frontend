import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

interface User {
  id: string
  fullName: string
  email: string
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      const decoded = JSON.parse(atob(token))
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const currentUser = users.find((u: User) => u.email === decoded.email)
      if (!currentUser) throw new Error('User not found')
      setUser(currentUser)
    } catch {
      localStorage.removeItem('authToken')
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className='mx-auto my-10 max-w-xl rounded-lg bg-white p-8 shadow-md'>
      <h1 className='mb-6 text-center text-2xl font-bold'>👤 Profile</h1>
      <p className='mb-2'>
        <strong>Full Name:</strong> {user.fullName}
      </p>
      <p className='mb-4'>
        <strong>Email:</strong> {user.email}
      </p>
      <button
        onClick={handleLogout}
        className='w-full rounded-md bg-red-500 px-4 py-2 font-bold text-white shadow-sm hover:bg-red-600'
      >
        Logout
      </button>
    </div>
  )
}
