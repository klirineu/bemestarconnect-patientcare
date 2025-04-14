"use client";

import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for treatment plans
const mockTreatmentPlans = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    planName: "Diabetes Management Plan",
    startDate: "2023-10-15",
    endDate: "2024-04-15",
    status: "Active",
  },
  {
    id: 2,
    patientName: "Michael Chen",
    planName: "Physical Therapy - Knee Rehabilitation",
    startDate: "2023-09-10",
    endDate: "2023-12-10",
    status: "Active",
  },
  {
    id: 3,
    patientName: "Emily Rodriguez",
    planName: "Weight Management Program",
    startDate: "2023-08-05",
    endDate: "2024-02-05",
    status: "Active",
  },
  {
    id: 4,
    patientName: "David Wilson",
    planName: "Hypertension Control Plan",
    startDate: "2023-07-20",
    endDate: "2024-01-20",
    status: "Completed",
  },
  {
    id: 5,
    patientName: "Jennifer Lee",
    planName: "Anxiety Management Therapy",
    startDate: "2023-11-01",
    endDate: "2024-05-01",
    status: "Active",
  },
];

export default function TreatmentPlanList() {
  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Patient</th>
              <th className="py-3 px-4 text-left font-medium">Plan Name</th>
              <th className="py-3 px-4 text-left font-medium">Start Date</th>
              <th className="py-3 px-4 text-left font-medium">End Date</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockTreatmentPlans.map((plan) => (
              <tr key={plan.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4">{plan.patientName}</td>
                <td className="py-3 px-4">{plan.planName}</td>
                <td className="py-3 px-4">{formatDate(plan.startDate)}</td>
                <td className="py-3 px-4">{formatDate(plan.endDate)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${plan.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                  >
                    {plan.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="h-8 w-8"
                    >
                      <Link href={`/dashboard/treatment-plans/${plan.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/treatment-plans/${plan.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/treatment-plans/${plan.id}/edit`}
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Edit Plan
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Plan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
