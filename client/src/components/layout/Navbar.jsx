"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Login", href: "/login" },
  { label: "Signup", href: "/signup" },
];

const NavMenuItems = ({ className }) => (
  <div className={`flex flex-col gap-1 md:flex-row ${className ?? ""}`}>
    {MENU_ITEMS.map(({ label, href }) => (
      <NavLink key={label} to={href}>
        <Button variant="ghost" className="w-full md:w-auto">
          {label}
        </Button>
      </NavLink>
    ))}
  </div>
);

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div>
      <nav className="bg-background sticky top-0 isolate z-50 border-b py-3.5 md:py-4">
        <div className="relative container m-auto flex flex-col justify-between gap-4 px-6 md:flex-row md:items-center md:gap-6">
          <div className="flex items-center justify-between">
            <NavLink href="/" className="flex items-center">
              <h1 className=" font-bold">EduPay</h1>
            </NavLink>

            <Button
              variant="ghost"
              className="flex size-9 items-center justify-center md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden w-full flex-row justify-end gap-5 md:flex">
            <NavMenuItems />
            <NavLink to="#contact-form">
              <Button>Join now</Button>
            </NavLink>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="flex w-full flex-col justify-end gap-5 pb-2.5 md:hidden">
              <NavMenuItems />
              <NavLink to="#contact-form">
                <Button className="w-full">Join now</Button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
