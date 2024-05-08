export function formatQueryForUI(query: string) {
  return query.replace(/(SET @promptEmbedding = '\[)[^\]]*(\]')/, "$1...$2");
}
