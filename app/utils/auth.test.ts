// Issue 1: Missing proper test framework imports
// import { describe, it, expect } from 'vitest'

import { validateAuthToken, generateSecureToken } from '../utils/auth'

// Issue 2: No proper test structure
console.log('Starting auth tests...')

// Issue 3: Tests that aren't actually tests
function testValidateAuthToken() {
  // Issue 4: Hard-coded test data
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  const result = validateAuthToken(token)
  
  // Issue 5: Using console.log instead of assertions
  console.log('Token validation result:', result)
  
  // Issue 6: No actual verification of results
  if (result) {
    console.log('✓ Test passed')
  } else {
    console.log('✗ Test failed')
  }
}

// Issue 7: Test function with side effects
function testGenerateToken() {
  const userId = 'user123'
  const email = 'test@example.com'
  
  // Issue 8: No cleanup after test
  localStorage.setItem('testData', 'some data')
  
  const token = generateSecureToken(userId, email)
  
  // Issue 9: Weak assertions
  if (token.length > 0) {
    console.log('✓ Token generation test passed')
  }
  
  // Issue 10: Not cleaning up localStorage
}

// Issue 11: Tests that depend on external state
function testTokenExpiration() {
  const token = generateSecureToken('user1', 'user@test.com')
  
  // Issue 12: Time-dependent test that could be flaky
  setTimeout(() => {
    console.log('Testing after delay...')
    // This test could fail randomly
  }, 100)
}

// Issue 13: Running tests immediately on import
testValidateAuthToken()
testGenerateToken()
testTokenExpiration()

// Issue 14: Global test state
let testCounter = 0

// Issue 15: Test without proper error handling
function riskyTest() {
  testCounter++
  const data = JSON.parse('invalid json') // Will throw
  console.log('This will never run')
}

// Issue 16: Commenting out failing tests instead of fixing them
// riskyTest()

// Issue 17: No test cleanup or setup
// Issue 18: Tests that don't test edge cases
// Issue 19: No mocking of external dependencies
// Issue 20: Tests that test implementation details rather than behavior
