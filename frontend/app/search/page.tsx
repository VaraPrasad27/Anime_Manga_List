// "use client";

import { getTop, search } from "../lib/api";
import { Card } from "../components/cards";
import { notFound } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { text } from "stream/consumers";
import PagingButton from "../components/pagingButton";
import SearchPaging from "../components/searchPaging";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type: string; page: string }>;
}) {
  const params = await searchParams;
  const query = params.q;
  const type = params.type;
  const page = Number(params.page);

  const offset = (page - 1) * 25;
  const res = !query
    ? await getTop("all", type, offset)
    : await search(query, type, offset);

  const result = res?.data ?? [];

  if (result.length === 0) {
    notFound();
  }

  return (
    <section className="mt-6 px-3.75" aria-label="Search results">
      <nav className="justify-items-end">
        <SearchPaging page={page} />
      </nav>
      <ul className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3 pt-3 list-none m-0 p-0">
        {result.map((item: any) => (
          <li key={item.node.id}>
            <Card
              src={item.node.main_picture.medium}
              alt={item.node.title}
              title={item.node.title}
              id={item.node.id}
              type={type}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
