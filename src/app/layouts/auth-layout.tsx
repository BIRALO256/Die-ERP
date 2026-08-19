import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding/Info */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-8 bg-muted">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            ERP System
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Streamline your business operations with our comprehensive enterprise resource planning solution.
          </p>
          <div className="mt-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Multi-tenant architecture</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Dynamic workflow engine</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span>Role-based permissions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mx-auto w-full max-w-sm">
          <Suspense 
            fallback={
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}