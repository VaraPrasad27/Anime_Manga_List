import {
  Box,
  Button,
  createListCollection,
  Grid,
  GridItem,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { getTop, search } from "@/lib/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

type HomeProps = {
  queryFor: string;

  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;

  rankingType: string;
  setRankingType: React.Dispatch<React.SetStateAction<string>>;

  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

const Home = ({
  queryFor,
  value,
  setValue,
  rankingType,
  setRankingType,
  offset,
  setOffset,
}: HomeProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Select
  const frameworks = createListCollection({
    items:
      queryFor === "anime"
        ? [
            { label: "Top Anime Series", value: "all" },
            { label: "Top Airing Anime", value: "airing" },
            { label: "Top Upcoming Anime", value: "upcoming" },
            { label: "Top Anime TV Series", value: "tv" },
            { label: "Movies", value: "movie" },
            { label: "Most Popular", value: "bypopularity" },
          ]
        : [
            { label: "All", value: "all" },
            { label: "Top Manga", value: "manga" },
            // { label: "Top Novels", value: "novel" },
            // { label: "Top Doujinshi", value: "doujin" },
            { label: "Top Manhwa", value: "manhwa" },
            { label: "Top Manhua", value: "manhua" },
            { label: "Most Popular", value: "bypopularity" },
          ],
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timeout = setTimeout(async () => {
      try {
        const res =
          value.trim() !== ""
            ? await search(value, queryFor, offset)
            : await getTop(rankingType, queryFor, offset);

        if (!cancelled) {
          setData(res?.data ?? []);
        }
      } catch (error) {
        if (!cancelled) setData([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [rankingType, value, queryFor, offset]);

  return (
    <section id="home" className="home">
      <div className="flex flex-row justify-between">
        <Select.Root
          collection={frameworks}
          size="md"
          width="200px"
          defaultValue={[rankingType]} //cgpt
          onValueChange={(e) => {
            setRankingType(e.value[0]);
            setValue("");
            setOffset(0);
          }}
        >
          <Select.HiddenSelect />
          {/* <Select.Label>Type</Select.Label> */}
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select type" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {frameworks.items.map((framework) => (
                  <Select.Item item={framework} key={framework.value}>
                    <Select.ItemText>{framework.label}</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Box>
          <Button
            disabled={offset === 0}
            onClick={() => setOffset((o) => Math.max(0, o - 25))}
            width={6}
            height={6}
          >
            <BiSolidLeftArrow />
          </Button>
          <Button
            onClick={() => setOffset((o) => o + 25)}
            width={6}
            height={6}
            ml={2}
          >
            <BiSolidRightArrow />
          </Button>
        </Box>
      </div>

      <div>
        {loading ? (
          <Spinner size={"xl"} mt={10} />
        ) : data.length === 0 ? (
          <p>No results found</p>
        ) : (
          <>
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap={3}
            >
              {data.map((item: any) => (
                <GridItem
                  key={item.node.id}
                  cursor={"pointer"}
                  onClick={() => navigate(`/${queryFor}/${item.node.id}`)}
                >
                  <div className="flex flex-col">
                    <img src={item.node.main_picture.medium} alt="poster" />
                    <h3>{item.node.title}</h3>
                  </div>
                </GridItem>
              ))}
            </Grid>

            <Box mt={6} display={"flex"} gap={4} justifyContent={"center"}>
              <Button
                disabled={offset === 0}
                onClick={() => setOffset((o) => Math.max(0, o - 25))}
              >
                Previous
              </Button>
              <Button onClick={() => setOffset((o) => o + 25)}>Next</Button>
            </Box>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
