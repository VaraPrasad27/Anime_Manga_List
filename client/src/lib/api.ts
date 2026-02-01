const API_BASE = "http://localhost:8080/api";

export async function getTopAnime(rankingType = "all", offset = 0) {
  const res = await fetch(
    `${API_BASE}/anime/top?ranking_type=${rankingType}&offset=${offset}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch top anime data");
  }

  return res.json();
}

export async function getAnimeDetails(id: number) {
  const res = await fetch(`${API_BASE}/anime/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch anime details data");
  }

  return res.json();
}

export async function searchAnime(query: string, offset = 0) {
  const res = await fetch(
    `${API_BASE}/anime/search?q=${encodeURIComponent(query)}&offset=${offset}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch anime");
  }

  return res.json();
}
