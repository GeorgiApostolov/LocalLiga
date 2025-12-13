import { BASE_URL, request } from "./request";

const endpoints = {
  all: `${BASE_URL}/data/matches?sortBy=date%20asc`,
  byId: (id) => `${BASE_URL}/data/matches/${id}`,
  create: `${BASE_URL}/data/matches`,
};

export function getAllMatches() {
  return request(endpoints.all);
}

export function getMatchById(id) {
  return request(endpoints.byId(id));
}

export function createMatch(data, token) {
  return request(endpoints.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });
}

export function updateMatch(id, data, token) {
  return request(endpoints.byId(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });
}

export function deleteMatch(id, token) {
  return request(endpoints.byId(id), {
    method: "DELETE",
    headers: { "X-Authorization": token },
  });
}
