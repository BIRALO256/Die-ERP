import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { useSidebarStore } from '../../shared/stores/sidebar-store'
import { cn } from '../../shared/utils'

export function DashboardLayout() {
  const { isMobileOpen, closeMobile } = useSidebarStore()

  return (
    <div className="h-screen w-full overflow-hidden bg-[#f6f5f1] flex text-[#0e1f17] antialiased selection:bg-[#c8102e]/10 selection:text-[#c8102e] relative">
      {/* Desktop Persistent Fixed Sidebar (pinned h-screen, only internal nav list scrolls if long) */}
      <div className="hidden lg:flex shrink-0 h-screen z-20 select-none">
        <Sidebar isMobile={false} />
      </div>

      {/* Mobile Drawer Backdrop Blur Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden transition-opacity duration-300 animate-in fade-in cursor-pointer"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Off-Canvas Slide-over Drawer */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col h-screen",
          isMobileOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        )}
      >
        <Sidebar isMobile={true} />
      </div>
      
      {/* Main Content Area - Header pinned, only page content viewport scrolls */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Header - Fixed top */}
        <Header />
        
        {/* Page Content Viewport - Only this scrolls */}
        <main className="flex-1 overflow-y-auto bg-[#f6f5f1] min-w-0">
          <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
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