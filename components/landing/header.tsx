"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { HeaderContent } from "@/lib/types/landing.types";

// Default content
const defaultContent = {
  logo: "/images/TiaLogo.png",
  navItems: [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "/inscription", label: "Pré-inscription" },
  ],
  ctaButton: {
    text: "Télécharger",
    href: "#pre-inscription",
  },
};

interface HeaderProps {
  content?: HeaderContent | null;
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
  const isCtaExternal = ctaButton.href.startsWith("http://") || ctaButton.href.startsWith("https://");

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
            <a
              href={isCtaExternal ? ctaButton.href : (isLandingPage ? ctaButton.href : `/${ctaButton.href}`)}
              {...(isCtaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="transition-transform hover:scale-105 duration-300"
            >
              <button type="button" className="bg-primary text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-all duration-300 cursor-pointer">
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
              </button>
            </a>

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
                  <Button asChild className="mt-4">
                    <a
                      href={isCtaExternal ? ctaButton.href : (isLandingPage ? ctaButton.href : `/${ctaButton.href}`)}
                      {...(isCtaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      onClick={() => setOpen(false)}
                    >
                      {ctaButton.text}
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
