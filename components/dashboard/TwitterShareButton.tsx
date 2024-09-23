import React from "react";

interface TwitterShareButtonProps {
  learnings: Array<{ title: string }>;
}

export default function TwitterShareButton({
  learnings,
}: TwitterShareButtonProps) {
  const shareText = encodeURIComponent(
    `Today I learned:\n${learnings
      .map((l) => `- ${l.title}`)
      .join("\n")}\n\n#todayilearned`
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;

  return (
    <a
      href={twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition-colors duration-200"
    >
      Share on Twitter
    </a>
  );
}
