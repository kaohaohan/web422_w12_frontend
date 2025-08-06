import { getToken } from "./authenticate";

const API_URL = "https://web422-w12-iota.vercel.app/api/user";

async function request(method, url, body = null) {
  const headers = {
    Authorization: `jwt ${getToken()}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (res.ok) {
    return await res.json();
  } else {
    return [];
  }
}

export const addToFavourites = (id) => {
  return request("PUT", `${API_URL}/favourites/${id}`);
};

export const removeFromFavourites = (id) => {
  return request("DELETE", `${API_URL}/favourites/${id}`);
};

export const getFavourites = () => {
  return request("GET", `${API_URL}/favourites`);
};

export const addToHistory = (id) => {
  return request("PUT", `${API_URL}/history/${id}`);
};

export const removeFromHistory = (id) => {
  return request("DELETE", `${API_URL}/history/${id}`);
};

export const getHistory = () => {
  return request("GET", `${API_URL}/history`);
};
