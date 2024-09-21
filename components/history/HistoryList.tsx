import React from "react";

interface KnowledgeItem {
  title: string;
  description: string;
  createdAt: string;
}

interface HistoryListProps {
  historyItems: KnowledgeItem[];
}

export default function HistoryList({ historyItems }: HistoryListProps) {
  const groupedItems = historyItems.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, KnowledgeItem[]>);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Knowledge History</h1>
      {Object.entries(groupedItems).map(([date, items]) => (
        <div key={date} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{date}</h2>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
