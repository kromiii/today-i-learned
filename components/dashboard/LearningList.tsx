import React from "react";

interface LearningListProps {
  learnings: Array<{
    title: string;
    description: string;
  }>;
}

export default function LearningList({ learnings }: LearningListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">What I Learned Today:</h2>
      {learnings.length > 0 ? (
        <ul className="space-y-4">
          {learnings.map((learning, index) => (
            <li key={index} className="mb-2">
              <h3 className="font-semibold">{learning.title}</h3>
              <p className="text-gray-600">{learning.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
          <p className="text-xl font-semibold text-gray-500">
            Oops! Nothing learned today! 🙈
          </p>
          <p className="text-gray-400 mt-2">Time to hit the books! 📚💡</p>
        </div>
      )}
    </div>
  );
}
