import type { PokemonCard } from "@/src/types/pokemon";

export async function getPokemonCards(): Promise<PokemonCard[]> {
  const res = await fetch(
    "https://api.pokemontcg.io/v2/cards?page=1&pageSize=250",
    {
      // Cache gambar selama 1 hari (86400 detik)
      next: { revalidate: 86400 }, // ISR: revalidate setiap 24 jam
    },
  );

  const contentType = res.headers.get("content-type");
  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Pokemon API request failed ${res.status} ${res.statusText}: ${text.slice(0, 500)}`,
    );
  }

  if (!contentType?.includes("application/json")) {
    throw new Error(
      `Pokemon API returned non-JSON response: ${contentType} ${text.slice(0, 500)}`,
    );
  }

  const data = JSON.parse(text);

  if (!data?.data) {
    throw new Error(
      `Pokemon API returned unexpected payload: ${text.slice(0, 500)}`,
    );
  }

  return data.data;
}
