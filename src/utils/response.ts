/**
 * Standard response format for API calls
 */
export interface JsonResponse<T> {
  status: "success" | "error";
  data: T;
  message?: string;
}

/**
 * Helper function to create a standard JSON response
 */
export const jsonResponse = <T>({
  status,
  data,
  message,
}: JsonResponse<T>): JsonResponse<T> => {
  return {
    status,
    data,
    message,
  };
};
