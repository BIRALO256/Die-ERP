import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '../layouts/dashboard-layout'
import { lazy, type ComponentType } from 'react'

// Dashboard Pages - Shared across all modules
const DashboardPage = lazy(() => import('../../modules/dashboard/pages/dashboard-page'))

// Finance Module Pages
const FinanceDashboard = lazy(() => import('../../modules/finance/pages/finance-dashboard'))
const AccountsPage = lazy(() => import('../../modules/finance/pages/accounts-page'))
const TransactionsPage = lazy(() => import('../../modules/finance/pages/transactions-page'))
const ReportsPage = lazy(() => import('../../modules/finance/pages/reports-page'))

// HR Module Pages
const HRDashboard = lazy(() => import('../../modules/hr/pages/hr-dashboard'))
const EmployeesPage = lazy(() => import('../../modules/hr/pages/employees-page'))
const PayrollPage = lazy(() => import('../../modules/hr/pages/payroll-page'))

// Procurement Module Pages
const ProcurementDashboard = lazy(() => import('../../modules/procurement/pages/procurement-dashboard'))
const PurchaseOrdersPage = lazy(() => import('../../modules/procurement/pages/purchase-orders-page'))
const VendorsPage = lazy(() => import('../../modules/procurement/pages/vendors-page'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'finance',
        children: [
          {
            index: true,
            element: <FinanceDashboard />,
          },
          {
            path: 'accounts',
            element: <AccountsPage />,
          },
          {
            path: 'transactions',
            element: <TransactionsPage />,
          },
          {
            path: 'reports',
            element: <ReportsPage />,
          },
        ],
      },
      {
        path: 'hr',
        children: [
          {
            index: true,
            element: <HRDashboard />,
          },
          {
            path: 'employees',
            element: <EmployeesPage />,
          },
          {
            path: 'payroll',
            element: <PayrollPage />,
          },
        ],
      },
      {
        path: 'procurement',
        children: [
          {
            index: true,
            element: <ProcurementDashboard />,
          },
          {
            path: 'purchase-orders',
            element: <PurchaseOrdersPage />,
          },
          {
            path: 'vendors',
            element: <VendorsPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])