export const CHAT_CONFIGS = {
  main: {
    deleteUserLikesOnClear: true,
    deleteUserOrdersOnClear: true,
    affectedDataOnClear: ["messages", "shopping history", "likes"],
  },
  dashboard: {
    deleteUserLikesOnClear: false,
    deleteUserOrdersOnClear: false,
    affectedDataOnClear: ["messages"],
  },
};
