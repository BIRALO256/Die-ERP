import { Button } from '../../../shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card'
import { Plus } from 'lucide-react'

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">
            Manage your chart of accounts and account balances.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Account
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chart of Accounts</CardTitle>
          <CardDescription>
            Your organization's complete list of accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Accounts management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}