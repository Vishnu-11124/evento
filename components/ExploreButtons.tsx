"use client";

import { ArrowRight } from "lucide-react";

const ExploreButtons = () => {
  return (
    <button
      type="button"
      onClick={() => console.log("Explore clicked!")}
      className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200"
    >
      <a href="#explore" className="flex items-center gap-2">
        Explore Events
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </button>
  );
};

export default ExploreButtons;