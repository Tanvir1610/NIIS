'use client';

import React from "react"
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

interface OriginButtonProps {
  children: React.ReactNode;
  href: string;
}

export function OriginButton({
  children,
  href,
}: OriginButtonProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={buttonRef}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 rounded-md pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: isHovered ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgb(79, 70, 229, 0.3), transparent 100%)` : 'transparent',
        }}
      />
      <Link href={href}>
        <button className="relative px-6 py-2 font-semibold text-white bg-blue-700 rounded-md hover:bg-blue-800 transition-colors overflow-hidden z-10">
          {children}
        </button>
      </Link>
    </div>
  );
}
