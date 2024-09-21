import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Spinner from "../common/Spinner";
import type { ClassAttributes, HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";

interface MessageType {
  role: string;
  content: string;
}

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <div
      className={`mb-4 p-3 rounded-lg ${
        message.role === "user" ? "bg-blue-200 ml-auto" : "bg-white"
      } max-w-[80%]`}
    >
      {message.content === "Loading..." ? (
        <Spinner />
      ) : (
        <ReactMarkdown components={components}>{message.content}</ReactMarkdown>
      )}
    </div>
  );
}
