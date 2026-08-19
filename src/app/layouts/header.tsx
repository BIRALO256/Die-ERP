import { Bell, User, Search, Shield, Sliders } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../shared/components/ui/button'
import { Card } from '../../shared/components/ui/card'

export function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 flex items-center justify-between px-6 z-30 sticky top-0">
      {/* Left side - Search */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search batches, orders, materials, compliance..."
            className="w-full pl-9.5 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e] transition-all"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Live Facility Telemetry Badge */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-semibold text-emerald-800">
            GMP Line 1-12 Active
          </span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative h-9 w-9 rounded-xl hover:bg-slate-100 text-slate-600"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-[#c8102e] rounded-full ring-2 ring-white"></span>
          </Button>
          
          {showNotifications && (
            <Card className="absolute right-0 top-full mt-2 w-84 z-50 shadow-xl border border-slate-200 bg-white p-0 overflow-hidden rounded-2xl">
              <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
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
                <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      mRNA Batch #BP-2024-8847 Approved
                    </p>
                    <p className="text-[11px] text-slate-500">Quality Assurance • 5m ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="h-2 w-2 bg-[#c8102e] rounded-full mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Cold-Chain Fleet Alert (-72°C Verified)
                    </p>
                    <p className="text-[11px] text-slate-500">Logistics • 25m ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
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

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          >
            <div className="h-8 w-8 bg-linear-to-br from-[#c8102e] to-[#a80e27] text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-xs">
              SN
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                Dr. Sarah Nakato
              </p>
              <p className="text-[11px] font-medium text-slate-500">
                Research Director (Admin)
              </p>
            </div>
          </button>

          {showUserMenu && (
            <Card className="absolute right-0 top-full mt-2 w-56 z-50 shadow-xl border border-slate-200 bg-white p-1.5 rounded-2xl">
              <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">Dr. Sarah Nakato</p>
                <p className="text-[11px] text-slate-500 truncate">sarah.nakato@deibiopharma.com</p>
              </div>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-slate-50 text-slate-700">
                <User className="h-3.5 w-3.5 text-slate-500" />
                <span>Executive Profile</span>
              </button>
              <button className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium rounded-xl hover:bg-slate-50 text-slate-700">
                <Sliders className="h-3.5 w-3.5 text-slate-500" />
                <span>Facility Preferences</span>
              </button>
            </Card>
          )}
        </div>
      </div>

      {/* Backdrop overlay */}
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