"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppStore } from "@/features/shared/presentation/store/app-store";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/presentation/actions/auth/logout-user-action";
import {
  ChevronsUpDownIcon,
  SparklesIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react";

export function NavUser() {
  const router = useRouter();
  const { user, clearUser } = useAppStore();
  const { isMobile } = useSidebar();

  const handleGoToProfile = () => {
    router.push("/inicio/perfil");
  };

  const handleLogout = async () => {
    clearUser();
    await logout();
    router.push("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-xl border border-[#2E567E]/60 bg-[#163554] text-[#EAF2FF] data-[state=open]:bg-[#21466C] data-[state=open]:text-white"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={"/avatars/shadcn.jpg"}
                  alt={user?.firstName}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.firstName}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border bg-popover text-popover-foreground [--accent:#2a5a94] [--accent-foreground:#f7fbff] [--border:rgb(147_178_214_/_52%)] [--muted-foreground:#c9d9ec] [--popover:#183552] [--popover-foreground:#eaf2fb]"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={"/avatars/shadcn.jpg"}
                      alt={user?.firstName}
                    />
                  <AvatarFallback className="rounded-lg">U</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.firstName}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-accent/70 focus:text-accent-foreground">
                <SparklesIcon />
                Soon
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={handleGoToProfile}
                className="focus:bg-accent/70 focus:text-accent-foreground"
              >
                <BadgeCheckIcon />
                Cuenta
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-accent/70 focus:text-accent-foreground">
                <CreditCardIcon />
                Soon
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-accent/70 focus:text-accent-foreground">
                <BellIcon />
                Notificaciones
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="focus:bg-accent/70 focus:text-accent-foreground"
            >
              <LogOutIcon />
              Cerrar Sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
