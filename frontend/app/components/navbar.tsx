"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Search from "./search";
import Selector from "./selector";
import { getListBy } from "../lib/action";

export default function Navbar() {
  return (
    <div className="flex justify-between m-1">
      <span className="text-2xl">Anime | Manga Finder</span>

      <div className="flex">
        <Selector
          options={[
            { name: "Anime", value: "anime" },
            { name: "Manga", value: "manga" },
          ]}
          handler={getListBy}
        />

        <Search />
      </div>
    </div>
  );
}
