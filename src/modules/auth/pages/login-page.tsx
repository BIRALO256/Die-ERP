import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card'
import { useAuthStore } from '../../../infrastructure/auth/auth-store'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setIsLoading(true)
    
    // Mock login - replace with real API call
    setTimeout(() => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        roles: ['admin', 'financial_manager'],
        tenantId: 'tenant-1'
      }
      
      const mockTenant = {
        id: 'tenant-1',
        name: 'Acme Corp',
        slug: 'acme-corp',
        plan: 'enterprise',
        settings: {}
      }
      
      login(mockUser, mockTenant, 'mock-token')
      navigate('/')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            defaultValue="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            defaultValue="password"
          />
        </div>
        <Button 
          onClick={handleLogin} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </CardContent>
    </Card>
  )
}