import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLeads } from "@/hooks/useLeads";
import { Lead } from "@/types/leads";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ConvertLeadFormProps {
  lead: Lead;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
export default function ConvertLeadForm({
  lead,
  open,
  onOpenChange,
  onSuccess,
}: ConvertLeadFormProps) {
  const [isDeleting, setIsConverting] = useState(false);
  const { handleConvertLead } = useLeads();
  const handleConvert = async () => {
    setIsConverting(true);
    try {
      const success = await handleConvertLead(lead.id, lead);
      if (success) {
        onSuccess();
      }
    } catch (error) {
      console.error("Failed to convert lead:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Convert Lead</DialogTitle>
          <DialogDescription>
            Are you sure you want to convert {lead.first_name} {lead.last_name}?
            This action cannot be undone.
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
            variant="default"
            onClick={handleConvert}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Converting...
              </>
            ) : (
              <>Convert Lead</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
