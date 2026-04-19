// src/app/api/auth/sign-out/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { APIResponse } from "@/types";
import { revokeAllSessions } from "@/libs/firebase/firebase-admin";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie)
    return NextResponse.json<APIResponse<string>>(
      { success: false, error: "Session not found." },
      { status: 400 }
    );

  cookieStore.delete("__session");

  await revokeAllSessions(sessionCookie);

  return NextResponse.json<APIResponse<string>>({
    success: true,
    data: "Signed out successfully.",
  });
}
