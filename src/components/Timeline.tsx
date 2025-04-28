"use client";

import { motion } from "framer-motion";
import TimelineMilestone from "./TimelineMilestone";

const timelineData = [
  {
    year: "July 2016",
    title: "Temzie Bites is Born",
    description: "Started with a Huawei P9,a bedside lamp, a facebook page  and alot of creativity .",
    media: "/images/Original Logo.png",
    isVideo: false,
    position: "top",
  },
  {
    year: "August 2016",
    title: "First WordPress Post ",
    description: "Took a leap and started a blog!",
    media: "/images/tikkachicken.jpg",
    isVideo: false,
    position: "bottom",
  },
  {
    year: "March 2017",
    title: "First Video",
    description: "Lights Camera Action Temzie Bites Youtube is launched!",
    media: "/videos/millet-nshima.mp4",
    isVideo: true,
    position: "top",
  },
  {
    year: "May 2017",
    title: "New Logo ",
    description: "Temzie Bites",
    media: "/images/logo2.png",
    isVideo: false,
    position: "bottom",
  },
];
export default function Timeline() {
    const CARD_WIDTH = 240;
    const totalMovement = CARD_WIDTH * (timelineData.length - 1);
  
    return (
      <div className="relative w-full overflow-hidden py-20 flex justify-center items-center bg-white">
        {/* Timeline Line */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full border-t-[3px] border-gray-300 z-0" />
  
        {/* Moving Timeline */}
        <motion.div
          className="flex space-x-20 z-10" // <-- add z-10 here
          initial={{ x: "100vw" }}
          animate={{ x: [-totalMovement, 0] }}
          transition={{
            duration: 2.5 * timelineData.length,
            ease: "easeInOut",
          }}
        >
          {timelineData.map((milestone, index) => (
            <TimelineMilestone
              key={index}
              {...milestone}
              position={milestone.position as "top" | "bottom"}
            />
          ))}
        </motion.div>
      </div>
    );
  }
  