import { 
  Bell, 
  User, 
  Search, 
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
import drSarahAvatar from '../../assets/dr-sarah-nakato.jpg'

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { isCollapsed, toggleCollapsed, toggleMobile } = useSidebarStore()

  return (
    <header className="h-16 bg-white border-b border-[#e3e1da] flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
      {/* Left — Sidebar toggle + Search */}
      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 max-w-lg min-w-0">
        <button
          type="button"
          onClick={toggleMobile}
          className="lg:hidden p-1.5 text-slate-400 hover:text-[#0e1f17] hover:bg-[#f6f5f1] rounded-lg transition-colors shrink-0 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>

        <button
          type="button"
          onClick={toggleCollapsed}
          className="hidden lg:flex p-1.5 text-slate-400 hover:text-[#0e1f17] hover:bg-[#f6f5f1] rounded-lg transition-colors shrink-0 cursor-pointer"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label="Toggle sidebar collapse"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>

        {/* Search */}
        <div className="relative w-full min-w-0 max-w-xs sm:max-w-sm md:max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search batches, orders, compliance…"
            className="w-full pl-8.5 pr-12 py-1.5 text-xs rounded-lg border border-[#e3e1da] bg-[#f6f5f1] text-[#0e1f17] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#143d1d]/30 focus:border-[#143d1d] transition-all truncate"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:flex pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-300 bg-white border border-[#e3e1da] rounded-md">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right — Status · Bell · Avatar */}
      <div className="flex items-center space-x-3 shrink-0">

        {/* GMP status — plain text, no colored pill
            Rationale: this is ambient context, not actionable. A colored badge
            competes with the red CTA buttons and the notification dot for
            attention. Plain text recedes into the background where it belongs.
            The animated pulse dot is enough to signal "live".
        */}
        <div className="hidden md:flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium text-slate-400 tracking-tight">
            GMP Active
          </span>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-4 bg-[#e3e1da]" />

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
            className="relative h-8 w-8 rounded-lg hover:bg-[#f6f5f1] text-slate-400 hover:text-[#0e1f17] cursor-pointer transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {/* Subtle unread indicator — 1.5px, no red ring */}
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-slate-400 rounded-full" />
          </Button>

          {showNotifications && (
            <Card className="absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] z-50 shadow-lg border border-[#e3e1da] bg-white p-0 overflow-hidden rounded-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 border-b border-[#e3e1da] flex items-center justify-between">
                <p className="text-xs font-bold text-[#0e1f17]">Alerts</p>
                <span className="text-[10px] font-semibold text-slate-400">3 unread</span>
              </div>
              <div className="divide-y divide-[#f0efeb]">
                {[
                  { dot: 'bg-emerald-500', title: 'mRNA Batch #BP-2024-8847 Approved',      meta: 'Quality Assurance · 5m ago' },
                  { dot: 'bg-amber-400',   title: 'Cold-Chain Fleet Alert (-72°C Verified)', meta: 'Logistics · 25m ago' },
                  { dot: 'bg-amber-400',   title: 'PO #1247 Awaiting Sign-off',              meta: 'Procurement · 1h ago' },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-[#f6f5f1] transition-colors cursor-pointer">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                    <div>
                      <p className="text-[11px] font-semibold text-[#0e1f17] leading-snug">{n.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{n.meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Avatar — image only. No name text, no chevron, no ring.
            Rationale (Nielsen, 1994 — Recognition over Recall):
            The photo is already recognisable identity. Adding name text,
            role text, AND a chevron on top of it creates 4 competing elements.
            The avatar alone is sufficient. The dropdown reveals the detail.
        */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(!showUserMenu)
              setShowNotifications(false)
            }}
            className="relative flex shrink-0 cursor-pointer rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
            aria-label="User profile menu"
          >
            <img
              src={drSarahAvatar}
              alt="Dr. Sarah Nakato"
              className="h-8 w-8 object-cover object-top"
            />
            {/* Online dot — single pixel indicator, no ring noise */}
            <span className="absolute bottom-0.5 right-0.5 h-2 w-2 bg-emerald-500 rounded-full ring-1 ring-white" />
          </button>

          {showUserMenu && (
            <Card className="absolute right-0 top-full mt-2 w-60 z-50 shadow-lg border border-[#e3e1da] bg-white p-1.5 rounded-xl animate-in fade-in zoom-in-95 duration-150">
              {/* Profile header */}
              <div className="px-3 py-2.5 border-b border-[#e3e1da] mb-1 flex items-center gap-2.5">
                <img
                  src={drSarahAvatar}
                  alt="Dr. Sarah Nakato"
                  className="h-8 w-8 rounded-lg object-cover object-top shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-[#0e1f17] truncate">Dr. Sarah Nakato</p>
                  <p className="text-[10px] text-slate-400 truncate">sarah.nakato@deibiopharma.com</p>
                </div>
              </div>

              <div className="space-y-0.5">
                <button type="button" className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-medium rounded-lg hover:bg-[#f6f5f1] text-slate-500 hover:text-[#0e1f17] transition-colors cursor-pointer">
                  <User className="h-3.5 w-3.5 shrink-0" />
                  Executive Profile
                </button>
                <button type="button" className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-medium rounded-lg hover:bg-[#f6f5f1] text-slate-500 hover:text-[#0e1f17] transition-colors cursor-pointer">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                  Facility Access
                </button>
                <button type="button" className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-medium rounded-lg hover:bg-[#f6f5f1] text-slate-500 hover:text-[#0e1f17] transition-colors cursor-pointer">
                  <Sliders className="h-3.5 w-3.5 shrink-0" />
                  Preferences
                </button>
              </div>

              <div className="border-t border-[#e3e1da] mt-1 pt-1">
                <button type="button" className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-medium rounded-lg hover:bg-[#f6f5f1] text-slate-400 hover:text-[#c8102e] transition-colors cursor-pointer">
                  <LogOut className="h-3.5 w-3.5 shrink-0" />
                  Sign Out
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