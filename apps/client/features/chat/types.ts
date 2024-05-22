export type Chat = {
  id: number;
  name: "main" | "dashboard";
};

export type ChatConfig = {
  name: Chat["name"];
  deleteUserLikesOnClear?: boolean;
  deleteUserOrdersOnClear?: boolean;
  affectedDataOnClear?: string[];
};
