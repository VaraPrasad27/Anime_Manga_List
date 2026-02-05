import { CloseButton, Input, InputGroup, SegmentGroup } from "@chakra-ui/react";
import type React from "react";
import { useRef } from "react";

type NavbarProps = {
  setQueryFor: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

const Navbar = ({ setQueryFor, setValue, value }: NavbarProps) => {
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
    <div className="flex flex-row">
      <div>
        <span>Anime, Manga Find</span>
      </div>

      <div>
        <SegmentGroup.Root
          defaultValue={"anime"}
          onValueChange={(e) => {
            if (e.value === "anime") {
              setQueryFor("anime");
            } else if (e.value === "manga") {
              setQueryFor("manga");
            }
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

      <div>
        <InputGroup endElement={endElement}>
          <Input
            ref={inputRef}
            placeholder="Search"
            value={value}
            width={"120px"}
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
