// Application constants
export const APP_NAME = 'ERP System'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Enterprise Resource Planning System'

// API configuration
export const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:3001/api'
export const API_TIMEOUT = 30000 // 30 seconds

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Date formats
export const DATE_FORMATS = {
  SHORT: 'MM/dd/yyyy',
  LONG: 'MMMM dd, yyyy',
  ISO: 'yyyy-MM-dd',
  DATETIME: 'MM/dd/yyyy HH:mm',
  TIME: 'HH:mm',
} as const

// Currency codes
export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'UGX' },
] as const

// Status colors
export const STATUS_COLORS = {
  success: 'text-green-600 bg-green-100',
  warning: 'text-yellow-600 bg-yellow-100',
  error: 'text-red-600 bg-red-100',
  info: 'text-blue-600 bg-blue-100',
  neutral: 'text-gray-600 bg-gray-100',
} as const

// Module permissions
export const MODULES = {
  DASHBOARD: 'dashboard',
  FINANCE: 'finance',
  HR: 'hr',
  PROCUREMENT: 'procurement',
} as const

export const ACTIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  ADMIN: 'admin',
} as const

// File upload constraints
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const

// Theme configuration
export const THEME = {
  COLORS: {
    PRIMARY: 'hsl(222.2 47.4% 11.2%)',
    SECONDARY: 'hsl(210 40% 96%)',
    ACCENT: 'hsl(210 40% 96%)',
    DESTRUCTIVE: 'hsl(0 84.2% 60.2%)',
    SUCCESS: 'hsl(142.1 76.2% 36.3%)',
    WARNING: 'hsl(45.4 93.4% 47.5%)',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  },
} as const

// Validation rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  DESCRIPTION_MAX_LENGTH: 500,
} as const

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  USER_PREFERENCES: 'user-preferences',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar-state',
} as const

// Query keys for TanStack Query
export const QUERY_KEYS = {
  AUTH: ['auth'],
  DASHBOARD: ['dashboard'],
  FINANCE: {
    ACCOUNTS: ['finance', 'accounts'],
    TRANSACTIONS: ['finance', 'transactions'],
    INVOICES: ['finance', 'invoices'],
    REPORTS: ['finance', 'reports'],
  },
  HR: {
    EMPLOYEES: ['hr', 'employees'],
    PAYROLL: ['hr', 'payroll'],
  },
  PROCUREMENT: {
    PURCHASE_ORDERS: ['procurement', 'purchase-orders'],
    VENDORS: ['procurement', 'vendors'],
  },
} as const