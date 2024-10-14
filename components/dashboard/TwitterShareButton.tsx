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
      className="inline-flex items-center bg-black text-white px-2 py-0.5 rounded-full hover:bg-gray-800 transition-colors duration-200 text-xs"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 mr-1">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      Post
    </a>
  );
}
