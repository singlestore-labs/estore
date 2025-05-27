export function apiRequest(url: string, init?: RequestInit) {
  return fetch(`${process.env.NEXT_PUBLIC_CLOUD_FUNCTIONS_API_BASE_URL}${url}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUD_FUNCTIONS_API_KEY}`,
    },
  });
}
