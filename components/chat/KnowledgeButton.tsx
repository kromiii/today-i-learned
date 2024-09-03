import React from "react";

interface KnowledgeButtonProps {
  handleTurnIntoKnowledge: () => void;
}

export default function KnowledgeButton({
  handleTurnIntoKnowledge,
}: KnowledgeButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleTurnIntoKnowledge}
        className="mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Turn into knowledge
      </button>
    </div>
  );
}
