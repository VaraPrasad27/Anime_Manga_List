import { getDetails } from "@/lib/api";
import { Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";

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
      <Button onClick={() => navigate(-1)}>
        {" "}
        <BiLeftArrow />{" "}
      </Button>
      <h1>{anime.title}</h1>
      <img src={anime.main_picture.large} alt={anime.title} />
    </div>
  );
};

export default AnimeDetails;
