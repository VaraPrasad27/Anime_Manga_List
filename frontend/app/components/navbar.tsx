"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function Navbar() {
  const router = useRouter();

  const [type, setType] = useState("anime");
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    router.push(`/search?type=${type}&q=${encodeURIComponent(query)}&page=1`);
  };

  const handleFilterClick = () => {
    router.push(`/search?type=${type}&page=1`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between px-3.75 py-4 bg-[rgba(255,255,255,0.85)] backdrop-blur-md">
      <Link href={"/"} className="text-2xl">
        Anime | Manga Finder
      </Link>

      <form
        className="flex items-center gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <select
          name="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
        </select>

        <div className="flex border rounded-[5px] px-2 gap-2 items-center">
          <input
            type="text"
            placeholder={
              type === "anime" ? "Search anime..." : "Search manga..."
            }
            required
            className="h-10 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            aria-label="Search"
            className="p-1 cursor-pointer"
          >
            <BiSearch />
          </button>
          <button
            type="button"
            className="px-3 py-1 text-sm rounded bg-black text-white hover:bg-gray-900 cursor-pointer"
            onClick={handleFilterClick}
          >
            Filter
          </button>
        </div>
      </form>
    </header>
  );
}
