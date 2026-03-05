"use client";

import clsx from "clsx";
import { Card } from "./components/cards";
import { useEffect, useState } from "react";
import { getTop } from "./lib/api";
import PagingButton from "./components/pagingButton";
import { animeOptions, mangaOptions } from "./lib/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Home() {
  const [value, setValue] = useState("anime");
  const [ranking, setRanking] = useState("all");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<Data[]>([]);
  const [prevPage, setPrevPage] = useState(0);
  const [nextPage, setNextPage] = useState(2);

  const options = value == "anime" ? animeOptions : mangaOptions;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: APIResponse = await getTop(ranking, value, offset);
        setData(res.data); // adjust depending on your API response shape
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchData();
  }, [value, ranking, offset]);

  return (
    <>
      <section id="home" className="mt-6 px-3.75" aria-label="Top anime and manga">
        <nav className="flex gap-5" aria-label="Filter and pagination">
          <div className="content-center">
            <label htmlFor="media-type">Top</label>
            <select
              id="media-type"
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
            {options.map(({ value, label }) => (
              <button
                key={value}
                className={clsx("cursor-pointer", ranking === value ? "text-black" : "text-gray-400")}
                onClick={() => setRanking(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 pr-4">
            <PagingButton
              hoverText={`Page ${prevPage}`}
              buttonText={<IoIosArrowBack />}
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
              buttonText={<IoIosArrowForward />}
              onClick={() => {
                setPrevPage(prevPage + 1);
                setNextPage(nextPage + 1);
                setOffset(offset + 25);
              }}
            />
          </div>
        </nav>

        <ul className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3 pt-3 list-none m-0 p-0">
          {data.map(({ node: { id, title, main_picture } }) => (
            <li key={id}>
              <Card
                src={main_picture.medium}
                alt={title}
                title={title}
                id={id}
                type={value}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
