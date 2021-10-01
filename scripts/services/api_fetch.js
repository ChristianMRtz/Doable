import { BASE_URL } from "../constants.js";

export const apiFetch = async function (endpoint, method, headers, body) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }
  if (response.status === 204) return {};
  return await response.json();
};
