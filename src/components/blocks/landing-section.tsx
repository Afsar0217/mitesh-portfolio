'use client';

import React from 'react';
import { InteractiveRobotSpline } from '@/components/blocks/interactive-3d-robot';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

export function LandingSection() {
  const scrollToContact = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      <div className="relative z-10 flex h-full w-full items-center">
        {/* Left — Copy */}
        <div className="flex w-full flex-col justify-center px-8 md:px-16 lg:px-24 lg:w-1/2">
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-[#a78bfa] opacity-0 animate-fade-in-up font-mono">
            Software Developer
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white opacity-0 animate-fade-in-up animation-delay-200 sm:text-5xl md:text-6xl lg:text-7xl">
            I Build
            <br />
            <span className="bg-gradient-to-r from-[#a78bfa] to-[#6d28d9] bg-clip-text text-transparent">
              Digital
            </span>
            <br />
            Experiences.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#a1a1aa] opacity-0 animate-fade-in-up animation-delay-400 md:text-lg">
            Crafting modern web applications with clean code, thoughtful design, and a focus on performance.
          </p>

          <div className="mt-10 opacity-0 animate-fade-in-up animation-delay-600">
            <InteractiveHoverButton
              text="Let's Talk"
              onClick={scrollToContact}
              className="w-40 border-[#2a2a3e] text-white text-base"
            />
          </div>
        </div>

        {/* Right — Robot */}
        <div className="hidden lg:block absolute right-0 top-0 h-full w-[55%]">
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="h-full w-full scale-90 origin-center"
          />
          {/* Cover Spline watermark */}
          <div className="absolute bottom-0 right-0 w-44 h-12 bg-[#0a0a0a] z-20" />
        </div>

        {/* Mobile — Robot behind text */}
        <div className="absolute inset-0 z-[-1] block lg:hidden opacity-20">
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="h-full w-full"
          />
          <div className="absolute bottom-0 right-0 w-44 h-12 bg-[#0a0a0a] z-20" />
        </div>
      </div>
    </section>
  );
}
