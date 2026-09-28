'use client';

import React, { useState, useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { KEYBOARD_KEYS } from '@/data/keyboardKeys';
import { COMMANDS } from '@/data/commands';
import { KeyboardKey } from '@/components/KeyboardKey';
import { CommandCard } from '@/components/CommandCard';
import { Keyboard, Layers, Sparkles } from 'lucide-react';
import { KeyItem } from '@/types';

export default function KeyboardDictionaryPage() {
  const [selectedKey, setSelectedKey] = useState<KeyItem>(KEYBOARD_KEYS[0]); // Starts at 'A'
  const [activeGroup, setActiveGroup] = useState<string>('all');

  const groups = [
    { id: 'all', label: 'Todas las teclas' },
    { id: 'letter', label: 'Letras (A-Z)' },
    { id: 'modifier', label: 'Modificadores (Ctrl, Shift, Alt)' },
    { id: 'special', label: 'Especiales (Space, Tab, ~)' },
    { id: 'function', label: 'Teclas de Función (F1-F12)' },
    { id: 'numpad', label: 'Teclado Numérico (Numpad)' },
    { id: 'mouse', label: 'Botones del Ratón' },
  ];

  const displayedKeys = useMemo(() => {
    if (activeGroup === 'all') return KEYBOARD_KEYS;
    return KEYBOARD_KEYS.filter((k) => k.group === activeGroup);
  }, [activeGroup]);

  // Find all commands that utilize this key
  const associatedCommands = useMemo(() => {
    return COMMANDS.filter((cmd) => {
      const target = selectedKey.key.toLowerCase();
      // Check in keys array or shortcut string
      return (
        cmd.keys.some((k) => k.toLowerCase() === target) ||
        cmd.shortcut.toLowerCase().includes(target)
      );
    });
  }, [selectedKey]);

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumbs items={[{ label: 'Diccionario de Teclas' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#12101F] via-[#0E0E18] to-[#050509] border border-[#2B2344] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Keyboard className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
              Referencia por Tecla Individual
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Diccionario de Teclas
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-2">
          Selecciona cualquier tecla para descubrir al instante todos los operadores y atajos de teclado asociados a ella en Blender.
        </p>

        {/* Group Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-1.5 pt-2">
          {groups.map((grp) => (
            <button
              key={grp.id}
              onClick={() => setActiveGroup(grp.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeGroup === grp.id
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                  : 'bg-[#12121E] text-zinc-400 hover:text-zinc-200 border border-[#232338]'
              }`}
            >
              {grp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Keycaps Grid */}
      <div className="p-6 rounded-2xl bg-[#0D0D16] border border-[#1F1F2E]">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center justify-between">
          <span>Selecciona una tecla ({displayedKeys.length}):</span>
          <span className="text-[11px] font-mono text-zinc-400">
            Tecla activa: <strong className="text-[#00E5FF]">{selectedKey.label}</strong>
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {displayedKeys.map((item) => {
            const isSelected = selectedKey.key === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setSelectedKey(item)}
                type="button"
                className={`transition-all transform cursor-pointer ${
                  isSelected
                    ? 'scale-110 ring-2 ring-[#00E5FF] ring-offset-2 ring-offset-[#0D0D16] rounded-md z-10'
                    : 'opacity-85 hover:opacity-100 hover:scale-105'
                }`}
              >
                <KeyboardKey
                  label={item.label}
                  size="md"
                  variant={isSelected ? 'cyan' : 'default'}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Key Details & Associated Commands */}
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#121222] to-[#0F0F1A] border border-[#2A2A44] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <KeyboardKey label={selectedKey.label} size="lg" variant="cyan" />
            <div>
              <div className="text-xl font-bold text-zinc-100">
                Tecla &ldquo;{selectedKey.label}&rdquo; en Blender
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                {selectedKey.description || 'Consulta todos los comandos que utilizan esta tecla.'}
              </div>
            </div>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-[#161626] px-3 py-1.5 rounded-lg border border-[#2A2A40] shrink-0 self-start md:self-auto">
            {associatedCommands.length} {associatedCommands.length === 1 ? 'comando encontrado' : 'comandos encontrados'}
          </span>
        </div>

        {/* Associated Commands Grid */}
        {associatedCommands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {associatedCommands.map((cmd) => (
              <CommandCard key={cmd.id} command={cmd} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-zinc-500 bg-[#11111A] rounded-2xl border border-[#1F1F2E]">
            No hay comandos preconfigurados para la tecla seleccionada en este diccionario.
          </div>
        )}
      </div>
    </div>
  );
}
