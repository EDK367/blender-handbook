'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Star,
  Zap,
  BookOpen,
  Keyboard,
  Compass,
} from 'lucide-react';
import { SearchBar } from './SearchBar';
import { VersionBadge } from './VersionBadge';
import { useFavorites } from '@/hooks/useFavorites';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { favorites, isLoaded } = useFavorites();

  const navLinks = [
    { label: 'Atajos', href: '/shortcuts', icon: Keyboard },
    { label: 'Cheat Sheet', href: '/cheatsheet', icon: Zap },
    { label: 'Aprender', href: '/learning', icon: BookOpen },
    { label: 'Glosario', href: '/glossary', icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050509]/90 backdrop-blur-md border-b border-[#1F1F2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Custom 3D Logo Icon inspired by Blender geometry */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00E5FF] to-[#8B5CF6] p-[1.5px] shadow-[0_0_15px_rgba(0,229,255,0.3)] group-hover:shadow-[0_0_22px_rgba(0,229,255,0.5)] transition-all">
                <div className="w-full h-full bg-[#090912] rounded-[10px] flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-[#00E5FF] to-[#8B5CF6] transform rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                    BLENDER
                  </span>
                  <span className="font-mono text-xs font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-1.5 py-0.5 rounded border border-[#00E5FF]/30">
                    HANDBOOK
                  </span>
                </div>
                <div className="text-[10px] text-zinc-500 font-medium hidden sm:block">
                  Guía práctica de Blender en español
                </div>
              </div>
            </Link>
          </div>

          {/* Central Large Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-2">
            <SearchBar isHeader />
          </div>

          {/* Right Accessories: Version, Favorites, Quick Links */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden lg:flex items-center space-x-1 mr-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/30'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#11111A]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Favorites Star Badge */}
            <Link
              href="/favorites"
              title="Comandos favoritos guardados"
              className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                pathname === '/favorites'
                  ? 'bg-amber-400/10 text-amber-300 border-amber-400/30'
                  : 'bg-[#11111A] text-zinc-400 hover:text-amber-300 border-[#1F1F2E] hover:border-amber-400/30'
              }`}
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
              <span className="hidden xl:inline">Favoritos</span>
              {isLoaded && favorites.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold flex items-center justify-center border border-amber-400/40">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Version indicator */}
            <VersionBadge />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Abrir menú de navegación"
              className="lg:hidden p-2 rounded-lg bg-[#11111A] text-zinc-400 hover:text-zinc-200 border border-[#1F1F2E]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar if viewport is small */}
        <div className="md:hidden pb-3 pt-1">
          <SearchBar isHeader />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#1F1F2E] bg-[#0A0A12] px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#00E5FF] bg-[#00E5FF]/10 border border-[#00E5FF]/30'
                    : 'text-zinc-300 hover:bg-[#141420]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#00E5FF]" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-[#1F1F2E] flex justify-between items-center text-xs text-zinc-500">
            <span>Blender Handbook v5.x</span>
            <Link
              href="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-400 flex items-center gap-1 font-medium"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Ver mis favoritos ({favorites.length})</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
