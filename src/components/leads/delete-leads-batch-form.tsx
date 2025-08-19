"use client";

import React, { useState } from "react";
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

interface DeleteLeadsBatchFormProps {
  selectedIds: Set<string>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function DeleteLeadsBatchForm({ selectedIds, open, onOpenChange, onSuccess }: DeleteLeadsBatchFormProps) {
  const { handleDeleteSelectedLeads } = useLeads();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await handleDeleteSelectedLeads();
      if (success) {
        onSuccess();
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error deleting leads:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Leads</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {selectedIds.size} lead{selectedIds.size > 1 ? 's' : ''}? 
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
