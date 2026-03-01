// "use client";

import { getTop, search } from "../lib/api";
import { Card } from "../components/cards";
import { notFound } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const params = await searchParams;
  const query = params.q;
  const type = params.type ?? "anime";

  const res = !query ? await getTop("all", type) : await search(query, type);

  const result = res?.data ?? [];

  if (result.length === 0) {
    notFound();
  }

  return (
    <section className="mt-6 px-3.75">
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3 pt-3">
        {result.map((item: any) => (
          <Card
            key={item.node.id}
            src={item.node.main_picture.medium}
            alt={item.node.title}
            title={item.node.title}
            id={item.node.id}
            type={type}
          />
        ))}
      </div>
    </section>
  );
}
