"use client";

import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

/** Maps tech names (as used in projects) to icon paths in public/tech_icons/ */
const TECH_ICONS: Record<string, string> = {
  TypeScript: "/tech_icons/typescript.png",
  React: "/tech_icons/physics.png",
  "Node.js": "/tech_icons/nodejs.png",
  Express: "/tech_icons/express-js.png",
  "Google Analytics API": "/tech_icons/google-analytics.png",
  "Tailwind CSS": "/tech_icons/tailwind-css.png",
  "React Native": "/tech_icons/react-native.png",
  Expo: "/tech_icons/expo.png",
  PostgreSQL: "/tech_icons/postgresql.png",
  Firebase: "/tech_icons/firebase.png",
  Webflow: "/tech_icons/webflow.png",
  HTML5: "/tech_icons/html5.png",
  CSS3: "/tech_icons/css3.png",
  JavaScript: "/tech_icons/javascript.png",
};

interface Project {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  image: string;
  bgClass: string;
}

const projects: Project[] = [
  {
    name: "Zen Reports",
    tagline:
      "An AI-powered traffic dashboard with real GA4 reporting, real Google sign-in, and real Firestore persistence.",
    description:
      "Production-ready analytics platform for tracking and analyzing AI-driven website traffic using Google Analytics 4 (GA4).",
    features: [
      "Google OAuth 2.0 authentication with GA4 property selection for AI platform traffic analytics.",
      "Interactive reporting with summary KPIs, traffic trends, and top-performing pages filtered for AI referral sources.",
      "Designed for scalability following best practices for API integration, session handling, and type-safe validation.",
    ],
    tech: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "Google Analytics API",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    image: "/p1.jpg",
    bgClass: "bg-gradient-to-br from-blue-700 via-blue-900 to-blue-950",
  },
  {
    name: "Discount Mitra",
    tagline:
      "A smart local savings companion for discovering offers, booking services, and paying bills in one seamless app.",
    description:
      "Full-stack local services platform for discovering discounts, booking services, and paying bills across multiple categories.",
    features: [
      "Multi-category marketplace covering Food, Healthcare, Home Services, Events, Shopping, Travels, Construction, Beauty & Salon, and more.",
      "Service provider detail pages with galleries, FAQs, contact details, location links, and category-specific actions.",
      "Centralized booking and service request system with booking history, favorites, and user activity tracking.",
      "Admin dashboard for managing users, listings, bookings, payments, VIP approvals, push notifications, and analytics.",
    ],
    tech: [
      "React Native",
      "Expo",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "Firebase",
      "Razorpay",
    ],
    image: "/p2.jpg",
    bgClass: "bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700",
  },
  {
    name: "Time Is Money",
    tagline:
      "A luxury watch platform built for high-value sales, trusted sourcing, and customer engagement.",
    description:
      "Luxury-focused digital platform for showcasing high-value timepieces and generating qualified sales inquiries.",
    features: [
      "Built for watch dealers and collectors to present premium inventories and communicate brand trust.",
      "Centralized online presence for exploring curated collections, learning about services, and building buyer confidence.",
      "Supports business outcomes like increased engagement, structured product discovery, and converting visitors into leads.",
      "Modern web platform establishing luxury-segment credibility while remaining fast, responsive, and accessible across all devices.",
    ],
    tech: ["Webflow", "HTML5", "CSS3", "JavaScript"],
    image: "/p3.jpg",
    bgClass: "bg-gradient-to-br from-emerald-800 via-green-900 to-emerald-950",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl bg-[#111118] h-[28rem]">
      <Image
        src={project.image}
        alt={project.name}
        width={800}
        height={600}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="mt-6">
      <ul className="space-y-3">
        {project.features.map((feature, i) => (
          <li key={i} className="flex gap-3 text-sm leading-6 text-[#c0c0c8]">
            <span className="mt-1 flex-shrink-0 text-[#a78bfa] text-base">&#10038;</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((t) => {
          const iconSrc = TECH_ICONS[t];
          return (
            <span
              key={t}
              className={`inline-flex items-center gap-2 rounded-full border border-[#2a2a3e] bg-[#111118] pr-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 font-mono transition-all duration-300 ease-out hover:border-white/40 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] ${iconSrc ? "pl-2" : "pl-4"}`}
            >
              {iconSrc ? (
                <Image
                  src={iconSrc}
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] flex-shrink-0 object-contain"
                />
              ) : null}
              <span>{t}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function MobileProjectCard({ project }: { project: Project }) {
  return (
    <div className="mb-16 last:mb-0">
      <div className="overflow-hidden rounded-2xl shadow-2xl">
        <Image
          src={project.image}
          alt={project.name}
          width={600}
          height={400}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="mt-6 px-1">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-block h-[2px] w-8 bg-[#a78bfa]" />
          <h3 className="text-xl font-bold text-white">{project.name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-[#a1a1aa]">{project.description}</p>
        <ProjectDetails project={project} />
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const stickyContent = projects.map((project) => ({
    title: project.name,
    description: project.description,
    content: <ProjectCard project={project} />,
    details: <ProjectDetails project={project} />,
  }));

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0a0a0a] pt-24 pb-16 px-6 md:px-16 lg:px-24"
    >
      <div className="mb-6">
        <p className="mb-2 text-sm tracking-[0.3em] uppercase text-[#a78bfa] font-mono">
          What I&apos;ve built
        </p>
        <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Projects<span className="text-[#a78bfa]">.</span>
        </h2>
      </div>

      {/* Desktop — Sticky scroll */}
      <div className="hidden lg:block">
        <StickyScroll content={stickyContent} />
      </div>

      {/* Mobile — Stacked cards */}
      <div className="block lg:hidden">
        {projects.map((project) => (
          <MobileProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
