"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ActivitySquare,
  Github,
  Home,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LANDING_NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#ml" },
  { label: "Predict", href: "/predict" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isPredictPage = pathname === "/predict";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "glass-strong shadow-soft"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <ActivitySquare className="h-4 w-4 text-white" />
          </div>

          <span className="text-base font-semibold tracking-tight text-white">
            Insur<span className="text-gradient">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isPredictPage && (
          <nav className="hidden items-center gap-8 md:flex">
            {LANDING_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isPredictPage ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href="/"
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </Button>

              <Button size="sm" asChild>
                <Link
                  href="/predict"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Prediction
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/sat-06/InsurAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>

              <Button size="sm" asChild>
                <Link href="/predict">
                  Get Started
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-zinc-300 md:hidden"
          onClick={() =>
            setMobileOpen((open) => !open)
          }
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          className="glass-strong mx-3 mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden"
        >
          {isPredictPage ? (
            <>
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>

              <Link
                href="/predict"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
              >
                <Plus className="h-4 w-4" />
                New Prediction
              </Link>
            </>
          ) : (
            <>
              {LANDING_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}

              <a
                href="https://github.com/sat-06/InsurAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/5"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>

              <Button
                size="sm"
                className="mt-2"
                asChild
              >
                <Link href="/predict">
                  Get Started
                </Link>
              </Button>
            </>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}