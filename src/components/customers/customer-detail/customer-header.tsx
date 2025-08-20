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
  UserX,
  MapPin,
  ChevronDown,
  Users,
  User,
  CheckCircle2,
  Navigation,
  Receipt,
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { EditCustomerForm } from "@/components/customers/edit-customer-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteCustomers } from "@/services/customers";
import DeleteCustomerForm from "./delete-customer-form";

interface CustomerHeaderProps {
  customer: Customer;
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const getInitials = () => {
    return `${customer.first_name?.[0] || ""}${
      customer.last_name?.[0] || ""
    }`.toUpperCase();
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(String(customer.id));
    toast.success("Customer ID copied to clipboard");
  };

  const handleEdit = (customerToEdit: Customer) => {
    setEditingCustomer(customerToEdit);
    setEditModalOpen(true);
  };

  const handleEditComplete = () => {
    setEditModalOpen(false);
    setEditingCustomer(null);
    window.location.reload();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [addressesOpen, setAddressesOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const primaryCustomer = customer;

  const openInMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank");
  };

  const addressesMatch =
    customer.property_address &&
    customer.billing_address &&
    customer.property_address === customer.billing_address;

  return (
    <>
      {deleteDialogOpen && (
        <DeleteCustomerForm
          customer={customer}
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
                {customer.first_name} {customer.last_name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="font-mono text-xs">
                  {customer.id}
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
              onClick={() => handleEdit(customer)}
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

        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
            Contact
          </h3>
          <div className="space-y-2">
            {customer.phone && (
              <a
                href={`tel:${customer.phone}`}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-50"
              >
                <Phone className="h-4 w-4" />
                <span>{customer.phone}</span>
              </a>
            )}

            {customer.email && (
              <a
                href={`mailto:${customer.email}`}
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-50"
              >
                <Mail className="h-4 w-4" />
                <span className="truncate">{customer.email}</span>
              </a>
            )}

            {customer.company_name && (
              <div className="flex items-center gap-3 text-sm text-gray-600 p-2">
                <Briefcase className="h-4 w-4" />
                <span>{customer.company_name}</span>
              </div>
            )}

            {customer.lead_source && (
              <div className="flex items-center gap-3 text-sm text-gray-600 p-2">
                <Tag className="h-4 w-4" />
                <span>{customer.lead_source}</span>
              </div>
            )}

            <div className="flex items-center gap-3 text-sm text-gray-600 p-2">
              <Clock className="h-4 w-4" />
              <span>Since {formatDate(customer.created_at)}</span>
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
            {customer.property_address && (
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Property Address
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openInMaps(customer.property_address!)}
                    className="text-xs h-auto p-1"
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Directions
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  {customer.property_address}
                </p>
              </div>
            )}

            {/* Primary Customer Billing Address */}
            {customer.billing_address && !addressesMatch && (
              <div className="p-3 bg-gray-50 rounded-md">
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider block mb-2">
                  Billing Address
                </span>
                <p className="text-sm text-gray-600">
                  {customer.billing_address}
                </p>
              </div>
            )}

            {/* Alternative Addresses from Merged Customers */}
          </CollapsibleContent>
        </Collapsible>

        {/* Additional Contacts Section */}
      </div>

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <EditCustomerForm
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          customer={editingCustomer}
          onSuccess={handleEditComplete}
        />
      )}
    </>
  );
}
