"use client";

import { useState } from "react";
import Modal from "react-modal";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWisdomLoading, setIsWisdomLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [title, setTitle] = useState("");
  // const [wisdom, setWisdom] = useState("");
  const [wisdom, setWisdom] = useState({ title: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    setMessages([...newMessages, { role: "assistant", content: "Loading..." }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("API response was not ok");
      }

      const data = await response.json();
      setMessages([...newMessages, data.result]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setMessages([]);
  };

  const handleTurnIntoWisdom = async () => {
    setIsModalOpen(true);
    setIsWisdomLoading(true);
    try {
      const response = await fetch("/api/digest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        throw new Error("Failed to digest messages");
      }

      const { result } = await response.json();
      setWisdom(result);
    } catch (error) {
      console.error("Error turning into wisdom:", error);
      setWisdom({
        title: "Error",
        description: "Failed to generate wisdom. Please try again.",
      });
    } finally {
      setIsWisdomLoading(false);
    }
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
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
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
              {message.content === "Loading..." ? (
                <Spinner />
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          ))}
          {messages.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={handleTurnIntoWisdom}
                className="mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Turn into wisdom
              </button>
            </div>
          )}
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          if (!isWisdomLoading) setIsModalOpen(false);
        }}
        contentLabel="Wisdom Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Wisdom</h2>
          {isWisdomLoading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner />
            </div>
          ) : (
            <>
              <input
                type="text"
                value={wisdom.title}
                onChange={(e) =>
                  setWisdom({ ...wisdom, title: e.target.value })
                }
                placeholder="Title"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <textarea
                value={wisdom.description}
                onChange={(e) =>
                  setWisdom({ ...wisdom, description: e.target.value })
                }
                placeholder="Description"
                className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
              />
            </>
          )}
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isWisdomLoading}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
