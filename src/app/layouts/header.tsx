import { 
  Bell, 
  User, 
  Search, 
  Shield, 
  Sliders, 
  Menu, 
  PanelLeftOpen, 
  PanelLeftClose, 
  ChevronDown, 
  LogOut, 
  ShieldCheck
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../shared/components/ui/button'
import { Card } from '../../shared/components/ui/card'
import { useSidebarStore } from '../../shared/stores/sidebar-store'
import drSarahAvatar from '../../assets/dr-sarah-nakato.jpg'

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { isCollapsed, toggleCollapsed, toggleMobile } = useSidebarStore()

  return (
    <header className="h-16 bg-white border-b border-[#e3e1da] flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
      {/* Left side - Sidebar Toggles & Search */}
      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 max-w-lg min-w-0">
        {/* Mobile Hamburger Menu Toggle (< lg) */}
        <button
          type="button"
          onClick={toggleMobile}
          className="lg:hidden p-2 -ml-1 text-slate-500 hover:text-[#0e1f17] hover:bg-[#f6f5f1] rounded-xl transition-colors shrink-0 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop Sidebar Collapse Toggle (>= lg) */}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="hidden lg:flex p-2 text-slate-400 hover:text-[#0e1f17] hover:bg-[#f6f5f1] rounded-xl transition-colors shrink-0 cursor-pointer"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label="Toggle sidebar collapse"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4.5 w-4.5" />
          ) : (
            <PanelLeftClose className="h-4.5 w-4.5" />
          )}
        </button>

        {/* Enhanced Search Input */}
        <div className="relative w-full min-w-0 max-w-xs sm:max-w-sm md:max-w-md group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-[#c8102e] transition-colors pointer-events-none" />
          <input
            type="text"
            placeholder="Search batches, orders, materials, compliance..."
            className="w-full pl-9.5 pr-14 py-2 text-xs rounded-xl border border-[#e3e1da] bg-[#f6f5f1] text-[#0e1f17] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#143d1d]/20 focus:border-[#143d1d] transition-all truncate"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex items-center space-x-0.5 pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200/90 rounded-md shadow-2xs">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
        {/* Live Facility Telemetry Badge */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white border border-[#c8c5bc]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold text-[#143d1d] tracking-tight">
            GMP Line 1-12 Active
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowUserMenu(false)
            }}
            className="relative h-9.5 w-9.5 rounded-xl hover:bg-[#f6f5f1] text-slate-500 cursor-pointer transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-[#c8102e] rounded-full ring-2 ring-white"></span>
          </Button>
          
          {showNotifications && (
            <Card className="absolute right-0 top-full mt-2 w-80 sm:w-88 max-w-[calc(100vw-2rem)] z-50 shadow-xl border border-[#e3e1da] bg-white p-0 overflow-hidden rounded-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 border-b border-[#e3e1da] flex items-center justify-between bg-[#f6f5f1]">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-[#c8102e]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Enterprise Alerts
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#c8102e]/10 text-[#c8102e]">
                  3 New
                </span>
              </div>

              <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
                <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#f6f5f1] transition-colors cursor-pointer">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      mRNA Batch #BP-2024-8847 Approved
                    </p>
                    <p className="text-[11px] text-slate-500">Quality Assurance • 5m ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#f6f5f1] transition-colors cursor-pointer">
                  <div className="h-2 w-2 bg-[#c8102e] rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Cold-Chain Fleet Alert (-72°C Verified)
                    </p>
                    <p className="text-[11px] text-slate-500">Logistics • 25m ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-[#f6f5f1] transition-colors cursor-pointer">
                  <div className="h-2 w-2 bg-amber-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Raw Materials PO #1247 Awaiting Sign-off
                    </p>
                    <p className="text-[11px] text-slate-500">Procurement • 1h ago</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* User Profile - Elevated Executive Avatar */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(!showUserMenu)
              setShowNotifications(false)
            }}
            className="flex items-center space-x-2.5 sm:space-x-3 p-1 sm:px-2 sm:py-1.5 rounded-xl hover:bg-[#f6f5f1] transition-all border border-transparent hover:border-[#e3e1da] cursor-pointer group"
            aria-label="User profile menu"
          >
            {/* Avatar image with active online indicator ring */}
            <div className="relative shrink-0">
              <img
                src={drSarahAvatar}
                alt="Dr. Sarah Nakato"
                className="h-8.5 w-8.5 rounded-xl object-cover object-top ring-2 ring-[#143d1d]/60 ring-offset-1 ring-offset-white shadow-xs group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-[#0e1f17] leading-tight group-hover:text-[#143d1d] transition-colors">
                Dr. Sarah Nakato
              </p>
              <p className="text-[10.5px] font-medium text-slate-500">
                Research Director (Admin)
              </p>
            </div>

            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block group-hover:text-slate-700 transition-colors" />
          </button>

          {showUserMenu && (
            <Card className="absolute right-0 top-full mt-2 w-64 z-50 shadow-xl border border-[#e3e1da] bg-white p-1.5 rounded-2xl animate-in fade-in zoom-in-95 duration-150">
              {/* Profile Card Header */}
              <div className="p-3 border-b border-[#e3e1da] mb-1 bg-[#f6f5f1] rounded-xl">
                <div className="flex items-center space-x-3">
                  <img
                    src={drSarahAvatar}
                    alt="Dr. Sarah Nakato"
                    className="h-10 w-10 rounded-xl object-cover object-top ring-2 ring-[#143d1d]/50 shadow-xs shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">Dr. Sarah Nakato</p>
                    <p className="text-[11px] text-slate-500 truncate">sarah.nakato@deibiopharma.com</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 mt-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Active Session • Matugga HQ
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Links */}
              <div className="space-y-0.5">
                <button 
                  type="button"
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#f6f5f1] text-slate-600 hover:text-[#0e1f17] transition-colors cursor-pointer"
                >
                  <User className="h-3.5 w-3.5 text-slate-500" />
                  <span>Executive Profile</span>
                </button>
                <button 
                  type="button"
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#f6f5f1] text-slate-600 hover:text-[#0e1f17] transition-colors cursor-pointer"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                  <span>Facility Access & Sign-off</span>
                </button>
                <button 
                  type="button"
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#f6f5f1] text-slate-600 hover:text-[#0e1f17] transition-colors cursor-pointer"
                >
                  <Sliders className="h-3.5 w-3.5 text-slate-500" />
                  <span>System Preferences</span>
                </button>
              </div>

              {/* Sign Out Divider */}
              <div className="border-t border-slate-100 my-1 pt-1">
                <button 
                  type="button"
                  className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-red-50 text-slate-600 hover:text-[#c8102e] transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#c8102e]" />
                  <span>Sign Out</span>
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Backdrop overlay for open popups */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false)
            setShowNotifications(false)
          }}
        />
      )}
    </header>
  )
}