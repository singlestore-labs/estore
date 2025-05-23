export function formatAnalyticsQueryTextForUI(query: string) {
  return query.replace(/(SET @promptEmbedding = '\[)[^\]]*(\]')/, "$1...$2");
}
