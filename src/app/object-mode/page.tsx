import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CommandCard } from '@/components/CommandCard';
import { COMMANDS } from '@/data/commands';
import { Box, Layers, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Guía de Object Mode — Blender Handbook',
  description: 'Aprende todas las operaciones esenciales de Object Mode en Blender: duplicar, unir, emparentar, aplicar transformaciones y gestión de objetos.',
};

export default function ObjectModePage() {
  const objectModeCommandIds = [
    'add-object',
    'delete-object',
    'duplicate',
    'duplicate-linked',
    'join-objects',
    'apply-transforms',
    'set-parent',
    'clear-parent',
    'hide-selected',
    'unhide-all',
    'hide-unselected',
    'rename-object',
    'clear-location',
    'clear-rotation',
    'clear-scale',
  ];

  const objectCommands = COMMANDS.filter((c) => objectModeCommandIds.includes(c.id));

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumbs items={[{ label: 'Object Mode' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#12101E] via-[#0E0E18] to-[#07070D] border border-[#26243A] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Box className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Modo Global de Escena
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Object Mode (Modo Objeto)
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-2">
          En <strong>Object Mode</strong> tratas a cada modelo, luz, cámara o esqueleto como una entidad individual completa en el espacio tridimensional. Aquí organizas la jerarquía de la escena, creas instancias y aplicas transformaciones globales sin modificar la estructura interna de los vértices.
        </p>

        {/* Golden Rule Callout */}
        <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300 block mb-0.5">La Regla Fundamental: Aplicar Escala (Ctrl + A)</strong>
            Si escalas o rotas un objeto en Object Mode, recuerda aplicar transformaciones con <strong className="text-zinc-100 font-mono">Ctrl + A &gt; Apply Scale</strong>. De lo contrario, los modificadores como Bevel o el Unwrap de mapas UV se comportarán de forma deformada.
          </div>
        </div>
      </div>

      {/* Object Mode Operations Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#00E5FF]" />
          <span>Comandos Principales de Object Mode</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {objectCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      </div>

      {/* Deep Dive: Concepts in Object Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-[#11111A] border border-[#1F1F2E] space-y-3">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
            Duplicate (Shift + D) vs Linked Duplicate (Alt + D)
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200">Shift + D</strong> crea una copia totalmente independiente con su propia malla en memoria.
            En cambio, <strong className="text-zinc-200">Alt + D</strong> crea una instancia compartida (Linked): al modificar una en Edit Mode, todas las copias cambian a la vez, ahorrando enormes cantidades de memoria RAM al crear bosques de árboles, tornillos o columnas repetitivas.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#11111A] border border-[#1F1F2E] space-y-3">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            El Punto de Origen (Object Origin)
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            El pequeño punto naranja en cada objeto marca su origen geométrico. Si el origen está descentrado, las rotaciones y escalados girarán de forma extraña. Puedes reubicarlo haciendo clic derecho en Object Mode &gt; <strong className="text-zinc-200">Set Origin &gt; Origin to Geometry</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
