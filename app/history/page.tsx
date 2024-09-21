import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/firebase/firebase-admin";
import HistoryClient from "./HistoryClient";

export default async function HistoryPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/");

  return <HistoryClient />;
}
