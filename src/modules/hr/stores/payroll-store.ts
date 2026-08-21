import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PayrollRun, Payslip, Employee } from '../types'
import { INITIAL_PAYROLL_RUNS, generatePayslipsForRun, INITIAL_EMPLOYEES } from '../data/hr-data'

interface PayrollState {
  runs: PayrollRun[]
  selectedRunId: string | null
  selectedPayslip: Payslip | null
  
  // Actions
  generateRun: (facilityId: string, facilityName: string, periodMonthYear: string, currency: 'USD' | 'UGX', employees: Employee[]) => PayrollRun
  updateRunStatus: (runId: string, status: PayrollRun['status']) => void
  disburseRun: (runId: string) => void
  setSelectedRunId: (id: string | null) => void
  setSelectedPayslip: (payslip: Payslip | null) => void
  getPayslipsForFacility: (facilityId: string) => Payslip[]
}

// Ensure initial run has payslips populated
const initialRunsWithSlips: PayrollRun[] = INITIAL_PAYROLL_RUNS.map((run) => {
  const slips = generatePayslipsForRun(run.id, INITIAL_EMPLOYEES, run.organizationUnitId)
  return {
    ...run,
    payslips: slips,
  }
})

export const usePayrollStore = create<PayrollState>()(
  persist(
    (set, get) => ({
      runs: initialRunsWithSlips,
      selectedRunId: initialRunsWithSlips[0]?.id || null,
      selectedPayslip: null,

      generateRun: (facilityId, facilityName, periodMonthYear, currency, employees) => {
        const runId = `pay_run_${Date.now()}`
        const batchNumber = `PAY-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${facilityId.slice(-3).toUpperCase()}`
        
        const payslips = generatePayslipsForRun(runId, employees, facilityId)
        
        const totalGrossPay = payslips.reduce((sum, p) => sum + p.grossPay, 0)
        const totalNssfEmployer = payslips.reduce((sum, p) => sum + p.nssfEmployerContribution, 0)
        const totalNssfEmployee = payslips.reduce((sum, p) => sum + p.nssfEmployeeDeduction, 0)
        const totalPayeTax = payslips.reduce((sum, p) => sum + p.payeTaxDeduction, 0)
        const totalNetDisbursed = payslips.reduce((sum, p) => sum + p.netPay, 0)

        const newRun: PayrollRun = {
          id: runId,
          batchNumber,
          organizationUnitId: facilityId,
          facilityName,
          periodMonthYear,
          currency,
          totalEmployeesCount: payslips.length,
          totalGrossPay,
          totalNssfEmployer,
          totalNssfEmployee,
          totalPayeTax,
          totalNetDisbursed,
          status: 'DRAFT',
          createdAt: new Date().toISOString(),
          payslips,
        }

        set((state) => ({
          runs: [newRun, ...state.runs],
          selectedRunId: runId,
        }))

        return newRun
      },

      updateRunStatus: (runId, status) => {
        set((state) => ({
          runs: state.runs.map((r) =>
            r.id === runId
              ? {
                  ...r,
                  status,
                  processedAt: status === 'DISBURSED' ? new Date().toISOString() : r.processedAt,
                  payslips: status === 'DISBURSED' 
                    ? r.payslips.map(p => ({ ...p, status: 'PAID', disbursedAt: new Date().toISOString() }))
                    : r.payslips
                }
              : r
          ),
        }))
      },

      disburseRun: (runId) => {
        get().updateRunStatus(runId, 'DISBURSED')
      },

      setSelectedRunId: (selectedRunId) => set({ selectedRunId }),
      setSelectedPayslip: (selectedPayslip) => set({ selectedPayslip }),

      getPayslipsForFacility: (facilityId) => {
        const { runs, selectedRunId } = get()
        const activeRun = runs.find((r) => r.id === selectedRunId) || runs[0]
        if (!activeRun) return []
        if (facilityId === 'fac_corporate') return activeRun.payslips
        return activeRun.payslips.filter((p) => p.facilityId === facilityId)
      },
    }),
    {
      name: 'dei-payroll-storage',
      partialize: (state) => ({
        runs: state.runs,
        selectedRunId: state.selectedRunId,
      }),
    }
  )
)
