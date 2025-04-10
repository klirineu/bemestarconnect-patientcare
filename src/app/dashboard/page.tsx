import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../supabase/server";
import {
  InfoIcon,
  UserCircle,
  Users,
  Calendar,
  CreditCard,
  ClipboardList,
  ArrowUpRight,
} from "lucide-react";
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

export default async function Dashboard() {
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
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to your healthcare management dashboard
            </p>
          </header>

          {/* Quick Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">128</div>
                <p className="text-xs text-muted-foreground mt-1">
                  12 new this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Appointments Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-muted-foreground mt-1">
                  2 pending confirmation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Monthly Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$12,580</div>
                <p className="text-xs text-green-500 mt-1">
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Treatment Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">42</div>
                <p className="text-xs text-muted-foreground mt-1">
                  6 require review
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Patients */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Patients</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/patients">
                      View All <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>
                  Recently added or updated patient records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      date: "Oct 15, 2023",
                      status: "Active",
                    },
                    {
                      name: "Michael Chen",
                      date: "Oct 10, 2023",
                      status: "Active",
                    },
                    {
                      name: "Emily Rodriguez",
                      date: "Oct 5, 2023",
                      status: "Inactive",
                    },
                  ].map((patient, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <UserCircle className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Last visit: {patient.date}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/patients/${index + 1}`}>
                          View
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/appointments">
                      View All <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <CardDescription>
                  Your schedule for the next few days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      time: "Today, 9:00 AM",
                      type: "Consultation",
                    },
                    {
                      name: "Michael Chen",
                      time: "Today, 10:30 AM",
                      type: "Follow-up",
                    },
                    {
                      name: "Emily Rodriguez",
                      time: "Tomorrow, 2:00 PM",
                      type: "Initial Assessment",
                    },
                  ].map((appointment, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{appointment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {appointment.time} - {appointment.type}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/appointments/${index + 1}`}>
                          View
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Your account information and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <UserCircle size={48} className="text-primary" />
                <div>
                  <h2 className="font-semibold text-xl">
                    {user.user_metadata?.full_name || "Healthcare Professional"}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Button className="ml-auto" variant="outline" asChild>
                  <Link href="/dashboard/profile">Edit Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
