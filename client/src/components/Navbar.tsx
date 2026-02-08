import { CloseButton, Input, InputGroup, SegmentGroup } from "@chakra-ui/react";
import type React from "react";
import { useRef } from "react";

type NavbarProps = {
  setQueryFor: React.Dispatch<React.SetStateAction<string>>;
  setRankingType: React.Dispatch<React.SetStateAction<string>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;

  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar = ({
  setQueryFor,
  setRankingType,
  setValue,
  value,
  setOffset,
}: NavbarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <div className="nav">
      <div className="icon">
        <span>Anime | Manga Find</span>
      </div>

      <div className="buttons">
        <SegmentGroup.Root
          defaultValue={"anime"}
          onValueChange={(e) => {
            if (e.value === "anime") {
              setQueryFor("anime");
            } else if (e.value === "manga") {
              setQueryFor("manga");
            }
            setRankingType("all");
            setOffset(0);
          }}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={[
              { value: "anime", label: "Anime" },
              { value: "manga", label: "Manga" },
            ]}
          />
        </SegmentGroup.Root>
      </div>

      <div className="search">
        <InputGroup endElement={endElement}>
          <Input
            ref={inputRef}
            placeholder="Search"
            value={value}
            width={"250px"}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
        </InputGroup>
      </div>
    </div>
  );
};

export default Navbar;
