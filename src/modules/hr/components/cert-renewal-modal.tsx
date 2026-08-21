import { useState } from 'react'
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'

export interface CertInfo {
  certId: string
  certName: string
  employeeName: string
  employeeId?: string
}

interface CertRenewalModalProps {
  isOpen: boolean
  onClose: () => void
  onRenew: (certId: string, newExpiryDate: string) => void
  certId?: string
  certName?: string
  employeeName?: string
  certInfo?: CertInfo | null
}

export function CertRenewalModal({
  isOpen,
  onClose,
  onRenew,
  certId: propCertId,
  certName: propCertName,
  employeeName: propEmployeeName,
  certInfo,
}: CertRenewalModalProps) {
  const activeCertId = certInfo?.certId ?? propCertId ?? ''
  const activeCertName = certInfo?.certName ?? propCertName ?? ''
  const activeEmployeeName = certInfo?.employeeName ?? propEmployeeName ?? ''

  const [newExpiryDate, setNewExpiryDate] = useState('2027-08-30')
  const [auditorNotes, setAuditorNotes] = useState('Satisfactory 21 CFR Grade A aseptic gowning requalification completed.')

  if (!isOpen) return null

  const handleRenew = (e: React.FormEvent) => {
    e.preventDefault()
    onRenew(activeCertId, newExpiryDate)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden my-auto animate-in zoom-in-95 duration-150">
        
        {/* Header - clean, minimal */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Renew Qualification</h3>
              <p className="text-[11px] text-slate-400">GMP & Regulatory Credential Requalification</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleRenew} className="p-5 space-y-4 text-xs">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-1.5">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Personnel</span>
              <p className="font-bold text-slate-900 mt-0.5">{activeEmployeeName}</p>
            </div>
            <div className="pt-1 border-t border-slate-200/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Certification</span>
              <p className="font-semibold text-emerald-800 mt-0.5">{activeCertName}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              New Expiration Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              required
              value={newExpiryDate}
              onChange={(e) => setNewExpiryDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              QA Audit Validation Notes
            </label>
            <textarea
              rows={3}
              value={auditorNotes}
              onChange={(e) => setAuditorNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Verify & Requalify
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
