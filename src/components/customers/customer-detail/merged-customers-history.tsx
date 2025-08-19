"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Users,
  ChevronDown,
  History,
  Merge,
  Calendar,
  User,
} from "lucide-react";
import type { Customer } from "@/types/database";
import { useState } from "react";

interface MergedCustomersHistoryProps {
  mergedCustomers: Customer[];
}

export function MergedCustomersHistory({ mergedCustomers }: MergedCustomersHistoryProps) {
  const [isOpen, setIsOpen] = useState(true);
  const primaryCustomer = mergedCustomers.find((c) => c.is_primary);
  const secondaryCustomers = mergedCustomers.filter((c) => !c.is_primary);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (mergedCustomers.length <= 1) return null;

  return (
    <Card className="overflow-hidden border-gray-200">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Merge className="h-5 w-5 text-gray-700" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Merge History</CardTitle>
              <p className="text-sm text-gray-600 mt-0.5">
                {mergedCustomers.length} customer profiles have been consolidated
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {mergedCustomers.length} profiles
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              <History className="h-3.5 w-3.5 mr-1" />
              View Timeline
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Primary Customer Highlight */}
        {primaryCustomer && (
          <div className="p-4 bg-primary/5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-primary-foreground text-xs">
                  Primary Profile
                </Badge>
                <span className="font-medium text-sm">
                  {primaryCustomer.first_name} {primaryCustomer.last_name}
                </span>
                <Badge variant="outline" className="text-xs font-mono">
                  {primaryCustomer.unique_id}
                </Badge>
              </div>
              <span className="text-xs text-gray-500">
                <Calendar className="h-3 w-3 inline mr-1" />
                Created {formatDate(primaryCustomer.created_at)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {primaryCustomer.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{primaryCustomer.email}</span>
                </div>
              )}
              {primaryCustomer.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{primaryCustomer.phone}</span>
                </div>
              )}
              {primaryCustomer.company_name && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  <span>{primaryCustomer.company_name}</span>
                </div>
              )}
              {primaryCustomer.property_address && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{primaryCustomer.property_address}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Secondary Customers */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Merged Profiles ({secondaryCustomers.length})
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="divide-y divide-gray-100">
              {secondaryCustomers.map((customer, index) => (
                <div
                  key={customer.id}
                  className="p-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                        {index + 1}
                      </div>
                      <span className="font-medium text-sm">
                        {customer.first_name} {customer.last_name}
                      </span>
                      <Badge variant="outline" className="text-xs font-mono">
                        {customer.unique_id}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      Merged {formatDate(customer.updated_at)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm pl-10">
                    {customer.email && customer.email !== primaryCustomer?.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate">{customer.email}</span>
                        <Badge variant="secondary" className="text-xs">Alt</Badge>
                      </div>
                    )}
                    {customer.phone && customer.phone !== primaryCustomer?.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{customer.phone}</span>
                        <Badge variant="secondary" className="text-xs">Alt</Badge>
                      </div>
                    )}
                    {customer.property_address && customer.property_address !== primaryCustomer?.property_address && (
                      <div className="flex items-center gap-2 text-gray-600 col-span-full">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="truncate text-xs">{customer.property_address}</span>
                        <Badge variant="secondary" className="text-xs">Alt</Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}