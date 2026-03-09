'use client';

import React from 'react';
import Image from 'next/image';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Code2, Layers, Globe, Users, Megaphone } from 'lucide-react';
import { FlowButton } from '@/components/ui/flow-button';

const highlights = [
  { icon: Code2, label: 'Clean Code', desc: 'Maintainable, scalable architecture' },
  { icon: Layers, label: 'Full Stack', desc: 'End-to-end development' },
  { icon: Megaphone, label: 'Growth & Marketing', desc: 'SEO, content, social & strategy' },
  { icon: Users, label: 'Team Player', desc: 'Collaborative delivery, on time' },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-[#0a0a0a] py-28 px-6 md:px-16 lg:px-24"
    >
      {/* Section heading */}
      <div className="mb-20 max-w-3xl">
        <p className="mb-3 text-xs tracking-[0.35em] uppercase text-[#a78bfa] font-mono">
          Get to know me
        </p>
        <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl tracking-tight">
          About Me<span className="text-[#a78bfa]">.</span>
        </h2>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start lg:gap-24">
        {/* Left — Photo */}
        <div className="flex-shrink-0">
          <GlowCard
            glowColor="purple"
            customSize
            className="!p-0 overflow-hidden"
            width={300}
            height={380}
          >
            <Image
              src="/photo.jpg"
              alt="Mitesh Panda"
              width={300}
              height={380}
              className="relative z-[2] h-full w-full rounded-2xl object-cover object-top"
              priority
            />
          </GlowCard>
        </div>

        {/* Right — Info */}
        <div className="flex flex-1 flex-col gap-10">
          {/* Name & title */}
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl font-serif italic">
              Mitesh Panda
            </h3>
            <p className="mt-2 text-[#a78bfa] font-mono text-xs tracking-widest uppercase">
              Software Developer &bull; Growth &amp; Marketing &bull; Freelancer
            </p>
          </div>

          {/* Bio */}
          <p className="max-w-xl text-base leading-8 text-[#b0b0b8] md:text-lg">
            I work with teams to turn ideas into polished, production-ready
            digital products. From interactive web apps to scalable backends,
            we focus on clean architecture, pixel-perfect design, and seamless
            user experiences that drive real business results.
          </p>

          {/* Tech / Marketing CTAs */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <FlowButton
              text="Technology"
              onClick={() => {
                const el = document.querySelector('#projects');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-7 py-2.5 text-xs md:text-sm"
            />
            <FlowButton
              text="Marketing"
              onClick={() => {
                const el = document.querySelector('#marketing');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-7 py-2.5 text-xs md:text-sm border-white/30"
            />
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="group rounded-xl border border-[#1e1e2e] bg-[#0f0f17] p-5 transition-all duration-300 hover:border-[#a78bfa]/30 hover:bg-[#12121c]"
              >
                <Icon className="mb-3 h-5 w-5 text-[#a78bfa] transition-transform duration-300 group-hover:scale-110" />
                <p className="text-sm font-semibold tracking-tight text-white">{label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#7a7a8a]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
