import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { getCurrentUser } from "@/libs/firebase/firebase-admin";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const Wisdom = z.object({
  title: z.string(),
  description: z.string(),
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 402 });
  }

  try {
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: "Extract what the user learned from the chat to the bot",
        },
        ...messages,
      ],
      response_format: zodResponseFormat(Wisdom, "wisdom"),
    });

    const wisdom = completion.choices[0].message.parsed;
    return NextResponse.json({ result: wisdom });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred during your request." },
      { status: 500 }
    );
  }
}
