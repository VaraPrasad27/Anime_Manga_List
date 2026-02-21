"use client";

import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { getTop } from "./lib/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [value, setValue] = useState("anime");
  const [ranking, setRanking] = useState("all");
  const [data, setData] = useState<any[]>([]);
  const { replace } = useRouter();
  const options =
    value == "anime"
      ? [
          { label: "All", value: "all" },
          { label: "Airing", value: "airing" },
          { label: "Upcoming", value: "upcoming" },
          { label: "TV", value: "tv" },
          { label: "Movies", value: "movie" },
          { label: "Most Popular", value: "bypopularity" },
        ]
      : [
          { label: "All", value: "all" },
          { label: "Manga", value: "manga" },
          // { label: "Top Novels", value: "novel" },
          // { label: "Top Doujinshi", value: "doujin" },
          { label: "Manhwa", value: "manhwa" },
          { label: "Manhua", value: "manhua" },
          { label: "Most Popular", value: "bypopularity" },
        ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTop(ranking, value);
        setData(res.data); // adjust depending on your API response shape
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchData();
  }, [value, ranking]);

  return (
    <>
      <section id="home">
        <div id="ranking-by" className="flex gap-5">
          <div>
            <label htmlFor="type">Top</label>
            <select
              name="type"
              id="type"
              onChange={(e) => {
                setValue(e.target.value);
                setRanking("all");
              }}
            >
              <option value="anime">Anime</option>
              <option value="manga">Manga</option>
            </select>
          </div>

          <div id="ranks" className="flex gap-2">
            {options.map((option: any) => (
              <button
                key={option.value}
                className={`cursor-pointer ${ranking == option.value ? "text-black" : "text-gray-400"}`}
                onClick={() => setRanking(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
          {data.map((item: any) => (
            <div
              key={item.node.id}
              className="cursor-pointer w-[200]"
              onClick={() => {
                replace(`/${value}/${item.node.id}`);
              }}
            >
              <img
                src={item.node.main_picture.medium}
                alt=""
                height={300}
                width={200}
              />
              <p>{item.node.title}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
