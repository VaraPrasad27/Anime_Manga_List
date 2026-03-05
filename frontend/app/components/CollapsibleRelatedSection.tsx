"use client";

import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RelatedCard } from "@/app/components/cards";

type RelatedNode = {
  relation_type_formatted: string;
  node: {
    id: number;
    title: string;
    main_picture: {
      medium: string;
    };
  };
};

type Props = {
  title: string;
  items: RelatedNode[];
  defaultOpen?: boolean;
};

export function CollapsibleRelatedSection({
  title,
  items,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  if (!items.length) return null;

  return (
    <section className="mt-4" aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}-toggle`}>
      <button
        id={`${title.replace(/\s+/g, "-").toLowerCase()}-toggle`}
        type="button"
        className="flex items-center gap-2 font-semibold mb-1 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span aria-hidden>
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>

      {open && (
        <ul className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3 list-none m-0 p-0">
          {items.map(
            ({
              relation_type_formatted,
              node: { id, title, main_picture },
            }) => (
              <li key={id}>
                <RelatedCard
                  id={id}
                  src={main_picture.medium}
                  alt={title}
                  title={title}
                  relationType={relation_type_formatted}
                  type="anime"
                />
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  );
}
