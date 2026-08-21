import type { Employee, PayrollRun, Payslip } from '../types'

export const INITIAL_EMPLOYEES: Employee[] = [
  // =========================================================================
  // MATUGGA GMP BIO-PLANT (Vaccine Manufacturing & Lyophilization)
  // =========================================================================
  {
    id: 'emp_mat_001',
    employeeNumber: 'DEI-MAT-0101',
    userId: 'usr_sarah_nakato_01',
    organizationUnitId: 'fac_matugga',
    facilityName: 'Matugga GMP Bio-Plant',
    fullName: 'Dr. Sarah Nakato',
    nationalIdNin: 'CM8402310089KL',
    dateOfBirth: '1984-06-14',
    gender: 'FEMALE',
    maritalStatus: 'MARRIED',
    placeOfResidence: 'Kigo Thinkers Zone',
    city: 'Wakiso District',
    phoneNumber: '+256 772 458 912',
    personalEmail: 'sarah.nakato@deibiopharma.com',
    languagesSpoken: ['English', 'Luganda', 'French'],
    jobTitle: 'QA Director & Lead Bioprocess Scientist',
    department: 'Quality Assurance & Regulatory',
    managerSupervisorName: 'Dr. Mathias Magoola (Executive Chairman)',
    hireDate: '2022-01-15',
    employmentStatus: 'FULL_TIME',
    employmentType: 'PERMANENT',
    baseCurrency: 'USD',
    baseSalary: 12500,
    hazardAllowance: 1200,
    status: 'ACTIVE',
    cleanroomGowningGrade: 'Grade A (Sterile Core)',
    biosafetyLevel: 'BSL-3',
    dependents: [
      {
        id: 'dep_001_1',
        fullName: 'Kato Michael Ssentongo',
        relationshipType: 'SPOUSE',
        phoneNumber: '+256 701 884 219',
        isEmergencyContact: true,
      },
      {
        id: 'dep_001_2',
        fullName: 'Maya Nakato Ssentongo',
        relationshipType: 'CHILD',
        dateOfBirth: '2016-09-20',
        age: 9,
        gender: 'FEMALE',
      },
      {
        id: 'dep_001_3',
        fullName: 'Lucas Wasswa Ssentongo',
        relationshipType: 'CHILD',
        dateOfBirth: '2019-11-04',
        age: 6,
        gender: 'MALE',
      },
    ],
    emergencyContacts: [
      {
        id: 'emg_001_1',
        priority: 1,
        contactName: 'Kato Michael Ssentongo',
        relationship: 'Spouse',
        primaryPhone: '+256 701 884 219',
        alternatePhone: '+256 782 110 994',
      },
      {
        id: 'emg_001_2',
        priority: 2,
        contactName: 'Agnes Nalubega',
        relationship: 'Sister',
        primaryPhone: '+256 752 900 123',
      },
    ],
    educationRecords: [
      {
        id: 'edu_001_1',
        degreeTitle: 'PhD in Molecular Bioprocessing & Therapeutics',
        institution: 'University of Cambridge, UK',
        graduationYear: 2014,
        gradeClassification: 'Distinction',
      },
      {
        id: 'edu_001_2',
        degreeTitle: 'BSc Biochemistry',
        institution: 'Makerere University, Kampala',
        graduationYear: 2008,
        gradeClassification: 'First Class Honours',
      },
    ],
    employmentHistory: [
      {
        id: 'exp_001_1',
        previousEmployer: 'Lonza Biologics Europe',
        jobTitle: 'Senior Upstream Fermentation Scientist',
        durationFromTo: '2015 - 2021',
        keyResponsibilities: 'Managed 2,000L perfusion bioreactors and tech transfer for mRNA vaccines.',
      },
    ],
    certifications: [
      {
        id: 'cert_001_1',
        certType: 'GMP_CLEANROOM',
        certName: 'Grade A Sterile Cleanroom Gowning Re-qualification',
        issuingBody: 'WHO / Dei Quality Assurance Unit',
        licenseNumber: 'GMP-MAT-2026-004',
        issueDate: '2026-01-10',
        expiryDate: '2026-07-10',
        verificationStatus: 'EXPIRING_SOON',
      },
      {
        id: 'cert_001_2',
        certType: 'BSL3_BIOHAZARD',
        certName: 'BSL-3 High Containment Bio-risk Certificate',
        issuingBody: 'Uganda National Council for Science and Technology (UNCST)',
        licenseNumber: 'UNCST-BSL3-998',
        issueDate: '2025-05-12',
        expiryDate: '2027-05-12',
        verificationStatus: 'VALID',
      },
    ],
    currentShift: {
      id: 'shf_001',
      shiftCode: 'SHIFT_A_MORNING',
      shiftLabel: 'Shift A (Morning)',
      timeRange: '06:00 - 14:00',
      productionLine: 'mRNA Vaccine Line 1',
      status: 'ON_DUTY',
    },
    formVersion: 'v1.0',
    createdAt: '2022-01-15T08:00:00Z',
    updatedAt: '2026-08-10T14:30:00Z',
  },
  {
    id: 'emp_mat_002',
    employeeNumber: 'DEI-MAT-0142',
    organizationUnitId: 'fac_matugga',
    facilityName: 'Matugga GMP Bio-Plant',
    fullName: 'Jovic Biralo',
    nationalIdNin: 'CM9304110022XZ',
    dateOfBirth: '1993-04-11',
    gender: 'MALE',
    maritalStatus: 'SINGLE',
    placeOfResidence: 'Matugga Central Zone',
    city: 'Wakiso District',
    phoneNumber: '+256 703 112 449',
    personalEmail: 'jovic.biralo@deibiopharma.com',
    languagesSpoken: ['English', 'Luganda'],
    jobTitle: 'Senior Bioreactor Automation Specialist',
    department: 'Upstream Bioprocess Engineering',
    managerSupervisorName: 'Dr. Sarah Nakato',
    hireDate: '2023-03-01',
    employmentStatus: 'FULL_TIME',
    employmentType: 'PERMANENT',
    baseCurrency: 'USD',
    baseSalary: 6800,
    hazardAllowance: 800,
    status: 'ACTIVE',
    cleanroomGowningGrade: 'Grade A (Sterile Core)',
    biosafetyLevel: 'BSL-3',
    dependents: [
      {
        id: 'dep_002_1',
        fullName: 'Esther Nakabira',
        relationshipType: 'PARENT',
        phoneNumber: '+256 772 901 334',
        isEmergencyContact: true,
      },
    ],
    emergencyContacts: [
      {
        id: 'emg_002_1',
        priority: 1,
        contactName: 'Esther Nakabira',
        relationship: 'Mother',
        primaryPhone: '+256 772 901 334',
      },
    ],
    educationRecords: [
      {
        id: 'edu_002_1',
        degreeTitle: 'BSc Electrical & Automation Engineering',
        institution: 'Kyambogo University, Kampala',
        graduationYear: 2016,
      },
    ],
    employmentHistory: [
      {
        id: 'exp_002_1',
        previousEmployer: 'Quality Chemicals Industries Ltd (CiplaQCIL)',
        jobTitle: 'SCADA Systems Engineer',
        durationFromTo: '2017 - 2023',
      },
    ],
    certifications: [
      {
        id: 'cert_002_1',
        certType: '21_CFR_PART_11',
        certName: 'FDA 21 CFR Part 11 Electronic Records Compliance',
        issuingBody: 'ISPE Africa Chapter',
        licenseNumber: 'ISPE-2025-412',
        issueDate: '2025-02-14',
        expiryDate: '2027-02-14',
        verificationStatus: 'VALID',
      },
    ],
    currentShift: {
      id: 'shf_002',
      shiftCode: 'SHIFT_A_MORNING',
      shiftLabel: 'Shift A (Morning)',
      timeRange: '06:00 - 14:00',
      productionLine: 'Bioreactor Bay STR-04',
      status: 'ON_DUTY',
    },
    formVersion: 'v1.0',
    createdAt: '2023-03-01T08:00:00Z',
    updatedAt: '2026-07-20T11:00:00Z',
  },
  {
    id: 'emp_mat_003',
    employeeNumber: 'DEI-MAT-0188',
    organizationUnitId: 'fac_matugga',
    facilityName: 'Matugga GMP Bio-Plant',
    fullName: 'Nanziri Dianah',
    nationalIdNin: 'CF9508210034TT',
    dateOfBirth: '1995-08-21',
    gender: 'FEMALE',
    maritalStatus: 'SINGLE',
    placeOfResidence: 'Kisaasi Heights',
    city: 'Kampala City',
    phoneNumber: '+256 788 672 901',
    personalEmail: 'nanziri.dianah@deibiopharma.com',
    languagesSpoken: ['English', 'Luganda'],
    jobTitle: 'Lead Lyophilization & Fill-Finish Scientist',
    department: 'Aseptic Fill-Finish & Packaging',
    managerSupervisorName: 'Dr. Sarah Nakato',
    hireDate: '2023-07-15',
    employmentStatus: 'FULL_TIME',
    employmentType: 'PERMANENT',
    baseCurrency: 'USD',
    baseSalary: 7200,
    hazardAllowance: 850,
    status: 'ACTIVE',
    cleanroomGowningGrade: 'Grade A (Sterile Core)',
    biosafetyLevel: 'BSL-2',
    dependents: [],
    emergencyContacts: [
      {
        id: 'emg_003_1',
        priority: 1,
        contactName: 'Robert Mukasa',
        relationship: 'Brother',
        primaryPhone: '+256 701 445 119',
      },
    ],
    educationRecords: [
      {
        id: 'edu_003_1',
        degreeTitle: 'MSc Pharmaceutical Sciences',
        institution: 'Makerere University',
        graduationYear: 2020,
      },
    ],
    employmentHistory: [],
    certifications: [
      {
        id: 'cert_003_1',
        certType: 'ASEPTIC_GOWNING',
        certName: 'Grade A Isolator & Lyophilizer Qualification',
        issuingBody: 'Dei BioPharma QA Institute',
        licenseNumber: 'QA-LIO-2026-90',
        issueDate: '2026-03-01',
        expiryDate: '2027-03-01',
        verificationStatus: 'VALID',
      },
    ],
    currentShift: {
      id: 'shf_003',
      shiftCode: 'SHIFT_B_EVENING',
      shiftLabel: 'Shift B (Evening)',
      timeRange: '14:00 - 22:00',
      productionLine: 'Freeze Dryer Lyomax-50',
      status: 'SCHEDULED',
    },
    formVersion: 'v1.0',
    createdAt: '2023-07-15T08:00:00Z',
    updatedAt: '2026-08-01T09:00:00Z',
  },
  {
    id: 'emp_mat_004',
    employeeNumber: 'DEI-MAT-0205',
    organizationUnitId: 'fac_matugga',
    facilityName: 'Matugga GMP Bio-Plant',
    fullName: 'Gibson Oluka',
    nationalIdNin: 'CM8911040055PQ',
    dateOfBirth: '1989-11-04',
    gender: 'MALE',
    maritalStatus: 'MARRIED',
    placeOfResidence: 'Matugga North',
    city: 'Wakiso District',
    phoneNumber: '+256 774 330 918',
    personalEmail: 'gibson.oluka@deibiopharma.com',
    languagesSpoken: ['English', 'Ateso', 'Luganda'],
    jobTitle: 'Sterile Cleanroom HVAC & Facilities Lead',
    department: 'Engineering & Clean Utilities',
    managerSupervisorName: 'Dr. Sarah Nakato',
    hireDate: '2022-09-01',
    employmentStatus: 'FULL_TIME',
    employmentType: 'PERMANENT',
    baseCurrency: 'UGX',
    baseSalary: 18500000, // ~ $5,000 in UGX
    hazardAllowance: 2000000,
    status: 'ACTIVE',
    cleanroomGowningGrade: 'Grade B',
    biosafetyLevel: 'BSL-2',
    dependents: [
      {
        id: 'dep_004_1',
        fullName: 'Mary Amoding',
        relationshipType: 'SPOUSE',
        phoneNumber: '+256 782 554 990',
        isEmergencyContact: true,
      },
      {
        id: 'dep_004_2',
        fullName: 'Emmanuel Okello',
        relationshipType: 'CHILD',
        dateOfBirth: '2017-05-12',
        age: 9,
        gender: 'MALE',
      },
    ],
    emergencyContacts: [
      {
        id: 'emg_004_1',
        priority: 1,
        contactName: 'Mary Amoding',
        relationship: 'Spouse',
        primaryPhone: '+256 782 554 990',
      },
    ],
    educationRecords: [
      {
        id: 'edu_004_1',
        degreeTitle: 'BSc Mechanical & Air Conditioning Engineering',
        institution: 'Makerere University',
        graduationYear: 2012,
      },
    ],
    employmentHistory: [],
    certifications: [
      {
        id: 'cert_004_1',
        certType: 'GMP_CLEANROOM',
        certName: 'ISO 14644 Cleanroom Classification & Air Balancing',
        issuingBody: 'Cleanroom Technology UK',
        licenseNumber: 'ISO-HVAC-992',
        issueDate: '2024-04-10',
        expiryDate: '2026-04-10',
        verificationStatus: 'EXPIRED',
      },
    ],
    formVersion: 'v1.0',
    createdAt: '2022-09-01T08:00:00Z',
    updatedAt: '2026-08-15T10:00:00Z',
  },

  // =========================================================================
  // KAKIIKA CLINICAL & TRIALS CAMPUS (Hospital & GCP Clinical Trials)
  // =========================================================================
  {
    id: 'emp_kak_001',
    employeeNumber: 'DEI-KAK-0012',
    organizationUnitId: 'fac_kakiika',
    facilityName: 'Kakiika Clinical & Trials Unit',
    fullName: 'Dr. Arthur Tumusiime',
    nationalIdNin: 'CM7901150077WW',
    dateOfBirth: '1979-01-15',
    gender: 'MALE',
    maritalStatus: 'MARRIED',
    placeOfResidence: 'Ruharo Hill',
    city: 'Mbarara City',
    phoneNumber: '+256 772 109 845',
    personalEmail: 'arthur.tumusiime@deibiopharma.com',
    languagesSpoken: ['English', 'Runyankole', 'Luganda'],
    jobTitle: 'Chief Medical Officer & Principal Trial Investigator',
    department: 'Oncology & Vaccine Clinical Trials',
    managerSupervisorName: 'Dr. Mathias Magoola',
    hireDate: '2022-05-10',
    employmentStatus: 'FULL_TIME',
    employmentType: 'PERMANENT',
    baseCurrency: 'USD',
    baseSalary: 11000,
    hazardAllowance: 900,
    status: 'ACTIVE',
    medicalLicenseNo: 'UMDPC-REG-1094',
    biosafetyLevel: 'BSL-2',
    dependents: [
      {
        id: 'dep_kak_1',
        fullName: 'Dr. Rachel Tumusiime',
        relationshipType: 'SPOUSE',
        phoneNumber: '+256 701 334 110',
        isEmergencyContact: true,
      },
      {
        id: 'dep_kak_2',
        fullName: 'Trevor Tumusiime',
        relationshipType: 'CHILD',
        dateOfBirth: '2012-08-19',
        age: 14,
        gender: 'MALE',
      },
    ],
    emergencyContacts: [
      {
        id: 'emg_kak_1',
        priority: 1,
        contactName: 'Dr. Rachel Tumusiime',
        relationship: 'Spouse',
        primaryPhone: '+256 701 334 110',
      },
    ],
    educationRecords: [
      {
        id: 'edu_kak_1',
        degreeTitle: 'MBChB Medicine & Surgery / MMed Internal Medicine',
        institution: 'Makerere College of Health Sciences',
        graduationYear: 2007,
      },
      {
        id: 'edu_kak_2',
        degreeTitle: 'Fellowship in Immuno-Oncology & Clinical Trials',
        institution: 'Johns Hopkins Medicine, USA',
        graduationYear: 2013,
      },
    ],
    employmentHistory: [],
    certifications: [
      {
        id: 'cert_kak_1',
        certType: 'GCP_CLINICAL',
        certName: 'Good Clinical Practice (GCP) Investigator Certification',
        issuingBody: 'Uganda National Drug Authority (NDA) / WHO',
        licenseNumber: 'NDA-GCP-2025-118',
        issueDate: '2025-06-01',
        expiryDate: '2027-06-01',
        verificationStatus: 'VALID',
      },
      {
        id: 'cert_kak_2',
        certType: 'MEDICAL_LICENSE',
        certName: 'Uganda Medical & Dental Practitioners Council Annual License',
        issuingBody: 'UMDPC',
        licenseNumber: 'UMDPC-2026-908',
        issueDate: '2026-01-01',
        expiryDate: '2026-12-31',
        verificationStatus: 'VALID',
      },
    ],
    formVersion: 'v1.0',
    createdAt: '2022-05-10T08:00:00Z',
    updatedAt: '2026-08-12T10:00:00Z',
  },
  {
    id: 'emp_kak_002',
    employeeNumber: 'DEI-KAK-0045',
    organizationUnitId: 'fac_kakiika',
    facilityName: 'Kakiika Clinical & Trials Unit',
    fullName: 'Sister Florence Kemigisha',
    nationalIdNin: 'CF8809050011MN',
    dateOfBirth: '1988-09-05',
    gender: 'FEMALE',
    maritalStatus: 'SINGLE',
    placeOfResidence: 'Kakoba Central',
    city: 'Mbarara City',
    phoneNumber: '+256 782 449 881',
    personalEmail: 'florence.kemigisha@deibiopharma.com',
    languagesSpoken: ['English', 'Runyankole'],
    jobTitle: 'Head of Clinical Research Nursing & Patient Safety',
    department: 'Trial Patient Monitoring',
    managerSupervisorName: 'Dr. Arthur Tumusiime',
    hireDate: '2023-01-10',
    employmentStatus: 'FULL_TIME',
    employmentType: 'PERMANENT',
    baseCurrency: 'UGX',
    baseSalary: 12000000, // ~ $3,200
    hazardAllowance: 1000000,
    status: 'ACTIVE',
    medicalLicenseNo: 'UNMC-NURSE-4491',
    dependents: [],
    emergencyContacts: [
      {
        id: 'emg_kak_2_1',
        priority: 1,
        contactName: 'David Kemigisha',
        relationship: 'Brother',
        primaryPhone: '+256 701 992 001',
      },
    ],
    educationRecords: [
      {
        id: 'edu_kak_2_1',
        degreeTitle: 'BSc Nursing & Clinical Trial Coordination',
        institution: 'Mbarara University of Science and Technology (MUST)',
        graduationYear: 2012,
      },
    ],
    employmentHistory: [],
    certifications: [
      {
        id: 'cert_kak_2_1',
        certType: 'GCP_CLINICAL',
        certName: 'ICH-GCP Certified Clinical Nurse',
        issuingBody: 'NIH / UNCST',
        licenseNumber: 'GCP-NUR-2025-44',
        issueDate: '2025-03-10',
        expiryDate: '2027-03-10',
        verificationStatus: 'VALID',
      },
    ],
    formVersion: 'v1.0',
    createdAt: '2023-01-10T08:00:00Z',
    updatedAt: '2026-07-15T09:00:00Z',
  },

  // =========================================================================
  // NAKASEKE BIO-AGRO EXTRACTION FARM (Botanical & Phytochemical Extraction)
  // =========================================================================
  {
    id: 'emp_nak_001',
    employeeNumber: 'DEI-NAK-0008',
    organizationUnitId: 'fac_nakaseke',
    facilityName: 'Nakaseke Bio-Agro Extraction Farm',
    fullName: 'Musa Ssenyonga',
    nationalIdNin: 'CM8203190044KK',
    dateOfBirth: '1982-03-19',
    gender: 'MALE',
    maritalStatus: 'MARRIED',
    placeOfResidence: 'Semuto Town',
    city: 'Nakaseke District',
    phoneNumber: '+256 772 884 102',
    personalEmail: 'musa.ssenyonga@deibiopharma.com',
    languagesSpoken: ['English', 'Luganda'],
    jobTitle: 'Head of Agronomy & Botanical Extraction',
    department: 'Phytochemical Farming & Harvest Quality',
    managerSupervisorName: 'Dr. Mathias Magoola',
    hireDate: '2021-11-01',
    employmentStatus: 'FULL_TIME',
    employmentType: 'PERMANENT',
    baseCurrency: 'USD',
    baseSalary: 5500,
    hazardAllowance: 400,
    status: 'ACTIVE',
    agriculturalZone: 'Botanical Zone A (Artemisia & Medicinal Extracts)',
    dependents: [
      {
        id: 'dep_nak_1',
        fullName: 'Hajat Fatuma Ssenyonga',
        relationshipType: 'SPOUSE',
        phoneNumber: '+256 702 331 445',
        isEmergencyContact: true,
      },
      {
        id: 'dep_nak_2',
        fullName: 'Ibrahim Ssenyonga',
        relationshipType: 'CHILD',
        dateOfBirth: '2014-04-10',
        age: 12,
        gender: 'MALE',
      },
      {
        id: 'dep_nak_3',
        fullName: 'Amina Ssenyonga',
        relationshipType: 'CHILD',
        dateOfBirth: '2018-09-22',
        age: 7,
        gender: 'FEMALE',
      },
    ],
    emergencyContacts: [
      {
        id: 'emg_nak_1',
        priority: 1,
        contactName: 'Hajat Fatuma Ssenyonga',
        relationship: 'Spouse',
        primaryPhone: '+256 702 331 445',
      },
    ],
    educationRecords: [
      {
        id: 'edu_nak_1',
        degreeTitle: 'MSc Agricultural Biotechnology & Phytochemistry',
        institution: 'Makerere University',
        graduationYear: 2009,
      },
    ],
    employmentHistory: [],
    certifications: [
      {
        id: 'cert_nak_1',
        certType: 'GAP_ORGANIC',
        certName: 'Good Agricultural Practices (GAP) Organic Producer',
        issuingBody: 'Uganda Organic Certification Scheme (UgoCert)',
        licenseNumber: 'UGOCERT-2025-881',
        issueDate: '2025-04-15',
        expiryDate: '2026-10-15',
        verificationStatus: 'VALID',
      },
    ],
    formVersion: 'v1.0',
    createdAt: '2021-11-01T08:00:00Z',
    updatedAt: '2026-08-01T12:00:00Z',
  },

  // =========================================================================
  // DEI CORPORATE HOLDINGS (Nakasero, Kampala HQ)
  // =========================================================================
  {
    id: 'emp_hq_001',
    employeeNumber: 'DEI-HQ-0001',
    organizationUnitId: 'fac_corporate',
    facilityName: 'Dei Group Corporate Holding',
    fullName: 'Sylvia Nalubega',
    nationalIdNin: 'CF8607140099XX',
    dateOfBirth: '1986-07-14',
    gender: 'FEMALE',
    maritalStatus: 'MARRIED',
    placeOfResidence: 'Kololo Terrace',
    city: 'Kampala City',
    phoneNumber: '+256 772 441 900',
    personalEmail: 'sylvia.nalubega@deibiopharma.com',
    languagesSpoken: ['English', 'Luganda', 'Swahili'],
    jobTitle: 'Global Head of Human Capital & Talent Strategy',
    department: 'Executive HR & Organization Development',
    managerSupervisorName: 'Dr. Mathias Magoola',
    hireDate: '2021-08-01',
    employmentStatus: 'FULL_TIME',
    employmentType: 'PERMANENT',
    baseCurrency: 'USD',
    baseSalary: 9500,
    hazardAllowance: 0,
    status: 'ACTIVE',
    dependents: [
      {
        id: 'dep_hq_1',
        fullName: 'Brian Nalubega',
        relationshipType: 'SPOUSE',
        phoneNumber: '+256 701 778 221',
        isEmergencyContact: true,
      },
      {
        id: 'dep_hq_2',
        fullName: 'Chloe Nalubega',
        relationshipType: 'CHILD',
        dateOfBirth: '2019-02-14',
        age: 7,
        gender: 'FEMALE',
      },
    ],
    emergencyContacts: [
      {
        id: 'emg_hq_1',
        priority: 1,
        contactName: 'Brian Nalubega',
        relationship: 'Spouse',
        primaryPhone: '+256 701 778 221',
      },
    ],
    educationRecords: [
      {
        id: 'edu_hq_1',
        degreeTitle: 'MBA Human Resource Management & Org Leadership',
        institution: 'Edinburgh Business School, Heriot-Watt University',
        graduationYear: 2015,
      },
    ],
    employmentHistory: [],
    certifications: [],
    formVersion: 'v1.0',
    createdAt: '2021-08-01T08:00:00Z',
    updatedAt: '2026-08-18T10:00:00Z',
  },
]

