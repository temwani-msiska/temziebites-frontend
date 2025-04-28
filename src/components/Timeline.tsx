"use client";

import { motion } from "framer-motion";
import TimelineMilestone from "./TimelineMilestone";

const timelineData = [
    {
      year: "July 2016",
      title: "Temzie Bites is Born",
      description: "Armed with a Huawei P9, a bedside lamp, a Facebook page — and a *wild* imagination, Temzie Bites officially kicked off!",
      media: "/images/Original Logo.png",
      isVideo: false,
      position: "top",
    },
    {
      year: "August 2016",
      title: "First WordPress Post",
      description: "Clicked 'Publish' for the very first time — and just like that, a food blog was born!",
      media: "/images/tikkachicken.jpg",
      isVideo: false,
      position: "bottom",
    },
    {
      year: "March 2017",
      title: "First Video",
      description: "Lights, camera... deliciousness! Temzie Bites made its YouTube debut and the kitchen's never been the same!",
      media: "/videos/millet-nshima.mp4",
      isVideo: true,
      position: "top",
    },
    {
      year: "March 2017",
      title: "New Logo, New Temzie",
      description: "Fresh look, fresh vibe! (Even if not *everyone* loved the makeover...)",
      media: "/images/Logo2.png",
      isVideo: false,
      position: "bottom",
    },
    {
      year: "April 2017",
      title: "New Camera",
      description: "Say hello to HD! Clearer videos, crispier content — the glow-up was *real*.",
      media: "/videos/Chibwawa Recipe.mp4",
      isVideo: true,
      position: "top",
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
  