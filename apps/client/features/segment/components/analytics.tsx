"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { analytics } from "@/segment";

export default function SegmentAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    analytics.page();
  }, [pathname, searchParams]);

  return null;
}
