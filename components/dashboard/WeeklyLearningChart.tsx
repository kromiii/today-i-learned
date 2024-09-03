import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyLearningChartProps {
  weeklyLearningCounts: number[];
}

export default function WeeklyLearningChart({
  weeklyLearningCounts,
}: WeeklyLearningChartProps) {
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toLocaleDateString("en-US", { weekday: "short" }));
    }
    return days;
  };

  const chartData = {
    labels: getLast7Days(),
    datasets: [
      {
        label: "Number of Learnings",
        data: weeklyLearningCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">
        Learning Count (Last 7 Days)
      </h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
