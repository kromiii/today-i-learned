import React from 'react';

interface WisdomButtonProps {
  handleTurnIntoWisdom: () => void;
}

export default function WisdomButton({ handleTurnIntoWisdom }: WisdomButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleTurnIntoWisdom}
        className="mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Turn into wisdom
      </button>
    </div>
  );
}
