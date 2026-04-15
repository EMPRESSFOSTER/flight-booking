"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plane, Menu, X, User, Globe } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-accent p-2 rounded-xl text-white shadow-lg shadow-accent/20 transition-transform group-hover:rotate-12">
              <Plane size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Sky<span className="text-accent">Way</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-sm font-semibold hover:text-accent transition-colors relative group">
              Flights
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            <Link href="#" className="text-sm font-semibold hover:text-accent transition-colors relative group">
              Hotels
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            <Link href="#" className="text-sm font-semibold hover:text-accent transition-colors relative group">
              Deals
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/destinations" className="text-sm font-semibold hover:text-accent transition-colors relative group">
              Destinations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              <Globe size={20} className="text-zinc-600 dark:text-zinc-400" />
            </button>
            <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-primary/10 hover:translate-y-[-2px] active:translate-y-[0px] transition-all">
              <User size={18} />
              Sign In
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-primary dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 glass border-t border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6 transition-all duration-300 origin-top ${
          isMobileMenuOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
        }`}
      >
        <Link href="/" className="text-lg font-bold">Flights</Link>
        <Link href="#" className="text-lg font-bold">Hotels</Link>
        <Link href="#" className="text-lg font-bold">Deals</Link>
        <Link href="/destinations" className="text-lg font-bold">Destinations</Link>
        <hr className="border-zinc-200 dark:border-zinc-800" />
        <button className="flex items-center justify-center gap-2 bg-primary text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-primary/20">
          <User size={20} />
          Sign In
        </button>
      </div>
    </nav>
  );
}
