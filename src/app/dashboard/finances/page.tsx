import DashboardNavbar from "@/components/dashboard-navbar";
import { FinancialSummary } from "@/components/financial-summary";
import { InvoiceList } from "@/components/invoice-list";
import { SubscriptionCheck } from "@/components/subscription-check";

export default function FinancesPage() {
  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          <div className="space-y-6 p-6 pb-16">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">
                Financial Controls
              </h2>
              <p className="text-muted-foreground">
                Manage your practice finances, invoices, and payment tracking.
              </p>
            </div>

            <div className="space-y-6">
              <FinancialSummary
                totalRevenue={12500}
                pendingPayments={3200}
                paidInvoices={42}
                unpaidInvoices={8}
                revenueChange={12.5}
                pendingChange={-4.3}
              />

              <InvoiceList />
            </div>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
