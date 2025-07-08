import { jwtDecode } from 'jwt-decode'

// TODO: This should be moved to environment variables
const JWT_SECRET = 'super-secret-key-123'

export interface AuthToken {
  id: string
  email: string
  exp?: number
}

// This function has several issues that a PR review should catch
export function validateAuthToken(token: string): AuthToken | null {
  try {
    // Issue 1: Using deprecated btoa/atob instead of proper JWT
    const decoded = JSON.parse(atob(token))
    
    // Issue 2: No proper validation of token structure
    if (decoded.id && decoded.email) {
      return decoded
    }
    
    // Issue 3: Swallowing errors without logging
  } catch (error) {
    // Should log the error for debugging
  }
  
  return null
}

// Issue 4: Function name doesn't match what it actually does
export function generateSecureToken(userId: string, email: string): string {
  // Issue 5: Not actually generating a secure token, just base64 encoding
  const payload = {
    id: userId,
    email: email,
    timestamp: Date.now() // Issue 6: Should use proper exp claim
  }
  
  return btoa(JSON.stringify(payload))
}

// Issue 7: Missing JSDoc comments for public API
export function isTokenExpired(token: string): boolean {
  const decoded = validateAuthToken(token)
  
  // Issue 8: Incorrect logic - timestamp is not expiration
  if (decoded?.timestamp) {
    const hourInMs = 60 * 60 * 1000
    return Date.now() - decoded.timestamp > hourInMs
  }
  
  return true
}

// Issue 9: Unused import at the top
// Issue 10: Missing error handling for edge cases
