import React from 'react';
import Spinner from "./Spinner";

interface MessageType {
  role: string;
  content: string;
}

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  return (
    <div
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
  );
}
