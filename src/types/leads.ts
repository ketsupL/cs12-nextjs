export interface Lead extends Record<string, unknown> {
  id: number;
  first_name: string;
  last_name:string;
  email?: string;
  phone?: string;
  company?: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  source?: LeadSource;
  notes?: string;
  created_at: string;
  updated_at: string;
}
export interface PaginatedLeadResponse {
  current_page: number;
  data: Lead[];
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
export const LEAD_STATUSES = [
  { value: "new", label: "New", color: "bg-blue-100 text-blue-800" },
  {
    value: "contacted",
    label: "Contacted",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "qualified",
    label: "Qualified",
    color: "bg-purple-100 text-purple-800",
  },
  {
    value: "converted",
    label: "Converted",
    color: "bg-green-100 text-green-800",
  },
  { value: "lost", label: "Lost", color: "bg-red-100 text-red-800" },
] as const;

export type LeadStatus= "new" | "contacted" | "qualified" | "converted" | "lost";

export enum LeadSource {
  Website = "Website",
  Referral = "Referral",
  SocialMedia = "Social Media",
  EmailCampaign = "Email Campaign",
  PhoneCall = "Phone Call",
  TradeShow = "Trade Show",
  Advertisement = "Advertisement",
  ColdOutreach = "Cold Outreach",
  Other = "Other",
}
export interface CreateLeadData {
  first_name: string;
  last_name:string;
  email?: string;
  phone?: string;
  company?: string;
  status?: LeadStatus;
  source?: LeadSource | "";
  notes?: string;
  location_id: string;
}

export interface UpdateLeadData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: LeadStatus,
  source?: LeadSource | "";
  notes?: string;
  assigned_to?: string;
}

export const LEAD_SOURCES = [
  "Website",
  "Referral",
  "Social Media",
  "Email Campaign",
  "Phone Call",
  "Trade Show",
  "Advertisement",
  "Cold Outreach",
  "Other",
] as const;
