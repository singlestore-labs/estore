export function formatAnalyticsQueryForUI(query: string) {
  return query.replace(/(SET @promptEmbedding = '\[)[^\]]*(\]')/, "$1...$2");
}
