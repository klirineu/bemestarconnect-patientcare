"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  Calendar as CalendarIcon,
  Clock,
  User,
} from "lucide-react";

type Appointment = {
  id: string;
  patientName: string;
  date: Date;
  type: string;
  status: "confirmed" | "pending" | "cancelled";
};

// Mock data for appointments
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    patientName: "John Doe",
    date: new Date(2023, 9, 15, 10, 0),
    type: "Consultation",
    status: "confirmed", // aqui é aceito porque está dentro de um Appointment[]
  },
  {
    id: "2",
    patientName: "Jane Smith",
    date: new Date(2023, 9, 15, 14, 30),
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: "3",
    patientName: "Robert Johnson",
    date: new Date(2023, 9, 16, 9, 0),
    type: "Initial Assessment",
    status: "pending",
  },
];

export function AppointmentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] =
    useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter((appointment) => {
    if (!date) return false;
    return (
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear()
    );
  });

  // Function to format time from Date object
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to handle appointment selection
  const handleAppointmentSelect = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="day">Day View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>
                  Select a date to view appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Appointments</CardTitle>
                  <CardDescription>
                    {date
                      ? date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Select a date"}
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Appointment</DialogTitle>
                      <DialogDescription>
                        Fill in the details to schedule a new appointment.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="patient" className="text-right">
                          Patient
                        </Label>
                        <div className="col-span-3">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select patient" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="john-doe">John Doe</SelectItem>
                              <SelectItem value="jane-smith">
                                Jane Smith
                              </SelectItem>
                              <SelectItem value="robert-johnson">
                                Robert Johnson
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date" className="text-right">
                          Date
                        </Label>
                        <Input id="date" type="date" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">
                          Time
                        </Label>
                        <Input id="time" type="time" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                          Type
                        </Label>
                        <div className="col-span-3">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="consultation">
                                Consultation
                              </SelectItem>
                              <SelectItem value="follow-up">
                                Follow-up
                              </SelectItem>
                              <SelectItem value="initial-assessment">
                                Initial Assessment
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Appointment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleAppointmentSelect(appointment)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <Clock className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {formatTime(appointment.date)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-medium">
                              {appointment.patientName}
                            </p>
                            <Badge
                              variant={
                                appointment.status === "confirmed"
                                  ? "default"
                                  : appointment.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">
                      No appointments for this date
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="day">
          <Card>
            <CardHeader>
              <CardTitle>Day View</CardTitle>
              <CardDescription>
                {date
                  ? date.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select a date"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => {
                  const hourAppointments = appointments.filter(
                    (appointment) => {
                      if (!date) return false;
                      return (
                        appointment.date.getDate() === date.getDate() &&
                        appointment.date.getMonth() === date.getMonth() &&
                        appointment.date.getFullYear() === date.getFullYear() &&
                        appointment.date.getHours() === hour
                      );
                    },
                  );

                  return (
                    <div key={hour} className="grid grid-cols-12 gap-2">
                      <div className="col-span-1 text-right text-gray-500">
                        {hour}:00
                      </div>
                      <div className="col-span-11 border-l pl-2 min-h-[60px]">
                        {hourAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="p-2 mb-1 border rounded-md bg-blue-50 cursor-pointer"
                            onClick={() => handleAppointmentSelect(appointment)}
                          >
                            <p className="font-medium">
                              {appointment.patientName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.type}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Upcoming Appointments</CardTitle>
              <CardDescription>
                View and manage all scheduled appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleAppointmentSelect(appointment)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {appointment.date.toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatTime(appointment.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-medium">
                              {appointment.patientName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.type}
                            </p>
                          </div>
                          <Badge
                            variant={
                              appointment.status === "confirmed"
                                ? "default"
                                : appointment.status === "pending"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No appointments scheduled</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Appointment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              View and manage appointment information
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient</Label>
                  <p className="font-medium">
                    {selectedAppointment.patientName}
                  </p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge
                    className="mt-1"
                    variant={
                      selectedAppointment.status === "confirmed"
                        ? "default"
                        : selectedAppointment.status === "pending"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {selectedAppointment.status}
                  </Badge>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="font-medium">
                    {selectedAppointment.date.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>Time</Label>
                  <p className="font-medium">
                    {formatTime(selectedAppointment.date)}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label>Type</Label>
                  <p className="font-medium">{selectedAppointment.type}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    // Update appointment status
                    const updatedAppointments = appointments.map((app) =>
                      app.id === selectedAppointment.id
                        ? {
                            ...app,
                            status:
                              app.status === "confirmed"
                                ? "cancelled"
                                : "confirmed",
                          }
                        : app,
                    );
                    setAppointments(updatedAppointments);
                    setIsDialogOpen(false);
                  }}
                >
                  {selectedAppointment.status === "confirmed"
                    ? "Cancel"
                    : "Confirm"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
