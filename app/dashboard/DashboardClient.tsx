"use client";

import { useState, useEffect } from "react";
import LearningList from "@/components/dashboard/LearningList";
import WeeklyLearningChart from "@/components/dashboard/WeeklyLearningChart";

interface Learning {
  title: string;
  description: string;
}

export default function DashboardClient() {
  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [weeklyLearningCounts, setWeeklyLearningCounts] = useState<number[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard-data");
        if (response.ok) {
          const data = await response.json();
          setLearnings(data.learnings);
          setWeeklyLearningCounts(data.weeklyLearningCounts);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <LearningList learnings={learnings} />
      <WeeklyLearningChart weeklyLearningCounts={weeklyLearningCounts} />
    </div>
  );
}
