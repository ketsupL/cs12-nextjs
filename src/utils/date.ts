export function formatToPHDate(inputDate: string | Date): string {
  // Convert input to Date
  const date = new Date(inputDate);

  // Convert to PH timezone (Asia/Manila, UTC+8)
  const phDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Manila" })
  );

  // Extract components
  const month = phDate.getMonth() + 1; // Months are 0-based
  const day = phDate.getDate();
  const year = phDate.getFullYear();

  // Return in M/D/YYYY format
  return `${month}/${day}/${year}`;
}
