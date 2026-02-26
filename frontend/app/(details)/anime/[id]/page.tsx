import { Card, RelatedCard } from "@/app/components/cards";
import { getDetails } from "@/app/lib/api";
import Image from "next/image";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);
  const res: AnimeDetails = await getDetails(id);
  const {
    title,
    main_picture,
    alternative_titles,
    start_date,
    end_date,
    synopsis,
    mean,
    rank,
    popularity,
    media_type,
    genres,
    num_episodes,
    source,
    average_episode_duration,
    rating,
    studios,
    status,
    related_anime,
    recommendations,
    start_season,
  } = res;

  return (
    <main className="flex flex-col gap-5 mt-8 px-3.75">
      <section className="flex flex-row gap-5 ">
        <div className="flex flex-col pt-5 gap-3 w-[20%]">
          <Image
            src={main_picture.medium}
            alt={title}
            width={220}
            height={320}
            className="self-center-safe"
          />
          <div className="text-[16px] text-center">
            <p>Rating: {mean} / 10</p>
            <p>Ranked #{rank}</p>
            <p>Popularity #{popularity}</p>
          </div>
        </div>

        <div className="flex flex-col w-[50%]">
          <div className="pb-4">
            <h1 className="text-5xl">{title}</h1>
            <p className="text-xl">{alternative_titles.en}</p>
          </div>

          <div className="flex gap-0.5 pb-4 text-[12px] font-bold ">
            <div className="uppercase p-1 border rounded-l-md">{rating}</div>
            <div className="uppercase p-1 border">{media_type}</div>
            <div className="p-1 border">{num_episodes} eps</div>
            <div className="p-1 border rounded-r-md">
              {(average_episode_duration / 60).toFixed(1)}m
            </div>
          </div>

          <p className="text-[16px]">{synopsis}</p>
        </div>

        <div className="text-[16px] pt-15 pl-6 w-[25%]">
          <p>
            <span className="font-bold">Japanese:</span> {alternative_titles.ja}
          </p>
          <p>
            <span className="font-bold">Synonyms:</span>{" "}
            {alternative_titles.synonyms}
          </p>
          <p>
            <span className="font-bold">Aired:</span> {formatDate(start_date)}{" "}
            to {formatDate(end_date)}
          </p>
          <p className="capitalize">
            <span className="font-bold">Premiered:</span> {start_season.season}{" "}
            {start_season.year}
          </p>
          <p>
            <span className="font-bold">Duration: </span>{" "}
            {(average_episode_duration / 60).toFixed(1)}m
          </p>
          <p>
            <span className="font-bold">Status:</span> {status}
          </p>
          <p>
            <span className="font-bold">Source:</span> {source}
          </p>

          <div className="flex flex-wrap gap-2 items-center">
            <p className="font-bold">Genres:</p>
            {genres?.map(({ id, name }) => (
              <p className="border rounded-[10px] p-0.5" key={id}>
                {name}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <p className="font-bold">Studios:</p>{" "}
            {studios?.map(({ id, name }) => (
              <p key={id}>{name}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="">
        <p>Related Anime</p>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
          {related_anime?.map(
            ({
              relation_type_formatted,
              node: { id, title, main_picture },
            }) => (
              <RelatedCard
                key={id}
                id={id}
                src={main_picture.medium}
                alt={title}
                title={title}
                relationType={relation_type_formatted}
                type="anime"
              />
            ),
          )}
        </div>
      </section>

      <section className="">
        <p>Recommendations</p>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
          {recommendations?.map(({ node: { id, title, main_picture } }) => (
            <Card
              key={id}
              id={id}
              src={main_picture.medium}
              alt={title}
              title={title}
              type="anime"
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function formatDate(dateStr: string): string {
  // Split the "yyyy-mm-dd" into ["yyyy", "mm", "dd"]
  const [year, month, day] = dateStr.split("-");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Convert month "01" to index 0, map to "jan", remove leading zero from day
  const formattedMonth = monthNames[parseInt(month, 10) - 1];
  const formattedDay = parseInt(day, 10);

  return `${formattedMonth} ${formattedDay}, ${year}`;
}

const input = "01-01-2025";
console.log(formatDate(input)); // Output: "1 jan 2025"
