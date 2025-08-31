"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "./empty-state";
import {
  Calendar,
  FileText,
  Receipt,
  MessageSquare,
  Plus,
  Activity,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";

type CustomerTabsProps = {
  category: string;
};

export function CustomerTabs({ category }: CustomerTabsProps) {
  const tabs = [
    { value: "estimates", label: "Estimates", icon: FileText },
    { value: "jobs", label: "Jobs", icon: Calendar },
    { value: "invoices", label: "Invoices", icon: Receipt },
  ];
  const initialTab = tabs.some((t) => t.value === category)
    ? category
    : "estimates";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="h-full flex flex-col">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="h-full flex flex-col"
      >
        <div className="border-b bg-white px-6 py-4">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent px-4 py-2 font-medium text-sm text-gray-600 data-[state=active]:text-primary hover:text-gray-900 transition-colors"
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent
          value="jobs"
          className="flex-1 p-6 space-y-6 overflow-y-auto"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Jobs</h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage all jobs and appointments for this customer
              </p>
            </div>
            <Button size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Create Job
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <EmptyState
                icon={Calendar}
                title="No jobs yet"
                description="Create your first job to start scheduling work for this customer."
                action={{
                  label: "Create Job",
                  onClick: () => console.log("Create job"),
                  icon: Plus,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="estimates"
          className="flex-1 p-6 space-y-6 overflow-y-auto"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Estimates</h2>
              <p className="text-sm text-gray-500 mt-1">
                View and manage all estimates and quotes
              </p>
            </div>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Create Estimate
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <EmptyState
                icon={FileText}
                title="No estimates yet"
                description="Create estimates to provide quotes for your customer's projects."
                action={{
                  label: "Create Estimate",
                  onClick: () => console.log("Create estimate"),
                  icon: Plus,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="invoices"
          className="flex-1 p-6 space-y-6 overflow-y-auto"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Invoices</h2>
              <p className="text-sm text-gray-500 mt-1">
                Track all invoices and payment history
              </p>
            </div>
            <Button size="sm">
              <Receipt className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <EmptyState
                icon={Receipt}
                title="No invoices yet"
                description="Create invoices to bill your customer for completed work."
                action={{
                  label: "Create Invoice",
                  onClick: () => console.log("Create invoice"),
                  icon: Plus,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
