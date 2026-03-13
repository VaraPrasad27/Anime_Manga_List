"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PagingButton from "./pagingButton";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchPaging({ page }: { page: number }) {
  const params = useSearchParams();
  const router = useRouter();

  const updatePage = (newPage: number) => {
    const query = new URLSearchParams(params.toString());
    query.set("page", String(newPage));

    router.push(`/search?${query.toString()}`);
  };

  return (
    <div className="flex gap-2 pr-4">
      <PagingButton
        hoverText={`Page ${page - 1}`}
        buttonText={<IoIosArrowBack />}
        onClick={() => updatePage(page - 1)}
      />
      <PagingButton
        hoverText={`Page ${page + 1}`}
        buttonText={<IoIosArrowForward />}
        onClick={() => updatePage(page + 1)}
      />
    </div>
  );
}
