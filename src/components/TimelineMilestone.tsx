"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface TimelineMilestoneProps {
  year: string;
  title: string;
  description: string;
  media: string;
  isVideo?: boolean;
  position: "top" | "bottom"; // where the text lives
}

export default function TimelineMilestone({
  year,
  title,
  description,
  media,
  isVideo = false,
  position,
}: TimelineMilestoneProps) {
  /* one utility we reuse */
  const Circle = (
    <motion.div
      className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-4 border-primary shadow-lg flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0.5 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      {isVideo ? (
        <video
          src={media}
          className="object-cover w-full h-full"
          muted
          autoPlay
          loop
          playsInline
        />
      ) : (
        <Image
          src={media}
          alt={title}
          width={160}
          height={160}
          className="object-cover w-full h-full"
        />
      )}
    </motion.div>
  );

  const TextBlock = (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-bold">{year}</h3>
      <h4 className="text-lg">{title}</h4>
      <p className="text-sm mt-1">{description}</p>
    </div>
  );

  /* one thin connector that always sits between circle & text only */
  const Connector = <div className="h-14 w-px bg-gray-400" />;

  return (
    <div className="relative flex flex-col items-center w-60">
      {/* fixed middle timeline (stays behind) */}
      <div className="absolute top-1/2 left-0 w-full border-t border-gray-300 -z-10" />

      {/* order changes depending on where the text belongs */}
      {position === "top" ? (
        <>
          {TextBlock}
          {Connector}
          {Circle}
        </>
      ) : (
        <>
          {Circle}
          {Connector}
          {TextBlock}
        </>
      )}
    </div>
  );
}
