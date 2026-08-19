import type { Account, Invoice, JournalEntry } from '../types'

export interface ExpenseItem {
  id: string
  reference: string
  vendor: string
  category: 'COGS & Raw Materials' | 'Cleanroom OpEx' | 'CapEx & Machinery' | 'Regulatory & Quality' | 'Logistics & Cold-Chain'
  description: string
  amount: number
  currency: string
  batchLot?: string
  date: string
  status: 'pending_approval' | 'approved' | 'paid' | 'rejected'
  paymentDue: string
  approvedBy?: string
  receiptUrl?: string
}

export interface BankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountType: 'Operating Account' | 'Foreign Currency Reserve' | 'Treasury Escrow'
  currency: 'USD' | 'UGX' | 'EUR'
  balance: number
  status: 'active' | 'restricted'
  facilityBranch: string
}

// 1. Dei BioPharma Chart of Accounts
export const initialAccounts: Account[] = [
  // 1000 - ASSETS
  {
    id: 'acc-1010',
    code: '1010',
    name: 'Stanbic Bank - UGX Operating Primary',
    type: 'asset',
    balance: 8450000000, // 8.45 Billion UGX (~$2.28M USD)
    currency: 'UGX',
    isActive: true,
    description: 'Main operating account for local payroll, utilities and statutory taxes',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-15'
  },
  {
    id: 'acc-1020',
    code: '1020',
    name: 'Standard Chartered - USD Commercial Reserve',
    type: 'asset',
    balance: 4850000,
    currency: 'USD',
    isActive: true,
    description: 'Foreign exchange liquidity for international API procurement and machinery',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-18'
  },
  {
    id: 'acc-1200',
    code: '1200',
    name: 'Raw Materials Inventory - Active Reagents & Lipids',
    type: 'asset',
    balance: 6240000,
    currency: 'USD',
    isActive: true,
    description: 'Sterile excipients, mRNA synthesis enzymes, sterile borosilicate glass vials',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-19'
  },
  {
    id: 'acc-1250',
    code: '1250',
    name: 'Finished Vaccine & Therapeutic Stock',
    type: 'asset',
    balance: 12850000,
    currency: 'USD',
    isActive: true,
    description: 'QA-cleared mRNA-1273 and pediatric dosage lots in -80°C cold storage',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-19'
  },
  {
    id: 'acc-1500',
    code: '1500',
    name: 'Plant, Property & Bioreactor Equipment (CapEx)',
    type: 'asset',
    balance: 38400000,
    currency: 'USD',
    isActive: true,
    description: 'Matugga GMP manufacturing plant, 2000L stainless bioreactors, lyophilizers',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-01'
  },

  // 2000 - LIABILITIES
  {
    id: 'acc-2010',
    code: '2010',
    name: 'Accounts Payable - Global Chemical Suppliers',
    type: 'liability',
    balance: 1420000,
    currency: 'USD',
    isActive: true,
    description: 'Invoices due to Lonza, Schott Pharma, and Sigma-Aldrich (Net-30/60)',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-18'
  },
  {
    id: 'acc-2050',
    code: '2050',
    name: 'Accrued Cleanroom Energy & Facility Expenses',
    type: 'liability',
    balance: 185000,
    currency: 'USD',
    isActive: true,
    description: 'Uganda Electricity Distribution (UEDCL) & backup diesel turbine reserves',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-14'
  },

  // 3000 - EQUITY
  {
    id: 'acc-3010',
    code: '3010',
    name: 'Contributed Capital & Strategic Equity',
    type: 'equity',
    balance: 45000000,
    currency: 'USD',
    isActive: true,
    description: 'Institutional equity and strategic sovereign biopharma development funding',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-01'
  },
  {
    id: 'acc-3020',
    code: '3020',
    name: 'Retained Earnings & Reserves',
    type: 'equity',
    balance: 15725000,
    currency: 'USD',
    isActive: true,
    description: 'Accumulated operational surplus reinvested in R&D and plant expansion',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-01'
  },

  // 4000 - REVENUE
  {
    id: 'acc-4010',
    code: '4010',
    name: 'Commercial Vaccine Supply Contracts',
    type: 'revenue',
    balance: 18450000,
    currency: 'USD',
    isActive: true,
    description: 'Ministry of Health & regional government bulk immunization supply contracts',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-19'
  },
  {
    id: 'acc-4020',
    code: '4020',
    name: 'Clinical Trial Contract Manufacturing (CDMO)',
    type: 'revenue',
    balance: 4850000,
    currency: 'USD',
    isActive: true,
    description: 'Formulation development and trial batch runs for international partners',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-18'
  },

  // 5000 - COST OF GOODS SOLD (COGS)
  {
    id: 'acc-5010',
    code: '5010',
    name: 'Direct Batch Raw Materials & Enzymes',
    type: 'expense',
    balance: 3420000,
    currency: 'USD',
    isActive: true,
    description: 'Lipid nanoparticles, capping enzymes, nucleotide triphosphates consumed in lots',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-19'
  },
  {
    id: 'acc-5020',
    code: '5020',
    name: 'Direct Cleanroom Scientific Labor',
    type: 'expense',
    balance: 1150000,
    currency: 'USD',
    isActive: true,
    description: 'Salaries and shift differentials for GMP qualified production personnel',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-15'
  },

  // 6000 - OPERATING EXPENSES (OPEX)
  {
    id: 'acc-6010',
    code: '6010',
    name: 'Cleanroom HVAC, Utilities & WFI Water',
    type: 'expense',
    balance: 680000,
    currency: 'USD',
    isActive: true,
    description: 'Continuous HEPA air filtration and Water-for-Injection steam generation',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-18'
  },
  {
    id: 'acc-6020',
    code: '6020',
    name: 'Cold-Chain Logistics & Ultra-Low Fleet (-80°C)',
    type: 'expense',
    balance: 420000,
    currency: 'USD',
    isActive: true,
    description: 'Specialized refrigerated distribution and temperature data loggers',
    createdAt: '2026-01-01',
    updatedAt: '2026-08-17'
  }
]

