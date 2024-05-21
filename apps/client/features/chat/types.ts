export type ChatName = string;

export type ChatConfig = {
  name: string;
  deleteUserLikesOnClear?: boolean;
  deleteUserOrdersOnClear?: boolean;
  affectedDataOnClear?: string[];
};
