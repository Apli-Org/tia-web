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
import { useState } from "react";
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
  if (/iPhone|iPad|iPod/i.test(ua)) return STORE_LINKS.appStore;
  if (/Android/i.test(ua)) return STORE_LINKS.googlePlay;
  return null;
}

export function Header({ content }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

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
                alt="TIA Logo"
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="bg-primary text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all duration-300 cursor-pointer"
                  onClick={(e) => {
                    const link = getStoreLink();
                    if (link) {
                      e.preventDefault();
                      window.open(link, "_blank", "noopener,noreferrer");
                    }
                  }}
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
                  <ChevronDown className="w-4 h-4 hidden md:block" />
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
                    <Image
                      src="/images/logo/app-store-badge.svg"
                      alt="App Store"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
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
                    <Image
                      src="/images/logo/google-play-badge.svg"
                      alt="Google Play"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <div>
                      <div className="text-sm font-medium">Google Play</div>
                      <div className="text-xs text-muted-foreground">Pour Android</div>
                    </div>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
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
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">{ctaButton.text}</p>
                    <a
                      href={STORE_LINKS.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <Image
                        src="/images/logo/app-store-badge.svg"
                        alt="App Store"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <div>
                        <div className="text-sm font-medium">App Store</div>
                        <div className="text-xs text-muted-foreground">Pour iPhone & iPad</div>
                      </div>
                    </a>
                    <a
                      href={STORE_LINKS.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <Image
                        src="/images/logo/google-play-badge.svg"
                        alt="Google Play"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <div>
                        <div className="text-sm font-medium">Google Play</div>
                        <div className="text-xs text-muted-foreground">Pour Android</div>
                      </div>
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
