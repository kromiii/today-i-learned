import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseApp, getCurrentUser } from "@/libs/firebase/firebase-admin";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  try {
    const db = getFirestore(firebaseApp);
    const knowledgeRef = db.collection("knowledges");

    const snapshot = await knowledgeRef
      .where("userId", "==", user.uid)
      .orderBy("createdAt", "desc")
      .get();

    const historyItems = snapshot.docs.map(doc => ({
      title: doc.data().title,
      description: doc.data().description,
      createdAt: doc.data().createdAt.toDate().toISOString(),
    }));

    return NextResponse.json({ historyItems });
  } catch (error) {
    console.error("Error fetching history data:", error);
    return NextResponse.json(
      { message: "Error fetching history data" },
      { status: 500 }
    );
  }
}
