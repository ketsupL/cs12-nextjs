import { SortableLeadColumn } from "@/hooks/useLeads";
import axios from "@/lib/axios";
import {
  CreateLeadData,
  PaginatedLeadResponse,
  UpdateLeadData,
} from "@/types/leads";
import { JsonResponse, jsonResponse } from "@/utils/response";

export async function getLeadsByPagination(
  activePage: number,
  perPage: number,
  sortConfig: SortableLeadColumn[] | [],
  searchTerm: string
): Promise<JsonResponse<PaginatedLeadResponse | null>> {
  const sortBy = sortConfig.length > 0 ? sortConfig[0].key : "created_at";
  const orderBy = sortConfig.length > 0 ? sortConfig[0].sortBy : "desc";

  const res = await axios.get(`/api/leads`, {
    params: {
      page: activePage,
      perPage,
      sortBy,
      sortOrder: orderBy,
      searchTerm,
    },
  });
  if (res.status !== 200) {
    return jsonResponse({
      data: null,
      status: "error",
      message: "Failed to collect leads",
    }); // ❌ throwing
  }

  return jsonResponse<PaginatedLeadResponse>({
    data: res.data as PaginatedLeadResponse,
    status: "success",
  });
}

export async function createLead(
  formData: CreateLeadData
): Promise<JsonResponse<null>> {
  const res = await axios.post("/api/leads", formData);
  if (res.status !== 200) {
    return jsonResponse({
      data: null,
      status: "error",
      message: "Failed to create lead",
    });
  }
  return jsonResponse({
    data: null,
    status: "success",
  });
}

export async function updateLead(
  id: number,
  lead: UpdateLeadData
): Promise<JsonResponse<null>> {
  const res = await axios.patch(`/api/leads/${id}`, { ...lead });
  if (res.status !== 200) {
    return jsonResponse({
      data: null,
      status: "error",
      message: "Failed to update lead",
    });
  }
  return jsonResponse({
    data: null,
    status: "success",
  });
}

export async function deleteLead(id: number): Promise<JsonResponse<null>> {
  const res = await axios.delete(`/api/leads/${id}`, {});
  if (res.status !== 200) {
    return jsonResponse({
      data: null,
      status: "error",
      message: "Failed to delete lead",
    });
  }
  return jsonResponse({
    data: null,
    status: "success",
  });
}
export async function deleteLeads(
  ids: Set<string>
): Promise<JsonResponse<null>> {
  const res = await axios.delete(`/api/leads`, {
    data: { ids: [...ids] },
  });
  if (res.status !== 200) {
    return jsonResponse({
      data: null,
      status: "error",
      message: "Failed to delete lead",
    });
  }
  return jsonResponse({
    data: null,
    status: "success",
  });
}

export async function convertLeadToCustomer(
  leadId: number,
  customerData?: Record<string, unknown>
): Promise<JsonResponse<null>> {
  const res = await axios.post(`/api/lead/${leadId}`, customerData);
  if (res.status !== 200) {
    return jsonResponse({
      data: null,
      status: "error",
      message: "Failed to delete lead",
    });
  }
  return jsonResponse({
    data: null,
    status: "success",
  });
}
