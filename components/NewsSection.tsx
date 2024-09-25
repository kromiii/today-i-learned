import React from "react";
import { NewsItem, newsItems } from "@/data/news";

const NewsSection: React.FC = () => {
  const sortedNewsItems = [...newsItems].sort((a, b) => b.id - a.id);

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Updates</h2>
      <div className="space-y-4">
        {sortedNewsItems.slice(0, 3).map((item: NewsItem) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">{item.date}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
