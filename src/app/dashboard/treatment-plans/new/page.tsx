import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TreatmentPlanForm from "@/components/treatment-plan-form";

export default async function NewTreatmentPlanPage() {
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
              <h1 className="text-3xl font-bold">New Treatment Plan</h1>
              <p className="text-muted-foreground mt-1">
                Create a new treatment plan for your patient
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/treatment-plans">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Treatment Plans
              </Link>
            </Button>
          </header>

          {/* Treatment Plan Form */}
          <Card>
            <CardHeader>
              <CardTitle>Treatment Plan Details</CardTitle>
              <CardDescription>
                Fill in the details for the new treatment plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TreatmentPlanForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
