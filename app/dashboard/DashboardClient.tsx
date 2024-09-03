'use client'

import React, { useState, useEffect } from 'react';
import LearningList from '@/components/dashboard/LearningList';
import WeeklyLearningChart from '@/components/dashboard/WeeklyLearningChart';

export default function DashboardClient() {
  const [learnings, setLearnings] = useState<string[]>([]);
  const [weeklyLearningCounts, setWeeklyLearningCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await fetch('/api/dashboard-data');
      if (response.ok) {
        const data = await response.json();
        setLearnings(data.learnings);
        setWeeklyLearningCounts(data.weeklyLearningCounts);
      }
    };
  
    fetchDashboardData();
  }, []);
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{`Learning Dashboard`}</h1>
      <LearningList learnings={learnings} />
      <WeeklyLearningChart weeklyLearningCounts={weeklyLearningCounts} />
    </div>
  );
}
