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
    <article>
      <Link className="cursor-pointer block" href={`/${type}/${id}`}>
        <span className="block text-sm text-gray-600">{relationType}</span>
        <Image src={src} alt={alt} width={200} height={300} />
        <span className="block mt-0.5">{title}</span>
      </Link>
    </article>
  );
}

export function Card({ src, alt, title, id, type }: BaseCardProps) {
  return (
    <article>
      <Link
        className="cursor-pointer block justify-items-center w-50"
        href={`/${type}/${id}`}
      >
        <Image src={src} alt={alt} width={200} height={300} />
        <span className="block mt-0.5 w-40 text-center">{title}</span>
      </Link>
    </article>
  );
}
