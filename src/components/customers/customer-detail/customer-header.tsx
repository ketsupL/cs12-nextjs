"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Customer } from "@/types/database";
import {
  Phone,
  Mail,
  Tag,
  Clock,
  Briefcase,
  Edit,
  Trash2,
  MoreHorizontal,
  Copy,
  Share2,
  UserCheck,
  MapPin,
  ChevronDown,
  CheckCircle2,
  Navigation,
  UserPlus, 
  ShieldCheck, 
  Link2,
  User,     // Added missing icon
  Unlink    // Added missing icon
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem } from "@/components/ui/command";
import { EditCustomerForm } from "@/components/customers/edit-customer-form";
import toast from "react-hot-toast";
import DeleteCustomerForm from "./delete-customer-form";

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerData, setCustomerData] = useState(customer);
  
  // --- New State for the User Selector ---
  const [userPickerOpen, setUserPickerOpen] = useState(false);
  const [addressesOpen, setAddressesOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const getInitials = () => {
    return `${customerData.first_name?.[0] || ""}${
      customerData.last_name?.[0] || ""
    }`.toUpperCase();
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(String(customerData.id));
    toast.success("Customer ID copied to clipboard");
  };

  const handleEdit = (customerToEdit: Customer) => {
    setEditingCustomer(customerToEdit);
    setEditModalOpen(true);
  };

  const handleEditComplete = (customer: Customer) => {
    setEditModalOpen(false);
    setEditingCustomer(null);
    setCustomerData({ ...customer });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const openInMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=$${encodedAddress}`, "_blank");
  };

  // --- Dummy Handlers for the Portal Link ---
  const handleLinkUser = (userId: string) => {
    console.log("Linking user:", userId);
    setUserPickerOpen(false);
    toast.success("User linked successfully!");
  };

  const handleUnlinkUser = () => {
    console.log("Unlinking user");
    toast.success("User unlinked.");
  };

  const addressesMatch =
    customerData.property_address &&
    customerData.billing_address &&
    customerData.property_address === customerData.billing_address;

  return (
    <>
      {deleteDialogOpen && (
        <DeleteCustomerForm
          customer={customerData}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onSuccess={() => {
            setDeleteDialogOpen(false);
          }}
        />
      )}
      <div className="p-6 space-y-6">
        {/* Customer Avatar and Basic Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                <AvatarFallback className="text-lg bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1">
                <div
                  className={`w-5 h-5 rounded-full border-2 border-background flex items-center justify-center ${"bg-green-500"}`}
                >
                  {<UserCheck className="h-2.5 w-2.5 text-white" />}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                {customerData.first_name} {customerData.last_name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="font-mono text-xs">
                  {customerData.id}
                </Badge>
                <Badge variant={"default"} className="text-xs">
                  {"Active"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={() => handleEdit(customerData)}
              size="sm"
              className="flex-1"
            >
              <Edit className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteDialogOpen(true)}
              className="flex-1"
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Delete
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleCopyId}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />
        
          {/* PORTAL ACCESS COMPONENT */}
          <div className="space-y-3 px-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Portal Access
              </h3>
              {customerData.user && (
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 text-[10px]">
                  Linked
                </Badge>
              )}
            </div>

            {!customerData.user ? (
              <div className="space-y-2">
                <Popover open={userPickerOpen} onOpenChange={setUserPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between text-xs font-normal h-9 border-dashed"
                    >
                      <span>Link user account...</span>
                      <Link2 className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search users..." className="h-9" />
                      <CommandEmpty>
                        <div className="py-4 text-center">
                          <p className="text-xs text-gray-500">No user found.</p>
                          <Button variant="link" size="sm" className="text-xs mt-1">
                            <UserPlus className="mr-1 h-3 w-3" /> Create new user
                          </Button>
                        </div>
                      </CommandEmpty>
                      <CommandGroup>
                        {/* Static mock data for now */}
                        <CommandItem
                          onSelect={() => handleLinkUser("123")}
                          className="text-xs cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">Nicolette Buckridge</span>
                            <span className="text-gray-500">nicolette.b@gmail.com</span>
                          </div>
                        </CommandItem>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <p className="text-[11px] text-gray-500 leading-tight px-1">
                  Linking allows the customer to log in and view their estimates, jobs, and invoices.
                </p>
              </div>
            ) : (
              /* LINKED STATE */
              <div className="flex items-center justify-between p-2 rounded-lg border bg-gray-50/50">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-medium truncate">
                      {customerData.user.name}
                    </span>
                    <span className="text-[10px] text-gray-500 truncate">
                      {customerData.user.email}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-gray-400 hover:text-destructive"
                  onClick={handleUnlinkUser}
                >
                  <Unlink className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
          
        <Separator />

        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
            Contact
          </h3>
          <div className="space-y-2">
            {customerData.phone && (
              <a
                href={`tel:${customerData.phone}`}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-50"
              >
                <Phone className="h-4 w-4" />
                <span>{customerData.phone}</span>
              </a>
            )}

            {customerData.email && (
              <a
                href={`mailto:${customerData.email}`}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-50"
              >
                <Mail className="h-4 w-4" />
                <span className="truncate">{customerData.email}</span>
              </a>
            )}

            {customerData.company_name && (
              <div className="flex items-center gap-3 text-sm text-gray-600 p-2">
                <Briefcase className="h-4 w-4" />
                <span>{customerData.company_name}</span>
              </div>
            )}

            {customerData.lead_source && (
              <div className="flex items-center gap-3 text-sm text-gray-600 p-2">
                <Tag className="h-4 w-4" />
                <span>{customerData.lead_source}</span>
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-gray-600 p-2">
              <Clock className="h-4 w-4" />
              <span>Since {formatDate(customerData.created_at)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Addresses Section */}
        <Collapsible open={addressesOpen} onOpenChange={setAddressesOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded-md px-2 transition-colors">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  Addresses
                </span>
                {addressesMatch && (
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Same
                  </Badge>
                )}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  addressesOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-2 space-y-3">
            {/* Primary Customer Property Address */}
            {customerData.property_address && (
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Property Address
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openInMaps(customerData.property_address!)}
                    className="text-xs h-auto p-1"
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Directions
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  {customerData.property_address}
                </p>
              </div>
            )}

            {/* Primary Customer Billing Address */}
            {customerData.billing_address && !addressesMatch && (
              <div className="p-3 bg-gray-50 rounded-md">
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider block mb-2">
                  Billing Address
                </span>
                <p className="text-sm text-gray-600">
                  {customerData.billing_address}
                </p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <EditCustomerForm
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          customer={editingCustomer}
          onSuccess={(customer) => handleEditComplete(customer as Customer)}
        />
      )}
    </>
  );
}