'use client';

import React, { useState, useMemo } from 'react';
import { COMMANDS } from '@/data/commands';
import { CommandCard } from '@/components/CommandCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Layers, Search, Filter, X } from 'lucide-react';
import { searchCommands } from '@/lib/searchEngine';

export default function CommandsDirectoryPage() {
  const [query, setQuery] = useState('');
  const [selectedContext, setSelectedContext] = useState('All');

  const filtered = useMemo(() => {
    return searchCommands(query, {
      context: selectedContext === 'All' ? undefined : selectedContext,
    });
  }, [query, selectedContext]);

  return (
    <div className="space-y-6 pb-12">
      <Breadcrumbs items={[{ label: 'Directorio de Comandos' }]} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1F1F2E] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                Directorio Completo de Comandos
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Explora cada comando con su documentación oficial, ejemplos prácticos y modo correspondiente.
              </p>
            </div>
          </div>
        </div>

        <span className="text-xs font-mono text-zinc-400 bg-[#11111A] px-3.5 py-2 rounded-xl border border-[#1F1F2E] self-start md:self-auto">
          {filtered.length} de {COMMANDS.length} comandos
        </span>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#0B0B14] p-4 rounded-2xl border border-[#1F1F2E]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por tecla, operador en inglés o acción en español..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#12121E] border border-[#232336] rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedContext}
            onChange={(e) => setSelectedContext(e.target.value)}
            className="bg-[#12121E] border border-[#232336] rounded-xl px-3 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#00E5FF] cursor-pointer"
          >
            <option value="All">Todos los modos</option>
            <option value="Object Mode">Object Mode</option>
            <option value="Edit Mode">Edit Mode</option>
            <option value="3D Viewport">3D Viewport</option>
            <option value="Sculpt Mode">Sculpt Mode</option>
            <option value="UV Editor">UV Editor</option>
            <option value="Shader Editor">Shader Editor</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cmd) => (
          <CommandCard key={cmd.id} command={cmd} />
        ))}
      </div>
    </div>
  );
}
