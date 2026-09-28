import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CommandCard } from '@/components/CommandCard';
import { COMMANDS } from '@/data/commands';
import { Compass, Mouse, Laptop, Layers } from 'lucide-react';
import { KeyboardKey } from '@/components/KeyboardKey';

export const metadata = {
  title: 'Guía de Navegación 3D Viewport — Blender Handbook',
  description: 'Aprende a moverte por el 3D Viewport de Blender: rotar, encuadrar, zoom, vistas ortográficas Numpad y menú radial.',
};

export default function ViewportPage() {
  const viewportCommandIds = [
    'orbit-view',
    'pan-view',
    'zoom-view',
    'view-selected',
    'view-all',
    'front-view',
    'right-view',
    'top-view',
    'ortho-persp-toggle',
    'camera-view',
    'align-camera-to-view',
    'navigation-pie-menu',
    'shading-pie-menu',
    'toggle-xray',
    'toggle-sidebar-n',
    'toggle-toolbar-t',
    'maximize-area',
  ];

  const viewportCommands = COMMANDS.filter((c) => viewportCommandIds.includes(c.id));

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumbs items={[{ label: '3D Viewport & Navegación' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0F1424] via-[#0B0F1B] to-[#050509] border border-[#1E2E4E] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Compass className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              Control de Cámara y Espacio
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Navegación en el 3D Viewport
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-2">
          Moverte con soltura en el espacio tridimensional es lo primero que debes dominar en Blender. El ratón de 3 botones (con rueda central pulsable) y el teclado numérico son tus herramientas indispensables.
        </p>

        {/* Laptop User Tip */}
        <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
          <Laptop className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-200/90 leading-relaxed">
            <strong className="text-blue-300 block mb-0.5">¿Usas una laptop sin teclado numérico (Numpad)?</strong>
            Ve a <strong className="text-zinc-100 font-mono">Edit &gt; Preferences &gt; Input</strong> y activa la opción <strong className="text-zinc-100">&ldquo;Emulate Numpad&rdquo;</strong>. Esto convertirá los números 1 a 9 superiores en teclas de vistas de cámara. O bien, mantén presionada la tecla <KeyboardKey label="~" size="sm" /> para abrir el menú radial de vistas.
          </div>
        </div>
      </div>

      {/* 3 Mouse Core Operations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#11111A] border border-[#1F1F2E] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-100">Orbit (Orbitar)</span>
            <KeyboardKey label="MMB" size="md" variant="cyan" />
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Presiona el botón central del ratón (rueda) y arrastra para rotar la cámara 360 grados alrededor del centro focal.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#11111A] border border-[#1F1F2E] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-100">Pan (Desplazar)</span>
            <div className="flex items-center gap-1">
              <KeyboardKey label="Shift" size="sm" />
              <span className="text-zinc-500">+</span>
              <KeyboardKey label="MMB" size="sm" variant="cyan" />
            </div>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Mantén presionado Shift y arrastra con la rueda del ratón para mover lateralmente la vista sin rotar el ángulo.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#11111A] border border-[#1F1F2E] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-zinc-100">Zoom</span>
            <div className="flex items-center gap-1">
              <KeyboardKey label="Ctrl" size="sm" />
              <span className="text-zinc-500">+</span>
              <KeyboardKey label="MMB" size="sm" variant="cyan" />
            </div>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Gira la rueda de desplazamiento para zoom por pasos, o mantén Ctrl + MMB para un zoom analógico ultrasuave.
          </p>
        </div>
      </div>

      {/* Viewport Commands List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#00E5FF]" />
          <span>Comandos de Vista y Navegación</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {viewportCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      </div>
    </div>
  );
}
