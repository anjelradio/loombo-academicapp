"use client";

import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";

export default function ViewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const backgroundImage =
    pathname === "/inicio/perfil"
      ? "url(/images/bg-profile.jpg)"
      : "url(/images/home-bg-image.jpg)";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage,
          backgroundColor: "#1a1d23",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(10,31,61,0.96)_0%,rgba(18,47,88,0.9)_50%,rgba(21,68,129,0.82)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,rgba(127,176,255,0.4),transparent_32%),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:auto,42px_42px,42px_42px] bg-[position:0_0,0_0,0_0]" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex flex-1">{children}</main>
      </div>
    </div>
  );
}
