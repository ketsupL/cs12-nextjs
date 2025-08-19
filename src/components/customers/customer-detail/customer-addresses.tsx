"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Receipt, CheckCircle2, Navigation } from "lucide-react";
import type { Customer } from "@/types/database";

interface CustomerAddressesProps {
  customer: Customer;
}

export function CustomerAddresses({ customer }: CustomerAddressesProps) {
  const addressesMatch =
    customer.property_address &&
    customer.billing_address &&
    customer.property_address === customer.billing_address;

  const openInMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Property Address Card */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 bg-gray-50/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-base font-medium">
                Property Address
              </CardTitle>
            </div>
            {customer.property_address && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openInMaps(customer.property_address!)}
                className="text-xs"
              >
                <Navigation className="h-3.5 w-3.5 mr-1" />
                Directions
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {customer.property_address ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{customer.property_address}</p>
              <div className="h-32 w-full bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Map preview</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-32 w-full bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-200">
              <MapPin className="h-6 w-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No property address provided</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing Address Card */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3 bg-gray-50/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-gray-600" />
              <CardTitle className="text-base font-medium">
                Billing Address
              </CardTitle>
            </div>
            {addressesMatch && (
              <Badge variant="secondary" className="text-xs">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Same as property
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {customer.billing_address ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">{customer.billing_address}</p>
              {!addressesMatch && customer.property_address && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                  <p className="text-xs text-amber-800 flex items-center gap-1">
                    <span className="font-medium">Note:</span>
                    Billing address differs from property address
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-32 w-full bg-gray-50 rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-200">
              <Receipt className="h-6 w-6 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No billing address provided</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}