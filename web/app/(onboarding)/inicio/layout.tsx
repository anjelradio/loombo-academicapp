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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage,
          backgroundColor: "#1a1d23",
        }}
      />
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-[#0A1F3D]/90"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
