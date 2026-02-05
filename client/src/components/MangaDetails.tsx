import { getDetails } from "@/lib/api";
import { Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";

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
    <div>
      <Button onClick={() => navigate(-1)}>
        {" "}
        <BiLeftArrow />{" "}
      </Button>
      <h1>{manga.title}</h1>
      <img src={manga.main_picture.large} alt={manga.title} />
    </div>
  );
};

export default MangaDetails;
