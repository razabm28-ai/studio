"use client";

import Link from 'next/link';
import { Smartphone, Menu, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode, onClick?: () => void }) => (
  <Link 
    href={href} 
    onClick={onClick}
    className="transition-colors hover:text-primary text-muted-foreground font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode, onClick?: () => void }) => (
  <Link
    href={href}
    onClick={onClick}
    className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
  >
    {children}
  </Link>
);

export default function Header() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks = [
    { href: '/', label: 'Browse' },
    { href: '/messages', label: 'Messages' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Smartphone className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg inline-block">PhoneSwap</span>
        </Link>

        {isClient && !isMobile && (
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
            ))}
          </nav>
        )}
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isClient && (
            isMobile ? (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs">
                  <Link href="/" onClick={() => setOpen(false)} className="mr-6 flex items-center space-x-2 mb-8">
                    <Smartphone className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">PhoneSwap</span>
                  </Link>
                  <div className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <MobileNavLink key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</MobileNavLink>
                    ))}
                    <div className="pt-4">
                       <Button asChild className="w-full">
                          <Link href="/create-listing" onClick={() => setOpen(false)}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Sell Phone
                          </Link>
                        </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Button asChild>
                <Link href="/create-listing">
                  <PlusCircle className="mr-2 h-4 w-4" /> Sell Phone
                </Link>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
