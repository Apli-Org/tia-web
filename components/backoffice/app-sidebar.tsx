"use client";

import { ChevronDown, ChevronUp, Loader2, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { logoutAdmin, type CurrentAdmin } from "@/actions/admin/auth.action";
import {
  getActiveNavItem,
  NAV_ITEMS,
  NAV_SECTIONS,
  type SectionKey,
} from "@/components/backoffice/nav-items";
import { Logo } from "@/components/home/logo";
import { SPRING_TRANSITION } from "@/components/home/motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  admin: CurrentAdmin | null;
};

function getInitials(name: string | null, email: string): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return email.slice(0, 2).toUpperCase();
}

export function AppSidebar({ admin }: AppSidebarProps) {
  const pathname = usePathname();
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const activeUrl = getActiveNavItem(pathname)?.url;

  // Find the active section based on current pathname
  const getActiveSection = (): SectionKey | null => {
    return getActiveNavItem(pathname)?.section || null;
  };

  const [openSection, setOpenSection] = useState<SectionKey | null>(getActiveSection);

  // Update open section when pathname changes and clear navigation state
  useEffect(() => {
    const activeSection = getActiveSection();
    if (activeSection) {
      setOpenSection(activeSection);
    }
    // Clear navigating state when we arrive at the new page
    setNavigatingTo(null);
  }, [pathname]);

  const handleSectionToggle = (sectionKey: SectionKey) => {
    setOpenSection((current) => (current === sectionKey ? null : sectionKey));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent active:bg-transparent">
              <Link href="/dashboard" className="group/brand">
                <Image
                  src="/images/TiaApp.png"
                  alt="Tia"
                  width={32}
                  height={32}
                  className="size-8 rounded-[10px] transition-[rotate,scale] duration-500 ease-tia-spring group-hover/brand:scale-[1.06] group-hover/brand:-rotate-6"
                />
                <span className="flex">
                  <Logo ink height={24} />
                </span>
                <span className="ml-auto inline-flex h-6 items-center rounded-full bg-tia-plum-800 px-2.5 text-[11px] font-bold tracking-[.04em] text-tia-violet-200">
                  Back office
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-bold tracking-[.08em] text-tia-plum-300 uppercase">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(Object.keys(NAV_SECTIONS) as SectionKey[])
                .sort((a, b) => NAV_SECTIONS[a].order - NAV_SECTIONS[b].order)
                .map((sectionKey) => {
                  const sectionItems = NAV_ITEMS.filter(
                    (item) =>
                      item.section === sectionKey &&
                      admin?.actions?.includes(item.action)
                  );
                  if (sectionItems.length === 0) return null;
                  const section = NAV_SECTIONS[sectionKey];
                  const SectionIcon = section.icon;
                  const isOpen = openSection === sectionKey;
                  const hasActiveItem = sectionItems.some((item) => item.url === activeUrl);
                  return (
                    <Collapsible
                      key={sectionKey}
                      open={isOpen}
                      onOpenChange={() => handleSectionToggle(sectionKey)}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={section.label}
                            className={cn(
                              "h-9 rounded-xl text-tia-plum-200 transition-colors duration-200 hover:text-tia-plum-50",
                              hasActiveItem && "font-bold text-tia-plum-50",
                              hasActiveItem && !isOpen && "bg-sidebar-accent"
                            )}
                          >
                            <SectionIcon className={cn("transition-colors duration-200", hasActiveItem && "text-tia-violet-300")} />
                            <span className="transition-colors duration-200">{section.label}</span>
                            <ChevronDown className="ml-auto size-4 transition-transform duration-300 ease-out group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                          <SidebarMenuSub className="mr-0 pr-0">
                            {sectionItems.map((item, index) => {
                              const isActive = item.url === activeUrl;
                              return (
                                <SidebarMenuSubItem
                                  key={item.title}
                                  className="relative animate-in fade-in-0 slide-in-from-left-2"
                                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
                                >
                                  {isActive && (
                                    <motion.span
                                      layoutId="sidebar-active-item"
                                      transition={SPRING_TRANSITION}
                                      className="absolute inset-0 rounded-[10px] bg-tia-violet-500 shadow-[0_8px_20px_-10px] shadow-tia-violet-500"
                                    />
                                  )}
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={isActive}
                                    className="relative h-8 rounded-[10px] text-tia-plum-200 hover:bg-tia-plum-800 hover:text-tia-plum-50 data-[active=true]:bg-transparent data-[active=true]:text-tia-plum-50 [&>svg]:text-current"
                                  >
                                    <Link
                                      href={item.url}
                                      onClick={() => {
                                        if (pathname !== item.url) {
                                          setNavigatingTo(item.url);
                                        }
                                      }}
                                      className={cn(
                                        "transition-[translate,opacity] duration-300 ease-tia-spring hover:translate-x-1",
                                        isActive && "font-bold",
                                        navigatingTo === item.url && "opacity-70"
                                      )}
                                    >
                                      {navigatingTo === item.url ? (
                                        <Loader2 className="size-4 animate-spin" />
                                      ) : (
                                        <item.icon className="size-4" />
                                      )}
                                      <span>{item.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="rounded-2xl data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8 rounded-[10px]">
                    <AvatarFallback className="rounded-[10px] bg-tia-violet-500 text-[12px] font-bold text-tia-plum-50">
                      {admin ? getInitials(admin.full_name, admin.email) : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-bold text-tia-plum-50">
                      {admin?.full_name || "Admin"}
                    </span>
                    <span className="truncate text-xs text-tia-plum-300">
                      {admin?.email || "Non connecté"}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 size-4" />
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => logoutAdmin()}
                >
                  <LogOut className="mr-2 size-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