// 2. Bank Treasury Accounts
export const bankAccounts: BankAccount[] = [
  {
    id: 'bank-1',
    bankName: 'Standard Chartered Bank',
    accountNumber: 'SCB-USD-99482104',
    accountType: 'Foreign Currency Reserve',
    currency: 'USD',
    balance: 4850000,
    status: 'active',
    facilityBranch: 'Speke Road Corporate Branch, Kampala'
  },
  {
    id: 'bank-2',
    bankName: 'Stanbic Bank Uganda',
    accountNumber: 'STB-UGX-01488290',
    accountType: 'Operating Account',
    currency: 'UGX',
    balance: 8450000000,
    status: 'active',
    facilityBranch: 'Matugga Industrial Branch, Wakiso'
  },
  {
    id: 'bank-3',
    bankName: 'Bank of Uganda Escrow',
    accountNumber: 'BOU-ESC-552091',
    accountType: 'Treasury Escrow',
    currency: 'USD',
    balance: 12000000,
    status: 'restricted',
    facilityBranch: 'Sovereign Health Infrastructure Fund'
  }
]

// 3. Commercial Invoices & Supply Agreements
export const initialInvoices: Invoice[] = [
  {
    id: 'inv-2026-001',
    number: 'INV-2026-001',
    customerId: 'cust-moh-ug',
    customerName: 'Ministry of Health - Republic of Uganda',
    items: [
      {
        id: 'item-1',
        description: 'mRNA-1273 Multivalent Vaccine (500,000 Doses @ 10-Dose Vials)',
        quantity: 50000,
        unitPrice: 35.00,
        total: 1750000
      },
      {
        id: 'item-2',
        description: 'Certified -80°C Cold-Chain Secure Transfer to Entebbe Central Stores',
        quantity: 1,
        unitPrice: 25000,
        total: 25000
      }
    ],
    subtotal: 1775000,
    tax: 0, // Tax-exempt medical supply
    total: 1775000,
    currency: 'USD',
    status: 'paid',
    dueDate: '2026-08-10',
    paidDate: '2026-08-08',
    createdAt: '2026-07-20',
    updatedAt: '2026-08-08'
  },
  {
    id: 'inv-2026-002',
    number: 'INV-2026-002',
    customerId: 'cust-moh-ke',
    customerName: 'Kenya Medical Supplies Authority (KEMSA)',
    items: [
      {
        id: 'item-3',
        description: 'Pediatric Sterile Injectables Lot #BP-2026-4412 (250,000 Units)',
        quantity: 250000,
        unitPrice: 4.80,
        total: 1200000
      }
    ],
    subtotal: 1200000,
    tax: 0,
    total: 1200000,
    currency: 'USD',
    status: 'sent',
    dueDate: '2026-09-05',
    createdAt: '2026-08-05',
    updatedAt: '2026-08-05'
  },
  {
    id: 'inv-2026-003',
    number: 'INV-2026-003',
    customerId: 'cust-lonza-cdmo',
    customerName: 'Lonza Bioscience Global Development',
    items: [
      {
        id: 'item-4',
        description: 'Phase II Clinical Trial Formulation Run (Batch #BP-2024-8847)',
        quantity: 1,
        unitPrice: 450000,
        total: 450000
      },
      {
        id: 'item-5',
        description: 'Analytical Mass Spectrometry & Endotoxin Quality Clearance',
        quantity: 1,
        unitPrice: 35000,
        total: 35000
      }
    ],
    subtotal: 485000,
    tax: 0,
    total: 485000,
    currency: 'USD',
    status: 'sent',
    dueDate: '2026-08-30',
    createdAt: '2026-08-01',
    updatedAt: '2026-08-01'
  },
  {
    id: 'inv-2026-004',
    number: 'INV-2026-004',
    customerId: 'cust-africacdc',
    customerName: 'Africa CDC Pandemic Preparedness Reserve',
    items: [
      {
        id: 'item-6',
        description: 'Strategic Antigen Stockpile Lot #BP-2026-1090',
        quantity: 100000,
        unitPrice: 18.50,
        total: 1850000
      }
    ],
    subtotal: 1850000,
    tax: 0,
    total: 1850000,
    currency: 'USD',
    status: 'overdue',
    dueDate: '2026-08-12',
    createdAt: '2026-07-12',
    updatedAt: '2026-08-13'
  }
]

