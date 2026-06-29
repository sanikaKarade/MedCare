"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs"

import {
  Heart,
  Menu,
  User,
  ShoppingCart,
  ChevronDown,
  Stethoscope,
  Pill,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useCart } from "@/contexts/cart-context"

const navigation = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/services",
    label: "Services",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
]

export function Navbar() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  const { totalItems } = useCart()

  const isHome = pathname === "/"

  const isServices =
    pathname.startsWith("/services")

  const isDoctors =
    pathname === "/doctors"

  const isDoctorRegister =
    pathname === "/doctors/register"

  const isShop =
    pathname.startsWith("/medicines") ||
    pathname.startsWith("/cart")

  const isAbout =
    pathname.startsWith("/about")

  const isContact =
    pathname.startsWith("/contact")

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 transition hover:scale-105">
            <Heart className="h-6 w-6 text-white" />
          </div>

          <div>

            <h2 className="text-2xl font-bold tracking-tight">
              MedCare
              <span className="text-blue-600">
                Connect
              </span>
            </h2>

          </div>
        </Link>

        {/* ========================= */}
{/* Desktop Navigation */}
{/* ========================= */}

<nav className="hidden items-center gap-2 lg:flex">

{/* Home */}

<Link
  href="/"
  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isHome
      ? "bg-blue-600 text-white shadow"
      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
  }`}
>
  Home
</Link>

{/* Services */}

<Link
  href="/services"
  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isServices
      ? "bg-blue-600 text-white shadow"
      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
  }`}
>
  Services
</Link>

{/* Doctors Dropdown */}

