import React, { ChangeEvent, FormEvent } from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  handleRefresh: () => void;
}

export default function ChatInput({
  input,
  setInput,
  handleSubmit,
  isLoading,
  handleRefresh,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
      <div className="flex flex-grow mb-2 sm:mb-0">
        <input
          type="text"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="Type your message here..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-blue-300 whitespace-nowrap"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
      <button
        type="button"
        onClick={handleRefresh}
        className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 sm:ml-2 whitespace-nowrap"
      >
        Refresh
      </button>
    </form>
  );
}