// ===========================================================================
// INITIAL PAYROLL RUN & COMPUTATION GENERATOR
// ===========================================================================
export function generatePayslipsForRun(
  payrollRunId: string, 
  employees: Employee[], 
  facilityId: string
): Payslip[] {
  const filtered = facilityId === 'fac_corporate' 
    ? employees 
    : employees.filter(e => e.organizationUnitId === facilityId)

  return filtered.map(emp => {
    const base = emp.baseSalary
    const hazard = emp.hazardAllowance || 0
    const overtime = 0
    const gross = base + hazard + overtime

    // Ugandan Statutory Deductions:
    // NSSF Employee: 5% of gross
    const nssfEmployee = Math.round(gross * 0.05)
    // NSSF Employer: 10% of gross
    const nssfEmployer = Math.round(gross * 0.10)

    // Graduated PAYE Tax (estimated simplified progressive model ~ 20-30%)
    let paye = 0
    if (emp.baseCurrency === 'USD') {
      if (gross > 1000) {
        paye = Math.round((gross - 1000) * 0.25)
      }
    } else {
      // UGX
      if (gross > 410000) {
        paye = Math.round((gross - 410000) * 0.30)
      }
    }

    const lst = emp.baseCurrency === 'USD' ? 25 : 100000
    const totalDeductions = nssfEmployee + paye + lst
    const net = gross - totalDeductions

    return {
      id: `ps_${emp.id}_2026_08`,
      payrollRunId,
      employeeId: emp.id,
      employeeNumber: emp.employeeNumber,
      employeeName: emp.fullName,
      nationalIdNin: emp.nationalIdNin,
      jobTitle: emp.jobTitle,
      department: emp.department,
      facilityId: emp.organizationUnitId,
      facilityName: emp.facilityName,
      currency: emp.baseCurrency,
      baseSalary: base,
      hazardAllowance: hazard,
      overtimeAllowance: overtime,
      grossPay: gross,
      nssfEmployeeDeduction: nssfEmployee,
      nssfEmployerContribution: nssfEmployer,
      payeTaxDeduction: paye,
      localServiceTax: lst,
      otherDeductions: 0,
      totalDeductions,
      netPay: net,
      paymentMethod: 'BANK_TRANSFER',
      bankName: 'Stanbic Bank Uganda Ltd',
      bankAccountNo: `903001882${emp.id.slice(-3)}`,
      status: 'GENERATED',
    }
  })
}

export const INITIAL_PAYROLL_RUNS: PayrollRun[] = [
  {
    id: 'pay_run_2026_08_mat',
    batchNumber: 'PAY-2026-08-MAT',
    organizationUnitId: 'fac_matugga',
    facilityName: 'Matugga GMP Bio-Plant',
    periodMonthYear: 'August 2026',
    currency: 'USD',
    totalEmployeesCount: 4,
    totalGrossPay: 31500,
    totalNssfEmployer: 3150,
    totalNssfEmployee: 1575,
    totalPayeTax: 6125,
    totalNetDisbursed: 23700,
    status: 'APPROVED',
    createdAt: '2026-08-15T09:00:00Z',
    processedAt: '2026-08-20T14:00:00Z',
    payslips: [], // Populated at store init
  },
]
