"use client";

import React, { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [wisdom, setWisdom] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `You said: ${input}` },
      ]);
    }, 1000);

    setInput("");
  };

  const handleRefresh = () => {
    setMessages([]);
  };

  const handleWisdomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Wisdom submitted:", wisdom);
    setIsModalOpen(false);
    setWisdom("");
    setTitle("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white p-4 border-b">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Send
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className="bg-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2"
          >
            Refresh
          </button>
        </form>
      </header>

      <main className="flex-grow overflow-auto p-4">
        <div className="max-w-2xl mx-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.role === "user" ? "bg-blue-200 ml-auto" : "bg-white"
              } max-w-[80%]`}
            >
              <p>{message.content}</p>
            </div>
          ))}
          {messages.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Turn into wisdom
              </button>
            </div>
          )}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">What did you learn?</h2>
            <form onSubmit={handleWisdomSubmit}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
                placeholder="Enter a title..."
              />
              <textarea
                value={wisdom}
                onChange={(e) => setWisdom(e.target.value)}
                className="w-full h-32 p-2 border rounded-lg mb-4"
                placeholder="Enter your wisdom here..."
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
