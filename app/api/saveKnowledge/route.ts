import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseApp, getCurrentUser } from "@/libs/firebase/firebase-admin";

export async function POST(request: Request) {
  const { title, description } = await request.json();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 402 });
  }

  try {
    const db = getFirestore(firebaseApp);
    const docRef = await db.collection("knowledges").add({
      title,
      description,
      userId: user.uid,
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: "Knowledge saved successfully",
      id: docRef.id,
    });
  } catch (error) {
    console.error("Error saving knowledge:", error);
    return NextResponse.json(
      { message: "Error saving knowledge" },
      { status: 500 }
    );
  }
}
