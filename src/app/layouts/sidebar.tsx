import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  ChevronRight,
  ShieldCheck,
  Building,
  FileSpreadsheet,
  TrendingUp,
  Receipt,
  BookOpen,
  X
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '../../shared/utils'
import { useSidebarStore } from '../../shared/stores/sidebar-store'
import { useFacilityStore } from '../../shared/stores/facility-store'
import { usePermission } from '../../shared/hooks/use-permission'
import type { PermissionAction } from '../../shared/types/permission'
import deiLogo from '../../assets/dei-biopharma-logo.png'

interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  requiredPermission?: PermissionAction
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
    requiredPermission: 'finance:view_accounts',
    children: [
      { title: 'Overview', href: '/finance', icon: LayoutDashboard },
      { title: 'Accounts', href: '/finance/accounts', icon: DollarSign },
      { title: 'Incomes', href: '/finance/incomes', icon: TrendingUp },
      { title: 'Expenses', href: '/finance/expenses', icon: Receipt },
      { title: 'Journals', href: '/finance/journals', icon: BookOpen },
      { title: 'Reports', href: '/finance/reports', icon: FileSpreadsheet },
    ],
  },
  {
    title: 'HR',
    icon: Users,
    requiredPermission: 'hr:view_employees',
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
    requiredPermission: 'procurement:create_po',
    children: [
      { title: 'Overview', href: '/procurement', icon: LayoutDashboard },
      { title: 'Orders', href: '/procurement/purchase-orders', icon: ShoppingCart },
      { title: 'Vendors', href: '/procurement/vendors', icon: Users },
    ],
  },
]

interface SidebarProps {
  isMobile?: boolean
}

