// components/PageLoader.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useLoadingStore } from "@/lib/store/loadingStore";

export default function PageLoader() {
  const pathname = usePathname();
  const { routeLoading, apiLoading, setRouteLoading } = useLoadingStore();

  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => setRouteLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname, setRouteLoading]);

  const isLoading = routeLoading || apiLoading;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-[9999]">
      <div className="animate-pulse">
        <Loader2 className="animate-spin h-16 w-16 text-orange-500 drop-shadow-lg" />
      </div>
    </div>
  );
}