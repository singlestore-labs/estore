"use server";

import { forwardActionError } from "@/action/error/lib/forward";
import { sleep } from "@/helpers";

export async function clearChatMessages() {
  try {
    await sleep(1000);
  } catch (error) {
    return forwardActionError(error);
  }
}
