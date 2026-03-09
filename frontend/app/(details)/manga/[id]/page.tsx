import { Card, RelatedCard } from "@/app/components/cards";
import { getDetails } from "@/app/lib/api";
import { formatDate } from "@/app/utils/formatDate";
import Image from "next/image";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);
  const res: MangaDetails = await getDetails(id, "manga");
  const {
    title,
    main_picture,
    alternative_titles,
    start_date,
    synopsis,
    mean,
    rank,
    popularity,
    media_type,
    status,
    genres,
    num_volumes,
    num_chapters,
    authors,
    related_manga,
    recommendations,
    serialization,
  } = res;

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-cover bg-center opacity-[0.35] blur-[20px] grayscale-[1] overflow-hidden"
          style={{ backgroundImage: `url(${main_picture.large})` }}
        />
        <article id="details" className="flex flex-row gap-5 relative mt-8">
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
              {/* <p className="text-xl">{alternative_titles}</p> */}
            </header>

            <div className="flex gap-0.5 pb-4 text-[12px] font-bold">
              <span className="uppercase p-1 border rounded-l-md">
                {media_type}
              </span>
              <span className="p-1 border">vol. {num_volumes}</span>
              <span className="p-1 border rounded-r-md">
                ch. {num_chapters}
              </span>
            </div>

            <p className="text-[16px]">{synopsis}</p>
          </div>

          <aside className="text-[16px] pt-15 px-6 w-[25%] h-screen -mt-9 bg-[rgba(0,0,0,0.1)]">
            <dl className="space-y-1">
              <div>
                <dt className="font-bold inline">Start Date: </dt>
                <dd className="inline">{formatDate(start_date)}</dd>
              </div>
              <div>
                <dt className="font-bold inline">Status: </dt>
                <dd className="inline">{status}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-2 items-center mt-2 border-t border-b py-2 border-[rgba(0,0,0,0.2)]">
              <span className="font-bold">Genres:</span>
              <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
                {genres?.map(({ id, name }) => (
                  <li key={id}>
                    <span className="inline-flex items-center rounded-full bg-gray-400 px-2 py-1 text-sm font-medium inset-ring inset-ring-gray-400/20">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="font-bold">Serialization:</span>
              <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
                {serialization?.map(({ node: { id, name } }) => (
                  <li key={id}>{name}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <span className="font-bold">Authors:</span>
              <ul className="flex flex-wrap gap-2 list-none m-0 p-0">
                {authors?.map(
                  ({ role, node: { id, first_name, last_name } }) => (
                    <li key={id}>
                      {first_name} {last_name} - {role}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </aside>
        </article>
      </div>

      {related_manga?.length > 0 && (
        <section id="related-manga" aria-labelledby="related-manga-heading">
          <h2 id="related-manga-heading" className="text-xl font-semibold mb-2">
            Related Manga
          </h2>
          <div className="mt-2">
            <ul className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3 list-none m-0 p-0">
              {related_manga.map(
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
                      type="manga"
                    />
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>
      )}

      {recommendations?.length > 0 && (
        <section id="recommendations" aria-labelledby="recommendations-heading">
          <h2
            id="recommendations-heading"
            className="text-xl font-semibold mb-2"
          >
            Recommendations
          </h2>
          <ul className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3 list-none m-0 p-0">
            {recommendations.map(({ node: { id, title, main_picture } }) => (
              <li key={id}>
                <Card
                  id={id}
                  src={main_picture.medium}
                  alt={title}
                  title={title}
                  type="manga"
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
