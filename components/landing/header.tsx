"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { HeaderContent } from "@/lib/types/landing.types";

const STORE_LINKS = {
  appStore: "https://apps.apple.com/mg/app/tia/id6758033706",
  googlePlay: "https://play.google.com/store/apps/details?id=com.rdh36.tiaapp",
};

// Default content
const defaultContent = {
  logo: "/images/TiaLogo.png",
  navItems: [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "/inscription-newsletter", label: "Newsletter" },
  ],
  ctaButton: {
    text: "Télécharger",
    href: "#newsletter",
  },
};

interface HeaderProps {
  content?: HeaderContent | null;
}

function getStoreLink(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  // iOS detection: userAgent check + iPad disguised as Mac
  if (/iPhone|iPad|iPod/i.test(ua)) return STORE_LINKS.appStore;
  if (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) return STORE_LINKS.appStore;
  if (/Android/i.test(ua)) return STORE_LINKS.googlePlay;
  return null;
}

export function Header({ content }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [storeLink, setStoreLink] = useState<string | null>(null);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  useEffect(() => {
    setStoreLink(getStoreLink());
  }, []);

  const logo = content?.logo || defaultContent.logo;
  const navItems = (content?.navItems?.length ? content.navItems : null) || defaultContent.navItems;
  const ctaButton = {
    text: content?.ctaButton?.text || defaultContent.ctaButton.text,
    href: content?.ctaButton?.href || defaultContent.ctaButton.href,
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href={isLandingPage ? "#hero" : "/"}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {logo && (
              <Image
                src={logo}
                alt="Tia Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isHttpLink = item.href.startsWith("http://") || item.href.startsWith("https://");
              const isAbsoluteLink = item.href.startsWith("/");
              const href = isHttpLink ? item.href : (isAbsoluteLink ? item.href : (isLandingPage ? item.href : `/${item.href}`));
              return (
                <a
                  key={`nav-${index}`}
                  href={href}
                  {...(isHttpLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            {/* Mobile: lien direct vers le store détecté */}
            {storeLink ? (
              <a
                href={storeLink}
                className="bg-primary text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 3H6.5C5.4 3 4.5 3.9 4.5 5V19C4.5 20.1 5.4 21 6.5 21H17.5C18.6 21 19.5 20.1 19.5 19V5C19.5 3.9 18.6 3 17.5 3ZM12 19.5C11.17 19.5 10.5 18.83 10.5 18C10.5 17.17 11.17 16.5 12 16.5C12.83 16.5 13.5 17.17 13.5 18C13.5 18.83 12.83 19.5 12 19.5ZM17 15.5H7V5.5H17V15.5Z"
                    fill="currentColor"
                  />
                </svg>
                {ctaButton.text}
              </a>
            ) : (
              /* Desktop: dropdown avec choix App Store / Google Play */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="bg-primary text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all duration-300 cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 3H6.5C5.4 3 4.5 3.9 4.5 5V19C4.5 20.1 5.4 21 6.5 21H17.5C18.6 21 19.5 20.1 19.5 19V5C19.5 3.9 18.6 3 17.5 3ZM12 19.5C11.17 19.5 10.5 18.83 10.5 18C10.5 17.17 11.17 16.5 12 16.5C12.83 16.5 13.5 17.17 13.5 18C13.5 18.83 12.83 19.5 12 19.5ZM17 15.5H7V5.5H17V15.5Z"
                        fill="currentColor"
                      />
                    </svg>
                    {ctaButton.text}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <DropdownMenuItem asChild className="cursor-pointer p-0">
                    <a
                      href={STORE_LINKS.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.56C5.55 8.08 7.13 7.16 8.82 7.14C10.1 7.12 11.32 8.01 12.11 8.01C12.89 8.01 14.37 6.94 15.92 7.1C16.57 7.13 18.39 7.36 19.56 9.07C19.47 9.13 17.49 10.26 17.51 12.66C17.54 15.52 20.05 16.45 20.08 16.46C20.05 16.53 19.67 17.84 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                      </svg>
                      <div>
                        <div className="text-sm font-medium">App Store</div>
                        <div className="text-xs text-muted-foreground">Pour iPhone & iPad</div>
                      </div>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer p-0">
                    <a
                      href={STORE_LINKS.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .61-.92zM14.5 12.707l2.55 2.55-8.47 4.81 5.92-7.36zM17.82 9.97l2.18 1.24a1 1 0 0 1 0 1.74l-2.18 1.24-2.83-2.19 2.83-2.03zM8.58 4.45l8.47 4.81-2.55 2.55-5.92-7.36z" fill="#4CAF50"/>
                        <path d="M3.61 1.814L13.793 12 8.58 4.45l-4.97-2.636z" fill="#F44336"/>
                        <path d="M3.61 22.186L13.793 12l-5.213 7.56-4.97 2.626z" fill="#FFC107"/>
                        <path d="M17.82 9.97l-2.83 2.03 2.83 2.19 2.18-1.24a1 1 0 0 0 0-1.74l-2.18-1.24z" fill="#03A9F4"/>
                        <path d="M8.58 4.45L13.793 12l-5.213-7.55z" fill="#4CAF50"/>
                      </svg>
                      <div>
                        <div className="text-sm font-medium">Google Play</div>
                        <div className="text-xs text-muted-foreground">Pour Android</div>
                      </div>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8 px-4">
                  {navItems.map((item, index) => {
                    const isHttpLink = item.href.startsWith("http://") || item.href.startsWith("https://");
                    const isAbsoluteLink = item.href.startsWith("/");
                    const href = isHttpLink ? item.href : (isAbsoluteLink ? item.href : (isLandingPage ? item.href : `/${item.href}`));
                    return (
                      <a
                        key={`mobile-nav-${index}`}
                        href={href}
                        {...(isHttpLink ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        onClick={() => setOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
