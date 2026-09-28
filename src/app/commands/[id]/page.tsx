import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { COMMANDS } from '@/data/commands';
import { KeyboardKey } from '@/components/KeyboardKey';
import { ContextBadge } from '@/components/ContextBadge';
import { CopyButton } from '@/components/CopyButton';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RelatedCommands } from '@/components/RelatedCommands';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Workflow,
  Sparkles,
} from 'lucide-react';

interface CommandPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return COMMANDS.map((cmd) => ({
    id: cmd.id,
  }));
}

export async function generateMetadata({
  params,
}: CommandPageProps): Promise<Metadata> {
  const { id } = await params;
  const cmd = COMMANDS.find((c) => c.id === id);

  if (!cmd) {
    return { title: 'Comando no encontrado — Blender Handbook' };
  }

  return {
    title: `${cmd.name} (${cmd.shortcut}) — Blender Handbook`,
    description: `Guía en español para aprender el comando ${cmd.name} (${cmd.shortcut}) de Blender. ${cmd.description}`,
  };
}

export default async function CommandDetailPage({ params }: CommandPageProps) {
  const { id } = await params;
  const cmdIndex = COMMANDS.findIndex((c) => c.id === id);

  if (cmdIndex === -1) {
    notFound();
  }

  const cmd = COMMANDS[cmdIndex];
  const prevCmd = cmdIndex > 0 ? COMMANDS[cmdIndex - 1] : null;
  const nextCmd = cmdIndex < COMMANDS.length - 1 ? COMMANDS[cmdIndex + 1] : null;

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Comandos', href: '/commands' },
          { label: cmd.categories[0], href: `/shortcuts?category=${encodeURIComponent(cmd.categories[0])}` },
          { label: cmd.name },
        ]}
      />

      {/* Main Command Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#11111E] via-[#0C0C16] to-[#08080F] border border-[#222238] p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Left: Keycaps + Titles */}
          <div className="space-y-4">
            {/* Visual Keys */}
            <div className="flex flex-wrap items-center gap-2">
              {cmd.keys.map((k, i) => (
                <React.Fragment key={i}>
                  <KeyboardKey label={k} size="lg" variant="cyan" />
                  {i < cmd.keys.length - 1 && (
                    <span className="text-zinc-500 font-mono text-lg font-bold">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Official English Name & Spanish Subtitle */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-100 tracking-tight">
                {cmd.name}
              </h1>
              <p className="text-base sm:text-lg text-[#00E5FF] font-medium mt-1">
                {cmd.spanishName}
              </p>
            </div>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono text-zinc-500">Contexto:</span>
              {cmd.contexts.map((ctx) => (
                <ContextBadge key={ctx} context={ctx} size="md" />
              ))}
              <span className="px-3 py-1 rounded-full bg-[#181828] text-xs text-zinc-300 border border-[#2A2A40]">
                {cmd.categories.join(' • ')}
              </span>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start">
            <CopyButton textToCopy={cmd.shortcut} size="md" />
            <FavoriteButton commandId={cmd.id} showText />
            {cmd.officialDocUrl && (
              <a
                href={cmd.officialDocUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#141424] hover:bg-[#1A1A30] text-zinc-300 hover:text-[#00E5FF] border border-[#28283E] hover:border-[#00E5FF]/40 transition-colors"
              >
                <span>Docs Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Detailed Explanation & Steps (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* ¿Qué hace? */}
          <section className="rounded-2xl bg-[#11111A] border border-[#1F1F2E] p-6 space-y-3">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#00E5FF]" />
              <span>¿Qué hace este comando?</span>
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {cmd.detailedHelp || cmd.description}
            </p>
          </section>

          {/* Paso a paso / Ejemplo práctico */}
          {cmd.steps && cmd.steps.length > 0 && (
            <section className="rounded-2xl bg-[#11111A] border border-[#1F1F2E] p-6 space-y-4">
              <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Ejemplo Práctico Paso a Paso</span>
              </h2>

              <ol className="space-y-3">
                {cmd.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="w-6 h-6 rounded-full bg-[#181828] border border-[#2B2B42] text-[#00E5FF] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Variations & Patterns if any */}
          {cmd.variations && cmd.variations.length > 0 && (
            <section className="rounded-2xl bg-[#11111A] border border-[#1F1F2E] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-purple-400" />
                  <span>Variaciones y Atajos Derivados</span>
                </h2>
                {cmd.pattern && (
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#181828] text-amber-300 border border-[#2B2B40]">
                    Patrón: {cmd.pattern}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cmd.variations.map((v, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#0D0D16] border border-[#1E1E30] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#00E5FF]">
                        {v.shortcut}
                      </div>
                      <div className="text-xs font-semibold text-zinc-200 mt-1">
                        {v.name}
                      </div>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-2">
                      {v.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Important Notice or Tips */}
          {cmd.important && (
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-300">
                  Nota Importante
                </h4>
                <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                  {cmd.important}
                </p>
              </div>
            </div>
          )}

          {cmd.tips && cmd.tips.length > 0 && (
            <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/30 p-5 flex items-start gap-3.5">
              <Lightbulb className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#00E5FF]">
                  Consejo Pro
                </h4>
                <div className="text-xs text-cyan-100/90 mt-1 space-y-1">
                  {cmd.tips.map((tip, idx) => (
                    <p key={idx}>{tip}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Quick Reference Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl bg-[#11111A] border border-[#1F1F2E] p-6 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-[#1F1F2E] pb-3">
              Ficha Técnica
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">Nombre Oficial en Inglés</span>
                <span className="font-mono text-zinc-200 text-sm font-bold">
                  {cmd.name}
                </span>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Equivalente Conceptual en Español</span>
                <span className="text-zinc-300 text-sm font-medium">
                  {cmd.spanishName}
                </span>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Atajo por Defecto</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cmd.keys.map((k, i) => (
                    <KeyboardKey key={i} label={k} size="sm" />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Modos Compatibles</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {cmd.contexts.map((ctx) => (
                    <ContextBadge key={ctx} context={ctx} size="sm" />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Categorías</span>
                <div className="text-zinc-300 font-medium">
                  {cmd.categories.join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Commands Network */}
      <RelatedCommands commandIds={cmd.relatedCommandIds} />

      {/* Sequential Next / Previous Navigation Bar */}
      <div className="pt-8 border-t border-[#1F1F2E] flex items-center justify-between gap-4">
        {prevCmd ? (
          <Link
            href={`/commands/${prevCmd.id}`}
            className="flex items-center gap-3 p-3 sm:px-4 sm:py-3 rounded-xl bg-[#11111A] hover:bg-[#181826] border border-[#1F1F2E] hover:border-[#00E5FF]/40 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-500 group-hover:text-[#00E5FF] group-hover:-translate-x-1 transition-all" />
            <div className="text-left">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                Comando Anterior
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-[#00E5FF] truncate block max-w-[150px] sm:max-w-xs">
                {prevCmd.name}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextCmd ? (
          <Link
            href={`/commands/${nextCmd.id}`}
            className="flex items-center gap-3 p-3 sm:px-4 sm:py-3 rounded-xl bg-[#11111A] hover:bg-[#181826] border border-[#1F1F2E] hover:border-[#00E5FF]/40 transition-all group text-right"
          >
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                Comando Siguiente
              </span>
              <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-[#00E5FF] truncate block max-w-[150px] sm:max-w-xs">
                {nextCmd.name}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
