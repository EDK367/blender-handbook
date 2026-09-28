'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GLOSSARY } from '@/data/glossary';
import { HelpCircle, Search, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set<string>();
    GLOSSARY.forEach((item) => set.add(item.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredItems = useMemo(() => {
    return GLOSSARY.filter((item) => {
      const matchesSearch =
        item.spanishTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.englishTerm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumbs items={[{ label: 'Glosario Técnico' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#12101F] via-[#0E0E18] to-[#050509] border border-[#2B2344] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
              Terminología Blender
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Glosario Español → Inglés
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-2">
          En Blender, la interfaz y las funciones oficiales siempre se consultan en <strong>inglés</strong>. Este diccionario te ayuda a traducir cualquier concepto técnico que pienses en español para saber exactamente qué buscar en Blender.
        </p>

        {/* Filter bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar término: biselar, arista, costura, subdividir..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#12121E] border border-[#232338] rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#12121E] border border-[#232338] rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-[#00E5FF] cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'Todas las áreas' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Glossary Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#11111A] border border-[#1F1F2E] hover:border-[#00E5FF]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                    <span>{item.spanishTerm}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-600" />
                    <span className="text-[#00E5FF] font-mono">{item.englishTerm}</span>
                  </h3>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#181826] text-zinc-400 border border-[#28283C] shrink-0">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                {item.definition}
              </p>
            </div>

            {/* Context & Related Command Link */}
            <div className="mt-4 pt-3 border-t border-[#1F1F2E]/60 flex items-center justify-between text-[11px] text-zinc-500">
              <span>{item.context}</span>
              {item.relatedCommands && item.relatedCommands[0] && (
                <Link
                  href={`/commands/${item.relatedCommands[0]}`}
                  className="text-[#00E5FF] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Ver comando</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center text-zinc-500 bg-[#11111A] rounded-2xl border border-[#1F1F2E]">
            No encontramos ningún término coincidente en el glosario.
          </div>
        )}
      </div>
    </div>
  );
}
