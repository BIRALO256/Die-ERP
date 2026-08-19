import { 
  Plus, 
  UserCheck, 
  Upload, 
  FileText, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  TrendingUp, 
  FlaskConical,
  Activity,
  Check
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      {/* Top Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What's happening now?
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Your real-time biotech operations and Matugga facility overview
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Button 
            className="bg-[#c8102e] hover:bg-[#a80e27] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Batch Instructions
          </Button>

          <Button 
            variant="outline" 
            className="border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl"
          >
            <UserCheck className="h-4 w-4 mr-1.5 text-slate-500" />
            Assign Facility Task
          </Button>

          <Button 
            variant="outline" 
            className="border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl"
          >
            <Upload className="h-4 w-4 mr-1.5 text-slate-500" />
            Upload QC Report
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Cards (Clean White Cards) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Batch Instructions & Reviews
            </span>
            <FileText className="h-4 w-4 text-[#c8102e]" />
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4
            </h2>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-2 font-medium">
              <span>Pending Release</span>
              <span className="font-bold text-slate-800">1</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-1 font-medium">
              <span>Under Review</span>
              <span className="font-bold text-slate-800">0</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Active Research Staff
            </span>
            <Users className="h-4 w-4 text-[#c8102e]" />
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              847
            </h2>
            <p className="text-xs text-slate-500 mt-3 font-medium">
              of 847 verified personnel on duty
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Monthly Revenue
            </span>
            <DollarSign className="h-4 w-4 text-[#c8102e]" />
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              $2,450,000
            </h2>
            <p className="text-xs text-[#166534] font-semibold mt-3 flex items-center">
              +18.3% MoM growth
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Active Bioreactors
            </span>
            <CheckCircle2 className="h-4 w-4 text-[#166534]" />
          </div>
          <div className="mt-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              12 / 12
            </h2>
            <p className="text-xs text-slate-500 mt-3 font-medium">
              All production lines operational
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Performance Trends + Top Performers + Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Trend Chart Widget */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-[#c8102e]" />
                  <h2 className="text-sm font-bold text-slate-900">Performance Trend</h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Last 7 days bioreactor & batch output</p>
              </div>

              {/* Legend */}
              <div className="flex items-center space-x-4 text-xs font-medium text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#16a34a]"></span>
                  <span>Completed</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-[#eab308]"></span>
                  <span>Pending QC</span>
                </div>
              </div>
            </div>

            {/* Visual Bar Chart (CSS Columns) */}
            <div className="pt-6 pb-2">
              <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-40 border-b border-slate-100 pb-2">
                {/* Mon */}
                <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full max-w-[38px] flex flex-col gap-1">
                    <div className="bg-[#16a34a] rounded-sm h-20 w-full"></div>
                    <div className="bg-[#eab308] rounded-sm h-8 w-full"></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Mon</span>
                </div>

                {/* Tue */}
                <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full max-w-[38px] flex flex-col gap-1">
                    <div className="bg-[#16a34a] rounded-sm h-16 w-full"></div>
                    <div className="bg-[#eab308] rounded-sm h-10 w-full"></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Tue</span>
                </div>

                {/* Wed */}
                <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full max-w-[38px] flex flex-col gap-1">
                    <div className="bg-[#16a34a] rounded-sm h-22 w-full"></div>
                    <div className="bg-[#eab308] rounded-sm h-7 w-full"></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Wed</span>
                </div>

                {/* Thu */}
                <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full max-w-[38px] flex flex-col gap-1">
                    <div className="bg-[#16a34a] rounded-sm h-26 w-full"></div>
                    <div className="bg-[#eab308] rounded-sm h-9 w-full"></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Thu</span>
                </div>

                {/* Fri */}
                <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full max-w-[38px] flex flex-col gap-1">
                    <div className="bg-[#16a34a] rounded-sm h-28 w-full"></div>
                    <div className="bg-[#eab308] rounded-sm h-6 w-full"></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Fri</span>
                </div>

                {/* Sat */}
                <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full max-w-[38px] flex flex-col gap-1">
                    <div className="bg-[#16a34a] rounded-sm h-24 w-full"></div>
                    <div className="bg-[#eab308] rounded-sm h-8 w-full"></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Sat</span>
                </div>

                {/* Sun */}
                <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full max-w-[38px] flex flex-col gap-1">
                    <div className="bg-[#16a34a] rounded-sm h-18 w-full"></div>
                    <div className="bg-[#eab308] rounded-sm h-5 w-full"></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">Sun</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers / Operations Leads */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
            <div className="flex items-center space-x-2 mb-1">
              <Users className="h-4 w-4 text-[#c8102e]" />
              <h2 className="text-sm font-bold text-slate-900">Top Lead Scientists</h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">Most active facility leads this week</p>

            <div className="space-y-3.5">
              {/* Performer 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-slate-400">#1</span>
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                    ND
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Nanziri Dianah</p>
                    <p className="text-[11px] text-slate-500">Lead mRNA Scientist</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600">42 batches</span>
              </div>

              {/* Performer 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-slate-400">#2</span>
                  <div className="h-8 w-8 rounded-full bg-[#c8102e]/10 flex items-center justify-center font-bold text-xs text-[#c8102e]">
                    JB
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Jovic Biralo</p>
                    <p className="text-[11px] text-slate-500">QA & Compliance Director</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600">38 batches</span>
              </div>

              {/* Performer 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-slate-400">#3</span>
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                    GO
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Gibson Oluka</p>
                    <p className="text-[11px] text-slate-500">Bioreactor Operations Lead</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-600">35 batches</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Recent Activity Feed */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs h-fit">
          <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
          <p className="text-xs text-slate-500 mt-0.5 mb-5">Latest updates and events</p>

          <div className="space-y-4">
            {/* Activity 1 */}
            <div className="pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-900">Production Batch Completed</p>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                  Completed
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                mRNA-1273 Vaccine Lot at MATUGGA PLANT
              </p>
              <p className="text-[10px] text-slate-400 mt-1">15 minutes ago</p>
            </div>

            {/* Activity 2 */}
            <div className="pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-900">QC Assay Release</p>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                  Completed
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Oncology Gene Therapy Formulation at KAKIIKA
              </p>
              <p className="text-[10px] text-slate-400 mt-1">1 hour ago</p>
            </div>

            {/* Activity 3 */}
            <div className="pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-900">Raw Materials Cleared</p>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                  Completed
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Lipid Nanoparticles Order #1247 at NAKASEKE
              </p>
              <p className="text-[10px] text-slate-400 mt-1">2 hours ago</p>
            </div>

            {/* Activity 4 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-900">New Batch Created</p>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 text-blue-800">
                  New
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Pediatric Formulation at NAKASEKE
              </p>
              <p className="text-[10px] text-slate-400 mt-1">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}