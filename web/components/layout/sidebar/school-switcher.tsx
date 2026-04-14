"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import { School } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/appStore";
import Link from "next/link";

export function SchoolSwitcher({ schools }: { schools: School[] }) {
  const router = useRouter();
  const { selectedSchool, setSelectedSchool } = useAppStore();
  const { isMobile } = useSidebar();

  const schoolTypeLabel =
    selectedSchool?.type === "private"
      ? "Privado"
      : selectedSchool?.type === "public"
        ? "Público"
        : selectedSchool?.type === "charter"
          ? "De convenio"
          : "";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* {activeTeam.logo_image ?? ""} */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {selectedSchool?.name}
                </span>
                <span className="truncate text-xs">{schoolTypeLabel}</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border bg-popover text-popover-foreground [--accent:#2a5a94] [--accent-foreground:#f7fbff] [--border:rgb(147_178_214_/_52%)] [--muted-foreground:#c9d9ec] [--popover:#183552] [--popover-foreground:#eaf2fb]"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Escuelas
            </DropdownMenuLabel>
            {schools.map((school, index) => (
              <DropdownMenuItem
                key={school.id}
                onClick={() => {
                  setSelectedSchool(school);
                  router.push(`/${school.id}/inicio`);
                }}
                className="gap-2 p-2 focus:bg-accent/70 focus:text-accent-foreground"
              >
                <div className="flex size-6 items-center justify-center rounded-md border border-border bg-accent/35">
                  {/* {team.logo} */}
                </div>
                {school.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <Link href={"/inicio"}>
              <DropdownMenuItem className="gap-2 p-2 focus:bg-accent/70 focus:text-accent-foreground">
                <div className="flex size-6 items-center justify-center rounded-md border border-border bg-transparent">
                  <PlusIcon className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Unirse o Crear</div>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
