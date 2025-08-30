import { Customer } from "./database";

export type Job = {
  id: number;
  customer: Pick<
    Customer,
    "id" | "first_name" | "last_name" | "email" | "property_address"
  >;
  job_name: string;
  status: JobStatus;
  notes?: string;
  site_address?: string;
  due_date: string;
  updated_at: Date;
  created_at: Date;
};

export type JobStatus = "pending" | "in_progress" | "completed" | "cancelled";

export interface PaginatedJobResponse {
  current_page: number;
  data: Job[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const JOB_STATUSES = [
  { value: "pending", label: "Pending", color: "bg-blue-100 text-blue-800" },
  {
    value: "in_progress",
    label: "In Progress",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "completed",
    label: "Completed",
    color: "bg-green-100 text-green-800",
  },
  { value: "cancelled", label: "Cancelled", color: "bg-neutral-100 text-neutral-800" },
] as const;

export type JobAdd = Omit<Job, "id" | "customer" | "created_at" | "updated_at">;
