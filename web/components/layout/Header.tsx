"use client";
import { LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { useAppStore } from "@/features/shared/presentation/store/app-store";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/presentation/actions/auth/logout-user-action";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const { user, clearUser } = useAppStore();

  const handleGoToProfile = () => {
    router.push("/inicio/perfil");
  };

  const handleLogout = async () => {
    clearUser();
    await logout();
    router.push("/");
  };

  return (
    <header className="w-full relative z-10">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-5 md:px-0 py-8  ">
        {/* Logo - Now visible on mobile */}
        <div className="flex items-center gap-3">
          <Image
            src="/logos/loombo-white.png"
            alt="LoomBo logo"
            width={55}
            height={55}
            priority
          />
          <h1 className="text-white text-3xl md:text-5xl font-bold">LoomBo</h1>
        </div>

        {/* User section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-sm font-medium text-white">
              {user?.firstName} {""} {user?.lastName}
            </span>
            <button
              type="button"
              onClick={handleGoToProfile}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm transition hover:bg-white/30"
              aria-label="Ir a perfil"
            >
              <User className="h-5 w-5 text-white" />
            </button>
          </div>
          <Button
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white hover:border-white/40 transition-all backdrop-blur-sm md:px-4 px-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Cerrar sesión</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
