"use client";

import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
    details?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="relative flex gap-8 overflow-y-auto lg:h-[30rem] scrollbar-hide"
      ref={ref}
    >
      {/* LEFT — Scrollable project cards */}
      <div className="relative flex flex-1 items-start">
        <div className="w-full max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="mb-16 last:mb-0">
              <motion.div
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {item.content ?? null}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Sticky text panel */}
      <div
        className={cn(
          "hidden lg:flex lg:flex-col lg:justify-start sticky top-0 self-start min-w-[360px] max-w-md",
          contentClassName,
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="inline-block h-[2px] w-8 bg-[#a78bfa]" />
              <h3 className="text-3xl font-bold italic text-white font-serif">{content[activeCard].title}</h3>
            </div>
            <p className="text-base leading-7 text-[#b0b0b8]">
              {content[activeCard].description}
            </p>
            {content[activeCard].details}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
