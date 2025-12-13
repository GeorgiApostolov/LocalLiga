import { BASE_URL, request } from "./request";

export function login(email, password) {
  return request(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export function register(email, password) {
  return request(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export function logout(token) {
  return request(`${BASE_URL}/users/logout`, {
    method: "GET",
    headers: { "X-Authorization": token },
  });
}
