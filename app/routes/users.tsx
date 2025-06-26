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
  const [searchName, setSearchName] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 5

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(storedUsers)
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesName = user.fullName
      .toLowerCase()
      .includes(searchName.toLowerCase())
    const matchesEmail = user.email === searchEmail
    return matchesName && (!searchEmail || matchesEmail)
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((user) => user.id !== userId)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      setUsers(updatedUsers)
    }
  }

  return (
    <div className='mx-auto max-w-3xl p-6'>
      <h1 className='mb-6 text-center text-2xl font-bold'>Users</h1>

      <div className='mb-4 flex space-x-2'>
        <input
          type='text'
          placeholder='Search by name'
          className='w-1/2 rounded border px-4 py-2'
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value)
            setCurrentPage(1)
          }}
        />
        <input
          type='text'
          placeholder='Search by email (exact)'
          className='w-1/2 rounded border px-4 py-2'
          value={searchEmail}
          onChange={(e) => {
            setSearchEmail(e.target.value)
            setCurrentPage(1)
          }}
        />
      </div>

      <div className='space-y-4'>
        {displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))
        ) : (
          <p className='text-gray-600'>No users found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className='mt-6 flex justify-center space-x-2'>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`cursor-pointer rounded px-3 py-1 select-none ${
              currentPage === page
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}
