import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
    });

    return NextResponse.json({ result: completion.choices[0].message });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during your request.' }, { status: 500 });
  }
}
