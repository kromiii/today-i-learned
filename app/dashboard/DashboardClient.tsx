'use client'

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardClient() {
  const [learnings, setLearnings] = useState<string[]>([]);
  const [weeklyLearningCounts, setWeeklyLearningCounts] = useState<number[]>([]);

  useEffect(() => {
    // ここで実際のデータを取得する処理を行います
    // 例として、ハードコードされたデータを使用しています
    const fetchedLearnings = [
      "Reactのuseeffectフックについて学んだ",
      "TypeScriptの型推論について理解を深めた",
      "NextJSのSSRとSSGの違いを理解した",
    ];
    setLearnings(fetchedLearnings);

    // 直近一週間のダミーデータ
    const dummyWeeklyData = [3, 2, 4, 1, 3, 5, 3];
    setWeeklyLearningCounts(dummyWeeklyData);
  }, []);

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    return days;
  };

  const chartData = {
    labels: getLast7Days(),
    datasets: [
      {
        label: 'Number of Learnings',
        data: weeklyLearningCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{`Learning Dashboard`}</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What I Learned Today:</h2>
        <ul className="list-disc list-inside">
          {learnings.map((learning, index) => (
            <li key={index} className="mb-2">{learning}</li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Learning Count (Last 7 Days)</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
