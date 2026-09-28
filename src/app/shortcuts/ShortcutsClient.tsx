'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { COMMANDS } from '@/data/commands';
import { CATEGORIES } from '@/data/categories';
import { BlenderCommand } from '@/types';
import { CommandCard } from '@/components/CommandCard';
import { CommandTable } from '@/components/CommandTable';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Keyboard, LayoutGrid, Table, Search, Filter, X } from 'lucide-react';
import { searchCommands } from '@/lib/searchEngine';

const CONTEXT_OPTIONS = [
  'All',
  'Object Mode',
  'Edit Mode',
  '3D Viewport',
  'Sculpt Mode',
  'UV Editor',
  'Shader Editor',
  'Timeline',
];

export default function ShortcutsClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedContext, setSelectedContext] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const filteredCommands = useMemo(() => {
    return searchCommands(searchQuery, {
      category: selectedCategory === 'All' ? undefined : selectedCategory,
      context: selectedContext === 'All' ? undefined : selectedContext,
    });
  }, [searchQuery, selectedCategory, selectedContext]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedContext('All');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedContext !== 'All';

  return (
    <div className="space-y-6 pb-12">
      <Breadcrumbs items={[{ label: 'Atajos de Teclado' }]} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1F1F2E] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
              <Keyboard className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                Atajos de Teclado (Shortcuts)
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Consulta rápida de combinaciones y funciones verificadas en el Blender Manual oficial.
              </p>
            </div>
          </div>
        </div>

        {/* View Switcher: Grid vs Table */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center p-1 rounded-xl bg-[#11111A] border border-[#1F1F2E]">
            <button
              onClick={() => setViewMode('table')}
              type="button"
              title="Vista de Tabla"
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#1C1C2E] text-[#00E5FF] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              type="button"
              title="Vista de Tarjetas"
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#1C1C2E] text-[#00E5FF] shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs font-mono text-zinc-500 bg-[#11111A] px-3 py-2 rounded-xl border border-[#1F1F2E]">
            {filteredCommands.length} {filteredCommands.length === 1 ? 'atajo' : 'atajos'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar Toolbar */}
      <div className="space-y-3 bg-[#0B0B14] p-4 rounded-2xl border border-[#1F1F2E]">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Quick text filter */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtrar por atajo (ej: Ctrl+R), nombre (Loop Cut) o concepto (bucle)..."
              className="w-full pl-10 pr-4 py-2 bg-[#12121E] border border-[#232336] rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Context Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 shrink-0 font-medium hidden sm:inline">Contexto:</span>
            <select
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value)}
              className="bg-[#12121E] border border-[#232336] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#00E5FF] cursor-pointer"
            >
              {CONTEXT_OPTIONS.map((ctx) => (
                <option key={ctx} value={ctx}>
                  {ctx === 'All' ? 'Todos los contextos' : ctx}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
          )}
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1 rounded-lg shrink-0 font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/40'
                : 'bg-[#12121E] text-zinc-400 hover:text-zinc-200 border border-[#232336]'
            }`}
          >
            Todas las categorías
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg shrink-0 font-medium transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/40'
                    : 'bg-[#12121E] text-zinc-400 hover:text-zinc-200 border border-[#232336]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {viewMode === 'table' ? (
        <CommandTable commands={filteredCommands} showCategory={selectedCategory === 'All'} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
          {filteredCommands.length === 0 && (
            <div className="col-span-full py-16 text-center text-zinc-500 bg-[#11111A] rounded-2xl border border-[#1F1F2E]">
              No se encontraron comandos con los filtros activos.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
