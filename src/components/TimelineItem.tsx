"use client";

import Image from "next/image";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  image: string;
}

export default function TimelineItem({ year, title, description, image }: TimelineItemProps) {
  return (
    <div className="w-[300px] flex flex-col items-center gap-4 bg-gray-100 p-6 rounded-xl shadow-md">
      <div className="relative w-full h-40 rounded overflow-hidden">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">{year}</h3>
        <h4 className="text-lg mt-2">{title}</h4>
        <p className="mt-2 text-sm">{description}</p>
      </div>
    </div>
  );
}
