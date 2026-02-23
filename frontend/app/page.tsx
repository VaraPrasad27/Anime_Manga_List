"use client";

import { Card } from "./components/cards";
import { useEffect, useState } from "react";
import { getTop } from "./lib/api";

export default function Home() {
  const [value, setValue] = useState("anime");
  const [ranking, setRanking] = useState("all");
  const [data, setData] = useState<any[]>([]);

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
        <div className="flex gap-5">
          <div>
            <label>Top</label>
            <select
              onChange={(e) => {
                setValue(e.target.value);
                setRanking("all");
              }}
            >
              <option value="anime">Anime</option>
              <option value="manga">Manga</option>
            </select>
          </div>

          <div className="flex gap-2">
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
            <Card
              key={item.node.id}
              src={item.node.main_picture.medium}
              alt={item.node.title}
              title={item.node.title}
              id={item.node.id}
              type={value}
            />
          ))}
        </div>
      </section>
    </>
  );
}
