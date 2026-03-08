'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveSelector } from '@/components/ui/interactive-selector';

export function MarketingSection() {
  return (
    <section
      id="marketing"
      className="relative w-full bg-[#0a0a0a] py-12 md:py-16 px-6 md:px-16 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 32 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl mx-auto"
      >
        <InteractiveSelector />
      </motion.div>
    </section>
  );
}

