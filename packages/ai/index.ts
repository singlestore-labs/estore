import OpenAI from "openai";

export const llm = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
