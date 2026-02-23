import { Card, RelatedCard } from "@/app/components/cards";
import { getDetails } from "@/app/lib/api";
import Image from "next/image";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = Number(params.id);
  const data = await getDetails(id);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <Image
          src={data.main_picture.large}
          alt={data.title}
          width={420}
          height={600}
          className="w-105 h-150"
        />
        <div>
          <h1>{data.title}</h1>
          <p>{data.alternative_titles.synonyms}</p>
          <p>{data.alternative_titles.en}</p>
          <p>{data.alternative_titles.ja}</p>
          <p>{data.start_date}</p>
          <p>{data.end_date}</p>
          <p>{data.synopsis}</p>
          <p>{data.mean}</p>
          <p>{data.rank}</p>
          <p>{data.popularity}</p>
          <p>{data.media_type}</p>
          <p>{data.status}</p>
          {data.genres?.map((genre: any) => (
            <p>{genre.name}</p>
          ))}
          <p>{data.num_episodes}</p>
          <p>{data.source}</p>
          <p>{data.average_episode_duration}</p>
          <p>{data.rating}</p>
          {data.studios?.map((studio: any) => (
            <div>
              <p>{studio.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p>related anime</p>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
          {data.related_anime?.map((anime: any) => (
            <RelatedCard
              id={anime.node.id}
              src={anime.node.main_picture.medium}
              alt={anime.node.title}
              title={anime.node.title}
              relationType={anime.relation_type_formatted}
              type="anime"
            />
          ))}
        </div>
      </div>

      <div>
        <p>recommendations</p>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
          {data.recommendations?.map((anime: any) => (
            <Card
              id={anime.node.id}
              src={anime.node.main_picture.medium}
              alt={anime.node.title}
              title={anime.node.title}
              type="anime"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
