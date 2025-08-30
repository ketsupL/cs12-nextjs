import { SortableJobColumn } from "@/hooks/useJobs";
import axios from "@/lib/axios";
import { JobAdd, PaginatedJobResponse } from "@/types/jobs";
import { jsonResponse, JsonResponse } from "@/utils/response";

export async function getJobsByPagination(
  activePage: number,
  perPage: number,
  sortConfig: SortableJobColumn[] | [],
  searchTerm: string
): Promise<JsonResponse<PaginatedJobResponse | null>> {
  const sortBy = sortConfig.length > 0 ? sortConfig[0].key : "created_at";
  const orderBy = sortConfig.length > 0 ? sortConfig[0].sortBy : "desc";

  const res = await axios.get(`/api/jobs`, {
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

  return jsonResponse<PaginatedJobResponse>({
    data: res.data as PaginatedJobResponse,
    status: "success",
  });
}

export async function createJob(formData: JobAdd, customerId: number) {
  const res = await axios.post(`/api/jobs/${customerId}`, formData);
  if (res.status !== 200) {
    return jsonResponse({
      data: null,
      status: "error",
      message: "Failed to create customer",
    });
  }
  return jsonResponse({
    data: null,
    status: "success",
  });
}
