import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon, ArrowUpIcon, DollarSign, Users } from "lucide-react";

interface FinancialSummaryProps {
  totalRevenue: number;
  pendingPayments: number;
  paidInvoices: number;
  unpaidInvoices: number;
  revenueChange: number;
  pendingChange: number;
}

export function FinancialSummary({
  totalRevenue = 12500,
  pendingPayments = 3200,
  paidInvoices = 42,
  unpaidInvoices = 8,
  revenueChange = 12.5,
  pendingChange = -4.3,
}: Partial<FinancialSummaryProps>) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {revenueChange > 0 ? (
                  <>
                    <ArrowUpIcon className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">{revenueChange}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownIcon className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">
                      {Math.abs(revenueChange)}%
                    </span>
                  </>
                )}
                <span>from last month</span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payments
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${pendingPayments.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {pendingChange > 0 ? (
                  <>
                    <ArrowUpIcon className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">{pendingChange}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDownIcon className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">
                      {Math.abs(pendingChange)}%
                    </span>
                  </>
                )}
                <span>from last month</span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Paid Invoices
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paidInvoices}</div>
              <p className="text-xs text-muted-foreground">
                in the last 30 days
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unpaid Invoices
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unpaidInvoices}</div>
              <p className="text-xs text-muted-foreground">
                requiring attention
              </p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Financial Analytics</CardTitle>
            <CardDescription>
              Detailed financial analytics will be available here.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Analytics charts coming soon
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
            <CardDescription>
              Generate and download financial reports.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Report generation tools coming soon
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
