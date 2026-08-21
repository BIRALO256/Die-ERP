import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import type { Payslip } from '../types'
import deiLogo from '../../../assets/dei-biopharma-logo.png'

interface PayslipModalProps {
  payslip: Payslip | null
  isOpen: boolean
  onClose: () => void
}

export function PayslipModal({ payslip, isOpen, onClose }: PayslipModalProps) {
  if (!isOpen || !payslip) return null

  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'UGX') {
      return `UGX ${amount.toLocaleString('en-US')}`
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-border shadow-2xl w-full max-w-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-150 print:m-0 print:border-none print:shadow-none">
        
        {/* Top Action Bar (Hidden in Print) */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Official Digital Payslip
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300">
              {payslip.status}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handlePrint}
              className="text-xs py-1 h-7 bg-white/10 text-white border-white/20 hover:bg-white/20 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 mr-1" />
              Print / Save PDF
            </Button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Payslip Body */}
        <div className="p-8 space-y-6 text-slate-900 bg-white">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b-2 border-slate-900 gap-4">
            <div>
              <img src={deiLogo} alt="Dei BioPharma" className="h-10 w-auto mb-2" />
              <p className="text-xs font-bold text-slate-900">Dei BioPharma Ltd (Uganda)</p>
              <p className="text-[11px] text-slate-500">Matugga GMP Manufacturing Facility · Kampala HQ</p>
              <p className="text-[10px] text-slate-400">TIN: 1002998812 · NSSF No: 2024881001</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-lg font-black tracking-tight text-primary uppercase">PAYSLIP ADVICE</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Pay Period: August 2026</p>
              <p className="text-[11px] font-mono text-slate-500">Slip ID: {payslip.id}</p>
            </div>
          </div>

          {/* Employee & Plant Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Employee Name</span>
              <span className="font-bold text-slate-900">{payslip.employeeName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Employee ID & NIN</span>
              <span className="font-bold text-slate-900 font-mono">{payslip.employeeNumber}</span>
              <span className="text-[10px] text-slate-500 block">{payslip.nationalIdNin}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Designation</span>
              <span className="font-semibold text-slate-800">{payslip.jobTitle}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Facility Unit</span>
              <span className="font-semibold text-slate-800">{payslip.facilityName}</span>
            </div>
          </div>

          {/* Earnings & Deductions Tables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Left: Earnings */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
                Gross Earnings
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Basic Salary</span>
                  <span className="font-mono font-semibold">{formatAmount(payslip.baseSalary, payslip.currency)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Biotech Hazard / Cleanroom Pay</span>
                  <span className="font-mono font-semibold">{formatAmount(payslip.hazardAllowance, payslip.currency)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Overtime & Shift Differential</span>
                  <span className="font-mono font-semibold">{formatAmount(payslip.overtimeAllowance, payslip.currency)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-slate-900 bg-slate-50 px-2 rounded-lg mt-2">
                  <span>TOTAL GROSS PAY</span>
                  <span className="font-mono text-emerald-700">{formatAmount(payslip.grossPay, payslip.currency)}</span>
                </div>
              </div>
            </div>

            {/* Right: Statutory Deductions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-200">
                Statutory Deductions (Uganda)
              </h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">NSSF Employee (5%)</span>
                  <span className="font-mono font-semibold text-rose-600">
                    -{formatAmount(payslip.nssfEmployeeDeduction, payslip.currency)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">PAYE Tax (URA Graduated)</span>
                  <span className="font-mono font-semibold text-rose-600">
                    -{formatAmount(payslip.payeTaxDeduction, payslip.currency)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Local Service Tax (LST)</span>
                  <span className="font-mono font-semibold text-rose-600">
                    -{formatAmount(payslip.localServiceTax, payslip.currency)}
                  </span>
                </div>
                <div className="flex justify-between py-2 font-bold text-slate-900 bg-slate-50 px-2 rounded-lg mt-2">
                  <span>TOTAL DEDUCTIONS</span>
                  <span className="font-mono text-rose-700">
                    -{formatAmount(payslip.totalDeductions, payslip.currency)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* NET PAY HIGHLIGHT CALLOUT */}
          <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Net Take-Home Pay</p>
              <p className="text-xl font-black tracking-tight text-white font-mono mt-0.5">
                {formatAmount(payslip.netPay, payslip.currency)}
              </p>
            </div>
            <div className="text-right text-xs">
              <span className="text-[10px] text-slate-400 block">Payment Method</span>
              <span className="font-semibold text-slate-200">{payslip.bankName}</span>
              <span className="block font-mono text-[11px] text-slate-400">{payslip.bankAccountNo}</span>
            </div>
          </div>

          {/* Statutory Note & Employer NSSF */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Employer NSSF 10% Contribution: <strong>{formatAmount(payslip.nssfEmployerContribution, payslip.currency)}</strong></span>
            </div>
            <span className="text-[10px]">Total NSSF Remitted: 15%</span>
          </div>

          {/* Disclaimer */}
          <p className="text-[10px] text-slate-400 text-center pt-2">
            This is an electronically generated and validated payroll advice of Dei BioPharma Ltd under Section 59 of the Uganda Employment Act, 2006.
          </p>
        </div>
      </div>
    </div>
  )
}
