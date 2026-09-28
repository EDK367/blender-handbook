'use client';

import React, { useState } from 'react';
import { Box, Grid3X3, Palette, Sparkles, HelpCircle } from 'lucide-react';
import { KeyboardKey } from './KeyboardKey';

interface ShadingMode {
  id: string;
  name: string;
  spanishTitle: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  bestFor: string;
}

const SHADING_MODES: ShadingMode[] = [
  {
    id: 'solid',
    name: 'Solid',
    spanishTitle: 'Sólido (Estándar)',
    position: 'top',
    icon: Box,
    color: '#00E5FF',
    description: 'Modo de visualización por defecto. Muestra la geometría con sombreado plano o suave mediante luces de estudio virtuales sin calcular materiales pesados.',
    bestFor: 'Modelado poligonal, esculpido y flujo de trabajo diario de alta fluidez en FPS.',
  },
  {
    id: 'rendered',
    name: 'Rendered',
    spanishTitle: 'Renderizado en tiempo real',
    position: 'right',
    icon: Sparkles,
    color: '#F59E0B',
    description: 'Calcula en directo toda la iluminación de la escena, sombras, rebotes de luz física con Cycles o el motor interactivo EEVEE.',
    bestFor: 'Ajuste de iluminación final, balance de luces y look cinematográfico antes del render definitivo.',
  },
  {
    id: 'material-preview',
    name: 'Material Preview',
    spanishTitle: 'Previsualización de Materiales',
    position: 'bottom',
    icon: Palette,
    color: '#8B5CF6',
    description: 'Muestra los materiales y texturas utilizando un entorno HDRI de estudio predeterminado en tiempo real sin requerir luces en la escena.',
    bestFor: 'Comprobar texturas, colores, rugosidad (Roughness) y brillo metálico con rapidez.',
  },
  {
    id: 'wireframe',
    name: 'Wireframe',
    spanishTitle: 'Malla de alambre (Wireframe)',
    position: 'left',
    icon: Grid3X3,
    color: '#10B981',
    description: 'Muestra únicamente las aristas y vértices en forma de esqueleto lineal transparente sin rellenar las caras sólidas.',
    bestFor: 'Seleccionar elementos internos ocultos, comprobar alineación de referencias y verificar la topología limpia.',
  },
];

export const PieMenuVisualizer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ShadingMode>(SHADING_MODES[0]);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0E0E18] to-[#0A0A12] border border-[#2B2B42] p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F1F2E]">
        <div>
          <div className="flex items-center gap-2.5">
            <KeyboardKey label="Z" size="lg" variant="cyan" />
            <h3 className="text-xl font-bold text-zinc-100">
              Shading Pie Menu <span className="text-[#00E5FF] text-base font-normal font-sans">(Menú Radial)</span>
            </h3>
          </div>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Al pulsar <strong className="text-zinc-200">Z</strong> en el 3D Viewport se despliega un menú circular radial. Desliza el ratón en la dirección correspondiente para cambiar instantáneamente de modo de visualización.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400 bg-[#141422] px-3 py-2 rounded-lg border border-[#242438] shrink-0 self-start sm:self-auto">
          <HelpCircle className="w-4 h-4 text-[#00E5FF] shrink-0" />
          <span>Haz clic en cualquier cuadrante para explorarlo</span>
        </div>
      </div>

      {/* Interactive Pie Display & Details Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        {/* Radial Graphical Compass */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Center Hub */}
            <div className="absolute z-20 w-24 h-24 rounded-full bg-[#161624] border-2 border-[#00E5FF] flex flex-col items-center justify-center shadow-[0_0_24px_rgba(0,229,255,0.4)] text-center">
              <KeyboardKey label="Z" size="md" />
              <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider mt-1">
                Presiona Z
              </span>
            </div>

            {/* Connecting Compass Guides */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-full h-0.5 bg-[#00E5FF]" />
              <div className="h-full w-0.5 bg-[#00E5FF] absolute" />
              <div className="w-64 h-64 rounded-full border border-dashed border-[#00E5FF]" />
            </div>

            {/* 4 Directional Pie Buttons */}
            {SHADING_MODES.map((mode) => {
              const isSelected = activeMode.id === mode.id;
              const Icon = mode.icon;

              const positionClasses = {
                top: 'top-2 left-1/2 -translate-x-1/2',
                right: 'right-2 top-1/2 -translate-y-1/2',
                bottom: 'bottom-2 left-1/2 -translate-x-1/2',
                left: 'left-2 top-1/2 -translate-y-1/2',
              };

              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode)}
                  type="button"
                  className={`absolute z-30 flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${positionClasses[mode.position]} ${
                    isSelected
                      ? 'bg-[#1C1C30] border-[#00E5FF] text-zinc-100 shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105'
                      : 'bg-[#11111A] border-[#2A2A40] text-zinc-400 hover:text-zinc-200 hover:border-zinc-500'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isSelected ? 'text-[#00E5FF]' : 'text-zinc-500'
                    }`}
                  />
                  <span>{mode.name}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-zinc-400 font-mono mt-2">
            Mueve el cursor hacia la dirección y suelta <span className="text-[#00E5FF]">Z</span>
          </div>
        </div>

        {/* Selected Mode Detail Panel */}
        <div className="lg:col-span-6 bg-[#131320] border border-[#25253A] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="p-2.5 rounded-lg border"
              style={{
                backgroundColor: `${activeMode.color}15`,
                borderColor: `${activeMode.color}40`,
                color: activeMode.color,
              }}
            >
              <activeMode.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <span>{activeMode.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C1C2E] text-zinc-400 border border-[#2B2B40]">
                  Dirección: {activeMode.position.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-[#00E5FF] font-medium">{activeMode.spanishTitle}</p>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed mt-4">
            {activeMode.description}
          </p>

          <div className="mt-4 pt-4 border-t border-[#232338]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              ¿Cuándo utilizarlo?
            </h4>
            <p className="text-xs text-zinc-300">
              {activeMode.bestFor}
            </p>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-[#0C0C14] border border-[#1E1E2E] flex items-center justify-between text-xs">
            <span className="text-zinc-400">Atajo alternativo directo para transparencia:</span>
            <div className="flex items-center gap-1">
              <KeyboardKey label="Alt" size="sm" />
              <span className="text-zinc-500">+</span>
              <KeyboardKey label="Z" size="sm" />
              <span className="text-[11px] text-zinc-300 ml-1">(X-Ray)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
