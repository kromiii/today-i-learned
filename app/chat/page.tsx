import { redirect } from "next/navigation";

import { getCurrentUser } from "@/libs/firebase/firebase-admin";

import ChatClient from "./ChatClient";

export default async function ChatPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/");

  return <ChatClient />;
}
