"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  const [type, setType] = useState("anime");
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?type=${type}&q=${encodeURIComponent(query)}&offset=0`);
  };

  return (
    <div className="flex justify-between m-1">
      <span className="text-2xl">Anime | Manga Finder</span>

      <form className="flex items-center" onSubmit={handleSubmit}>
        <select
          name="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>

        <div className="flex border rounded-[5px]">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit">Filter</button>
        </div>
      </form>
    </div>
  );
}
