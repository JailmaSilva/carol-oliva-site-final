export async function apiFetch(endpoint, opts = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { "Content-Type": "application/json", ...(token ? { "Authorization": `Bearer ${token}` } : {}) };
  const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000") + endpoint, { ...opts, headers });
  if (!res.ok) {
    throw new Error(`Erro de API: ${res.status}`);
  }
  return res.json();
}
