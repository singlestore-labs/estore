import OpenAI from "openai";

import { OPENAI_API_KEY } from "@repo/ai/constants";

export const llm = new OpenAI({ apiKey: OPENAI_API_KEY });
