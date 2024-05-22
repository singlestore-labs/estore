export type Chat = {
  id: number;
  name: "main" | "dashboard";
};

export type ChatConfig = {
  deleteUserLikesOnClear?: boolean;
  deleteUserOrdersOnClear?: boolean;
  affectedDataOnClear?: string[];
};
