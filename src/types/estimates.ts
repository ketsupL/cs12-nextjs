import { Customer } from "./database";
import { Task } from "./tasks";

export interface Estimate extends Record<string, unknown> {
  id: number;
  customer: Pick<Customer, "id" | "first_name" | "last_name" | "email">;
  job_name: string;
  status: EstimateStatus;
  notes?: string;
  tasks: Task[];
}

export type EstimateStatus = "draft" | "sent" | "approved" | "rejected";


export interface PaginatedEstimateResponse {
  current_page: number;
  data: Estimate[];
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