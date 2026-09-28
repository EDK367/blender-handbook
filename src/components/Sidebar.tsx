'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Keyboard,
  Layers,
  Zap,
  Box,
  PenTool,
  Move,
  Compass,
  BookOpen,
  Sparkles,
  HelpCircle,
  Star,
  Search,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { COMMANDS } from '@/data/commands';

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = '', onNavigate }) => {
  const pathname = usePathname();

  const mainSections = [
    { label: 'Inicio', href: '/', icon: Home },
    { label: 'Atajos de Teclado', href: '/shortcuts', icon: Keyboard, badge: `${COMMANDS.length}` },
    { label: 'Todos los Comandos', href: '/commands', icon: Layers },
    { label: 'Cheat Sheet Rápido', href: '/cheatsheet', icon: Zap, highlight: true },
  ];

  const guideSections = [
    { label: '3D Viewport & Vistas', href: '/viewport', icon: Compass },
    { label: 'Object Mode', href: '/object-mode', icon: Box },
    { label: 'Edit Mode & Topología', href: '/edit-mode', icon: PenTool },
    { label: 'Transformaciones (G/R/S)', href: '/transform', icon: Move },
    { label: 'Modelado 3D (Modeling)', href: '/modeling', icon: Layers },
  ];

  const referenceSections = [
    { label: 'Aprender Blender (6 Niveles)', href: '/learning', icon: BookOpen },
    { label: 'Diccionario de Teclas', href: '/keyboard', icon: Keyboard },
    { label: 'Glosario Español → Inglés', href: '/glossary', icon: HelpCircle },
    { label: 'Comandos Favoritos', href: '/favorites', icon: Star },
  ];

  const getCategoryCount = (catId: string) => {
    return COMMANDS.filter((c) => c.categories.includes(catId as any)).length;
  };

  return (
    <aside
      className={`w-64 shrink-0 border-r border-[#1F1F2E] bg-[#07070D] flex flex-col h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 select-none ${className}`}
    >
      <div className="space-y-6 pb-8">
        {/* Section 1: Main */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-2">
            Principal
          </div>
          <div className="space-y-1">
            {mainSections.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-semibold shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                      : 'text-zinc-300 hover:text-zinc-100 hover:bg-[#12121E]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#00E5FF]' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#181828] text-zinc-400 border border-[#26263A]">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 2: Modes & Dedicated Workspaces */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-2">
            Modos y Espacios 3D
          </div>
          <div className="space-y-1">
            {guideSections.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#8B5CF6]/15 text-[#C4B5FD] border border-[#8B5CF6]/40 font-semibold shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                      : 'text-zinc-300 hover:text-zinc-100 hover:bg-[#12121E]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#C4B5FD]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 3: Learning & References */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-2">
            Aprendizaje y Referencia
          </div>
          <div className="space-y-1">
            {referenceSections.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-semibold'
                      : 'text-zinc-300 hover:text-zinc-100 hover:bg-[#12121E]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#00E5FF]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 4: Categorías */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-2 mb-2 flex items-center justify-between">
            <span>Categorías</span>
            <span className="text-[10px] text-zinc-400">Blender</span>
          </div>
          <div className="space-y-0.5">
            {CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat.id);
              const isSelected = pathname.includes('/shortcuts') && pathname.includes(encodeURIComponent(cat.id));
              return (
                <Link
                  key={cat.id}
                  href={`/shortcuts?category=${encodeURIComponent(cat.id)}`}
                  onClick={onNavigate}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    isSelected
                      ? 'bg-[#181828] text-[#00E5FF] font-medium'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#12121E]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Official Reference Footer */}
        <div className="pt-4 border-t border-[#1F1F2E] px-2 text-[11px] text-zinc-400 leading-normal">
          <p>
            Basado en la documentación oficial de{' '}
            <a
              href="https://docs.blender.org/manual/en/latest/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00E5FF] hover:underline"
            >
              Blender Manual
            </a>
            .
          </p>
          <div className="mt-2 text-zinc-400">
            Nombres de herramientas en inglés oficial.
          </div>
        </div>
      </div>
    </aside>
  );
};
