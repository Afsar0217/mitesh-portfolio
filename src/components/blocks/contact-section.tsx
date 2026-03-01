'use client';

import React from 'react';
import Image from 'next/image';
import NeuralBackground from '@/components/ui/flow-field-background';
import { FlowButton } from '@/components/ui/flow-button';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { Mail, Linkedin, Github, Phone, Instagram, Twitter } from 'lucide-react';

const dockItems = [
  {
    title: 'Email',
    icon: <Mail className="h-full w-full text-neutral-300" />,
    href: 'mailto:miteshkashyapbusiness@gmail.com',
  },
  {
    title: 'LinkedIn',
    icon: <Linkedin className="h-full w-full text-neutral-300" />,
    href: 'https://www.linkedin.com/in/mitesh-panda/',
  },
  {
    title: 'GitHub',
    icon: <Github className="h-full w-full text-neutral-300" />,
    href: 'https://github.com/',
  },
  {
    title: 'Instagram',
    icon: <Instagram className="h-full w-full text-neutral-300" />,
    href: 'https://instagram.com/',
  },
  {
    title: 'Twitter',
    icon: <Twitter className="h-full w-full text-neutral-300" />,
    href: 'https://twitter.com/',
  },
  {
    title: 'Phone',
    icon: <Phone className="h-full w-full text-neutral-300" />,
    href: 'tel:+917207351321',
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="fixed bottom-0 left-0 w-full h-screen z-0 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <NeuralBackground
          color="#a78bfa"
          trailOpacity={0.08}
          particleCount={350}
          speed={0.6}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between px-6 py-8 md:px-16">
        {/* Top spacer */}
        <div />

        {/* Center content */}
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <Image
              src="/logo-mp.png"
              alt="MP Logo"
              width={64}
              height={64}
              className="opacity-60"
            />
          </div>

          <h2 className="mb-3 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Let&apos;s Work Together
          </h2>
          <p className="mb-8 max-w-lg text-center text-base leading-relaxed text-white/40">
            Got an idea, a project, or just want to connect? I&apos;m always
            excited to hear about new opportunities and collaborations.
          </p>

          <a href="mailto:miteshkashyapbusiness@gmail.com">
            <FlowButton text="Get In Touch" />
          </a>

          {/* Contact info */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <a
              href="mailto:miteshkashyapbusiness@gmail.com"
              className="flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-[#a78bfa]"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>miteshkashyapbusiness@gmail.com</span>
            </a>
            <a
              href="tel:+917207351321"
              className="flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-[#a78bfa]"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+91 72073 51321</span>
            </a>
            <a
              href="https://www.linkedin.com/in/mitesh-panda/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-[#a78bfa]"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Bottom: Dock + Footer */}
        <div className="flex w-full flex-col items-center gap-4">
          {/* Dock */}
          <Dock className="items-end pb-3">
            {dockItems.map((item, idx) => (
              <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer">
                <DockItem className="aspect-square rounded-full bg-neutral-800">
                  <DockLabel>{item.title}</DockLabel>
                  <DockIcon>{item.icon}</DockIcon>
                </DockItem>
              </a>
            ))}
          </Dock>

          {/* Footer */}
          <p className="pb-2 text-xs text-white/15">
            &copy; {new Date().getFullYear()} Mitesh Panda &mdash; Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}
