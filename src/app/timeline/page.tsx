// app/timeline/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Timeline from "@/components/Timeline";

export default function TimelinePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">The Temzie Bites Timeline</h1>
      <div className="w-full px-4">
        <Timeline />
      </div>
      <button
        onClick={() => router.push("/")}
        className="mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg text-sm font-semibold"
      >
        Back to Intro
      </button>
    </div>
  );
}
