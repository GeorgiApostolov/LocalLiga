export const BASE_URL = "http://localhost:3030";

export async function request(url, options = {}) {
  const res = await fetch(url, options);

  // /users/logout често връща 204
  if (res.status === 204) {
    return null;
  }

  let data = null;
  const contentType = res.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    data = await res.json();
  } else {
    const text = await res.text();
    if (!res.ok) throw new Error(text || `Request failed: ${res.status}`);
    return text;
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }

  return data;
}
