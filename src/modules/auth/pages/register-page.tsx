import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card'

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Register for a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center">
          Registration form coming soon...
        </p>
      </CardContent>
    </Card>
  )
}