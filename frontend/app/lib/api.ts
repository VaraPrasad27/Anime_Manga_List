const API_BASE = "http://localhost:8080/api";

export async function getTop(rankingType = "all", fr = "anime", offset = 0) {
  const res = await fetch(
    `${API_BASE}/${fr}/top?ranking_type=${rankingType}&offset=${offset}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch top ${fr} data`);
  }

  return res.json();
}

export async function getDetails(id: number, fr = "anime") {
  const res = await fetch(`${API_BASE}/${fr}/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${fr} details data`);
  }

  return res.json();
}

export async function search(query: string, fr = "anime", offset = 0) {
  const res = await fetch(
    `${API_BASE}/${fr}/search?q=${encodeURIComponent(query)}&offset=${offset}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${fr}`);
  }

  return res.json();
}
