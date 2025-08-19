import { MoveDown, MoveUp } from "lucide-react";
import { TableHead } from "../ui/table";
import { SortableTableColumn } from "@/hooks/useCustomers";

type ClickableTableHeaderProps = {
  columnData: SortableTableColumn;
  sortBy: SortableTableColumn[];
  setSortedBy: (
    setter: (sortableColumn: SortableTableColumn[]) => SortableTableColumn[]
  ) => void;
};

// To Allow Tables to be sorted
export default function ClickableTableHeader({
  columnData,
  sortBy,
  setSortedBy,
}: ClickableTableHeaderProps) {
  // Check how the table is sorted
  const tableSortBy = sortBy.find(
    (sortedColumns) => columnData.key === sortedColumns.key
  )?.sortBy;
  
  return (
    <TableHead className="">
      <button
        onClick={() => {
          setSortedBy(() => {
            if (!tableSortBy) {
              // Start with descending sort by default
              const sortDirection: SortableTableColumn["sortBy"] = "desc";

              return [{ ...columnData, sortBy: sortDirection }];
            }

            // Toggle between ascending and descending
            if (tableSortBy === "desc") return [{ ...columnData, sortBy: "asc" }];

            return [{ ...columnData, sortBy: "desc" }];
          });
        }}
        className="flex items-center hover:underline"
      >
        {columnData.columnName}
        <span className="relative size-6 ">
          <MoveUp
            color={tableSortBy === "asc" ? "#0284c7" : "#64748b"}
            className="absolute left-0 w-4 top-0"
          />
          <MoveDown
            color={tableSortBy === "desc" ? "#0284c7" : "#64748b"}
            className="absolute left-2 w-4 top-0"
          />
        </span>
      </button>
    </TableHead>
  );
}
