"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  const [type, setType] = useState("anime");
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) {
      router.push(`/search?type=${type}`);
    } else {
      router.push(`/search?type=${type}&q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="flex justify-between mt-5 px-3.75">
      <Link href={"/"} className="text-2xl">
        Anime | Manga Finder
      </Link>

      <form className="flex items-center gap-1" onSubmit={handleSubmit}>
        <select
          name="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>

        <div className="flex border rounded-[5px] px-2 gap-2">
          <input
            type="text"
            placeholder="Search"
            className="h-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit">Filter</button>
        </div>
      </form>
    </header>
  );
}
