import { getDetails } from "@/lib/api";
import { Badge, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRating from "./Star";

const MangaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getDetails(Number(id), "manga")
      .then(setManga)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner size={"md"} />;
  else if (!manga) return <p>Manga not found</p>;

  return (
    <div className="details">
      <div className="flex flex-row">
        <div className="w-1/3">
          <img src={manga.main_picture.large} alt={manga.title} />
          {/* <p>mean: {manga.mean / 2}/5</p> */}
          {/* <RatingGroup.Root count={5} defaultValue={manga.mean / 2} size="sm">
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
          </RatingGroup.Root> */}
          <StarRating rating={parseFloat((manga.mean / 2).toFixed(1))} />
        </div>

        <div className="w-2/3">
          <h1>{manga.title}</h1>

          <div className="h-4" />

          <div className="flex flex-row gap-2">
            <Badge>{manga.media_type}</Badge>
            <Badge>Vol: {manga.num_volumes}</Badge>
            <Badge>Chp: {manga.num_chapters}</Badge>
          </div>
          <p>Status: {getStatus(manga.status)}</p>
          <p>Start Date: {manga.start_date}</p>

          <div className="flex flex-row gap-2">
            <p>Genres:</p>
            {manga.genres?.map((genre: any) => (
              <Badge>{genre.name}</Badge>
            ))}
          </div>

          <div className="flex flex-row gap-2">
            <p>Author:</p>
            {manga.authors?.map((author: any) => (
              <p>
                {" "}
                {author.node.first_name} {author.node.last_name}
              </p>
            ))}
          </div>

          <div className="flex flex-row gap-2">
            <p>Serializations:</p>
            {manga.serialization?.map((serial: any) => (
              <p>{serial.node.name}</p>
            ))}
          </div>

          <div className="h-4" />

          <p>{manga.synopsis}</p>
        </div>
      </div>

      {manga.related_manga == null ? (
        <>
          <p>Related Manges:</p>
          <div className="flex flex-row gap-3">
            {manga.related_manga?.map((r_manga: any) => (
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/manga/${r_manga.node.id}`)}
              >
                <p>{r_manga.relation_type_formatted}</p>
                <img src={r_manga.node.main_picture.medium} alt="poster" />
                <p>{r_manga.node.title}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

function getStatus(status: string): string {
  switch (status) {
    case "finished":
      return "Finished";
    case "publishing":
      return "Publishing";
    case "not_yet_published":
      return "Not Yet Published";
    case "on_hiatus":
      return "On Hiatus";
    case "discontinued":
      return "Discontinued";
    default:
      return status;
  }
}

export default MangaDetails;