<DropdownMenu>

  <DropdownMenuTrigger asChild>

    <Button
      variant="ghost"
      className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium ${
        isDoctors || isDoctorRegister
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      Doctors
      <ChevronDown className="h-4 w-4" />
    </Button>

  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="center"
    className="w-56 rounded-xl"
  >

    <DropdownMenuItem asChild>

      <Link
        href="/doctors"
        className="flex items-center gap-3"
      >
        <Stethoscope className="h-4 w-4 text-blue-600" />
        Find Doctors
      </Link>

    </DropdownMenuItem>

    <DropdownMenuItem asChild>

      <Link
        href="/doctors/register"
        className="flex items-center gap-3"
      >
        <User className="h-4 w-4 text-blue-600" />
        Register as Doctor
      </Link>

    </DropdownMenuItem>

  </DropdownMenuContent>

</DropdownMenu>

{/* Pharmacy Dropdown */}

<DropdownMenu>

  <DropdownMenuTrigger asChild>

    <Button
      variant="ghost"
      className={`flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium ${
        isShop
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >
      Pharmacy
      <ChevronDown className="h-4 w-4" />
    </Button>

  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="center"
    className="w-56 rounded-xl"
  >

    <DropdownMenuItem asChild>

      <Link
        href="/medicines"
        className="flex items-center gap-3"
      >
        <Pill className="h-4 w-4 text-blue-600" />
        Medicines
      </Link>

    </DropdownMenuItem>

    <DropdownMenuItem asChild>

      <Link
        href="/cart"
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">

          <ShoppingCart className="h-4 w-4 text-blue-600" />

          Cart

        </div>

        {totalItems > 0 && (
          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
            {totalItems}
          </span>
        )}

      </Link>

    </DropdownMenuItem>

  </DropdownMenuContent>

</DropdownMenu>

{/* About */}

<Link
  href="/about"
  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isAbout
      ? "bg-blue-600 text-white shadow"
      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
  }`}
>
  About
</Link>

{/* Contact */}

<Link
  href="/contact"
  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isContact
      ? "bg-blue-600 text-white shadow"
      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
  }`}
>
  Contact
</Link>

</nav>

<div className="hidden items-center gap-3 lg:flex">

{/* Cart */}

<Link href="/cart">

  <Button
    variant="ghost"
    size="icon"
    className="relative rounded-xl hover:bg-blue-50"
  >
    <ShoppingCart className="h-5 w-5" />

    {totalItems > 0 && (

      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">

        {totalItems}

      </span>

    )}

  </Button>

</Link>

{/* Authentication */}

<Show when="signed-out">

  <SignInButton mode="modal">

    <Button
      variant="ghost"
      className="rounded-xl"
    >
      Login
    </Button>

  </SignInButton>

  <SignUpButton mode="modal">

    <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">
      Get Started
    </Button>

  </SignUpButton>

</Show>

<Show when="signed-in">

  <DropdownMenu>

    <DropdownMenuTrigger asChild>

      <Button
        variant="ghost"
        className="rounded-xl"
      >
        My Account
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>

    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      className="w-56 rounded-xl"
    >

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

{/* ========================= */}
{/* Mobile Menu */}
{/* ========================= */}

<Sheet
  open={isOpen}
  onOpenChange={setIsOpen}
>
  <SheetTrigger asChild>

    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
    >
      <Menu className="h-6 w-6" />
    </Button>

  </SheetTrigger>

  <SheetContent
    side="right"
    className="w-[320px]"
  >

    <SheetTitle className="mb-8 flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
        <Heart className="h-5 w-5 text-white" />
      </div>

      <div>

        <h2 className="text-lg font-bold">
          MedCare
          <span className="text-blue-600">
            Connect
          </span>
        </h2>

      </div>

    </SheetTitle>

    <div className="space-y-2">

      <Link
        href="/"
        onClick={() => setIsOpen(false)}
        className={`block rounded-xl px-4 py-3 font-medium transition ${
          isHome
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-50"
        }`}
      >
        🏠 Home
      </Link>

      <Link
        href="/services"
        onClick={() => setIsOpen(false)}
        className={`block rounded-xl px-4 py-3 font-medium transition ${
          isServices
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-50"
        }`}
      >
        🩺 Services
      </Link>

      <Link
        href="/doctors"
        onClick={() => setIsOpen(false)}
        className={`block rounded-xl px-4 py-3 font-medium transition ${
          isDoctors
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-50"
        }`}
      >
        👨‍⚕️ Find Doctors
      </Link>

      <Link
        href="/doctors/register"
        onClick={() => setIsOpen(false)}
        className={`block rounded-xl px-4 py-3 font-medium transition ${
          isDoctorRegister
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-50"
        }`}
      >
        📝 Register as Doctor
      </Link>

      <Link
        href="/medicines"
        onClick={() => setIsOpen(false)}
        className={`block rounded-xl px-4 py-3 font-medium transition ${
          pathname.startsWith("/medicines")
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-50"
        }`}
      >
        💊 Pharmacy
      </Link>

      <Link
        href="/about"
        onClick={() => setIsOpen(false)}
        className={`block rounded-xl px-4 py-3 font-medium transition ${
          isAbout
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-50"
        }`}
      >
        ℹ️ About
      </Link>

      <Link
        href="/contact"
        onClick={() => setIsOpen(false)}
        className={`block rounded-xl px-4 py-3 font-medium transition ${
          isContact
            ? "bg-blue-600 text-white"
            : "hover:bg-blue-50"
        }`}
      >
        📞 Contact
      </Link>

      <div className="my-4 border-t" />

      <Link
        href="/cart"
        onClick={() => setIsOpen(false)}
        className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-blue-50"
      >

        <div className="flex items-center gap-3">

          <ShoppingCart className="h-5 w-5 text-blue-600" />

          <span className="font-medium">
            Shopping Cart
          </span>

        </div>

        {totalItems > 0 && (

          <span className="rounded-full bg-blue-600 px-2 py-1 text-xs text-white">

            {totalItems}

          </span>

        )}

      </Link>

      <div className="my-4 border-t" />

      <Show when="signed-out">

        <SignInButton mode="modal">

          <Button
            variant="outline"
            className="mb-3 w-full rounded-xl"
          >
            Login
          </Button>

        </SignInButton>

        <SignUpButton mode="modal">

          <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>

        </SignUpButton>

      </Show>

      <Show when="signed-in">

        <Link
          href="/dashboard"
          onClick={() => setIsOpen(false)}
        >
          <Button
            variant="outline"
            className="mb-3 w-full rounded-xl"
          >
            Dashboard
          </Button>
        </Link>

        <Link
          href="/doctors/appointments"
          onClick={() => setIsOpen(false)}
        >
          <Button
            variant="outline"
            className="mb-3 w-full rounded-xl"
          >
            Doctor Dashboard
          </Button>
        </Link>

        <div className="mt-4 flex justify-center">
          <UserButton />
        </div>

      </Show>

    </div>

  </SheetContent>

</Sheet>

      </div>

    </header>
  )
}