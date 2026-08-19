import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  ChevronRight,
  Activity,
  ShieldCheck,
  Building,
  FileSpreadsheet
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../shared/utils'

interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavItem[]
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Finance',
    icon: DollarSign,
    children: [
      { title: 'Overview', href: '/finance', icon: LayoutDashboard },
      { title: 'Accounts', href: '/finance/accounts', icon: DollarSign },
      { title: 'Transactions', href: '/finance/transactions', icon: Activity },
      { title: 'Reports', href: '/finance/reports', icon: FileSpreadsheet },
    ],
  },
  {
    title: 'HR',
    icon: Users,
    children: [
      { title: 'Overview', href: '/hr', icon: LayoutDashboard },
      { title: 'Employees', href: '/hr/employees', icon: Users },
      { title: 'Payroll', href: '/hr/payroll', icon: DollarSign },
    ],
  },
  {
    title: 'Procurement',
    icon: ShoppingCart,
    badge: '2',
    children: [
      { title: 'Overview', href: '/procurement', icon: LayoutDashboard },
      { title: 'Orders', href: '/procurement/purchase-orders', icon: ShoppingCart },
      { title: 'Vendors', href: '/procurement/vendors', icon: Users },
    ],
  },
]

export function Sidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Finance', 'Procurement'])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isExpanded = (title: string) => expandedItems.includes(title)

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      return (
        <div key={item.title} className="mb-1">
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150",
              isExpanded(item.title)
                ? "text-slate-900 bg-slate-100/70"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="h-4 w-4 text-slate-500" />
              <span>{item.title}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-[#c8102e]/10 text-[#c8102e]">
                  {item.badge}
                </span>
              )}
              <ChevronRight 
                className={cn(
                  'h-3.5 w-3.5 text-slate-400 transition-transform duration-200',
                  isExpanded(item.title) ? 'rotate-90' : ''
                )}
              />
            </div>
          </button>
          
          {isExpanded(item.title) && (
            <div className="ml-4 pl-3 my-1 space-y-0.5 border-l border-slate-200">
              {item.children?.map(child => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <NavLink
        key={item.title}
        to={item.href!}
        end
        className={({ isActive }) =>
          cn(
            'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150',
            isActive 
              ? 'bg-[#c8102e] text-white shadow-sm shadow-[#c8102e]/30' 
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          )
        }
      >
        <div className="flex items-center space-x-3">
          <item.icon className="h-4 w-4" />
          <span>{item.title}</span>
        </div>
        {item.badge && (
          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-white/20 text-white">
            {item.badge}
          </span>
        )}
      </NavLink>
    )
  }

  return (
    <div className="w-68 bg-white border-r border-slate-200/90 flex flex-col h-screen select-none shrink-0 sticky top-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center space-x-3">
        {/* Botanical Leaf Logo Icon */}
        <div className="h-10 w-10 rounded-2xl bg-[#143d1d] flex items-center justify-center shadow-sm text-white shrink-0">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" stroke="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-1">
            <span className="font-extrabold text-base tracking-tight text-[#c8102e]">Dei</span>
            <span className="font-extrabold text-base tracking-tight text-slate-900">BioPharma</span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 truncate">
            Enterprise Operations
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-3.5 py-4 overflow-y-auto space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Main Menu
        </div>
        <nav className="space-y-1">
          {navigation.map(item => renderNavItem(item))}
        </nav>
      </div>

      {/* Facility & Compliance Status Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70">
        <div className="flex items-center space-x-2 text-xs text-slate-700 mb-1">
          <ShieldCheck className="h-4 w-4 text-[#166534]" />
          <span className="font-bold text-slate-800">GMP Certified Plant</span>
        </div>
        <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
          <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="truncate">Matugga Facility • Wakiso</span>
        </div>
      </div>
    </div>
  )
}