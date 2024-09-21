"use client";

import { useState, useEffect } from "react";
import HistoryList from "@/components/history/HistoryList";
import Spinner from "@/components/common/Spinner";

interface KnowledgeItem {
  title: string;
  description: string;
  createdAt: string;
}

export default function HistoryClient() {
  const [historyItems, setHistoryItems] = useState<KnowledgeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        const response = await fetch("/api/history-data");
        if (response.ok) {
          const data = await response.json();
          setHistoryItems(data.historyItems);
        }
      } catch (error) {
        console.error("Failed to fetch history data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistoryData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <HistoryList historyItems={historyItems} />
    </div>
  );
}
