"use client";

import { useRouter } from "next/navigation";

type MediaType = "anime" | "manga";

type BaseCardProps = {
  id: number;
  type: MediaType;
  title: string;
  src?: string;
  alt?: string;
};

type RelatedCardProps = BaseCardProps & {
  relationType: string;
};

export function RelatedCard({
  src,
  alt,
  title,
  relationType,
  type,
  id,
}: RelatedCardProps) {
  const { push } = useRouter();

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        push(`/${type}/${id}`);
      }}
    >
      <p>{relationType}</p>
      <img src={src} alt={alt} />
      <p>{title}</p>
    </div>
  );
}

export function RecomCard({ src, alt, title, id, type }: BaseCardProps) {
  const { push } = useRouter();

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        push(`/${type}/${id}`);
      }}
    >
      <p>{title}</p>
      <img src={src} alt={alt} />
    </div>
  );
}
