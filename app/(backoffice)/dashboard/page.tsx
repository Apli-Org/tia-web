import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, DollarSign, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-background p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">TIA</h1>
          <p className="text-sm text-muted-foreground">Back Office</p>
        </div>
        <nav className="space-y-2">
          <a href="/dashboard" className="block rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
            Dashboard
          </a>
          <a href="/users" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
            Utilisateurs
          </a>
          <a href="/moderation" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
            Modération
          </a>
          <a href="/subscriptions" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted">
            Abonnements
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">Vue d&apos;ensemble de la plateforme</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Utilisateurs Actifs
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,543</div>
              <p className="text-xs text-muted-foreground">
                +12% depuis le mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Matchs du jour
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">423</div>
              <p className="text-xs text-muted-foreground">
                +8% depuis hier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenus du mois
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,489€</div>
              <p className="text-xs text-muted-foreground">
                +18% depuis le mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Signalements
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                En attente de modération
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
