"use client";

import {
  Activity,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Headphones,
  Layout,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Megaphone,
  Settings,
  Shield,
  Tag,
  Ticket,
  Users,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { logoutAdmin, type CurrentAdmin } from "@/actions/admin/auth.action";
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

type SectionKey = 'overview' | 'management' | 'moderation' | 'finance' | 'communication' | 'content';

type NavItem = {
  title: string;
  url: string;
  icon: typeof LayoutDashboard;
  action: string;
  section: SectionKey;
};

const sections: Record<SectionKey, { label: string; icon: typeof LayoutDashboard; order: number }> = {
  overview: { label: "Vue d'ensemble", icon: LayoutDashboard, order: 1 },
  management: { label: "Gestion", icon: Users, order: 2 },
  moderation: { label: "Modération", icon: Shield, order: 3 },
  finance: { label: "Finance", icon: CreditCard, order: 4 },
  communication: { label: "Communication", icon: Mail, order: 5 },
  content: { label: "Contenu & Support", icon: Layout, order: 6 },
};

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    action: "view_dashboard",
    section: "overview",
  },
  {
    title: "Activité",
    url: "/activity",
    icon: Activity,
    action: "view_dashboard",
    section: "overview",
  },
  {
    title: "Utilisateurs",
    url: "/users",
    icon: Users,
    action: "view_users",
    section: "management",
  },
  {
    title: "Personnel",
    url: "/staff",
    icon: UsersRound,
    action: "view_staff",
    section: "management",
  },
  {
    title: "Modération",
    url: "/moderation",
    icon: Shield,
    action: "view_reports",
    section: "moderation",
  },
  {
    title: "Tarification",
    url: "/pricing",
    icon: Tag,
    action: "view_pricing",
    section: "finance",
  },
  {
    title: "Abonnements",
    url: "/pricing/subscriptions",
    icon: CreditCard,
    action: "view_pricing",
    section: "finance",
  },
  {
    title: "Codes Promo",
    url: "/promo-codes",
    icon: Ticket,
    action: "manage_promo_codes",
    section: "finance",
  },
  {
    title: "Newsletter",
    url: "/newsletter",
    icon: Mail,
    action: "send_newsletter",
    section: "communication",
  },
  {
    title: "Publicités",
    url: "/advertisements",
    icon: Megaphone,
    action: "view_advertisements",
    section: "communication",
  },
  {
    title: "Landing Page",
    url: "/landing",
    icon: Layout,
    action: "manage_landing_page",
    section: "content",
  },
  {
    title: "Support",
    url: "/support",
    icon: Headphones,
    action: "view_tickets",
    section: "content",
  },
];

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

  // Find the active section based on current pathname
  const getActiveSection = (): SectionKey | null => {
    const activeItem = navItems.find(
      (item) =>
        pathname === item.url || pathname.startsWith(item.url + "/")
    );
    return activeItem?.section || null;
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
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <Image
                  src="/images/TiaApp.png"
                  alt="TIA Logo"
                  width={32}
                  height={32}
                  className="size-8 rounded-lg"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">TIA</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Back Office
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {(Object.keys(sections) as SectionKey[])
                .sort((a, b) => sections[a].order - sections[b].order)
                .map((sectionKey) => {
                  const sectionItems = navItems.filter(
                    (item) =>
                      item.section === sectionKey &&
                      admin?.actions?.includes(item.action)
                  );
                  if (sectionItems.length === 0) return null;
                  const section = sections[sectionKey];
                  const SectionIcon = section.icon;
                  const isOpen = openSection === sectionKey;
                  const hasActiveItem = sectionItems.some(
                    (item) =>
                      pathname === item.url ||
                      pathname.startsWith(item.url + "/")
                  );
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
                            className={`${hasActiveItem ? "font-semibold text-foreground" : ""} ${hasActiveItem && !isOpen ? "bg-sidebar-accent/50" : ""}`}
                          >
                            <SectionIcon className="transition-colors duration-200" />
                            <span className="transition-colors duration-200">{section.label}</span>
                            <ChevronDown className="ml-auto size-4 transition-transform duration-300 ease-out group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                          <SidebarMenuSub className="transition-all duration-300">
                            {sectionItems.map((item, index) => (
                              <SidebarMenuSubItem
                                key={item.title}
                                className="animate-in fade-in-0 slide-in-from-left-2"
                                style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
                              >
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={
                                    pathname === item.url ||
                                    pathname.startsWith(item.url + "/")
                                  }
                                >
                                  <Link
                                    href={item.url}
                                    onClick={() => {
                                      if (pathname !== item.url) {
                                        setNavigatingTo(item.url);
                                      }
                                    }}
                                    className={`transition-all duration-200 hover:translate-x-1 ${
                                      pathname === item.url || pathname.startsWith(item.url + "/")
                                        ? "font-bold text-foreground"
                                        : ""
                                    } ${navigatingTo === item.url ? "opacity-70" : ""}`}
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
                            ))}
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {admin ? getInitials(admin.full_name, admin.email) : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {admin?.full_name || "Admin"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {admin?.email || "Non connecté"}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
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
