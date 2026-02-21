'use client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY!);

export default async function generateAudio(records: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Summarize medical history in Tamil for low-literacy: ${records}`;
  const result = await model.generateContent(prompt);
  const audio = await model.generateContent([prompt, { inlineData: { mimeType: 'audio/wav' } }]); // Simplified
  // Play audio blob
}
