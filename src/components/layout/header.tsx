"use client";

import Link from 'next/link';
import { Smartphone, Menu, PlusCircle, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


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
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const navLinks = [
    { href: '/', label: 'Browse' },
    { href: '/messages', label: 'Messages' },
  ];

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'U';
    return email.charAt(0).toUpperCase();
  };

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
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isClient && !isUserLoading && (
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
                    <div className="pt-4 border-t mt-4">
                       {user ? (
                         <>
                            <MobileNavLink href="/create-listing" onClick={() => setOpen(false)}>Sell Phone</MobileNavLink>
                            <button
                              onClick={() => { handleLogout(); setOpen(false); }}
                              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent"
                            >
                              Logout
                            </button>
                         </>
                       ) : (
                         <>
                            <MobileNavLink href="/login" onClick={() => setOpen(false)}>Login</MobileNavLink>
                            <MobileNavLink href="/register" onClick={() => setOpen(false)}>Register</MobileNavLink>
                         </>
                       )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <div className="flex items-center space-x-4">
                 <Button asChild>
                  <Link href="/create-listing">
                    <PlusCircle className="mr-2 h-4 w-4" /> Sell Phone
                  </Link>
                </Button>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="rounded-full">
                        <Avatar>
                          <AvatarImage src={user.photoURL || ''} />
                          <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                       <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                       <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="space-x-2">
                    <Button variant="ghost" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
}
