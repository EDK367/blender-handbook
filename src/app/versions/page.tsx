import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Layers, CheckCircle2, Clock, Info, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Versiones de Blender y Compatibilidad de Keymaps — Blender Handbook',
  description: 'Guía de compatibilidad de atajos y keymaps entre versiones de Blender: Blender 5.x, 4.x, 3.x y 2.8x.',
};

export default function VersionsPage() {
  const versions = [
    {
      version: 'Blender 5.x',
      status: 'Versión de Referencia Oficial (Activa)',
      releaseType: 'Current / Next-Gen',
      active: true,
      description: 'Arquitectura moderna con renderizado por nodos en tiempo real, mejoras en Geometry Nodes con soporte procedimental total y nuevo sistema de extensiones integrado.',
      keymapHighlights: [
        'Z abre el Shading Pie Menu con 4 cuadrantes (Solid, Wireframe, Material Preview, Rendered).',
        'F3 es el atajo por defecto para Operator Search universal.',
        'Clic izquierdo (LMB) es el estándar absoluto para selección y activación de gizmos.',
        'La barra espaciadora (Spacebar) controla Play/Pause en la Timeline.',
      ],
    },
    {
      version: 'Blender 4.x (4.0 - 4.3)',
      status: 'Versión LTS Estable',
      releaseType: 'Long Term Support',
      active: false,
      description: 'Introdujo la renovación completa del shader Principled BSDF v2, sistema de snapping interactivo mejorado con navegación por puntos y panel de modificadores rediseñado.',
      keymapHighlights: [
        'Compatibilidad total (99%) con los atajos documentados en este Handbook.',
        'Nuevo atajo para navegar por puntos de snap durante traslaciones con tecla B.',
        'Mejoras en el selector de paleta de colores y menú de color management AgX.',
      ],
    },
    {
      version: 'Blender 3.x',
      status: 'Versión Legacy Estable',
      releaseType: 'Legacy',
      active: false,
      description: 'Llegada del Asset Browser, Geometry Nodes basados en campos (Fields) y mejoras en el renderizado Cycles X.',
      keymapHighlights: [
        'Mantiene el keymap moderno de Blender 2.8+.',
        'Alt + A para deseleccionar, Tab para Edit Mode.',
      ],
    },
    {
      version: 'Blender 2.8x - 2.9x',
      status: 'El Gran Rediseño Histórico',
      releaseType: 'Historical Milestone',
      active: false,
      description: 'El punto de inflexión donde Blender adoptó la interfaz moderna actual, el motor EEVEE en tiempo real y el estándar universal de selección con clic izquierdo.',
      keymapHighlights: [
        'Cambio histórico de selección: de Clic Derecho (RMB) a Clic Izquierdo (LMB).',
        'Z dejó de ser un simple interruptor Wireframe/Solid y pasó a ser un Menú Radial.',
      ],
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      <Breadcrumbs items={[{ label: 'Versiones de Blender' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#121222] via-[#0E0E18] to-[#050509] border border-[#2B2B44] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
              Control de Versiones y Keymaps
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Versiones de Blender
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-2">
          Este manual está construido con base en la documentación oficial de <strong>Blender 5.x / 4.x</strong>. Blender mantiene una gran estabilidad en sus atajos principales desde la versión 2.80, pero aquí puedes consultar las diferencias clave.
        </p>
      </div>

      {/* Versions List */}
      <div className="space-y-6">
        {versions.map((ver, idx) => (
          <div
            key={idx}
            className={`p-6 sm:p-8 rounded-3xl border transition-all ${
              ver.active
                ? 'bg-[#0E1522] border-[#00E5FF]/50 shadow-[0_0_30px_rgba(0,229,255,0.1)] ring-1 ring-[#00E5FF]/30'
                : 'bg-[#0D0D16] border-[#1F1F2E]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F1F2E] pb-4 mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-zinc-100">
                  {ver.version}
                </h2>
                {ver.active && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                    ACTIVA
                  </span>
                )}
              </div>

              <span className="text-xs font-mono text-zinc-400 bg-[#161626] px-3 py-1 rounded-lg border border-[#26263A] self-start sm:self-auto">
                {ver.status}
              </span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-5">
              {ver.description}
            </p>

            <div className="p-4 rounded-xl bg-[#090912] border border-[#1A1A2A] space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
                Comportamiento del Keymap Oficial:
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {ver.keymapHighlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
