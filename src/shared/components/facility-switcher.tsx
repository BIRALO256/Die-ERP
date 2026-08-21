import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { useFacilityStore } from '../stores/facility-store'
import type { Facility } from '../types/facility'
import { cn } from '../utils'

export function FacilitySwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { facilities, activeFacilityId, setActiveFacilityId, getActiveFacility } = useFacilityStore()
  
  const activeFacility = getActiveFacility()

  // Close on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSelect = (facility: Facility) => {
    setActiveFacilityId(facility.id)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button - Clean, Minimalist Enterprise Style */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-left transition-all duration-150 cursor-pointer select-none",
          isOpen 
            ? "bg-background border-border shadow-xs ring-1 ring-border" 
            : "bg-white border-border hover:bg-background hover:border-slate-300"
        )}
        aria-label="Switch facility context"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground leading-tight truncate">
            {activeFacility.shortName}
          </p>
          <p className="text-[10px] text-slate-400 leading-none mt-0.5 truncate">
            {activeFacility.region}
          </p>
        </div>

        <ChevronDown className={cn(
          "h-3.5 w-3.5 text-slate-400 transition-transform duration-150 shrink-0 ml-1",
          isOpen && "rotate-180 text-foreground"
        )} />
      </button>

      {/* Minimalist Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {/* Header */}
          <div className="px-3 py-2 border-b border-border bg-background/40 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Operational Facilities
            </p>
            <span className="text-[10px] font-semibold text-slate-400">
              {facilities.length} sites
            </span>
          </div>

          {/* Clean Facility List */}
          <div className="p-1 space-y-0.5 max-h-[300px] overflow-y-auto">
            {facilities.map((fac) => {
              const isSelected = fac.id === activeFacilityId

              return (
                <button
                  key={fac.id}
                  type="button"
                  onClick={() => handleSelect(fac)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left cursor-pointer group",
                    isSelected
                      ? "bg-accent/10 text-foreground font-semibold"
                      : "hover:bg-background text-slate-600 hover:text-foreground"
                  )}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="text-xs font-semibold leading-snug truncate">
                      {fac.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {fac.location} · {fac.region}
                    </p>
                  </div>

                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
