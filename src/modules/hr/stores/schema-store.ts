import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FormSchema, FormSection, FormField } from '../types'
import { AVAILABLE_FORM_SCHEMAS, HR_FORM_SCHEMA_V1 } from '../data/form-schema'

interface SchemaState {
  schemas: FormSchema[]
  activeSchemaVersion: string
  
  // Actions
  setActiveSchemaVersion: (version: string) => void
  addSchema: (schema: FormSchema) => void
  updateSchema: (version: string, updates: Partial<FormSchema>) => void
  deleteSchema: (version: string) => void
  getSchema: (version: string) => FormSchema | undefined
}

export const useSchemaStore = create<SchemaState>()(
  persist(
    (set, get) => ({
      schemas: AVAILABLE_FORM_SCHEMAS,
      activeSchemaVersion: 'v1.0',

      setActiveSchemaVersion: (version) => set({ activeSchemaVersion: version }),

      addSchema: (schema) => {
        set((state) => ({
          schemas: [...state.schemas.filter((s) => s.version !== schema.version), schema],
          activeSchemaVersion: schema.version,
        }))
      },

      updateSchema: (version, updates) => {
        set((state) => ({
          schemas: state.schemas.map((s) =>
            s.version === version ? { ...s, ...updates } : s
          ),
        }))
      },

      deleteSchema: (version) => {
        set((state) => ({
          schemas: state.schemas.filter((s) => s.version !== version),
          activeSchemaVersion:
            state.activeSchemaVersion === version ? 'v1.0' : state.activeSchemaVersion,
        }))
      },

      getSchema: (version) => {
        return get().schemas.find((s) => s.version === version) || HR_FORM_SCHEMA_V1
      },
    }),
    {
      name: 'dei-form-schemas-storage',
      partialize: (state) => ({
        schemas: state.schemas,
        activeSchemaVersion: state.activeSchemaVersion,
      }),
    }
  )
)
