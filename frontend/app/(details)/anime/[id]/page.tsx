import { Card, RelatedCard } from "@/app/components/cards";
import { CollapsibleRelatedSection } from "@/app/components/CollapsibleRelatedSection";
import { getDetails } from "@/app/lib/api";
import Image from "next/image";
import { formatDate } from "@/app/utils/formatDate";

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

  const prequelsAndSequels =
    related_anime?.filter(({ relation_type_formatted }) =>
      ["Prequel", "Sequel"].includes(relation_type_formatted),
    ) ?? [];

  const sideStories =
    related_anime?.filter(
      ({ relation_type_formatted }) => relation_type_formatted === "Side story",
    ) ?? [];

  const others =
    related_anime?.filter(
      ({ relation_type_formatted }) => relation_type_formatted === "Other",
    ) ?? [];

  return (
    <main className="flex flex-col gap-5 mt-8 px-3.75">
      <article id="details" className="flex flex-row gap-5">
        <figure className="flex flex-col pt-5 gap-3 w-[20%]">
          <Image
            src={main_picture.medium}
            alt={title}
            width={220}
            height={320}
            className="self-center-safe"
          />
          <figcaption className="text-[16px] text-center">
            <p>Rating: {mean} / 10</p>
            <p>Ranked #{rank}</p>
            <p>Popularity #{popularity}</p>
          </figcaption>
        </figure>

        <div className="flex flex-col w-[50%]">
          <header className="pb-4">
            <h1 className="text-5xl">{title}</h1>
            <p className="text-xl">{alternative_titles.en}</p>
          </header>

          <div className="flex gap-0.5 pb-4 text-[12px] font-bold">
            <span className="uppercase p-1 border rounded-l-md">{rating}</span>
            <span className="uppercase p-1 border">{media_type}</span>
            <span className="p-1 border">{num_episodes} eps</span>
            <span className="p-1 border rounded-r-md">
              {(average_episode_duration / 60).toFixed(1)}m
            </span>
          </div>

          <p className="text-[16px]">{synopsis}</p>
        </div>

        <aside className="text-[16px] pt-15 pl-6 w-[25%]">
          <dl className="space-y-1">
            <div>
              <dt className="font-bold inline">Japanese: </dt>
              <dd className="inline">{alternative_titles.ja}</dd>
            </div>
            <div>
              <dt className="font-bold inline">Synonyms: </dt>
              <dd className="inline">{alternative_titles.synonyms}</dd>
            </div>
            <div>
              <dt className="font-bold inline">Aired: </dt>
              <dd className="inline">
                {formatDate(start_date)} to {formatDate(end_date)}
              </dd>
            </div>
            <div className="capitalize">
              <dt className="font-bold inline">Premiered: </dt>
              <dd className="inline">
                {start_season.season} {start_season.year}
              </dd>
            </div>
            <div>
              <dt className="font-bold inline">Duration: </dt>
              <dd className="inline">{(average_episode_duration / 60).toFixed(1)}m</dd>
            </div>
            <div>
              <dt className="font-bold inline">Status: </dt>
              <dd className="inline">{status}</dd>
            </div>
            <div>
              <dt className="font-bold inline">Source: </dt>
              <dd className="inline">{source}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2 items-center mt-2">
            <span className="font-bold">Genres:</span>
            <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
              {genres?.map(({ id, name }) => (
                <li
                  key={id}
                  className="border rounded-[10px] p-0.5"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <span className="font-bold">Studios:</span>
            <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
              {studios?.map(({ id, name }) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
          </div>
        </aside>
      </article>

      {(prequelsAndSequels.length > 0 || sideStories.length > 0 || others.length > 0) && (
        <section id="related-anime" aria-labelledby="related-anime-heading">
          <h2 id="related-anime-heading" className="text-xl font-semibold mb-2">Related Anime</h2>

          {prequelsAndSequels.length > 0 && (
            <div className="mt-2">
              <h3 className="font-semibold mb-1">Prequel / Sequel</h3>
              <ul className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3 list-none m-0 p-0">
                {prequelsAndSequels.map(
                  ({
                    relation_type_formatted,
                    node: { id, title, main_picture },
                  }) => (
                    <li key={id}>
                      <RelatedCard
                        id={id}
                        src={main_picture.medium}
                        alt={title}
                        title={title}
                        relationType={relation_type_formatted}
                        type="anime"
                      />
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          <CollapsibleRelatedSection title="Side Story" items={sideStories} />
          <CollapsibleRelatedSection title="Other" items={others} />
        </section>
      )}

      {(recommendations?.length ?? 0) > 0 && (
        <section id="recommendations" aria-labelledby="recommendations-heading">
          <h2 id="recommendations-heading" className="text-xl font-semibold mb-2">Recommendations</h2>
          <ul className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3 list-none m-0 p-0">
            {recommendations?.map(({ node: { id, title, main_picture } }) => (
              <li key={id}>
                <Card
                  id={id}
                  src={main_picture.medium}
                  alt={title}
                  title={title}
                  type="anime"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

