export interface NewsItem {
  id: number;
  date: string;
  title: string;
  content: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    date: "2024-09-16",
    title: "First Release",
    content:
      "We have released a new AI-powered feature to enhance your learning experience.",
  },
  {
    id: 2,
    date: "2024-09-21",
    title: "New you can see your learning history",
    content:
      "We have released a new feature that allows you to see your learning history and track your progress.",
  },
  {
    id: 3,
    date: "2024-09-24",
    title: "Enable web search",
    content:
      "We have enabled web search for chat to provide you with more accurate and up-to-date information.",
  },
];
