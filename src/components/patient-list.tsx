"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { UserCircle, Search, Plus, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  status: "Active" | "Inactive";
}

interface PatientListProps {
  initialPatients?: Patient[];
}

export default function PatientList({
  initialPatients = [],
}: PatientListProps) {
  // In a real app, this would come from the database
  const defaultPatients: Patient[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 123-4567",
      lastVisit: "Oct 15, 2023",
      status: "Active",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      phone: "(555) 987-6543",
      lastVisit: "Oct 10, 2023",
      status: "Active",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      phone: "(555) 456-7890",
      lastVisit: "Oct 5, 2023",
      status: "Inactive",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.k@example.com",
      phone: "(555) 234-5678",
      lastVisit: "Sep 28, 2023",
      status: "Active",
    },
    {
      id: 5,
      name: "Jessica Taylor",
      email: "jessica.t@example.com",
      phone: "(555) 876-5432",
      lastVisit: "Sep 20, 2023",
      status: "Active",
    },
  ];

  const [patients, setPatients] = useState<Patient[]>(
    initialPatients.length > 0 ? initialPatients : defaultPatients,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button asChild>
          <Link href="/dashboard/patients/new">
            <Plus className="mr-2 h-4 w-4" /> Add New Patient
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-1 md:grid-cols-5 p-4 bg-muted/50 font-medium">
          <div className="hidden md:block">Patient</div>
          <div className="hidden md:block">Email</div>
          <div className="hidden md:block">Phone</div>
          <div className="hidden md:block">Last Visit</div>
          <div className="hidden md:block">Status</div>
        </div>
        {filteredPatients.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No patients found.
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
              className="grid grid-cols-1 md:grid-cols-5 p-4 border-t items-center hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2 md:mb-0">
                <UserCircle className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-muted-foreground md:hidden">
                    {patient.email}
                  </p>
                </div>
              </div>
              <div className="hidden md:block">{patient.email}</div>
              <div className="hidden md:block">{patient.phone}</div>
              <div className="hidden md:block">{patient.lastVisit}</div>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                >
                  {patient.status}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:inline-flex"
                    asChild
                  >
                    <Link href={`/dashboard/patients/${patient.id}`}>View</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/patients/${patient.id}`}>
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/patients/${patient.id}/edit`}>
                          Edit Patient
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/dashboard/appointments/new?patientId=${patient.id}`}
                        >
                          Schedule Appointment
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
