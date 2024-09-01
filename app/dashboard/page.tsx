import { redirect } from "next/navigation";

import { getCurrentUser } from "@/libs/firebase/firebase-admin";

import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/");

  return <DashboardClient />;
}
