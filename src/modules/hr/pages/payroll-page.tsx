import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card'

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
        <p className="text-muted-foreground">
          Process and manage employee payroll.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Processing</CardTitle>
          <CardDescription>Coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Payroll management interface will be built here.</p>
        </CardContent>
      </Card>
    </div>
  )
}