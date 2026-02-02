import { getAnimeDetails } from "@/lib/api";
import { useEffect, useState } from "react";

const Details = () => {
  const id = 1;
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimeDetails(id)
      .then((data) => {
        setAnime(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {anime && (
        <>
          <h1>{anime.title}</h1>
          <img src={anime.main_picture.large} alt={anime.title} />
          <p>Score: {anime.mean}</p>
          <p>Status: {anime.status}</p>
        </>
      )}
    </div>
  );
};

export default Details;
