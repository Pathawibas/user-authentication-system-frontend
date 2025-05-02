import ProfileInfoCard from './ProfileInfoCard'
import { userInfoConfig } from './userInfoConfig'

interface UserInfoSectionProps {
  user: any
  className?: string
  children?: React.ReactNode
}

export default function UserInfoSection({
  user,
  className = '',
  children,
}: UserInfoSectionProps) {
  return (
    <div className={`w-full space-y-4 ${className}`}>
      {userInfoConfig.map((field) => {
        // Special rendering for gender, interests, and receiveNewsletter
        if (field.key === 'gender') {
          return (
            <ProfileInfoCard
              key={field.key}
              icon={field.icon}
              label={field.label}
              value={
                user.gender ? (
                  user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                ) : (
                  <span className='text-gray-400 italic'>
                    No gender specified
                  </span>
                )
              }
            />
          )
        }
        if (field.key === 'interests') {
          return (
            <ProfileInfoCard
              key={field.key}
              icon={field.icon}
              label={field.label}
              value={
                Array.isArray(user.interests) && user.interests.length > 0 ? (
                  user.interests.join(', ')
                ) : (
                  <span className='text-gray-400 italic'>No interests</span>
                )
              }
            />
          )
        }
        if (field.key === 'receiveNewsletter') {
          return (
            <ProfileInfoCard
              key={field.key}
              icon={field.icon}
              label={field.label}
              value={
                user.receiveNewsletter ? (
                  'Yes'
                ) : (
                  <span className='text-gray-400 italic'>No</span>
                )
              }
            />
          )
        }
        return (
          <ProfileInfoCard
            key={field.key}
            icon={field.icon}
            label={field.label}
            isSpoiler={field.isSpoiler}
            spoilerLabel={field.spoilerLabel}
            value={field.render ? field.render(user) : user[field.key]}
          />
        )
      })}
      {children}
    </div>
  )
}
