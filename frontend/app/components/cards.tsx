"use client";

import Image from "next/image";
import Link from "next/link";

type BaseCardProps = {
  id: number;
  type: string;
  title: string;
  src: string;
  alt: string;
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
  return (
    <Link className="cursor-pointer" href={`/${type}/${id}`}>
      <p>{relationType}</p>
      <Image src={src} alt={alt} width={200} height={300} />
      <p>{title}</p>
    </Link>
  );
}

export function Card({ src, alt, title, id, type }: BaseCardProps) {
  return (
    <Link
      className="cursor-pointer justify-items-center w-50"
      href={`/${type}/${id}`}
    >
      <Image src={src} alt={alt} width={200} height={300} />
      <p className="mt-0.5 w-40 text-center">{title}</p>
    </Link>
  );
}
