import { getDetails } from "@/lib/api";
import { Badge, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "./Star";

const AnimeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getDetails(Number(id), "anime")
      .then(setAnime)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner size={"md"} />;
  if (!anime) return <p>Anime not found</p>;

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-1/3">
          <img src={anime.main_picture.large} alt={anime.title} />
          {/* <p>mean: {(anime.mean / 2).toFixed(1)}/5 </p> */}
          {/* <RatingGroup.Root count={5} defaultValue={anime.mean / 2} size="sm">
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root> */}
          <StarRating rating={parseFloat((anime.mean / 2).toFixed(1))} />
        </div>

        <div className="w-2/3">
          <h1 className="text-6xl">{anime.title}</h1>

          <div className="h-4" />

          <div className="flex flex-row gap-2">
            <Badge>{anime.media_type}</Badge>
            <Badge>{anime.rating}</Badge>
            <Badge>ep: {anime.num_episodes}</Badge>
          </div>
          <p>Status: {getStatus(anime.status)} </p>
          <p>Start Date: {anime.start_date}</p>
          <p>End Date: {anime.end_date} </p>

          <div className="flex flex-row gap-2">
            <p>Genres:</p>
            {anime.genres?.map((genre: any) => (
              <Badge>{genre.name}</Badge>
            ))}
          </div>

          <div className="flex flex-row gap-2">
            <p>Studios:</p>
            {anime.studios?.map((studio: any) => (
              <p>{studio.name}</p>
            ))}
          </div>

          <div className="h-4" />

          <p>{anime.synopsis} </p>
        </div>
      </div>

      <p>Related Animas:</p>
      <div className="flex flex-row gap-3">
        {anime.related_anime?.map((r_anime: any) => (
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/anime/${r_anime.node.id}`)}
          >
            {/* <p>{r_anime.relation_type}</p> */}
            <p>{r_anime.relation_type_formatted}</p>
            <img
              src={r_anime.node.main_picture.medium}
              alt={r_anime.node.title}
            />
            <p>{r_anime.node.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

function getStatus(status: string): string {
  switch (status) {
    case "currently_airing":
      return "Currently Airing";
    case "finished_airing":
      return "Finished Airing";
    case "not_yet_aired":
      return "Not Yet Aired";
    default:
      return status;
  }
}

export default AnimeDetails;
