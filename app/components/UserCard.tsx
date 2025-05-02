import {
  Mail,
  Phone,
  KeyRound,
  FileText,
  Trash2,
  User as UserIcon,
  AlertTriangle,
} from 'lucide-react'
import ProfileInfoCard from './ProfileInfoCard'
import type { User } from '../types/User'
import { useNavigate } from 'react-router'
import UserInfoSection from './UserInfoSection'

interface UserCardProps {
  user: User
  onDelete: (id: string) => void
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  const navigate = useNavigate()

  return (
    <div className='relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_4px_32px_0_rgba(99,102,241,0.10)] backdrop-blur-md sm:flex-row sm:gap-8'>
      {/* Skeuomorphic blurred highlights */}
      <div className='pointer-events-none absolute -top-8 -left-8 h-20 w-20 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-100 to-transparent opacity-40 blur-2xl'></div>
      <div className='pointer-events-none absolute -right-8 -bottom-8 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-100 via-white to-transparent opacity-30 blur-xl'></div>
      {/* Avatar */}
      <div className='relative z-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-indigo-200 via-white to-indigo-100 shadow-inner'>
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt='Profile'
            className='h-20 w-20 rounded-full object-cover'
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        ) : (
          <UserIcon size={40} strokeWidth={1.5} className='text-indigo-400' />
        )}
      </div>
      {/* Info Cards */}
      <div className='relative z-10 w-full flex-1 space-y-3'>
        <UserInfoSection user={user} />
        {/* Delete button and Login as this user button */}
        <div className='flex justify-end gap-2'>
          <button
            onClick={() =>
              navigate(`/login?email=${encodeURIComponent(user.email)}`)
            }
            className='flex items-center gap-1 rounded-xl border border-indigo-200/40 bg-gradient-to-br from-indigo-400/80 via-indigo-500/80 to-indigo-600/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_0_rgba(99,102,241,0.10)] backdrop-blur transition-all duration-150 hover:scale-105 hover:bg-indigo-600/90 focus:ring-2 focus:ring-indigo-300/40 focus:outline-none active:scale-100'
            title='Login as this user'
          >
            <UserIcon size={16} className='text-white' /> Login as this user
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className='flex items-center gap-1 rounded-xl border border-red-200/40 bg-gradient-to-br from-red-400/80 via-red-500/80 to-red-600/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_2px_8px_0_rgba(239,68,68,0.10)] backdrop-blur transition-all duration-150 hover:scale-105 hover:bg-red-600/90 focus:ring-2 focus:ring-red-300/40 focus:outline-none active:scale-100'
            title='Delete user'
          >
            <Trash2 size={16} className='text-white' /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}
