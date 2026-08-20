import { 
  Bell, 
  User, 
  Sliders, 
  Menu, 
  PanelLeftOpen, 
  PanelLeftClose, 
  LogOut, 
  ShieldCheck
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../shared/components/ui/button'
import { Card } from '../../shared/components/ui/card'
import { useSidebarStore } from '../../shared/stores/sidebar-store'
import { useFacilityStore } from '../../shared/stores/facility-store'
import { usePermission } from '../../shared/hooks/use-permission'
import { FacilitySwitcher } from '../../shared/components/facility-switcher'
import { cn } from '../../shared/utils'
import drSarahAvatar from '../../assets/dr-sarah-nakato.jpg'

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { isCollapsed, toggleCollapsed, toggleMobile } = useSidebarStore()
  const { getActiveFacility } = useFacilityStore()
  const { roleTitle } = usePermission()
  const activeFacility = getActiveFacility()

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
      {/* Left — Sidebar toggle + Facility Switcher */}
      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
        <button
          type="button"
          onClick={toggleMobile}
          className="lg:hidden p-1.5 text-slate-400 hover:text-foreground hover:bg-background rounded-lg transition-colors shrink-0 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <button
          type="button"
          onClick={toggleCollapsed}
          className="hidden lg:flex p-1.5 text-slate-400 hover:text-foreground hover:bg-background rounded-lg transition-colors shrink-0 cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label="Toggle sidebar collapse"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>

        {/* Facility Context Switcher */}
        <FacilitySwitcher />
      </div>

      {/* Right — Status · Bell · Avatar */}
      <div className="flex items-center space-x-3 shrink-0">

        {/* Live Facility Status */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium text-slate-400 tracking-tight">
            {activeFacility.statusLabel}
          </span>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-4 bg-border" />

        {/* Bell — no red dot. Red is reserved for brand CTAs.
            The dropdown itself shows the count when opened.
        */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowUserMenu(false)
            }}
            className="relative h-8 w-8 rounded-lg hover:bg-background text-slate-400 hover:text-foreground cursor-pointer transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {/* Subtle unread indicator — 1.5px, no red ring */}
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-slate-400 rounded-full" />
          </Button>

          {showNotifications && (
            <Card className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] z-50 shadow-lg border border-border bg-white p-0 overflow-hidden rounded-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <p className="text-xs font-bold text-foreground">Alerts</p>
                <span className="text-[10px] font-semibold text-slate-400">3 unread</span>
              </div>
              <div className="divide-y divide-secondary">
                {[
                  { dot: 'bg-emerald-500', title: 'mRNA Batch #BP-2024-8847 Approved',      meta: 'Quality Assurance · 5m ago' },
                  { dot: 'bg-amber-400',   title: 'Cold-Chain Fleet Alert (-72°C Verified)', meta: 'Logistics · 25m ago' },
                  { dot: 'bg-amber-400',   title: 'PO #1247 Awaiting Sign-off',              meta: 'Procurement · 1h ago' },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-background transition-colors cursor-pointer">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                    <div>
                      <p className="text-[11px] font-semibold text-foreground leading-snug">{n.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{n.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(!showUserMenu)
              setShowNotifications(false)
            }}
            className="relative flex shrink-0 cursor-pointer rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
            aria-label="User profile menu"
            aria-expanded={showUserMenu}
          >
            <img
              src={drSarahAvatar}
              alt="Dr. Sarah Nakato"
              className="h-8 w-8 object-cover object-top"
            />
            {/* Subtle live indicator */}
            <span className="absolute bottom-0.5 right-0.5 h-2 w-2 bg-emerald-500 rounded-full ring-1 ring-white" />
          </button>

          {showUserMenu && (
            <Card className="absolute right-0 top-full mt-2 w-64 z-50 shadow-lg border border-border bg-white p-1.5 rounded-xl animate-in fade-in zoom-in-95 duration-100">
              {/* Profile Header */}
              <div className="px-3 py-2.5 border-b border-border mb-1 flex items-center gap-2.5">
                <img
                  src={drSarahAvatar}
                  alt="Dr. Sarah Nakato"
                  className="h-8 w-8 rounded-lg object-cover object-top shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">Dr. Sarah Nakato</p>
                  <p className="text-[10px] text-accent font-semibold truncate leading-tight mt-0.5">{roleTitle}</p>
                  <p className="text-[10px] text-slate-400 truncate">sarah.nakato@deibiopharma.com</p>
                </div>
              </div>

              {/* Action Rows */}
              <div className="space-y-0.5">
                <button type="button" className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg hover:bg-background text-slate-600 hover:text-foreground transition-colors cursor-pointer">
                  <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>Executive Profile</span>
                </button>

                <button type="button" className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg hover:bg-background text-slate-600 hover:text-foreground transition-colors cursor-pointer">
                  <ShieldCheck className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>21 CFR e-Sign Credentials</span>
                </button>

                <button type="button" className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg hover:bg-background text-slate-600 hover:text-foreground transition-colors cursor-pointer">
                  <Sliders className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>Facility Preferences</span>
                </button>
              </div>

              {/* Sign out */}
              <div className="border-t border-border mt-1 pt-1">
                <button type="button" className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg hover:bg-red-50 text-slate-400 hover:text-primary transition-colors cursor-pointer">
                  <LogOut className="h-3.5 w-3.5 shrink-0" />
                  <span>Sign Out</span>
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Click-away backdrop */}
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