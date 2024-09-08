import React from "react";

interface KnowledgeButtonProps {
  handleTurnIntoKnowledge: () => void;
  isDisabled: boolean;
}

const KnowledgeButton: React.FC<KnowledgeButtonProps> = ({
  handleTurnIntoKnowledge,
  isDisabled,
}) => {
  return (
    <button
      onClick={handleTurnIntoKnowledge}
      disabled={isDisabled}
      className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Turn into Knowledge
    </button>
  );
};

export default KnowledgeButton;
