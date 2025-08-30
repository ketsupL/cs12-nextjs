import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { deleteLeads } from "@/services/leads";
type DeleteLeadsProps = {
  selectedIds?: Set<string>;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteLeadsByBatchForm({
  selectedIds,
  onSuccess,
  open,
  onOpenChange,
}: DeleteLeadsProps) {
  const leadToDelete = selectedIds || new Set<string>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleting(true);

    try {
      // Create lead with proper error handling
      const response = await deleteLeads(leadToDelete);

      if (response.status === "error") {
        throw new Error(response.message || "Failed to delete lead");
      }

      // Optimistacally Update

      // Success! The lead was created
      toast.success("Estimate deleted successfully");

      // Close the modal and close the page
      onSuccess();
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? String(error.message)
          : "Failed to delete lead. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete {leadToDelete.size}{" "}
            {leadToDelete.size > 1 ? "leads" : "lead"}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the lead
            and remove the data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant={"destructive"}
            className="bg-destructive"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
