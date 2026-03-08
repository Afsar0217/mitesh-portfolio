'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#marketing' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isClickScrolling = useRef(false);
  const sectionsCache = useRef<{ label: string; el: HTMLElement }[]>([]);

  const updateHash = useCallback((label: string) => {
    const hash =
      label === 'Home'
        ? ''
        : label === 'Services'
          ? '#marketing'
          : `#${label.toLowerCase()}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash || window.location.pathname);
    }
  }, []);

  const cacheSections = useCallback(() => {
    sectionsCache.current = navItems
      .filter((item) => item.label !== 'Contact')
      .map((item) => ({
        label: item.label,
        el: document.querySelector(item.href) as HTMLElement,
      }))
      .filter((s) => s.el !== null);
  }, []);

  useEffect(() => {
    cacheSections();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (isClickScrolling.current) return;

      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= docHeight - 200) {
        setActive('Contact');
        return;
      }

      const scrollPos = window.scrollY + window.innerHeight / 3;

      let found = 'Home';
      for (let i = sectionsCache.current.length - 1; i >= 0; i--) {
        if (sectionsCache.current[i].el.offsetTop <= scrollPos) {
          found = sectionsCache.current[i].label;
          break;
        }
      }

      setActive(found);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateHash, cacheSections]);

  useEffect(() => {
    updateHash(active);
  }, [active, updateHash]);

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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setActive(label);
    setMobileOpen(false);

    isClickScrolling.current = true;
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1200);

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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 py-4 pointer-events-none">
        {/* Logo */}
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

        {/* Desktop nav pill */}
        <nav
          className={`pointer-events-auto hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] px-3 py-2 backdrop-blur-xl transition-all duration-500 ${
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="pointer-events-auto flex md:hidden items-center justify-center w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.06] backdrop-blur-xl transition-all duration-300"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
        </button>

        {/* Desktop right spacer */}
        <div className="hidden md:block w-11" />
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile menu panel */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-[#0f0f17]/95 backdrop-blur-2xl border-l border-white/[0.06] transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end px-6 py-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.06] transition-all duration-300"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-6 pt-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href, item.label)}
              className={`rounded-xl px-5 py-3.5 text-base font-medium transition-all duration-300 ${
                active === item.label
                  ? 'bg-white/[0.1] text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
