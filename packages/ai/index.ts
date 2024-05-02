import OpenAI from "openai";

export const llm = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function vectorizeImages(base64: (string | undefined)[]): Promise<[string, number[]][]> {
  const texts = await Promise.all(
    base64.map(async (base64) => {
      if (!base64) return " ";

      async function generate() {
        try {
          const response = await llm.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "You're a sales assistant in a store. Describe the characteristics of the pictured product such as: type, color, purpose, for what season of the year, for what weather, how it can be used. Answer briefly.",
                  },
                  { type: "image_url", image_url: { url: base64! } },
                ],
              },
            ],
          });

          return response.choices[0].message.content || " ";
        } catch (error) {
          if (typeof error === "object" && error) {
            if ("code" in error && error.code === "rate_limit_exceeded") {
              await new Promise((res) => setTimeout(() => res(true), 1000));
              return generate();
            }
          }

          console.error(error);
          return " ";
        }
      }

      return generate();
    }),
  );

  const v = (await llm.embeddings.create({ input: texts, model: "text-embedding-ada-002" })).data.map(
    (i) => i.embedding,
  );

  return texts.map((text, i) => [text, v[i]]);
}
