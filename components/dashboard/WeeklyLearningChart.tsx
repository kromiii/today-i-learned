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
  ChartOptions,
  Scale,
  LinearScaleOptions,
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
        label: "Number of Knowledges",
        data: weeklyLearningCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...weeklyLearningCounts) + 1,
        ticks: {
          stepSize: 1,
          callback: function (
            this: Scale<LinearScaleOptions>,
            tickValue: number | string,
            index: number,
            ticks: { value: number }[]
          ): string | number | null | undefined {
            return index < ticks.length - 1 ? tickValue : "";
          },
        },
      } as LinearScaleOptions,
    },
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        7-Day Learning Snapshot
      </h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
