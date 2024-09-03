import React from "react";
import Modal from "react-modal";
import Spinner from "./Spinner";

interface Wisdom {
  title: string;
  description: string;
}

interface WisdomModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  wisdom: Wisdom;
  setWisdom: React.Dispatch<React.SetStateAction<Wisdom>>;
  isLoading: boolean;
}
export default function WisdomModal({
  isOpen,
  setIsOpen,
  wisdom,
  setWisdom,
  isLoading,
}: WisdomModalProps) {
  const saveWisdom = async () => {
    try {
      const response = await fetch("/api/saveWisdom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: wisdom.title,
          description: wisdom.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save wisdom");
      }

      const data = await response.json();
      console.log("Wisdom saved with ID:", data.id);
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving wisdom:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        if (!isLoading) setIsOpen(false);
      }}
      contentLabel="Wisdom Modal"
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
              htmlFor="wisdom-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="wisdom-title"
              type="text"
              value={wisdom.title}
              onChange={(e) => setWisdom({ ...wisdom, title: e.target.value })}
              placeholder="Enter title"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <label
              htmlFor="wisdom-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="wisdom-description"
              value={wisdom.description}
              onChange={(e) =>
                setWisdom({ ...wisdom, description: e.target.value })
              }
              placeholder="Enter description"
              className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
            />
          </>
        )}

        <div className="flex gap-2">
          <button
            onClick={saveWisdom}
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
