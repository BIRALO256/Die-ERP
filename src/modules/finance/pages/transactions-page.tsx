import { Button } from '../../../shared/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card'
import { Plus } from 'lucide-react'

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage all financial transactions.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            All financial transactions across your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Transaction management interface coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}