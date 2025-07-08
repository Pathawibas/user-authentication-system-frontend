import React, { useState, useEffect } from 'react'
import { User } from '../types/User'

// Issue 1: Component name doesn't follow PascalCase consistently
interface userProfileProps {
  user: User
  onUpdate?: (user: User) => void
}

// Issue 2: Missing display name and proper TypeScript
const UserProfile = (props: userProfileProps) => {
  // Issue 3: Destructuring props in function body instead of parameters
  const { user, onUpdate } = props
  
  // Issue 4: State that could be derived from props
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)
  const [errors, setErrors] = useState<string[]>([])
  
  // Issue 5: Missing dependency array
  useEffect(() => {
    setFormData(user)
  })
  
  // Issue 6: Function defined inside component that doesn't need to be
  const validateEmail = (email: string) => {
    // Issue 7: Weak email validation
    return email.includes('@')
  }
  
  // Issue 8: Async function without proper error handling
  const handleSave = async () => {
    const newErrors: string[] = []
    
    // Issue 9: Repetitive validation logic
    if (!formData.fullName || formData.fullName.length < 2) {
      newErrors.push('Name must be at least 2 characters')
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.push('Invalid email address')
    }
    
    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }
    
    try {
      // Issue 10: No loading state during save
      onUpdate?.(formData)
      setIsEditing(false)
      setErrors([])
    } catch (error) {
      // Issue 11: Generic error handling
      setErrors(['Something went wrong'])
    }
  }
  
  // Issue 12: Inline styles instead of CSS classes
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px 0'
  }
  
  // Issue 13: No memoization for expensive operations
  const processUserData = () => {
    return {
      ...formData,
      displayName: formData.fullName.toUpperCase(),
      initials: formData.fullName.split(' ').map(n => n[0]).join('')
    }
  }
  
  const processedData = processUserData()
  
  return (
    <div style={cardStyle}>
      {/* Issue 14: Missing semantic HTML */}
      <div>
        <div>User Profile</div>
        
        {/* Issue 15: No accessibility attributes */}
        {isEditing ? (
          <div>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder="Full Name"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email"
            />
            
            {/* Issue 16: Inline event handlers */}
            <button onClick={() => handleSave()}>Save</button>
            <button onClick={() => {
              setIsEditing(false)
              setFormData(user)
              setErrors([])
            }}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>Name: {processedData.displayName}</p>
            <p>Email: {formData.email}</p>
            <p>Initials: {processedData.initials}</p>
            
            {/* Issue 17: Button without proper accessibility */}
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
        
        {/* Issue 18: Poor error display */}
        {errors.length > 0 && (
          <div style={{color: 'red'}}>
            {errors.map((error, index) => (
              // Issue 19: Using array index as key
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Issue 20: Missing default export
export { UserProfile }

// Issue 21: Unused imports at the top
