import { NextResponse } from "next/server";
import OpenAI from "openai";
import { TavilyClient } from "tavily";
import { getCurrentUser } from "@/libs/firebase/firebase-admin";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  const { messages } = await req.json();

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 402 });
  }

  try {
    let updatedMessages = [...messages];

    if (tavily) {
      const userInput = messages[messages.length - 1].content;
      const searchResults = await search(userInput);
      if (searchResults) {
        const searchResultsText = searchResults.results
          .map((result) => `${result.title}: ${result.content}`)
          .join("\n");
        updatedMessages.push({
          role: "assistant",
          content: `以下は関連する検索結果です：\n${searchResultsText}`,
        });
      }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: updatedMessages,
    });

    return NextResponse.json({ result: completion.choices[0].message });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during your request." },
      { status: 500 }
    );
  }
}
