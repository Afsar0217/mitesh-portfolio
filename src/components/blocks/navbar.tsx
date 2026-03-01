'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const isClickScrolling = useRef(false);

  const updateHash = useCallback((label: string) => {
    const hash = label === 'Home' ? '' : `#${label.toLowerCase()}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash || window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (isClickScrolling.current) return;

      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= docHeight - 200) {
        setActive((prev) => {
          if (prev !== 'Contact') updateHash('Contact');
          return 'Contact';
        });
        return;
      }

      const upperSections = navItems
        .filter((item) => item.label !== 'Contact')
        .map((item) => ({
          label: item.label,
          el: document.querySelector(item.href),
        }));

      const scrollPos = window.scrollY + window.innerHeight / 3;

      let found = 'Home';
      for (let i = upperSections.length - 1; i >= 0; i--) {
        const el = upperSections[i].el;
        if (el && (el as HTMLElement).offsetTop <= scrollPos) {
          found = upperSections[i].label;
          break;
        }
      }

      setActive((prev) => {
        if (prev !== found) updateHash(found);
        return found;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateHash]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const label = navItems.find((item) => item.href === hash)?.label;
    if (!label) return;

    setActive(label);

    requestAnimationFrame(() => {
      if (hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      } else {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setActive(label);
    updateHash(label);

    isClickScrolling.current = true;

    const onScrollEnd = () => {
      isClickScrolling.current = false;
    };
    setTimeout(onScrollEnd, 1200);

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href === '#contact') {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 pointer-events-none">
      <a
        href="#home"
        onClick={(e) => handleClick(e, '#home', 'Home')}
        className="pointer-events-auto transition-opacity hover:opacity-70"
      >
        <Image
          src="/logo-mp.png"
          alt="MP"
          width={44}
          height={44}
          className="opacity-90"
        />
      </a>

      <nav
        className={`pointer-events-auto flex items-center gap-1 rounded-full border border-white/[0.08] px-3 py-2 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? 'bg-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-white/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.2)]'
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleClick(e, item.href, item.label)}
            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              active === item.label
                ? 'bg-white/[0.14] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                : 'text-white/45 hover:text-white/75'
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="w-11" />
    </header>
  );
}
