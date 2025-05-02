interface User {
  id: string
  fullName: string
  email: string
  password: string
  phone?: string
  bio?: string
}

interface UserCardProps {
  user: User
  onDelete: (id: string) => void
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <div className='relative rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg'>
      <h2 className='text-xl font-bold text-gray-800'>{user.fullName}</h2>
      <p className='text-sm text-gray-500'>{user.email}</p>
      {user.phone && <p className='text-sm text-gray-500'>📞 {user.phone}</p>}
      {user.bio && (
        <p className='mt-2 text-sm text-gray-600 italic'>"{user.bio}"</p>
      )}
      <p className='mt-4 text-xs break-all text-gray-400'>
        Hashed Password: <code>{user.password}</code>
      </p>
      <button
        onClick={() => onDelete(user.id)}
        className='absolute top-4 right-4 cursor-pointer rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 hover:bg-red-600'
      >
        Delete
      </button>
    </div>
  )
}
