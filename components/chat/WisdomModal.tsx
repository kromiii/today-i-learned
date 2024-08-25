import React from 'react';
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
export default function WisdomModal({ isOpen, setIsOpen, wisdom, setWisdom, isLoading }: WisdomModalProps) {
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
        <h2 className="text-2xl font-bold mb-4">Wisdom</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Spinner />
          </div>
        ) : (
          <>
            <input
              type="text"
              value={wisdom.title}
              onChange={(e) => setWisdom({ ...wisdom, title: e.target.value })}
              placeholder="Title"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <textarea
              value={wisdom.description}
              onChange={(e) => setWisdom({ ...wisdom, description: e.target.value })}
              placeholder="Description"
              className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
            />
          </>
        )}
        <button
          onClick={() => setIsOpen(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
