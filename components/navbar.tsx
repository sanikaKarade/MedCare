"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Menu,
  Heart,
  User,
  ShoppingCart,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/doctors/register", label: "Register as Doctor" },
  { href: "/medicines", label: "Shop Now" }, 
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems } = useCart()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in-down">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary transition-transform duration-300 group-hover:scale-110">
            <Heart className="h-5 w-5 text-primary-foreground transition-transform group-hover:scale-110" />
          </div>
          <span className="text-xl font-bold text-foreground">
            MedCare<span className="text-primary">Connect</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground ${
                isActive(link.href)
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
        <Link href="/cart">
  <Button
    variant="ghost"
    size="icon"
    className="relative"
  >
    <ShoppingCart className="h-5 w-5" />

    {totalItems > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
        {totalItems}
      </span>
    )}
  </Button>
</Link>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" className="transition-all hover:scale-105">
                Log in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="transition-all hover:scale-105 hover:shadow-md">
                Get Started
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 transition-all hover:scale-105">
                  <span>Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">

<DropdownMenuItem asChild>
  <Link href="/dashboard">
    Dashboard
  </Link>
</DropdownMenuItem>

<DropdownMenuItem asChild>
  <Link href="/doctors/appointments">
    Doctor Dashboard
  </Link>
</DropdownMenuItem>

<DropdownMenuSeparator />

<DropdownMenuItem>
  <UserButton />
</DropdownMenuItem>

</DropdownMenuContent>
            </DropdownMenu>
          </Show>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              MedCare Connect
            </SheetTitle>
            <nav className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary ${
                    isActive(link.href)
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 border-t pt-4">
              <Link
  href="/cart"
  onClick={() => setIsOpen(false)}
  className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary"
>
  <div className="flex items-center gap-2">
    <ShoppingCart className="h-4 w-4" />
    Cart
  </div>

  <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">
    0
  </span>
</Link>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-md px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary"
                    >
                      Log in
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="mt-2 w-full">Get Started</Button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary"
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <div className="px-4 py-3">
                    <UserButton />
                  </div>
                </Show>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}