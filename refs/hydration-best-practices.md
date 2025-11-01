# Next.js Hydration Best Practices

## Overview
Hydration is the process where React takes over the server-rendered HTML and makes it interactive. Hydration mismatches occur when the client-side React tree differs from the server-rendered HTML, leading to errors and poor user experience.

## Common Hydration Issues

### 1. Client-Only Code in Server Components
**❌ Problematic:**
```tsx
// This will cause hydration mismatch
function MyComponent() {
  const timestamp = new Date().toISOString() // Different on server vs client
  return <div>{timestamp}</div>
}
```

**✅ Solution:**
```tsx
'use client'
import { useState, useEffect } from 'react'

function MyComponent() {
  const [timestamp, setTimestamp] = useState<string>('')

  useEffect(() => {
    setTimestamp(new Date().toISOString())
  }, [])

  return <div>{timestamp || 'Loading...'}</div>
}
```

### 2. Browser-Specific APIs
**❌ Problematic:**
```tsx
function MyComponent() {
  const userAgent = window.navigator.userAgent // window not available on server
  return <div>{userAgent}</div>
}
```

**✅ Solution:**
```tsx
'use client'
import { useState, useEffect } from 'react'

function MyComponent() {
  const [userAgent, setUserAgent] = useState<string>('')

  useEffect(() => {
    setUserAgent(window.navigator.userAgent)
  }, [])

  return <div>{userAgent}</div>
}
```

### 3. Dynamic Content Based on Client State
**❌ Problematic:**
```tsx
function ThemeToggle() {
  const theme = localStorage.getItem('theme') // Not available on server
  return <button>{theme === 'dark' ? '☀️' : '🌙'}</button>
}
```

**✅ Solution:**
```tsx
'use client'
import { useState, useEffect } from 'react'

function ThemeToggle() {
  const [theme, setTheme] = useState<string>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTheme(localStorage.getItem('theme') || 'light')
  }, [])

  if (!mounted) {
    return <button>🌙</button> // Consistent server render
  }

  return <button>{theme === 'dark' ? '☀️' : '🌙'}</button>
}
```

## Best Practices

### 1. Use Server Components by Default
- Start with Server Components for better performance
- Only add `'use client'` when you need interactivity
- Keep the client boundary as small as possible

### 2. Suppress Hydration Warnings When Necessary
For content that will always be different (like timestamps):
```tsx
<div suppressHydrationWarning>{new Date().toISOString()}</div>
```

### 3. Use the Two-Pass Rendering Pattern
For complex client-side content:
```tsx
'use client'
import { useState, useEffect } from 'react'

function ClientOnlyComponent() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <div>Loading...</div> // Server-safe fallback
  }

  return <div>{/* Client-specific content */}</div>
}
```

### 4. Handle User Preferences Carefully
```tsx
'use client'
import { useState, useEffect } from 'react'

function UserPreferences() {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en'
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem('preferences')
    if (saved) {
      setPreferences(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <div>Setting up preferences...</div>
  }

  return <div>Theme: {preferences.theme}</div>
}
```

### 5. Use Dynamic Imports for Client-Only Components
```tsx
import dynamic from 'next/dynamic'

const ClientOnlyComponent = dynamic(
  () => import('./ClientOnlyComponent'),
  { ssr: false }
)

function Page() {
  return (
    <div>
      <h1>Server Rendered Content</h1>
      <ClientOnlyComponent />
    </div>
  )
}
```

### 6. Handle Form State Properly
```tsx
'use client'
import { useState } from 'react'

function ContactForm() {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  })

  // Always render the same initial state on server and client
  return (
    <form>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
      />
      <textarea
        value={formData.message}
        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
        placeholder="Message"
      />
      <button type="submit">Send</button>
    </form>
  )
}
```

## Testing for Hydration Issues

### 1. Check Development Console
Look for hydration warnings in the browser console:
```
Warning: Text content did not match. Server: "X" Client: "Y"
```

### 2. Disable JavaScript
Test your app with JavaScript disabled to see what renders on the server.

### 3. Use React DevTools
The React DevTools Profiler can help identify hydration mismatches.

### 4. Audit Commands
```bash
# Check for client-side only patterns
rg "'use client'" --type tsx
rg "window\.|localStorage\.|sessionStorage\." --type tsx
rg "document\." --type tsx

# Look for potential hydration issues
rg "useEffect.*\[\]" --type tsx  # Check empty dependency effects
rg "new Date\(\)" --type tsx     # Time-based content
```

## Project-Specific Guidelines

### OTP Verification
```tsx
'use client'
// Good: Properly handle OTP input state
function OTPForm() {
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Verifying...' : 'Verify'}
      </button>
    </form>
  )
}
```

### Questionnaire State
```tsx
'use client'
// Good: Initialize state consistently
function QuestionnaireStep() {
  const [answers, setAnswers] = useState<Record<string, any>>({})

  // Don't access localStorage directly in render
  useEffect(() => {
    const saved = localStorage.getItem('questionnaire-progress')
    if (saved) {
      setAnswers(JSON.parse(saved))
    }
  }, [])

  return (
    <div>
      {/* Form fields */}
    </div>
  )
}
```

## Troubleshooting

1. **Hydration mismatch on initial load**: Use the two-pass rendering pattern
2. **Content flashing**: Implement proper loading states
3. **Form inputs losing focus**: Ensure consistent component keys
4. **State not persisting**: Check client/server boundary placement

## Performance Considerations

- Minimize client components
- Use Server Actions for form submissions
- Implement proper loading states
- Avoid unnecessary re-renders during hydration