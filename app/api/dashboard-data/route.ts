import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { firebaseApp, getCurrentUser } from "@/libs/firebase/firebase-admin";

async function getKnowledgeData(userId: string, startDate: Date, endDate: Date) {
  const db = getFirestore(firebaseApp);
  const knowledgeRef = db.collection("knowledges");

  const snapshot = await knowledgeRef
    .where("userId", "==", userId)
    .where("createdAt", ">=", startDate)
    .where("createdAt", "<", endDate)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs;
}

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  try {
    // 本日の日付を取得（時刻は00:00:00に設定）
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 明日の日付を取得（本日の終わりを示す）
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 7日前の日付を取得
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // 本日の学習内容を取得
    const todayDocs = await getKnowledgeData(user.uid, today, tomorrow);
    const learnings = todayDocs.map((doc) => ({
      title: doc.data().title,
      description: doc.data().description,
    }));

    // 過去7日間の学習数を取得
    const weeklyDocs = await getKnowledgeData(user.uid, sevenDaysAgo, tomorrow);

    const weeklyLearningCounts = Array(7).fill(0);
    weeklyDocs.forEach((doc) => {
      const createdAt = doc.data().createdAt.toDate();
      createdAt.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - createdAt.getTime();
      const dayIndex = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (dayIndex >= 0 && dayIndex < 7) {
        weeklyLearningCounts[6 - dayIndex]++;
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
