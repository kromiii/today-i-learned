"use client";

import { useState } from "react";
import Header from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import MessageList from "@/components/chat/MessageList";
import WisdomButton from "@/components/chat/WisdomButton";
import WisdomModal from "@/components/chat/WisdomModal";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWisdomLoading, setIsWisdomLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <Header>
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          handleRefresh={handleRefresh}
        />
      </Header>

      <main className="flex-grow overflow-auto p-4">
        <div className="max-w-2xl mx-auto">
          <MessageList messages={messages} />
          {messages.length > 0 && (
            <WisdomButton handleTurnIntoWisdom={handleTurnIntoWisdom} />
          )}
        </div>
      </main>

      <WisdomModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        wisdom={wisdom}
        setWisdom={setWisdom}
        isLoading={isWisdomLoading}
      />
    </div>
  );
}
