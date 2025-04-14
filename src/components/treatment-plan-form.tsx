"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker-with-range";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "../../supabase/client";

// Mock patient data for dropdown
const mockPatients = [
  { id: 1, name: "Sarah Johnson" },
  { id: 2, name: "Michael Chen" },
  { id: 3, name: "Emily Rodriguez" },
  { id: 4, name: "David Wilson" },
  { id: 5, name: "Jennifer Lee" },
];

// Form validation schema
const treatmentPlanSchema = z.object({
  patientId: z.string({
    required_error: "Please select a patient",
  }),
  planName: z
    .string({
      required_error: "Plan name is required",
    })
    .min(3, {
      message: "Plan name must be at least 3 characters",
    }),
  description: z.string().optional(),
  startDate: z.date({
    required_error: "Start date is required",
  }),
  endDate: z.date({
    required_error: "End date is required",
  }),
  status: z.string({
    required_error: "Status is required",
  }),
  notes: z.string().optional(),
});

type TreatmentPlanFormValues = z.infer<typeof treatmentPlanSchema>;

export default function TreatmentPlanForm({ plan = null }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const form = useForm<TreatmentPlanFormValues>({
    resolver: zodResolver(treatmentPlanSchema),
    defaultValues: {
      patientId: plan?.patientId || "",
      planName: plan?.planName || "",
      description: plan?.description || "",
      startDate: plan?.startDate ? new Date(plan.startDate) : new Date(),
      endDate: plan?.endDate
        ? new Date(plan.endDate)
        : new Date(new Date().setMonth(new Date().getMonth() + 6)),
      status: plan?.status || "Active",
      notes: plan?.notes || "",
    },
  });

  const onSubmit = async (data: TreatmentPlanFormValues) => {
    setIsSubmitting(true);
    try {
      // Here you would normally save the data to your database
      console.log("Form data submitted:", data);

      // TODO: Implement Supabase integration in the next step
      // Simulate API call delay for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to treatment plans list
      router.push("/dashboard/treatment-plans");
      router.refresh();
    } catch (error) {
      console.error("Error saving treatment plan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Selection */}
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a patient" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockPatients.map((patient) => (
                      <SelectItem
                        key={patient.id}
                        value={patient.id.toString()}
                      >
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the patient for this treatment plan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Plan Name */}
          <FormField
            control={form.control}
            name="planName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Diabetes Management Plan"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter a descriptive name for the treatment plan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Date */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <DatePicker date={field.value} setDate={field.onChange} />
                <FormDescription>
                  When does this treatment plan start?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <DatePicker date={field.value} setDate={field.onChange} />
                <FormDescription>
                  When is this treatment plan expected to end?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Current status of the treatment plan
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide a detailed description of the treatment plan"
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe the goals and approach of this treatment plan
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional notes or instructions"
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include any special instructions or considerations
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/treatment-plans")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : plan ? "Update Plan" : "Create Plan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
