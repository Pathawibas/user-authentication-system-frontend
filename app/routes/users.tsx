import { useEffect, useState } from 'react'
import UserCard from '../components/UserCard'
import InputField from '../components/InputField'

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

  // Updated design for the user page
  return (
    <div className='mx-auto max-w-4xl rounded-lg bg-gray-50 p-8 shadow-lg'>
      <h1 className='mb-8 text-center text-3xl font-extrabold text-indigo-600'>
        User Management
      </h1>

      <div className='mb-6 flex flex-col md:flex-row md:space-x-4'>
        <InputField
          type='text'
          placeholder='Search by name'
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value)
            setCurrentPage(1)
          }}
          label={''}
          name={'Search by name'}
        />
        <InputField
          type='text'
          placeholder='Search by email (exact)'
          value={searchEmail}
          onChange={(e) => {
            setSearchEmail(e.target.value)
            setCurrentPage(1)
          }}
          label={''}
          name={'Search by email (exact)'}
        />
      </div>

      <div className='space-y-6'>
        {displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))
        ) : (
          <p className='text-center text-gray-500'>No users found.</p>
        )}
      </div>

      <div className='mt-8 flex justify-center space-x-2'>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium shadow-md transition-all duration-200 select-none ${
              currentPage === page
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}
