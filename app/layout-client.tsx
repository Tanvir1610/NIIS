'use client';

import React from "react"

import { useScrollToTop } from '@/hooks/useScrollToTop';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  useScrollToTop();
  return <>{children}</>;
}
