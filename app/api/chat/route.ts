import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TavilyClient } from "tavily";
import { getCurrentUser } from "@/libs/firebase/firebase-admin";

export const maxDuration = 60; // 60 seconds is the maximum allowed by Vercel.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const tavily = process.env.TAVILY_API_KEY
  ? new TavilyClient({
      apiKey: process.env.TAVILY_API_KEY,
    })
  : null;

async function search(query: string) {
  if (!tavily) {
    return null;
  }
  const results = await tavily.search({
    query: query,
    search_depth: "basic",
    include_answer: false,
    include_images: false,
    max_results: 5,
  });
  return results;
}

export async function POST(req: Request) {
  const { messages, webSearchEnabled } = await req.json();

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 402 });
  }

  try {
    let updatedMessages = [...messages];

    if (webSearchEnabled && tavily) {
      const userInput = messages[messages.length - 1].content;
      const searchResults = await search(userInput);
      if (searchResults) {
        const searchResultsText = searchResults.results
          .map((result) => `${result.title}: ${result.content}`)
          .join("\n");
        updatedMessages.push({
          role: "system",
          content: `Here are the relevant search results:\n${searchResultsText}\n\nPlease answer the user's question based on this information.`,
        });
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

    const prompt = updatedMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ result: { content: text } });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during your request." },
      { status: 500 }
    );
  }
}
