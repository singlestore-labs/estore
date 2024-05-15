import { db } from "@repo/db";

export async function createProductType(description?: string) {
  if (!description) return "";

  async function create() {
    try {
      const type = await db.ai.createChatCompletion({
        model: "gpt-3.5-turbo",
        systemRole: `\
        You are a sales assistant in a store.
        Write the type of a product in one word based on its description.
        Examples of types: dress, shorts, jeans, pants, sneakers, boots, purse, bag, wallet, etc.
        Respond with one word only.
      `,
        prompt: `Product description: ${description}`,
      });

      return (
        (type || "")
          .trim()
          .toLowerCase()
          .match(/[a-zA-Z]+/)?.[0] || ""
      );
    } catch (error) {
      if (typeof error === "object" && error) {
        if ("code" in error && (error.code === "rate_limit_exceeded" || error.code === "ECONNRESET")) {
          await new Promise((res) => setTimeout(() => res(true), 1000));
          return create();
        }
      }

      console.error(error);
      return "";
    }
  }

  return create();
}
