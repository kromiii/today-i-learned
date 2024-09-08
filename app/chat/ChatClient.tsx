"use client";

import { useState } from "react";
import Header from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
import MessageList from "@/components/chat/MessageList";
import KnowledgeButton from "@/components/chat/KnowledgeButton";
import KnowledgeModal from "@/components/chat/KnowledgeModal";

export default function ChatClient() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isKnowledgeLoading, setIsKnowledgeLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [knowledge, setKnowledge] = useState({ title: "", description: "" });

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

  const handleTurnIntoKnowledge = async () => {
    setIsModalOpen(true);
    setIsKnowledgeLoading(true);
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
      setKnowledge(result);
    } catch (error) {
      console.error("Error turning into knowledge:", error);
      setKnowledge({
        title: "Error",
        description: "Failed to generate knowledge. Please try again.",
      });
    } finally {
      setIsKnowledgeLoading(false);
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
        </div>
      </main>

      {messages.length > 0 && (
        <div className="flex justify-center pb-4">
          <KnowledgeButton
            handleTurnIntoKnowledge={handleTurnIntoKnowledge}
            isDisabled={isLoading}
          />
        </div>
      )}

      <KnowledgeModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        knowledge={knowledge}
        setKnowledge={setKnowledge}
        isLoading={isKnowledgeLoading}
      />
    </div>
  );
}
