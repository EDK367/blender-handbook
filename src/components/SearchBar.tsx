'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import Link from 'next/link';
import { Search, X, History, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { BlenderCommand } from '@/types';
import { searchCommands } from '@/lib/searchEngine';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { KeyboardKey } from './KeyboardKey';
import { ContextBadge } from './ContextBadge';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onSelectCommand?: (cmd: BlenderCommand) => void;
  className?: string;
  isHeader?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar por ejemplo: A, Ctrl+Z, Extrude, Loop Cut, mover...',
  autoFocus = false,
  className = '',
  isHeader = false,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<BlenderCommand[]>([]);
  const [, startTransition] = useTransition();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { recentSearches, addSearch, clearSearches } = useRecentSearches();

  // Global shortcut to focus search: Ctrl+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform search on query change
  useEffect(() => {
    startTransition(() => {
      if (query.trim().length > 0) {
        const found = searchCommands(query, { limit: 8 });
        setResults(found);
      } else {
        setResults([]);
      }
    });
  }, [query]);

  const handleSelect = (cmd: BlenderCommand) => {
    addSearch(query.trim() || cmd.name);
    setIsOpen(false);
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
    inputRef.current?.focus();
    setIsOpen(true);
  };

  const clearInput = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchContainerRef} className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <div
        className={`relative flex items-center rounded-xl bg-[#0B0B12] border transition-all duration-200 ${
          isOpen
            ? 'border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)] ring-1 ring-[#00E5FF]/40'
            : 'border-[#1F1F2E] hover:border-[#2E2E44]'
        }`}
      >
        <div className="pl-3.5 pr-2 text-zinc-500">
          <Search className="w-4 h-4 text-[#00E5FF]" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          autoFocus={autoFocus}
          placeholder={placeholder}
          aria-label="Buscar comando o atajo de Blender"
          className="w-full py-2.5 pr-24 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
        />

        {/* Right accessories: Clear button or shortcut badge */}
        <div className="absolute right-3 flex items-center gap-2">
          {query ? (
            <button
              onClick={clearInput}
              type="button"
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-[#161624] px-1.5 py-0.5 rounded border border-[#2B2B40]">
              <span>Ctrl</span>
              <span>+</span>
              <span>K</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Dropdown Results / Recent Searches */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl bg-[#0D0D17] border border-[#2B2B40] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-md">
          {/* Active query results */}
          {query.trim().length > 0 ? (
            <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#1F1F2E]/80">
              {results.length > 0 ? (
                <div>
                  <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 bg-[#08080E]/90 flex items-center justify-between">
                    <span>Resultados ({results.length})</span>
                    <span className="text-[10px] text-zinc-400">Presiona para ver detalles</span>
                  </div>

                  {results.map((cmd) => (
                    <Link
                      key={cmd.id}
                      href={`/commands/${cmd.id}`}
                      onClick={() => handleSelect(cmd)}
                      className="flex items-center justify-between px-4 py-3 hover:bg-[#161626] transition-colors group cursor-pointer"
                    >
                      <div className="flex items-start gap-3 min-w-0 pr-3">
                        {/* Keycap Badge */}
                        <div className="flex items-center gap-1 shrink-0 pt-0.5">
                          {cmd.keys.map((k, i) => (
                            <KeyboardKey key={i} label={k} size="sm" />
                          ))}
                        </div>

                        {/* Official English Name + Spanish Subtitle */}
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-zinc-100 group-hover:text-[#00E5FF] transition-colors truncate">
                            {cmd.name}
                          </div>
                          <div className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                            <span className="text-[#00E5FF]/80 font-medium mr-1.5">
                              {cmd.spanishName} —
                            </span>
                            {cmd.description}
                          </div>
                        </div>
                      </div>

                      {/* Context badge and arrow */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="hidden md:block">
                          <ContextBadge context={cmd.contexts[0]} size="sm" />
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-sm text-zinc-300 font-medium">
                    No encontramos ningún comando para &ldquo;{query}&rdquo;
                  </div>
                  <p className="text-xs text-zinc-400 mt-1.5 max-w-sm mx-auto">
                    Prueba buscando por tecla (ej: <span className="text-[#00E5FF] font-mono">A</span>, <span className="text-[#00E5FF] font-mono">G</span>, <span className="text-[#00E5FF] font-mono">Z</span>), en inglés (<span className="text-[#00E5FF]">Extrude</span>), o en español (<span className="text-[#00E5FF]">mover</span>).
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Empty state: Recent Searches + Quick Suggestions */
            <div className="p-4 space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-[#00E5FF]" />
                      Búsquedas recientes
                    </span>
                    <button
                      onClick={clearSearches}
                      className="text-zinc-400 hover:text-rose-400 transition-colors text-[10px]"
                    >
                      Borrar historial
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleRecentClick(term)}
                        className="px-2.5 py-1 rounded-md text-xs bg-[#161626] hover:bg-[#1E1E34] text-zinc-300 hover:text-[#00E5FF] border border-[#2B2B40] transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular quick searches */}
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Atajos y consultas frecuentes
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { term: 'A', label: 'Select All' },
                    { term: 'G', label: 'Move / Grab' },
                    { term: 'Z', label: 'Shading Pie Menu' },
                    { term: 'Ctrl+R', label: 'Loop Cut' },
                    { term: 'E', label: 'Extrude' },
                    { term: 'F3', label: 'Search Operator' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRecentClick(item.term)}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#141422] hover:bg-[#1C1C30] border border-[#232338] text-left transition-colors group"
                    >
                      <KeyboardKey label={item.term} size="sm" />
                      <span className="text-xs text-zinc-400 group-hover:text-zinc-200 truncate ml-2">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyboard hint */}
              <div className="pt-2 border-t border-[#1F1F2E] flex items-center justify-between text-[11px] text-zinc-400">
                <span>Escribe cualquier tecla, concepto o herramienta</span>
                <span className="flex items-center gap-1">
                  <span>Presiona</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">ESC</kbd>
                  <span>para cerrar</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
