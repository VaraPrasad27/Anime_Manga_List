import {
  CloseButton,
  createListCollection,
  Grid,
  GridItem,
  Input,
  InputGroup,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { getTopAnime, searchAnime } from "../lib/api";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const [anime, setAnime] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rankingType, setRankingType] = useState("all");
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Select
  const frameworks = createListCollection({
    items: [
      { label: "All time", value: "all" },
      { label: "Airing", value: "airing" },
      { label: "Upcoming", value: "upcoming" },
      { label: "Movies", value: "movie" },
    ],
  });

  // Clear Input Button
  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timeout = setTimeout(async () => {
      try {
        let data;
        if (value.trim() !== "") {
          data = await searchAnime(value);
        } else {
          data = await getTopAnime(rankingType);
        }

        if (!cancelled) {
          setAnime(data.data ?? []);
        }
      } catch (error) {
        if (!cancelled) setAnime([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [rankingType, value]);

  return (
    <>
      <div>
        <Select.Root
          collection={frameworks}
          size="sm"
          width="320px"
          defaultValue={["all"]}
          onValueChange={(e) => {
            setRankingType(e.value[0]);
            setValue("");
          }}
        >
          <Select.HiddenSelect />
          <Select.Label>Select anime</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select anime" />
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

        <InputGroup endElement={endElement}>
          <Input
            ref={inputRef}
            placeholder="Search"
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
        </InputGroup>
      </div>
      <div>
        <h1>Top anime {rankingType}</h1>
        {loading ? (
          <Spinner size={"xl"} mt={10} />
        ) : (
          <Grid templateColumns={"repeat(4, 1fr)"} gap={3}>
            {anime.map((item: any) => (
              <GridItem key={item.node.id}>
                <img src={item.node.main_picture.medium} alt="poster" />
                <h3>{item.node.title}</h3>
              </GridItem>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};

export default Home;
