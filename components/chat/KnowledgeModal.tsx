import React from "react";
import Modal from "react-modal";
import Spinner from "./Spinner";

interface Knowledge {
  title: string;
  description: string;
}

interface KnowledgeModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  knowledge: Knowledge;
  setKnowledge: React.Dispatch<React.SetStateAction<Knowledge>>;
  isLoading: boolean;
}
export default function KnowledgeModal({
  isOpen,
  setIsOpen,
  knowledge,
  setKnowledge,
  isLoading,
}: KnowledgeModalProps) {
  const saveKnowledge = async () => {
    try {
      const response = await fetch("/api/saveKnowledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: knowledge.title,
          description: knowledge.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save knowledge");
      }

      const data = await response.json();
      console.log("Knowledge saved with ID:", data.id);
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving knowledge:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        if (!isLoading) setIsOpen(false);
      }}
      contentLabel="Knowledge Modal"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">What I learned</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Spinner />
          </div>
        ) : (
          <>
            <label
              htmlFor="knowledge-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="knowledge-title"
              type="text"
              value={knowledge.title}
              onChange={(e) =>
                setKnowledge({ ...knowledge, title: e.target.value })
              }
              placeholder="Enter title"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <label
              htmlFor="knowledge-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="knowledge-description"
              value={knowledge.description}
              onChange={(e) =>
                setKnowledge({ ...knowledge, description: e.target.value })
              }
              placeholder="Enter description"
              className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
            />
          </>
        )}

        <div className="flex gap-2">
          <button
            onClick={saveKnowledge}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            Save
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            disabled={isLoading}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}