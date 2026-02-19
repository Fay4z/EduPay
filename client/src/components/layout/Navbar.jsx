"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const MENU_ITEMS = [{ label: "Home", href: "/" }];

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
  const { userEmail, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setUserEmail(null);
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-background sticky top-0 isolate z-50 border-b py-3.5 md:py-4">
        <div className="relative container m-auto flex flex-col justify-between gap-4 px-6 md:flex-row md:items-center md:gap-6">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center">
              <h1 className="font-bold">EduPay</h1>
            </NavLink>

            <Button
              variant="ghost"
              className="flex size-9 items-center justify-center md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Desktop */}
          <div className="hidden w-full flex-row justify-end gap-5 md:flex items-center">
            <NavMenuItems />

            {!userEmail ? (
              <>
                <NavLink to="/login">
                  <Button variant="ghost">Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button>Register School</Button>
                </NavLink>
              </>
            ) : (
              <>
                <span className="text-sm font-medium">{userEmail}</span>
                <Button variant="destructive" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile */}
          {isMenuOpen && (
            <div className="flex w-full flex-col gap-4 pb-2.5 md:hidden">
              <NavMenuItems />

              {!userEmail ? (
                <>
                  <NavLink to="/login">
                    <Button className="w-full" variant="ghost">
                      Login
                    </Button>
                  </NavLink>
                  <NavLink to="/signup">
                    <Button className="w-full">Signup</Button>
                  </NavLink>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium text-center">
                    {userEmail}
                  </span>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
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
