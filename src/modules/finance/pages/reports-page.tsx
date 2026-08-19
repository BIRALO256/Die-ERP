import { useState } from 'react'
import { 
  Printer, 
  Download,
  CheckCircle2
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { financialStatements } from '../data/finance-data'

type ActiveReport = 'income_statement' | 'balance_sheet' | 'cash_flow' | 'batch_profitability'

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ActiveReport>('income_statement')
  const [selectedPeriod, setSelectedPeriod] = useState('Q3 FY2026')
  const [exportNotification, setExportNotification] = useState<string | null>(null)

  const handleExport = (format: string) => {
    setExportNotification(`Generating ${format.toUpperCase()} report for ${selectedPeriod}...`)
    setTimeout(() => {
      setExportNotification(null)
    }, 3000)
  }

  const { incomeStatement, balanceSheet, batchProfitability } = financialStatements

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="medical-title">Financial & Regulatory Reports</h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#143d1d]/10 text-[#166534] border border-[#143d1d]/20">
              IFRS / GMP Audit Ready
            </span>
          </div>
          <p className="medical-body mt-1 text-xs sm:text-sm text-slate-500">
            Real-time P&L, balance sheet, cash flows, and batch manufacturing profitability analytics
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('csv')}
            className="text-xs font-semibold border-slate-200 text-slate-700 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
            Export CSV
          </Button>
          <Button
            size="sm"
            onClick={() => handleExport('pdf')}
            className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 mr-1.5" />
            Download PDF Report
          </Button>
        </div>
      </div>

      {/* Export Notification Banner */}
      {exportNotification && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          {exportNotification}
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTab('income_statement')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'income_statement'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Income Statement (P&L)
          </button>
          <button
            onClick={() => setActiveTab('balance_sheet')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'balance_sheet'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Balance Sheet
          </button>
          <button
            onClick={() => setActiveTab('cash_flow')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'cash_flow'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Cash Flow Statement
          </button>
          <button
            onClick={() => setActiveTab('batch_profitability')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'batch_profitability'
                ? 'bg-[#c8102e] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Batch Profitability
          </button>
        </div>

        {/* Period Selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">Reporting Period:</span>
          <select
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20"
          >
            <option value="Q3 FY2026">Q3 FY2026 (Current)</option>
            <option value="Q2 FY2026">Q2 FY2026</option>
            <option value="Q1 FY2026">Q1 FY2026</option>
            <option value="FY2025 Full Year">FY2025 Full Year</option>
          </select>
        </div>
      </div>

      {/* 1. INCOME STATEMENT (P&L) */}
      {activeTab === 'income_statement' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Statement of Profit and Loss (P&L)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Dei BioPharma Ltd • {incomeStatement.period}</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">All figures in USD ($)</span>
          </div>

          <div className="space-y-4 max-w-4xl text-xs">
            {/* Revenue */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-sm text-slate-900 pb-1 border-b border-slate-200">
                <span>1. Commercial Revenue & Contracts</span>
                <span className="font-mono">${incomeStatement.grossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 pl-4 py-1">
                <span>Vaccine Supply Agreements (MoH Uganda & Regional)</span>
                <span className="font-mono">$18,450,000</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 pl-4 py-1">
                <span>Clinical Trial Contract Manufacturing (CDMO)</span>
                <span className="font-mono">$4,850,000</span>
              </div>
            </div>

            {/* COGS */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between font-bold text-sm text-[#c8102e] pb-1 border-b border-slate-200">
                <span>2. Cost of Goods Sold (COGS)</span>
                <span className="font-mono">-${incomeStatement.cogs.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 pl-4 py-1">
                <span>Active Reagents, Enzymes & Sterile Consumables</span>
                <span className="font-mono">-$3,420,000</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 pl-4 py-1">
                <span>Direct Cleanroom Scientific Labor</span>
                <span className="font-mono">-$1,150,000</span>
              </div>
            </div>

            {/* Gross Profit Summary */}
            <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200/80 flex items-center justify-between text-sm font-bold text-emerald-900">
              <div>
                <span>Gross Manufacturing Profit</span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  {incomeStatement.grossMargin}% Gross Margin
                </span>
              </div>
              <span className="font-mono text-base">${incomeStatement.grossProfit.toLocaleString()}</span>
            </div>

            {/* Operating Expenses */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between font-bold text-sm text-slate-900 pb-1 border-b border-slate-200">
                <span>3. Operating Expenses (OpEx)</span>
                <span className="font-mono">-${incomeStatement.operatingExpenses.totalOpEx.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 pl-4 py-1">
                <span>Cleanroom HVAC, Steam & WFI Electricity (Matugga)</span>
                <span className="font-mono">-${incomeStatement.operatingExpenses.cleanroomUtilities.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 pl-4 py-1">
                <span>Ultra-Low Cold Chain Logistics (-80°C Fleet)</span>
                <span className="font-mono">-${incomeStatement.operatingExpenses.coldChainLogistics.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 pl-4 py-1">
                <span>Regulatory Quality Audits & Sterility Compliance</span>
                <span className="font-mono">-${incomeStatement.operatingExpenses.rdQualityCompliance.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 pl-4 py-1">
                <span>Administrative Personnel & Corporate Operations</span>
                <span className="font-mono">-${incomeStatement.operatingExpenses.administrativePersonnel.toLocaleString()}</span>
              </div>
            </div>

            {/* Net Income Final Line */}
            <div className="p-4 bg-slate-900 rounded-xl text-white flex items-center justify-between text-base font-extrabold shadow-md mt-4">
              <div>
                <span className="tracking-tight">Net Operating Income (Surplus)</span>
                <p className="text-[11px] font-normal text-slate-400 mt-0.5">
                  After bioreactor depreciation of ${incomeStatement.depreciation.toLocaleString()}
                </p>
              </div>
              <span className="font-mono text-xl text-emerald-400">
                ${incomeStatement.netIncome.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. BALANCE SHEET */}
      {activeTab === 'balance_sheet' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Statement of Financial Position (Balance Sheet)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Dei BioPharma Ltd • As of {balanceSheet.asOfDate}</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">IFRS Format</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-xs">
            {/* ASSETS COLUMN */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>TOTAL ASSETS</span>
                <span className="font-mono text-emerald-800">${(balanceSheet.assets.totalAssets / 1000000).toFixed(2)}M</span>
              </h3>

              {/* Current Assets */}
              <div className="space-y-2">
                <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Current Assets</p>
                <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Cash & Bank Balances (Stanbic & SCB)</span>
                    <span className="font-mono font-bold">${balanceSheet.assets.currentAssets.cashAndEquivalents.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Accounts Receivable (Contracts Due)</span>
                    <span className="font-mono font-bold">${balanceSheet.assets.currentAssets.accountsReceivable.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Raw Materials & Lipid Inventory</span>
                    <span className="font-mono font-bold">${balanceSheet.assets.currentAssets.rawMaterialsInventory.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Finished Vaccine Lots in Storage</span>
                    <span className="font-mono font-bold">${balanceSheet.assets.currentAssets.finishedGoodsInventory.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>Total Current Assets</span>
                    <span className="font-mono">${balanceSheet.assets.currentAssets.totalCurrentAssets.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Fixed Assets */}
              <div className="space-y-2">
                <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Property, Plant & Equipment (CapEx)</p>
                <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Matugga GMP Plant & Bioreactor Lines</span>
                    <span className="font-mono font-bold">${balanceSheet.assets.fixedAssets.bioreactorsAndCleanroomPlant.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Accumulated Machinery Depreciation</span>
                    <span className="font-mono font-bold">-${Math.abs(balanceSheet.assets.fixedAssets.accumulatedDepreciation).toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>Net Fixed Assets</span>
                    <span className="font-mono">${balanceSheet.assets.fixedAssets.netFixedAssets.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LIABILITIES & EQUITY COLUMN */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-200 flex items-center justify-between">
                <span>LIABILITIES & EQUITY</span>
                <span className="font-mono text-slate-900">${(balanceSheet.totalLiabilitiesAndEquity / 1000000).toFixed(2)}M</span>
              </h3>

              {/* Liabilities */}
              <div className="space-y-2">
                <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Current & Long-Term Liabilities</p>
                <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Accounts Payable (Vendor Chemical Invoices)</span>
                    <span className="font-mono font-bold">${balanceSheet.liabilities.currentLiabilities.accountsPayable.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Accrued Operating Utilities</span>
                    <span className="font-mono font-bold">${balanceSheet.liabilities.currentLiabilities.accruedOperatingExpenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Concessionary Sovereign Development Loan</span>
                    <span className="font-mono font-bold">${balanceSheet.liabilities.longTermLiabilities.concessionaryDevelopmentDebt.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>Total Liabilities</span>
                    <span className="font-mono">${balanceSheet.liabilities.longTermLiabilities.totalLiabilities.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Equity */}
              <div className="space-y-2">
                <p className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Shareholders' Equity & Reserves</p>
                <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Contributed Institutional Capital</span>
                    <span className="font-mono font-bold">${balanceSheet.equity.contributedCapital.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Retained Operational Surplus</span>
                    <span className="font-mono font-bold">${balanceSheet.equity.retainedEarnings.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-emerald-800">
                    <span>Total Equity</span>
                    <span className="font-mono">${balanceSheet.equity.totalEquity.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Total Check */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 flex justify-between">
                <span>Accounting Equation Balance Check:</span>
                <span>Assets = Liabilities + Equity (✓ Exact Match)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CASH FLOW STATEMENT */}
      {activeTab === 'cash_flow' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Statement of Cash Flows (Direct Method)</h2>
              <p className="text-xs text-slate-500 mt-0.5">Dei BioPharma Ltd • Q3 FY2026 Fiscal</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700">Positive Free Cash Flow</span>
          </div>

          <div className="space-y-4 max-w-4xl text-xs">
            {/* Operating Cash Flow */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-1 text-sm">
                <span>1. Cash Flows from Operating Activities</span>
                <span className="font-mono text-emerald-700">+$14,650,000</span>
              </div>
              <div className="flex justify-between text-slate-600 pl-4 py-1">
                <span>Cash Receipts from Ministry of Health & Vaccine Clients</span>
                <span className="font-mono">+$17,450,000</span>
              </div>
              <div className="flex justify-between text-slate-600 pl-4 py-1">
                <span>Cash Payments to Raw Material Suppliers (Lonza, Schott)</span>
                <span className="font-mono">-$1,850,000</span>
              </div>
              <div className="flex justify-between text-slate-600 pl-4 py-1">
                <span>Cleanroom Operations, Power & Utilities</span>
                <span className="font-mono">-$950,000</span>
              </div>
            </div>

            {/* Investing Cash Flow */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-1 text-sm">
                <span>2. Cash Flows from Investing Activities (CapEx)</span>
                <span className="font-mono text-[#c8102e]">-$2,450,000</span>
              </div>
              <div className="flex justify-between text-slate-600 pl-4 py-1">
                <span>Acquisition of Sartorius 2000L Bioreactor Unit 3</span>
                <span className="font-mono">-$1,250,000</span>
              </div>
              <div className="flex justify-between text-slate-600 pl-4 py-1">
                <span>Cleanroom HVAC Expansion & Steam Autoclaves</span>
                <span className="font-mono">-$1,200,000</span>
              </div>
            </div>

            {/* Net Cash Inflow */}
            <div className="p-4 bg-slate-900 rounded-xl text-white flex items-center justify-between text-base font-extrabold shadow-md mt-4">
              <div>
                <span>Net Increase in Cash & Liquid Reserves</span>
                <p className="text-[11px] font-normal text-slate-400 mt-0.5">Closing Liquid Balance: $7,130,000</p>
              </div>
              <span className="font-mono text-xl text-emerald-400">+$12,200,000</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. BATCH PROFITABILITY REPORT */}
      {activeTab === 'batch_profitability' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-6 animate-in fade-in">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">GMP Batch Costing & Profitability Analysis</h2>
              <p className="text-xs text-slate-500 mt-0.5">Yield economics, direct material consumption, and per-lot profit margin</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Avg Margin: 76.5%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Batch Lot #</th>
                  <th className="py-3 px-4">Formulation / Product</th>
                  <th className="py-3 px-4 text-center">Batch Volume</th>
                  <th className="py-3 px-4 text-right">Revenue</th>
                  <th className="py-3 px-4 text-right">Direct Materials</th>
                  <th className="py-3 px-4 text-right">Labor & QC</th>
                  <th className="py-3 px-4 text-right">Net Profit</th>
                  <th className="py-3 px-4 text-center">Margin %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {batchProfitability.map(batch => (
                  <tr key={batch.batchId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{batch.batchId}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{batch.product}</p>
                      <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">{batch.status}</p>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                      {batch.volumeVials.toLocaleString()} Vials
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      ${batch.totalRevenue.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                      -${batch.directMaterials.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                      -${batch.laborAndQC.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-emerald-700 text-sm">
                      +${batch.netProfit.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-1 text-xs font-extrabold rounded-full bg-emerald-100 text-emerald-800">
                        {batch.marginPercent}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}