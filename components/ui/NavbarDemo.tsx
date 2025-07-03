"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

function WishStoxLogo() {
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center animate-pulse-glow">
      <span className="text-white font-bold">WS</span>
    </div>
  );
}

export function NavbarDemo() {
  const navItems = [
    { name: "Features", link: "#features" },
    { name: "About", link: "#about" },
    { name: "Reviews", link: "#reviews" },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full bg-black bg-opacity-90">
      <Navbar className="!bg-transparent">
        <NavBody className="!bg-transparent">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-2">
            <WishStoxLogo />
            <span className="ml-2 text-xl font-bold text-white tracking-wide">WishStox</span>
          </div>
          {/* Center: Nav Items */}
          <div className="flex-1 flex justify-center">
            <NavItems items={navItems} className="space-x-8 text-white" />
          </div>
          {/* Right: Join Waiting List Button */}
          <div className="flex items-center">
            <NavbarButton variant="primary" className="ml-4" href="#join">
              Join Waiting List
            </NavbarButton>
          </div>
        </NavBody>
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className="!bg-black !bg-opacity-80 !border-b-2 !border-green-500">
            <div className="flex items-center gap-2">
              <WishStoxLogo />
              <span className="ml-2 text-xl font-bold text-white tracking-wide">WishStox</span>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            className="!bg-black !bg-opacity-90 !border-t-2 !border-green-500"
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-white text-lg py-2 px-4 rounded hover:bg-green-700/20 transition"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full bg-black text-green-500 border-green-500 border transition-shadow duration-300 
                  hover:shadow-[0_0_16px_4px_rgba(34,197,94,0.7)] focus:shadow-[0_0_16px_4px_rgba(34,197,94,0.7)]
                  hover:[box-shadow:inset_0_0_16px_4px_rgba(34,197,94,0.4),0_0_16px_4px_rgba(34,197,94,0.7)]
                  focus:[box-shadow:inset_0_0_16px_4px_rgba(34,197,94,0.4),0_0_16px_4px_rgba(34,197,94,0.7)]"
              >
                Join Waiting List
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
} 