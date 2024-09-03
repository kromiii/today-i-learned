'use client'

import React, { useState, useEffect } from 'react';
import LearningList from '@/components/dashboard/LearningList';
import WeeklyLearningChart from '@/components/dashboard/WeeklyLearningChart';

export default function DashboardClient() {
  const [learnings, setLearnings] = useState<string[]>([]);
  const [weeklyLearningCounts, setWeeklyLearningCounts] = useState<number[]>([]);

  useEffect(() => {
    // データ取得のロジック（現在のコードと同じ）
    const fetchedLearnings = [
      "Reactのuseeffectフックについて学んだ",
      "TypeScriptの型推論について理解を深めた",
      "NextJSのSSRとSSGの違いを理解した",
    ];
    setLearnings(fetchedLearnings);

    const dummyWeeklyData = [3, 2, 4, 1, 3, 5, 3];
    setWeeklyLearningCounts(dummyWeeklyData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{`Learning Dashboard`}</h1>
      <LearningList learnings={learnings} />
      <WeeklyLearningChart weeklyLearningCounts={weeklyLearningCounts} />
    </div>
  );
}
