"use client";

import { Card } from "./components/cards";
import { useEffect, useState } from "react";
import { getTop } from "./lib/api";
import PagingButton from "./components/pagingButton";

export default function Home() {
  const [value, setValue] = useState("anime");
  const [ranking, setRanking] = useState("all");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);

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
        const res = await getTop(ranking, value, offset);
        setData(res.data); // adjust depending on your API response shape
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchData();
  }, [value, ranking, offset]);

  return (
    <>
      <section id="home" className="mt-6 px-3.75">
        <div className="flex gap-5">
          <div className="content-center">
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

          <div className="flex gap-3 mr-auto">
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

          <div className="flex gap-2 pr-4">
            <PagingButton
              hoverText={`Page ${prevPage}`}
              buttonText="<"
              onClick={() => {
                if (offset != 0 && prevPage != 0) {
                  setPrevPage(prevPage - 1);
                  setNextPage(nextPage - 1);
                  setOffset(offset - 25);
                }
              }}
            />
            <PagingButton
              hoverText={`Page ${nextPage}`}
              buttonText=">"
              onClick={() => {
                setPrevPage(prevPage + 1);
                setNextPage(nextPage + 1);
                setOffset(offset + 25);
              }}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3 pt-3">
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
