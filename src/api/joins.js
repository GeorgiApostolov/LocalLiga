import { BASE_URL, request } from "./request";

const endpoints = {
  allForMatch: (matchId) =>
    `${BASE_URL}/data/joins?where=${encodeURIComponent(
      `matchId="${matchId}"`
    )}`,
  create: `${BASE_URL}/data/joins`,
  byId: (id) => `${BASE_URL}/data/joins/${id}`,
};

export function getJoinsForMatch(matchId) {
  return request(endpoints.allForMatch(matchId));
}

export function joinMatch(matchId, token) {
  return request(endpoints.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify({ matchId }),
  });
}

export function leaveMatch(joinId, token) {
  return request(endpoints.byId(joinId), {
    method: "DELETE",
    headers: { "X-Authorization": token },
  });
}
