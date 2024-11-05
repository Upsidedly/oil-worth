import React from "react";
import PushIcon from "./icons/push";
import { cn } from "~/lib/utils";
import OilIcon from "./icons/oil";

interface BackgroundProps {
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ className }) => {
    
  return (
    <div className={cn("absolute inset-0 overflow-hidden z-0", className)}>

        {/* Create a repeating pattern with CSS grid */}
        {/* Generate a grid of icons */}
        <div className="absolute -inset-[25%] xl:-inset-[50%] 2xl:-inset-[75%] grid grid-cols-[repeat(8,_minmax(0,_1fr))] sm:grid-cols-[repeat(10,_minmax(0,_1fr))] md:grid-cols-[repeat(12,_minmax(0,_1fr))] lg:grid-cols-[repeat(16,_minmax(0,_1fr))] xl:grid-cols-[repeat(20,_minmax(0,_1fr))] 2xl:grid-cols-[repeat(24,_minmax(0,_1fr))] gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 rotate-45 scale-[135%]">
          {Array.from({ length: 16 * 12 }).map((_, index) => (
            index % 2 === 0 ?
            <PushIcon key={index} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-[3%]" /> : <OilIcon key={index} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-[1%]" />
          ))}
        </div>
    </div>
  );
};

export default Background;
