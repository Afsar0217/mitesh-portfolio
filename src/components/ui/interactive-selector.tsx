'use client';

import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  Search,
  Target,
  PenSquare,
  BarChart3,
} from 'lucide-react';

type Option = {
  title: string;
  /** Short label shown on the card */
  description: string;
  /** Longer paragraph shown below the strip */
  body: string;
  image: string;
  icon: React.ReactNode;
};

const options: Option[] = [
  {
    title: 'Social Media Management',
    description:
      'Strategic calendars, posting, and engagement across your key platforms.',
    body:
      'We plan, schedule, and refine your social presence across the channels that matter most to your audience. From content pillars and asset templates to community engagement, everything is tuned to feel on-brand and consistent while still driving reach and saves.',
    image: '/marketing/social-media.jpg',
    icon: <Megaphone size={20} className="text-white" />,
  },
  {
    title: 'SEO & Organic Growth',
    description:
      'On-page, technical, and content SEO to help you rank and stay visible.',
    body:
      'We combine keyword research, technical clean‑up, and content structure so search engines can actually understand your product. The goal is simple: more qualified visitors discovering you organically, not just short spikes from paid campaigns.',
    image: '/marketing/seo.jpg',
    icon: <Search size={20} className="text-white" />,
  },
  {
    title: 'Brand & Digital Strategy',
    description:
      'Positioning, messaging, and campaigns that align product, brand, and growth.',
    body:
      'Together we clarify who you are speaking to, what you stand for, and how that shows up across your website, social, and campaigns. The result is a clear narrative that makes your product easy to understand and easy to choose—online and offline.',
    image: '/marketing/brand.jpg',
    icon: <Target size={20} className="text-white" />,
  },
  {
    title: 'Content Creation',
    description:
      'Web copy, posts, and creatives tailored to your brand voice.',
    body:
      'We help you ship content that actually fits your product: landing page copy, case studies, carousels, and short‑form posts that translate features into benefits. Every piece is written and designed to be reusable across channels.',
    image: '/marketing/content-creation.jpg',
    icon: <PenSquare size={20} className="text-white" />,
  },
  {
    title: 'Analytics & Reporting',
    description:
      'Clear dashboards that show what’s working and where to improve.',
    body:
      'Data should be readable, not just exported. We wire up tracking, define the right metrics, and turn them into simple dashboards and recurring summaries so you always know which channels and campaigns deserve your next iteration.',
    image: '/marketing/analytics.jpg',
    icon: <BarChart3 size={20} className="text-white" />,
  },
];

export const InteractiveSelector: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: number[] = [];

    options.forEach((_, i) => {
      const timer = window.setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-8 md:py-10 lg:py-12 bg-transparent font-sans text-white">
      {/* Header Section */}
      <div className="w-full max-w-2xl px-6 mb-6 text-center">
        <p className="mb-3 text-xs tracking-[0.35em] uppercase text-[#a78bfa] font-mono">
          Marketing Services
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
          Growth-Focused Marketing<span className="text-[#a78bfa]">.</span>
        </h2>
        <p className="text-sm md:text-base text-[#a1a1aa] max-w-xl mx-auto">
          From social media to SEO and content, we help ship products that are
          seen, remembered, and trusted.
        </p>
      </div>

      {/* Desktop strip */}
      <div className="hidden md:flex w-full justify-center">
        <div className="options flex w-full max-w-[1100px] h-[360px] md:h-[400px] mx-0 items-stretch overflow-hidden relative px-4 md:px-0">
          {options.map((option, index) => (
            <div
              key={option.title}
              className={`
                option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
                ${activeIndex === index ? 'active' : ''}
              `}
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index)
                  ? 'translateX(0)'
                  : 'translateX(-60px)',
                minWidth: '60px',
                minHeight: '100px',
                margin: 0,
                borderRadius: 0,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: activeIndex === index ? '#ffffff' : '#292929',
                cursor: 'pointer',
                backgroundColor: '#18181b',
                boxShadow: activeIndex === index
                  ? '0 20px 60px rgba(0,0,0,0.50)'
                  : '0 10px 30px rgba(0,0,0,0.30)',
                flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                zIndex: activeIndex === index ? 10 : 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
                willChange:
                  'flex-grow, box-shadow, background-size, background-position',
              }}
              onClick={() => handleOptionClick(index)}
            >
              {/* Label with icon and info — no dark overlay */}
              <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-20 pointer-events-none px-4 gap-3 w-full [text-shadow:0_1px_4px_rgba(0,0,0,0.9),0_0_12px_rgba(0,0,0,0.7)]">
                <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(15,15,20,0.9)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 flex-grow-0 transition-all duration-200">
                  {option.icon}
                </div>
                <div className="info text-white whitespace-pre relative">
                  <div
                    className="main font-semibold text-sm md:text-base transition-all duration-700 ease-in-out"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index
                        ? 'translateX(0)'
                        : 'translateX(25px)',
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="sub text-xs md:text-sm text-gray-300 transition-all duration-700 ease-in-out"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index
                        ? 'translateX(0)'
                        : 'translateX(25px)',
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden w-full flex-col items-center gap-4 px-4 mt-4">
        <div
          className="w-full max-w-md h-64 rounded-2xl overflow-hidden shadow-2xl border border-[#292929] bg-[#111118]"
          style={{
            backgroundImage: `url('${options[activeIndex].image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="flex flex-wrap justify-center gap-3">
          {options.map((option, index) => (
            <button
              key={option.title}
              type="button"
              onClick={() => handleOptionClick(index)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                activeIndex === index
                  ? 'border-[#a78bfa] bg-[#a78bfa]/20 text-white'
                  : 'border-[#333] bg-[#111118] text-white/60 hover:border-[#555]'
              }`}
              aria-label={option.title}
            >
              {option.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Active service description */}
      <div className="mt-8 max-w-3xl px-6 md:px-0">
        <h3 className="mb-3 text-lg md:text-xl font-semibold text-white font-serif italic">
          {options[activeIndex]?.title}
        </h3>
        <p className="text-base md:text-lg leading-[1.75] text-[#b0b0b8] font-serif text-center md:text-left">
          {options[activeIndex]?.body}
        </p>
      </div>
    </div>
  );
};

export default InteractiveSelector;

