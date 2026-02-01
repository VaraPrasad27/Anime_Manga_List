import { useEffect, useState } from "react";
import { getTopAnime } from "../lib/api";

const Anime = () => {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopAnime()
      .then((data) => {
        setAnime(data.data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Top anime</h1>
      {anime.map((item: any) => (
        <div key={item.node.id}>
          <img src={item.node.main_picture.medium} alt="poster" />
          <h3>{item.node.title}</h3>
          <p>Rank: {item.ranking.rank}</p>
        </div>
      ))}
    </div>
  );
};

export default Anime;