export function Sidebar({ isMobile = false }: SidebarProps) {
  const { isCollapsed, toggleCollapsed, closeMobile } = useSidebarStore()
  const { getActiveFacility } = useFacilityStore()
  const { can } = usePermission()
  const activeFacility = getActiveFacility()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null)
  const location = useLocation()

  // Auto-close flyout on route change
  useEffect(() => {
    setActiveFlyout(null)
    if (isMobile) {
      closeMobile()
    }
  }, [location.pathname, isMobile, closeMobile])

  // In mobile view, sidebar is always expanded inside the drawer
  const collapsed = isMobile ? false : isCollapsed

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isGroupActive = (item: NavItem) => {
    if (item.href && location.pathname === item.href) return true
    if (item.children) {
      return item.children.some(child => child.href === location.pathname)
    }
    return false
  }

  const renderExpandedNav = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isParentActive = isGroupActive(item)
    const isExpanded = expandedItems.includes(item.title)

    if (hasChildren) {
      return (
        <div key={item.title} className="mb-1">
          <button
            type="button"
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 group cursor-pointer",
              isParentActive
                ? "text-foreground bg-accent/10 font-bold"
                : isExpanded
                ? "text-foreground bg-background"
                : "text-slate-600 hover:text-foreground hover:bg-background"
            )}
          >
            <div className="flex items-center space-x-3 min-w-0">
              <item.icon className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                isParentActive ? "text-accent" : "text-slate-400 group-hover:text-foreground"
              )} />
              <span className="truncate">{item.title}</span>
            </div>
            <div className="flex items-center space-x-1.5 shrink-0 ml-2">
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary">
                  {item.badge}
                </span>
              )}
              <ChevronRight 
                className={cn(
                  'h-3.5 w-3.5 text-slate-400 transition-transform duration-200',
                  isExpanded ? 'rotate-90 text-slate-700' : ''
                )}
              />
            </div>
          </button>
          
          {isExpanded && (
            <div className="ml-4 pl-3 my-1 space-y-0.5 border-l border-accent/20 animate-in fade-in slide-in-from-top-1 duration-150">
              {item.children?.map(child => renderExpandedNav(child, level + 1))}
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
        onClick={() => isMobile && closeMobile()}
        className={({ isActive }) =>
          cn(
            'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 group',
            isActive 
              ? 'bg-accent text-white shadow-sm font-bold' 
              : 'text-slate-600 hover:text-foreground hover:bg-background'
          )
        }
      >
        {({ isActive }) => (
          <>
            <div className="flex items-center space-x-3 min-w-0">
              <item.icon className={cn(
                "h-4 w-4 shrink-0",
                isActive ? "text-white" : "text-slate-400 group-hover:text-foreground"
              )} />
              <span className="truncate">{item.title}</span>
            </div>
            {item.badge && (
              <span className={cn(
                "px-1.5 py-0.5 text-[10px] font-bold rounded-full ml-2 shrink-0",
                isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
              )}>
                {item.badge}
              </span>
            )}
          </>
        )}
      </NavLink>
    )
  }

  const renderCollapsedNav = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0
    const isParentActive = isGroupActive(item)
    const isFlyoutOpen = activeFlyout === item.title

    if (hasChildren) {
      return (
        <div 
          key={item.title} 
          className="relative group mb-1.5"
          onMouseEnter={() => setActiveFlyout(item.title)}
          onMouseLeave={() => setActiveFlyout(null)}
        >
          <button
            type="button"
            onClick={() => setActiveFlyout(isFlyoutOpen ? null : item.title)}
            className={cn(
              "w-11 h-11 mx-auto flex items-center justify-center rounded-xl transition-all relative cursor-pointer",
              isParentActive || isFlyoutOpen
                ? "bg-primary/10 text-primary font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
            aria-label={item.title}
          >
            <item.icon className="h-5 w-5" />
            {item.badge && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white"></span>
            )}
          </button>

          {/* Flyout Submenu Popover on Hover/Click */}
          {isFlyoutOpen && (
            <div className="absolute left-full top-0 ml-2.5 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 px-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900">{item.title}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="space-y-0.5">
                {item.children?.map(child => (
                  <NavLink
                    key={child.title}
                    to={child.href!}
                    end
                    onClick={() => setActiveFlyout(null)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-primary text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      )
                    }
                  >
                    <child.icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{child.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <div key={item.title} className="relative group mb-1.5">
        <NavLink
          to={item.href!}
          end
          className={({ isActive }) =>
            cn(
              'w-11 h-11 mx-auto flex items-center justify-center rounded-xl transition-all relative',
              isActive 
                ? 'bg-primary text-white shadow-sm shadow-primary/30' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            )
          }
          aria-label={item.title}
        >
          {({ isActive }) => (
            <>
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <span className={cn(
                  "absolute top-1.5 right-1.5 h-2 w-2 rounded-full ring-2 ring-white",
                  isActive ? "bg-white" : "bg-primary"
                )}></span>
              )}
            </>
          )}
        </NavLink>

        {/* Hover Tooltip for Single Items */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2.5 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
          {item.title}
        </div>
      </div>
    )
  }

  return (
    <aside 
      className={cn(
        "bg-white border-r border-border flex flex-col h-screen select-none shrink-0 transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-68"
      )}
    >
      {/* Brand Header - Fixed */}
      <div className={cn(
        "h-16 shrink-0 border-b border-border flex items-center transition-all duration-300",
        collapsed ? "justify-center px-2" : "justify-between px-5"
      )}>
        {collapsed ? (
          /* Chopped Logo Emblem for Collapsed View */
          <div 
            className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0 shadow-xs hover:border-primary/40 transition-all cursor-pointer"
            onClick={toggleCollapsed}
            title="Expand Sidebar (Dei BioPharma)"
          >
            <div className="w-7 h-7 overflow-hidden flex items-center justify-start">
              <img 
                src={deiLogo} 
                alt="Dei BioPharma Logo" 
                className="h-7 w-auto max-w-none object-left object-cover pointer-events-none select-none"
              />
            </div>
          </div>
        ) : (
          /* Full Logo for Expanded View */
          <div className="flex items-center justify-between w-full min-w-0">
            <NavLink 
              to="/dashboard" 
              onClick={() => isMobile && closeMobile()}
              className="flex items-center gap-2 group min-w-0"
            >
              <img 
                src={deiLogo} 
                alt="Dei BioPharma" 
                className="h-8 max-h-8.5 w-auto object-contain object-left transition-transform group-hover:scale-[1.02]"
              />
            </NavLink>

            {/* Close Button on Mobile Drawer Only */}
            {isMobile && (
              <button
                type="button"
                onClick={closeMobile}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation Links Area - Independently scrollable if content overflows */}
      <div className={cn(
        "flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-1 transition-all duration-300",
        collapsed ? "py-4 px-2" : "py-4 px-3.5"
      )}>
        <nav className="space-y-1">
          {navigation
            .filter((item) => !item.requiredPermission || can(item.requiredPermission))
            .map((item) => 
              collapsed ? renderCollapsedNav(item) : renderExpandedNav(item)
            )}
        </nav>
      </div>

      {/* Facility & Compliance Status Footer - Fixed */}
      <div className={cn(
        "shrink-0 border-t border-border bg-white transition-all duration-300",
        collapsed ? "p-3 flex flex-col items-center" : "p-4"
      )}>
        {collapsed ? (
          <div 
            className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center cursor-pointer group relative"
            title={`${activeFacility.badgeText || 'Certified Plant'} • ${activeFacility.location}`}
          >
            <ShieldCheck className="h-5 w-5 text-accent" />
            <div className="absolute left-full bottom-2 ml-2.5 px-3 py-2 bg-foreground text-white text-xs rounded-xl shadow-xl whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
              <p className="font-bold text-emerald-400">{activeFacility.badgeText || 'Facility Status'}</p>
              <p className="text-[11px] text-slate-300">{activeFacility.location} • {activeFacility.region}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-xs mb-1">
              <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
              <span className="font-bold text-foreground truncate">{activeFacility.badgeText || 'Certified Plant'}</span>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
              <Building className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{activeFacility.location} • {activeFacility.region}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}