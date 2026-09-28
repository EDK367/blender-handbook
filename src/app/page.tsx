import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Zap,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Keyboard,
  Compass,
} from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { CommandCard } from '@/components/CommandCard';
import { KeyboardKey } from '@/components/KeyboardKey';
import { PieMenuVisualizer } from '@/components/PieMenuVisualizer';
import { TransformPlayground } from '@/components/TransformPlayground';
import { CATEGORIES } from '@/data/categories';
import { COMMANDS } from '@/data/commands';

export default function HomePage() {
  const featuredCommandIds = [
    'select-all',
    'move',
    'rotate',
    'scale',
    'shading-pie-menu',
    'search-operator',
    'toggle-edit-mode',
    'extrude-region',
    'loop-cut',
    'bevel',
    'apply-transforms',
    'orbit-view',
  ];

  const featuredCommands = COMMANDS.filter((c) => featuredCommandIds.includes(c.id));

  const getCategoryCount = (catId: string) => {
    return COMMANDS.filter((c) => c.categories.includes(catId as any)).length;
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0D0D1A] via-[#090912] to-[#050509] border border-[#1F1F2E] p-8 sm:p-12 lg:p-16 text-center">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161626] border border-[#2B2B42] text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
            <span>Referencia Oficial: Blender Manual 5.x / 4.x</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-100">
            Domina{' '}
            <span className="bg-gradient-to-r from-[#00E5FF] via-cyan-200 to-[#8B5CF6] bg-clip-text text-transparent">
              Blender
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Consulta comandos, atajos de teclado y herramientas en español manteniendo los nombres oficiales en inglés. Diseñado para tener abierto en tu segundo monitor mientras modelas.
          </p>

          {/* Large Hero Search */}
          <div className="pt-4 max-w-2xl mx-auto">
            <SearchBar autoFocus={false} placeholder="Escribe una tecla o acción: A, G, Ctrl+Z, Extrude, mover, duplicar..." />
          </div>

          {/* Quick Access Keyboard Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
            <span className="text-zinc-400 font-mono text-[11px]">Acceso rápido:</span>
            {[
              { key: 'A', name: 'Select All', id: 'select-all' },
              { key: 'G', name: 'Move', id: 'move' },
              { key: 'R', name: 'Rotate', id: 'rotate' },
              { key: 'S', name: 'Scale', id: 'scale' },
              { key: 'Z', name: 'Shading Pie', id: 'shading-pie-menu' },
              { key: 'Tab', name: 'Edit Mode', id: 'toggle-edit-mode' },
              { key: 'E', name: 'Extrude', id: 'extrude-region' },
              { key: 'Ctrl+R', name: 'Loop Cut', id: 'loop-cut' },
              { key: 'F3', name: 'Search', id: 'search-operator' },
            ].map((item, idx) => (
              <Link
                key={idx}
                href={`/commands/${item.id}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121220] hover:bg-[#1A1A2E] border border-[#222236] hover:border-[#00E5FF]/40 text-zinc-300 hover:text-[#00E5FF] transition-all"
              >
                <KeyboardKey label={item.key} size="sm" />
                <span className="font-medium text-[11px]">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Golden Tip Spotlight: F3 Operator Search */}
      <section className="rounded-2xl bg-gradient-to-r from-[#11111E] via-[#0E0E1A] to-[#120F24] border border-[#2B2B44] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 shrink-0">
            <KeyboardKey label="F3" size="lg" variant="orange" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              El Secreto para Principiantes: F3 Operator Search
            </div>
            <h2 className="text-xl font-bold text-zinc-100">
              ¿Olvidaste un atajo? No te detengas: presiona F3
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              En cualquier modo de Blender, presionar <strong className="text-zinc-200">F3</strong> despliega un cuadro de búsqueda universal para ejecutar cualquier herramienta por su nombre en inglés (ej: &ldquo;Subdivide&rdquo;, &ldquo;Bridge Edge Loops&rdquo;, &ldquo;Origin to Geometry&rdquo;). ¡Blender incluso te mostrará el atajo oficial al lado!
            </p>
          </div>
        </div>

        <Link
          href="/commands/search-operator"
          className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C1C30] hover:bg-[#252540] border border-[#3A3A54] text-xs font-semibold text-[#00E5FF] hover:border-[#00E5FF] transition-all"
        >
          <span>Aprender más sobre F3</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Featured Essential Commands Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1F1F2E] pb-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
              <Keyboard className="w-6 h-6 text-[#00E5FF]" />
              <span>Comandos Fundamentales</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Los atajos imprescindibles que utilizarás en el 90% de tus sesiones de trabajo en Blender.
            </p>
          </div>

          <Link
            href="/shortcuts"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00E5FF] hover:underline"
          >
            <span>Ver todos los {COMMANDS.length} atajos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      </section>

      {/* Interactive Pie Menu Z Spotlight */}
      <section className="space-y-4">
        <div className="border-b border-[#1F1F2E] pb-3">
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-[#8B5CF6]" />
            <span>El Menú Radial: La tecla Z en 3D Viewport</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Z no simplemente convierte en sólido: despliega el menú de sombreado de cuatro direcciones.
          </p>
        </div>

        <PieMenuVisualizer />
      </section>

      {/* Interactive Transformation & Axis Pattern */}
      <section className="space-y-4">
        <div className="border-b border-[#1F1F2E] pb-3">
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2.5">
            <Zap className="w-6 h-6 text-emerald-400" />
            <span>El Patrón Universal de Transformación (G / R / S)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Comprende la sintaxis de Blender para mover, rotar y escalar con restricciones cartesianas.
          </p>
        </div>

        <TransformPlayground />
      </section>

      {/* 6-Level Learning Path Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#121224] via-[#0E0E1B] to-[#18112C] border border-[#2E2E4A] p-8">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C4B5FD] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
              <span>Ruta de Aprendizaje Estructurada</span>
            </div>
            <h3 className="text-2xl font-bold text-zinc-100">
              ¿Empiezas desde cero? Sigue el camino de 6 Niveles
            </h3>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Desde tus primeros pasos en la navegación del viewport y modelado poligonal básico, hasta materiales con Principled BSDF, iluminación de estudio, animación con keyframes y Geometry Nodes.
            </p>
          </div>

          <Link
            href="/learning"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-zinc-950 font-bold text-sm shadow-[0_0_20px_rgba(0,229,255,0.35)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all transform hover:-translate-y-0.5"
          >
            <span>Explorar Plan de Aprendizaje</span>
            <ArrowRight className="w-4 h-4 text-zinc-950" />
          </Link>
        </div>
      </section>

      {/* Categories Grid (Section 7) */}
      <section className="space-y-6">
        <div className="border-b border-[#1F1F2E] pb-4">
          <h2 className="text-2xl font-bold text-zinc-100">
            Explora por Categoría
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Navega por las distintas áreas de especialidad del pipeline de producción 3D en Blender.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              commandCount={getCategoryCount(cat.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
