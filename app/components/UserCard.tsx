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
    <div className='relative rounded-md border p-4 shadow-sm'>
      <h2 className='text-lg font-semibold text-gray-900'>{user.fullName}</h2>
      <p className='text-sm text-gray-600'>{user.email}</p>
      {user.phone && <p className='text-sm text-gray-600'>📞 {user.phone}</p>}
      {user.bio && <p className='text-sm text-gray-600 italic'>"{user.bio}"</p>}
      <p className='mt-2 text-xs break-all text-gray-500'>
        Hashed Password: <code>{user.password}</code>
      </p>
      <button
        onClick={() => onDelete(user.id)}
        className='absolute top-2 right-2 cursor-pointer rounded bg-red-500 px-2 py-1 text-xs text-white select-none hover:bg-red-600'
      >
        Delete
      </button>
    </div>
  )
}
