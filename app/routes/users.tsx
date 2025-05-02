import { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'

interface User {
  id: string
  fullName: string
  email: string
  password: string
  phone?: string
  bio?: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(storedUsers)
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className='mx-auto max-w-3xl p-6'>
      <h1 className='mb-6 text-center text-2xl font-bold'>Users</h1>

      <input
        type='text'
        placeholder='Search by name or email'
        className='mb-4 w-full rounded border px-4 py-2'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='space-y-4'>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p className='text-gray-600'>No users found.</p>
        )}
      </div>
    </div>
  )
}
