import { BASE_URL, request } from "./request";

const endpoints = {
  allForMatch: (matchId) =>
    `${BASE_URL}/data/likes?where=${encodeURIComponent(
      `matchId="${matchId}"`
    )}`,
  create: `${BASE_URL}/data/likes`,
  byId: (id) => `${BASE_URL}/data/likes/${id}`,
};

export function getLikesForMatch(matchId) {
  return request(endpoints.allForMatch(matchId));
}

export function likeMatch(matchId, token) {
  return request(endpoints.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify({ matchId }),
  });
}

export function unlikeMatch(likeId, token) {
  return request(endpoints.byId(likeId), {
    method: "DELETE",
    headers: { "X-Authorization": token },
  });
}
