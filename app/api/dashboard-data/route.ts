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

    // 過去24時間の学習内容を取得
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const snapshot = await knowledgeRef
      .where("userId", "==", user.uid)
      .where("createdAt", ">=", twentyFourHoursAgo)
      .orderBy("createdAt", "desc")
      .get();

    const learnings = snapshot.docs.map((doc) => ({
      title: doc.data().title,
      description: doc.data().description,
    }));

    // 過去7日間の学習数を取得
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0); // 7日前の0時0分0秒に設定

    const weeklySnapshot = await knowledgeRef
      .where("userId", "==", user.uid)
      .where("createdAt", ">=", sevenDaysAgo)
      .get();

    const weeklyLearningCounts = Array(7).fill(0);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 今日の日付の0時0分0秒に設定

    weeklySnapshot.forEach((doc) => {
      const createdAt = doc.data().createdAt.toDate();
      createdAt.setHours(0, 0, 0, 0); // 作成日の時刻を0時0分0秒に設定

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