// 4. Expenses & CapEx Items
export const initialExpenses: ExpenseItem[] = [
  {
    id: 'exp-101',
    reference: 'PO-2026-9812',
    vendor: 'Lonza Pharma Supplies',
    category: 'COGS & Raw Materials',
    description: 'High-purity T7 RNA Polymerase enzymes and NTP nucleotide reagents',
    amount: 145000,
    currency: 'USD',
    batchLot: '#BP-2024-8847',
    date: '2026-08-18',
    status: 'pending_approval',
    paymentDue: '2026-09-18'
  },
  {
    id: 'exp-102',
    reference: 'CAPEX-2026-044',
    vendor: 'Sartorius Stedim Biotech GmbH',
    category: 'CapEx & Machinery',
    description: '2000L Biostat STR Single-Use Bioreactor Automated Stainless Vessel Unit 3',
    amount: 850000,
    currency: 'USD',
    date: '2026-08-17',
    status: 'pending_approval',
    paymentDue: '2026-09-30'
  },
  {
    id: 'exp-103',
    reference: 'UTIL-2026-08',
    vendor: 'Uganda Electricity Distribution (UEDCL)',
    category: 'Cleanroom OpEx',
    description: 'Industrial 33kV Dedicated Substation Grid Power - Matugga Plant',
    amount: 62450,
    currency: 'USD',
    date: '2026-08-15',
    status: 'approved',
    paymentDue: '2026-08-28',
    approvedBy: 'Dr. Sarah Nakato'
  },
  {
    id: 'exp-104',
    reference: 'SCH-2026-118',
    vendor: 'Schott Pharma Packaging AG',
    category: 'COGS & Raw Materials',
    description: '1,000,000 Type I Borosilicate Glass Sterile Injection Vials (2R & 10R)',
    amount: 98000,
    currency: 'USD',
    batchLot: '#BP-2026-4412',
    date: '2026-08-10',
    status: 'paid',
    paymentDue: '2026-08-20',
    approvedBy: 'Jovic Biralo'
  },
  {
    id: 'exp-105',
    reference: 'REG-2026-09',
    vendor: 'WHO & NDA Regulatory Inspection Team',
    category: 'Regulatory & Quality',
    description: 'Annual GMP Level 4 Sterility Certification Audit & Assay Verification Fees',
    amount: 18500,
    currency: 'USD',
    date: '2026-08-08',
    status: 'paid',
    paymentDue: '2026-08-15',
    approvedBy: 'Dr. Sarah Nakato'
  }
]

