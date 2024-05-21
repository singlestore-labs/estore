export type ChatConfig = {
  name: string;
  deleteUserLikesOnClear?: boolean;
  deleteUserOrdersOnClear?: boolean;
  affectedDataOnClear?: string[];
};

export type Chat = {
  id: number;
  name: string;
};
