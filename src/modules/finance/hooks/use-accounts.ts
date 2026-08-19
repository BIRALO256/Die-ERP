import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { financeApi } from '../api/finance-api'
import type { Account, AccountFilters } from '../types'
import { useFinanceStore } from '../stores/finance-store'

export function useAccounts(filters?: AccountFilters) {
  const setAccounts = useFinanceStore((state) => state.setAccounts)
  const setAccountsLoading = useFinanceStore((state) => state.setAccountsLoading)

  const query = useQuery({
    queryKey: ['finance', 'accounts', filters],
    queryFn: () => financeApi.getAccounts(filters),
    select: (response) => response.data,
  })

  useEffect(() => {
    if (query.data) {
      setAccounts(query.data)
    }
    setAccountsLoading(query.isLoading)
  }, [query.data, query.isLoading, setAccounts, setAccountsLoading])

  return query
}

export function useAccount(id: string) {
  return useQuery({
    queryKey: ['finance', 'accounts', id],
    queryFn: () => financeApi.getAccount(id),
    select: (response) => response.data,
    enabled: !!id,
  })
}

export function useCreateAccount() {
  const queryClient = useQueryClient()
  const addAccount = useFinanceStore((state) => state.addAccount)

  return useMutation({
    mutationFn: (account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>) =>
      financeApi.createAccount(account),
    onSuccess: (response) => {
      addAccount(response.data)
      queryClient.invalidateQueries({ queryKey: ['finance', 'accounts'] })
    },
  })
}

export function useUpdateAccount() {
  const queryClient = useQueryClient()
  const updateAccount = useFinanceStore((state) => state.updateAccount)

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Account> }) =>
      financeApi.updateAccount(id, updates),
    onSuccess: (response, { id }) => {
      updateAccount(id, response.data)
      queryClient.invalidateQueries({ queryKey: ['finance', 'accounts'] })
      queryClient.invalidateQueries({ queryKey: ['finance', 'accounts', id] })
    },
  })
}

export function useDeleteAccount() {
  const queryClient = useQueryClient()
  const deleteAccount = useFinanceStore((state) => state.deleteAccount)

  return useMutation({
    mutationFn: (id: string) => financeApi.deleteAccount(id),
    onSuccess: (_, id) => {
      deleteAccount(id)
      queryClient.invalidateQueries({ queryKey: ['finance', 'accounts'] })
    },
  })
}