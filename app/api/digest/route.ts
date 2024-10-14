import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { getCurrentUser } from "@/libs/firebase/firebase-admin";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const Knowledge = z.object({
  title: z.string(),
  description: z.string(),
});

interface Message {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 402 });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-002",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
System: Extract what the user learned from the chat to the bot in 100 words. Provide the response in plain text without using any markdown formatting. Use the same language as the user's input for the summary.
Format the response as JSON with 'title' and 'description' fields.

User conversation:
${messages.map((msg: Message) => `${msg.role}: ${msg.content}`).join("\n")}

Response (in JSON format):
{
  "title": "Brief title of the knowledge learned",
  "description": "Detailed summary of the knowledge learned"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    const parsedResponse = JSON.parse(text);

    // Validate the response against the Knowledge schema
    const knowledge = Knowledge.parse(parsedResponse);

    return NextResponse.json({ result: knowledge });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred during your request." },
      { status: 500 }
    );
  }
}
