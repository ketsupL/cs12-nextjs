"use client";

import { useAuth } from "@/hooks/auth";
import { useCustomers } from "@/hooks/useCustomers";
import axios from "@/lib/axios";
import useSWR from "swr";

export default function Home() {
  const { customers } = useCustomers();
  console.log(customers)
  return (
    <>
      <div className="text-5xl">Tis Logged In</div>
    </>
  );
}
