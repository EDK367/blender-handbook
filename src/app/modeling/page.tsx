import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CommandCard } from '@/components/CommandCard';
import { COMMANDS } from '@/data/commands';
import { KeyboardKey } from '@/components/KeyboardKey';
import { Layers, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Guía de Modelado 3D (Modeling) — Blender Handbook',
  description: 'Manual de modelado poligonal en Blender: Extrude, Loop Cut, Bevel, Inset, Knife y mini-guías prácticas paso a paso.',
};

export default function ModelingPage() {
  const modelingCommands = COMMANDS.filter((c) =>
    c.categories.includes('Modeling') || c.categories.includes('Mesh Editing')
  );

  const miniGuides = [
    {
      title: 'Cómo mover un objeto con precisión',
      steps: [
        'Selecciona el objeto en Object Mode.',
        'Presiona G.',
        'Presiona X, Y o Z para confinar el movimiento al eje deseado.',
        'Escribe un número (ej: 2) para desplazarlo exactamente esa distancia.',
        'Presiona Enter o haz clic izquierdo para confirmar.',
      ],
      keys: ['G', 'X', '2', 'Enter'],
    },
    {
      title: 'Cómo rotar un objeto 90 grados',
      steps: [
        'Selecciona el objeto en la escena.',
        'Presiona R.',
        'Presiona Z para rotar en torno al eje vertical.',
        'Escribe 90 en tu teclado numérico.',
        'Presiona Enter para aplicar la rotación exacta.',
      ],
      keys: ['R', 'Z', '90', 'Enter'],
    },
    {
      title: 'Cómo duplicar el tamaño al doble',
      steps: [
        'Selecciona el objeto o cara.',
        'Presiona S.',
        'Escribe 2 (factor multiplicador).',
        'Presiona Enter para confirmar.',
      ],
      keys: ['S', '2', 'Enter'],
    },
    {
      title: 'Cómo extruir una cara y darle volumen',
      steps: [
        'Entra a Edit Mode con Tab.',
        'Presiona 3 para activar Face Select Mode.',
        'Haz clic en la cara superior.',
        'Presiona E y mueve el ratón hacia arriba.',
        'Haz clic izquierdo para fijar la nueva altura.',
      ],
      keys: ['Tab', '3', 'E'],
    },
    {
      title: 'Cómo redondear aristas con bisel (Bevel)',
      steps: [
        'En Edit Mode, presiona 2 para Edge Select Mode.',
        'Selecciona las aristas exteriores del modelo.',
        'Presiona Ctrl + B y desliza el ratón para abrir el ancho del chaflán.',
        'Gira la rueda del ratón (Scroll Wheel) hacia arriba para añadir segmentos curvos.',
        'Haz clic para confirmar el biselado suave.',
      ],
      keys: ['Ctrl', 'B', 'Wheel'],
    },
    {
      title: 'Cómo añadir un corte circular (Loop Cut)',
      steps: [
        'En Edit Mode, presiona Ctrl + R.',
        'Pasa el cursor sobre la malla hasta ver la línea de previsualización amarilla.',
        'Gira la rueda del ratón si quieres más cortes paralelos.',
        'Haz clic izquierdo para crearlo, deslízalo y vuelve a hacer clic.',
      ],
      keys: ['Ctrl', 'R'],
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      <Breadcrumbs items={[{ label: 'Modelado 3D' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#12101F] via-[#0E0E18] to-[#050509] border border-[#2B2344] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase tracking-wider">
              Técnicas Poligonales
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Modelado 3D (Modeling)
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-2">
          El modelado poligonal es el arte de esculpir formas precisas a partir de primitivas geométricas básicas. Domina el corte de bucles, extrusiones, biseles y la unión de vértices para construir cualquier modelo.
        </p>
      </div>

      {/* Mini Guías Prácticas */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#1F1F2E] pb-3">
          <div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Mini-Guías Prácticas Paso a Paso</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Fórmulas y secuencias de teclas habituales para resolver tareas cotidianas en segundos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {miniGuides.map((guide, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#11111A] border border-[#1F1F2E] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 flex-wrap mb-3">
                  {guide.keys.map((k, i) => (
                    <React.Fragment key={i}>
                      <KeyboardKey label={k} size="sm" variant={i === 0 ? 'cyan' : 'default'} />
                      {i < guide.keys.length - 1 && (
                        <span className="text-zinc-600 text-xs font-mono font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <h3 className="text-sm font-bold text-zinc-100 mb-3">
                  {guide.title}
                </h3>

                <ol className="space-y-2 text-xs text-zinc-400">
                  {guide.steps.map((st, sidx) => (
                    <li key={sidx} className="flex items-start gap-2">
                      <span className="text-[#00E5FF] font-mono font-bold shrink-0">{sidx + 1}.</span>
                      <span className="leading-relaxed">{st}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modeling Commands Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#00E5FF]" />
          <span>Comandos y Herramientas de Modelado</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modelingCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      </section>
    </div>
  );
}
