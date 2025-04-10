import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import PatientList from "@/components/patient-list";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";

export default async function PatientsPage() {
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
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Patients</h1>
            <p className="text-muted-foreground">
              Manage your patient records and information
            </p>
          </header>

          {/* Patient List */}
          <PatientList />
        </div>
      </main>
    </SubscriptionCheck>
  );
}
