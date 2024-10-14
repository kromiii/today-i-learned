import React from "react";
import { truncateString } from '@/utils/stringUtils';

interface TwitterShareButtonProps {
  learning: {
    title: string;
    description: string;
  };
}

export default function TwitterShareButton({
  learning,
}: TwitterShareButtonProps) {
  const maxLength = 280;
  const baseUrl = '#todayilearned';
  const separator = '\n';

  const truncatedDescription = truncateString(learning.description, maxLength - learning.title.length - baseUrl.length - separator.length);
  
  const shareText = encodeURIComponent(
    `${learning.title}\n${truncatedDescription}${separator}${baseUrl}`
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;

  return (
    <a
      href={twitterUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-blue-400 text-white px-2 py-1 rounded-full hover:bg-blue-500 transition-colors duration-200 text-sm"
    >
      Tweet
    </a>
  );
}
