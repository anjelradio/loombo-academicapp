"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useAppStore } from "@/lib/store/appStore";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { navigationByRole } from "./nav-config";

export function NavMain() {
  const selectedSchool = useAppStore((s) => s.selectedSchool);
  const storePersist = (useAppStore as typeof useAppStore & {
    persist?: {
      hasHydrated: () => boolean;
      onFinishHydration: (callback: () => void) => () => void;
    };
  }).persist;
  const [isHydrated, setIsHydrated] = React.useState(
    storePersist ? storePersist.hasHydrated() : true,
  );

  React.useEffect(() => {
    if (!storePersist) {
      setIsHydrated(true);
      return;
    }

    setIsHydrated(storePersist.hasHydrated());
    const unsubscribe = storePersist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    return unsubscribe;
  }, [storePersist]);

  if (!isHydrated) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton disabled>
              <span>Cargando navegación...</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  if (!selectedSchool) return null;
  const schoolId = selectedSchool.id;

  const role = selectedSchool?.role;
  if (!role) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton disabled>
              <span>Esta escuela no tiene rol asignado.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  const items = [...(navigationByRole[role] || [])];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon}
                  <span>{item.title}</span>
                  <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={`/${schoolId}/${subItem.url}`.replace(/\/{2,}/g, "/")}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
