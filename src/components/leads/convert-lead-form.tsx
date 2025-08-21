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
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

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
  const [isConverting, setIsConverting] = useState(false);
  const { handleConvertLead } = useLeads();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState(lead.email || "");
  const handleConvert = async (e: FormEvent) => {
    e.preventDefault();
    setIsConverting(true);
    try {
      if (address.trim() === "") {
        toast.error("Address is required");
        setIsConverting(false);
        return;
      }
      const success = await handleConvertLead(lead.id, address, email, lead);
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
          <DialogDescription className="text-muted-foreground">
            Convert customer {lead.first_name + " " + lead.last_name}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleConvert}>
          <div className="space-y-2 my-6">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              disabled={lead.email !== ""}
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Property Address *</Label>
            <Textarea
              id="address"
              name="address"
              value={address || ""}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Property Address"
              className="resize-none"
              required
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isConverting}
            >
              Cancel
            </Button>
            <Button variant="default" type="submit" disabled={isConverting}>
              {isConverting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Converting...
                </>
              ) : (
                <>Convert Lead</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
