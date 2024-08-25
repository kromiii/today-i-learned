import React from 'react';
import Message from "./Message";

interface MessageType {
  role: string;
  content: string;
}

interface MessageListProps {
  messages: MessageType[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </>
  );
}
