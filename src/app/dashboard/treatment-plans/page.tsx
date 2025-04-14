import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import TreatmentPlanList from "@/components/treatment-plan-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default async function TreatmentPlansPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Treatment Plans</h1>
              <p className="text-muted-foreground mt-1">
                Manage your patient treatment plans
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/treatment-plans/new">
                <PlusCircle className="mr-2 h-4 w-4" /> New Treatment Plan
              </Link>
            </Button>
          </header>

          {/* Treatment Plans List */}
          <Card>
            <CardHeader>
              <CardTitle>All Treatment Plans</CardTitle>
              <CardDescription>
                View and manage all your patient treatment plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TreatmentPlanList />
            </CardContent>
          </Card>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
