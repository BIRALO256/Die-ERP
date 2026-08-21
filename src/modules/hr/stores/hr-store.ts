import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Employee, EmployeeCertification, Dependent, EmergencyContact, EducationRecord, EmploymentHistory } from '../types'
import { INITIAL_EMPLOYEES } from '../data/hr-data'

interface HRState {
  employees: Employee[]
  selectedEmployee: Employee | null
  searchTerm: string
  selectedDepartment: string
  selectedStatus: string
  selectedCertFilter: string
  
  // Actions
  setEmployees: (employees: Employee[]) => void
  addEmployee: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => Employee
  updateEmployee: (id: string, updates: Partial<Employee>) => void
  deleteEmployee: (id: string) => void
  setSelectedEmployee: (employee: Employee | null) => void
  
  // Filtering
  setSearchTerm: (term: string) => void
  setSelectedDepartment: (dept: string) => void
  setSelectedStatus: (status: string) => void
  setSelectedCertFilter: (certFilter: string) => void
  
  // Sub-collection actions
  addDependent: (employeeId: string, dependent: Omit<Dependent, 'id'>) => void
  removeDependent: (employeeId: string, dependentId: string) => void
  addCertification: (employeeId: string, cert: Omit<EmployeeCertification, 'id'>) => void
  renewCertification: (employeeId: string, certId: string, newExpiryDate: string) => void
}

export const useHRStore = create<HRState>()(
  persist(
    (set, get) => ({
      employees: INITIAL_EMPLOYEES,
      selectedEmployee: null,
      searchTerm: '',
      selectedDepartment: 'all',
      selectedStatus: 'all',
      selectedCertFilter: 'all',

      setEmployees: (employees) => set({ employees }),

      addEmployee: (employeeData) => {
        const id = `emp_${Date.now()}`
        const newEmployee: Employee = {
          ...employeeData,
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({
          employees: [newEmployee, ...state.employees],
        }))
        return newEmployee
      },

      updateEmployee: (id, updates) => {
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === id
              ? { ...emp, ...updates, updatedAt: new Date().toISOString() }
              : emp
          ),
          selectedEmployee:
            state.selectedEmployee?.id === id
              ? { ...state.selectedEmployee, ...updates, updatedAt: new Date().toISOString() }
              : state.selectedEmployee,
        }))
      },

      deleteEmployee: (id) => {
        set((state) => ({
          employees: state.employees.filter((emp) => emp.id !== id),
          selectedEmployee: state.selectedEmployee?.id === id ? null : state.selectedEmployee,
        }))
      },

      setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),

      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setSelectedDepartment: (selectedDepartment) => set({ selectedDepartment }),
      setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
      setSelectedCertFilter: (selectedCertFilter) => set({ selectedCertFilter }),

      addDependent: (employeeId, depData) => {
        const newDep: Dependent = {
          ...depData,
          id: `dep_${Date.now()}`,
        }
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === employeeId
              ? { ...emp, dependents: [...emp.dependents, newDep] }
              : emp
          ),
        }))
      },

      removeDependent: (employeeId, dependentId) => {
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === employeeId
              ? { ...emp, dependents: emp.dependents.filter((d) => d.id !== dependentId) }
              : emp
          ),
        }))
      },

      addCertification: (employeeId, certData) => {
        const newCert: EmployeeCertification = {
          ...certData,
          id: `cert_${Date.now()}`,
        }
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === employeeId
              ? { ...emp, certifications: [...emp.certifications, newCert] }
              : emp
          ),
        }))
      },

      renewCertification: (employeeId, certId, newExpiryDate) => {
        set((state) => ({
          employees: state.employees.map((emp) =>
            emp.id === employeeId
              ? {
                  ...emp,
                  certifications: emp.certifications.map((c) =>
                    c.id === certId
                      ? {
                          ...c,
                          expiryDate: newExpiryDate,
                          verificationStatus: 'VALID',
                          issueDate: new Date().toISOString().split('T')[0],
                        }
                      : c
                  ),
                }
              : emp
          ),
        }))
      },
    }),
    {
      name: 'dei-hr-store-storage',
      partialize: (state) => ({
        employees: state.employees,
      }),
    }
  )
)
