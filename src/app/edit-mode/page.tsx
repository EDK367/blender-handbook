import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CommandCard } from '@/components/CommandCard';
import { KeyboardKey } from '@/components/KeyboardKey';
import { COMMANDS } from '@/data/commands';
import { PenTool, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Guía de Edit Mode — Blender Handbook',
  description: 'Guía completa de Edit Mode en Blender: selección de vértices (1), aristas (2), caras (3), Extrude, Loop Cut, Bevel y topología.',
};

export default function EditModePage() {
  const editModeCommandIds = [
    'toggle-edit-mode',
    'vertex-select',
    'edge-select',
    'face-select',
    'extrude-region',
    'extrude-along-normals',
    'inset-faces',
    'loop-cut',
    'bevel',
    'bevel-vertices',
    'knife-tool',
    'merge',
    'make-face-edge',
    'dissolve-selection',
    'edge-slide',
    'vertex-slide',
    'shrink-fatten',
    'connect-vertex-path',
    'proportional-editing',
    'separate',
  ];

  const editCommands = COMMANDS.filter((c) => editModeCommandIds.includes(c.id));

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumbs items={[{ label: 'Edit Mode' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#101924] via-[#0B101A] to-[#07070D] border border-[#223547] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <PenTool className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
              Anatomía de la Malla
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Edit Mode (Modo Edición)
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-2">
          En <strong>Edit Mode</strong> tienes acceso directo a la geometría molecular de tus modelos 3D. Aquí puedes deformar, cortar, subdividir y crear nuevos polígonos seleccionando vértices, aristas y caras.
        </p>

        {/* 1, 2, 3 Selection Spotlight */}
        <div className="mt-6 p-5 rounded-2xl bg-[#0E1522] border border-[#1E2E44] grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090E18] border border-[#182638]">
            <KeyboardKey label="1" size="lg" variant="cyan" />
            <div>
              <div className="text-sm font-bold text-zinc-100">Vertex Select</div>
              <div className="text-xs text-zinc-400">Puntos individuales</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090E18] border border-[#182638]">
            <KeyboardKey label="2" size="lg" variant="cyan" />
            <div>
              <div className="text-sm font-bold text-zinc-100">Edge Select</div>
              <div className="text-xs text-zinc-400">Segmentos de aristas</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090E18] border border-[#182638]">
            <KeyboardKey label="3" size="lg" variant="cyan" />
            <div>
              <div className="text-sm font-bold text-zinc-100">Face Select</div>
              <div className="text-xs text-zinc-400">Caras poligonales</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Mode Commands Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#00E5FF]" />
          <span>Herramientas Principales de Edit Mode</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {editCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      </div>
    </div>
  );
}
