import { SortableInvoiceColumn } from "@/hooks/useInvoice";
import axios from "@/lib/axios";
import { InvoiceAdd, PaginatedInvoiceResponse } from "@/types/invoices";
import { jsonResponse, JsonResponse } from "@/utils/response";

export async function getInvoicesByPagination(
  activePage: number,
  perPage: number,
  sortConfig: SortableInvoiceColumn[] | [],
  searchTerm: string
): Promise<JsonResponse<PaginatedInvoiceResponse | null>> {
  const sortBy = sortConfig.length > 0 ? sortConfig[0].key : "created_at";
  const orderBy = sortConfig.length > 0 ? sortConfig[0].sortBy : "desc";

  const res = await axios.get(`/api/invoices`, {
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
      message: "Failed to collect invoice",
    }); // ❌ throwing
  }

  return jsonResponse<PaginatedInvoiceResponse>({
    data: res.data as PaginatedInvoiceResponse,
    status: "success",
  });
}

export async function createInvoice(formData: InvoiceAdd, customerId: number) {
  const res = await axios.post(`/api/invoices/${customerId}`, formData);
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
