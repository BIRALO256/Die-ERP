import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900 antialiased selection:bg-[#c8102e]/10 selection:text-[#c8102e]">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-[#c8102e]"></div>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}