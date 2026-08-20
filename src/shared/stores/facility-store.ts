import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Facility } from '../types/facility'
import { FACILITIES } from '../constants/facilities'

interface FacilityState {
  activeFacilityId: string
  facilities: Facility[]
}

interface FacilityActions {
  setActiveFacilityId: (id: string) => void
  getActiveFacility: () => Facility
  getFacilityById: (id: string) => Facility | undefined
}

export const useFacilityStore = create<FacilityState & FacilityActions>()(
  persist(
    (set, get) => ({
      activeFacilityId: 'fac_matugga',
      facilities: FACILITIES,

      setActiveFacilityId: (id: string) => {
        const exists = get().facilities.some((f) => f.id === id)
        if (exists) {
          set({ activeFacilityId: id })
        }
      },

      getActiveFacility: () => {
        const { activeFacilityId, facilities } = get()
        return (
          facilities.find((f) => f.id === activeFacilityId) || facilities[0]
        )
      },

      getFacilityById: (id: string) => {
        return get().facilities.find((f) => f.id === id)
      },
    }),
    {
      name: 'dei-active-facility-storage',
      partialize: (state) => ({
        activeFacilityId: state.activeFacilityId,
      }),
    }
  )
)
