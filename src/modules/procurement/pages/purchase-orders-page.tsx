import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card'

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
        <p className="text-muted-foreground">
          Create and manage purchase orders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Order Management</CardTitle>
          <CardDescription>Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Purchase order management interface will be built here.</p>
        </CardContent>
      </Card>
    </div>
  )
}