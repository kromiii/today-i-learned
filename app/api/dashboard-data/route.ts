// app/api/dashboard-data/route.ts

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
      .limit(10)
      .get();

    const learnings = snapshot.docs.map((doc) => doc.data().title);

    // 過去7日間の学習数を取得
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklySnapshot = await knowledgeRef
      .where("userId", "==", user.uid)
      .where("createdAt", ">=", sevenDaysAgo)
      .get();

    const weeklyLearningCounts = Array(7).fill(0);
    weeklySnapshot.forEach((doc) => {
      const dayIndex =
        6 -
        Math.floor(
          (Date.now() - doc.data().createdAt.toDate().getTime()) /
            (1000 * 60 * 60 * 24)
        );
      if (dayIndex >= 0 && dayIndex < 7) {
        weeklyLearningCounts[dayIndex]++;
      }
    });

    return NextResponse.json({
      learnings,
      weeklyLearningCounts,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { message: "Error fetching dashboard data" },
      { status: 500 }
    );
  }
}