// 5. Double-Entry General Ledger Journals
export const initialJournalEntries: JournalEntry[] = [
  {
    id: 'je-2026-001',
    reference: 'JE-2026-0884',
    description: 'Client Wire Settlement: Ministry of Health Vaccine Lot #BP-2024-8847',
    date: '2026-08-18',
    totalAmount: 1775000,
    currency: 'USD',
    status: 'posted',
    createdBy: 'Jovic Biralo (Finance Lead)',
    approvedBy: 'Dr. Sarah Nakato (Director)',
    createdAt: '2026-08-18T10:30:00Z',
    updatedAt: '2026-08-18T11:00:00Z',
    entries: [
      {
        id: 'jel-1',
        accountId: 'acc-1020',
        account: initialAccounts[1], // Standard Chartered USD
        description: 'Wire Receipt from MoH Uganda Bank of Uganda Account',
        debit: 1775000,
        credit: 0
      },
      {
        id: 'jel-2',
        accountId: 'acc-4010',
        account: initialAccounts[8], // Commercial Vaccine Supply Contracts
        description: 'Revenue recognized on delivery of 500,000 mRNA doses',
        debit: 0,
        credit: 1775000
      }
    ]
  },
  {
    id: 'je-2026-002',
    reference: 'JE-2026-0885',
    description: 'Batch Material Consumption: mRNA Lot #BP-2026-4412 Reagents',
    date: '2026-08-17',
    totalAmount: 243000,
    currency: 'USD',
    status: 'posted',
    createdBy: 'Nanziri Dianah (Lead Scientist)',
    approvedBy: 'Dr. Sarah Nakato (Director)',
    createdAt: '2026-08-17T14:15:00Z',
    updatedAt: '2026-08-17T15:00:00Z',
    entries: [
      {
        id: 'jel-3',
        accountId: 'acc-5010',
        account: initialAccounts[10], // Direct Batch Raw Materials
        description: 'Lipids and polymerases allocated to production run',
        debit: 243000,
        credit: 0
      },
      {
        id: 'jel-4',
        accountId: 'acc-1200',
        account: initialAccounts[2], // Raw Materials Inventory
        description: 'Inventory reduction from Matugga Cleanroom Cold Stores',
        debit: 0,
        credit: 243000
      }
    ]
  },
  {
    id: 'je-2026-003',
    reference: 'JE-2026-0886',
    description: 'CapEx Capitalization: Sartorius 2000L Bioreactor Unit 3',
    date: '2026-08-15',
    totalAmount: 850000,
    currency: 'USD',
    status: 'draft',
    createdBy: 'Gibson Oluka (Operations Lead)',
    createdAt: '2026-08-15T09:00:00Z',
    updatedAt: '2026-08-15T09:00:00Z',
    entries: [
      {
        id: 'jel-5',
        accountId: 'acc-1500',
        account: initialAccounts[4], // Plant, Property & Equipment
        description: 'Capitalized bioreactor vessel commissioning',
        debit: 850000,
        credit: 0
      },
      {
        id: 'jel-6',
        accountId: 'acc-2010',
        account: initialAccounts[5], // Accounts Payable
        description: 'Vendor payable due to Sartorius Stedim Biotech (Net-45)',
        debit: 0,
        credit: 850000
      }
    ]
  }
]

// 6. Comprehensive Financial Statements Data
export const financialStatements = {
  incomeStatement: {
    period: 'Q3 FY2026 (July 1 - August 19, 2026)',
    grossRevenue: 23300000,
    cogs: 4570000,
    grossProfit: 18730000,
    grossMargin: 80.39,
    operatingExpenses: {
      cleanroomUtilities: 680000,
      coldChainLogistics: 420000,
      rdQualityCompliance: 390000,
      administrativePersonnel: 540000,
      totalOpEx: 2030000
    },
    operatingIncome: 16700000,
    operatingMargin: 71.67,
    depreciation: 450000,
    netIncome: 16250000
  },
  balanceSheet: {
    asOfDate: 'August 19, 2026',
    assets: {
      currentAssets: {
        cashAndEquivalents: 7130000,
        accountsReceivable: 3535000,
        rawMaterialsInventory: 6240000,
        finishedGoodsInventory: 12850000,
        totalCurrentAssets: 29755000
      },
      fixedAssets: {
        bioreactorsAndCleanroomPlant: 38400000,
        accumulatedDepreciation: -2100000,
        netFixedAssets: 36300000
      },
      totalAssets: 66055000
    },
    liabilities: {
      currentLiabilities: {
        accountsPayable: 1420000,
        accruedOperatingExpenses: 185000,
        shortTermProvisions: 125000,
        totalCurrentLiabilities: 1730000
      },
      longTermLiabilities: {
        concessionaryDevelopmentDebt: 3600000,
        totalLiabilities: 5330000
      }
    },
    equity: {
      contributedCapital: 45000000,
      retainedEarnings: 15725000,
      totalEquity: 60725000
    },
    totalLiabilitiesAndEquity: 66055000
  },
  batchProfitability: [
    {
      batchId: 'BP-2024-8847',
      product: 'mRNA-1273 Multivalent Vaccine',
      volumeVials: 50000,
      totalRevenue: 1750000,
      directMaterials: 243000,
      laborAndQC: 65000,
      facilityAllocation: 45000,
      netProfit: 1397000,
      marginPercent: 79.8,
      status: 'Released / GMP Verified'
    },
    {
      batchId: 'BP-2026-4412',
      product: 'Pediatric Sterile Antibiotic Solution',
      volumeVials: 250000,
      totalRevenue: 1200000,
      directMaterials: 198000,
      laborAndQC: 42000,
      facilityAllocation: 30000,
      netProfit: 930000,
      marginPercent: 77.5,
      status: 'Packaging in Cleanroom 2'
    },
    {
      batchId: 'BP-2026-1090',
      product: 'Antigen Concentrate CDMO Lot',
      volumeVials: 10000,
      totalRevenue: 485000,
      directMaterials: 78000,
      laborAndQC: 35000,
      facilityAllocation: 22000,
      netProfit: 350000,
      marginPercent: 72.1,
      status: 'Assay Release Pending'
    }
  ]
}
