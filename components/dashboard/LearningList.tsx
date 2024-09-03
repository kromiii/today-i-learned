import React from "react";

interface LearningListProps {
  learnings: string[];
}

export default function LearningList({ learnings }: LearningListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">What I Learned Today:</h2>
      <ul className="list-disc list-inside">
        {learnings.map((learning, index) => (
          <li key={index} className="mb-2">
            {learning}
          </li>
        ))}
      </ul>
    </div>
  );
}
