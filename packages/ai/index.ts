import OpenAI from "openai";

export const llm = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function vectorizeImages(base64: (string | undefined)[]): Promise<[string, number[]][]> {
  const texts = await Promise.all(
    base64.map(async (base64) => {
      if (!base64) return " ";

      try {
        const response = await llm.chat.completions.create({
          model: "gpt-4-turbo",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "What's in this image? Keep the answer short." },
                { type: "image_url", image_url: { url: base64 } },
              ],
            },
          ],
        });

        return response.choices[0].message.content || " ";
      } catch (error) {
        console.error(error);
        return " ";
      }
    }),
  );

  const v = (await llm.embeddings.create({ input: texts, model: "text-embedding-ada-002" })).data.map(
    (i) => i.embedding,
  );

  return texts.map((text, i) => [text, v[i]]);
}
