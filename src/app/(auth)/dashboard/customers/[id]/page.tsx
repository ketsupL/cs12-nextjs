import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import {
  CustomerHeader,
  CustomerStats,
  CustomerTabs,
} from "@/components/customers/customer-detail";
import { getCustomerById } from "@/services/customers";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "edge";

export default async function CustomerDetailPage(
  // @ts-expect-error - Next.js 15.3.5 type issue
  { params, searchParams }
) {
  const { id } = await params;
  const { category } = await searchParams;
  const cookieHeader = (await headers()).get("cookie"); // browser cookies
  // Fetch customer, locations, and merged customers data
  const customer = await getCustomerById(id, cookieHeader as string);
  console.log(category);
  if (customer.data == null || customer.status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-20 px-4">
        <div className="w-full max-w-md text-gray-50 text-center space-y-5">
          <div className="rounded-full bg-muted/50 p-6 mx-auto w-fit">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Customer not found
          </h1>
          <p className="text-muted-foreground text-lg">
            The customer you are looking for does not exist or has been deleted.
          </p>
          <Button size="lg" className="mt-4" asChild>
            <Link href="/dashboard/customers">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Customers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Breadcrumb items
  const breadcrumbItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Customers",
      href: "/dashboard/customers",
    },
    {
      label: `${customer.data?.first_name} ${customer.data?.last_name}`,
      current: true,
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Top Header Bar */}
      <div className="border-b bg-white">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb items={breadcrumbItems} />

        {/* Stats Bar */}
        <div className="px-6 py-4">
          <CustomerStats />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Customer Info */}
        <div className="w-80 border-r bg-white overflow-y-auto">
          <CustomerHeader customer={customer.data} />
        </div>

        {/* Right Content - Tabs */}
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <CustomerTabs />
        </div>
      </div>
    </div>
  );
}
