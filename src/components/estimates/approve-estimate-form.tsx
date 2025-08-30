import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Estimate } from "@/types/estimates";
import { useEstimates } from "@/hooks/useEstimates";

interface ApproveEstimateFormProps {
  estimate: Estimate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
export default function ApproveEstimateForm({
  estimate,
  open,
  onOpenChange,
  onSuccess,
}: ApproveEstimateFormProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [email, setEmail] = useState(estimate.customer.email || "");
  const { handleApproveEstimate } = useEstimates();
  const handleApprove = async (e: FormEvent) => {
    e.preventDefault();
    setIsApproving(true);
    try {
      if (dueDate.trim() === "") {
        toast.error("Address is required");
        setIsApproving(false);
        return;
      }
      const success = await handleApproveEstimate(estimate.id, dueDate);
      if (success) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to convert estimate:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsApproving(false);
    }
  };
  const now = new Date();

  const today = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const maxDate = new Date(
    now.getFullYear() + 25, // add 5 years
    now.getMonth(),
    now.getDate()
  )
    .toISOString()
    .split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Approve Estimate</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Approve estimate{" "}
            <span className="font-bold">{estimate.job_name}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleApprove}>
          <div className="space-y-2 my-6">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              disabled={estimate.customer.email !== ""}
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="date">Due Date *</Label>
            <Input
              min={today}
              id="date"
              name="date"
              onChange={(e) => setDueDate(e.target.value)}
              required
              max={maxDate}
              className="w-fit"
              type="date"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isApproving}
            >
              Cancel
            </Button>
            <Button variant="default" type="submit" disabled={isApproving}>
              {isApproving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Approving...
                </>
              ) : (
                <>Approve Estimate</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
