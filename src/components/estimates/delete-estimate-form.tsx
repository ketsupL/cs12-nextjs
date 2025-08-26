import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteEstimate } from "@/services/estimates";
import { Estimate } from "@/types/estimates";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteEstimateFormProps {
  estimate: Estimate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
export default function DeleteEstimateForm({
  estimate,
  open,
  onOpenChange,
  onSuccess,
}: DeleteEstimateFormProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteEstimate(estimate.id);
  
      if (response.status === "error") {
        throw new Error(response.message || "Failed to update estimate");
      }
      toast.success("Estimate deleted successfully");
      onSuccess()
    } catch (error) {
      console.error("Error deleting estimate:", error);
      toast.error("Failed to delete estimate. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Estimate</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &nbsp;
            <span className="font-bold">{estimate.job_name}</span>? This action
            cannot be undone and will permanently remove all estimate data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Deleting...
              </>
            ) : (
              <>Delete Estimate</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
