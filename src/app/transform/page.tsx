import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TransformPlayground } from '@/components/TransformPlayground';
import { KeyboardKey } from '@/components/KeyboardKey';
import { COMMANDS } from '@/data/commands';
import { CommandCard } from '@/components/CommandCard';
import { Move, RotateCw, Maximize2, Compass, Layers, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Guía de Transformaciones 3D — Blender Handbook',
  description: 'Aprende a mover (G), rotar (R) y escalar (S) con restricciones de ejes, coordenadas locales/globales y encaje en Blender.',
};

export default function TransformPage() {
  const transformCommands = COMMANDS.filter((c) =>
    c.categories.includes('Transformation')
  );

  return (
    <div className="space-y-10 pb-16">
      <Breadcrumbs items={[{ label: 'Transformaciones' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#12101F] via-[#0E0E18] to-[#050509] border border-[#2B2344] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Move className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              Manipulación Espacial
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Transformaciones (Move, Rotate, Scale)
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-2">
          La trinidad de la manipulación espacial en Blender se basa en tres letras: <strong className="text-[#00E5FF]">G</strong> (Grab / Mover), <strong className="text-purple-400">R</strong> (Rotate / Rotar) y <strong className="text-emerald-400">S</strong> (Scale / Escalar). Combinadas con los ejes cartesianos, te otorgan precisión milimétrica sin tocar el ratón.
        </p>
      </div>

      {/* Interactive Transform Playground */}
      <TransformPlayground />

      {/* Deep Dive Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#11111A] border border-[#1F1F2E] space-y-3">
          <div className="text-sm font-bold text-[#00E5FF] flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Global vs Local Axis
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Al pulsar <strong className="text-zinc-200 font-mono">G + Z</strong> restringes al eje Z mundial (hacia el cielo). Pero si pulsas <strong className="text-zinc-200 font-mono">Z dos veces (G + Z + Z)</strong>, restringes al eje Z <em>local</em> del objeto según su propia inclinación previa.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#11111A] border border-[#1F1F2E] space-y-3">
          <div className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Exclusión de Ejes (Shift + X/Y/Z)
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            ¿Quieres mover o escalar un objeto a lo largo del suelo plano sin alterar su altura vertical? Presiona <strong className="text-zinc-200 font-mono">G + Shift + Z</strong> o <strong className="text-zinc-200 font-mono">S + Shift + Z</strong>. Esto bloquea el eje Z y transforma en los ejes X e Y simultáneamente.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#11111A] border border-[#1F1F2E] space-y-3">
          <div className="text-sm font-bold text-purple-400 flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            Incremental Snapping (Ctrl)
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Mantener presionado <strong className="text-zinc-200 font-mono">Ctrl</strong> mientras transformas hace que el objeto se encaje a intervalos regulares (1 metro, 5 grados de rotación, etc.). Mantener <strong className="text-zinc-200 font-mono">Shift</strong> ralentiza el movimiento para precisión fina.
          </p>
        </div>
      </div>

      {/* Commands List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100">
          Comandos de Transformación
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {transformCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      </div>
    </div>
  );
}
