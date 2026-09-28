import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LEARNING_PATHS } from '@/data/learningPaths';
import { COMMANDS } from '@/data/commands';
import { KeyboardKey } from '@/components/KeyboardKey';
import { BookOpen, Clock, CheckCircle2, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Ruta de Aprendizaje: Aprende Blender en 6 Niveles — Blender Handbook',
  description: 'Plan estructurado de 6 niveles para aprender Blender desde cero hasta nivel intermedio y avanzado con ejercicios prácticos.',
};

export default function LearningPathPage() {
  return (
    <div className="space-y-10 pb-16">
      <Breadcrumbs items={[{ label: 'Aprender Blender' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#141026] via-[#0E0E1B] to-[#050509] border border-[#2F244C] p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              Curriculum Paso a Paso
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
              Ruta de Aprendizaje de Blender
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed mt-2">
          Aprender Blender puede resultar intimidante debido a su enorme cantidad de herramientas. Esta ruta estructurada en <strong>6 Niveles</strong> te guía paso a paso con teoría sencilla, atajos clave y ejercicios prácticos desde tus primeros clics hasta técnicas avanzadas.
        </p>

        {/* 6 Level Quick Links */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2">
          {LEARNING_PATHS.map((lvl) => (
            <a
              key={lvl.id}
              href={`#${lvl.id}`}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#141426] hover:bg-[#1E1E34] text-zinc-300 hover:text-[#00E5FF] border border-[#28283E] transition-all"
            >
              Nivel {lvl.level}: {lvl.levelName.split('— ')[1] || lvl.title}
            </a>
          ))}
        </div>
      </div>

      {/* 6 Levels List */}
      <div className="space-y-12">
        {LEARNING_PATHS.map((lesson) => {
          const lessonCommands = COMMANDS.filter((c) => lesson.commands.includes(c.id));

          return (
            <section
              key={lesson.id}
              id={lesson.id}
              className="scroll-mt-24 rounded-3xl bg-[#0D0D16] border border-[#1F1F2E] p-6 sm:p-10 space-y-6"
            >
              {/* Level Badge & Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F1F2E] pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#8B5CF6]/15 text-[#C4B5FD] border border-[#8B5CF6]/30">
                      {lesson.levelName}
                    </span>
                    <span className="text-xs text-zinc-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      {lesson.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-100">
                    {lesson.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#00E5FF] font-medium mt-0.5">
                    {lesson.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {lesson.description}
              </p>

              {/* Key Concepts */}
              <div className="p-5 rounded-2xl bg-[#11111E] border border-[#222238] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Conceptos Clave de este Nivel</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-zinc-300">
                  {lesson.keyConcepts.map((concept, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Commands to Master */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Atajos y Comandos a Dominar ({lessonCommands.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lessonCommands.map((cmd) => (
                    <Link
                      key={cmd.id}
                      href={`/commands/${cmd.id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141424] hover:bg-[#1E1E34] border border-[#24243A] hover:border-[#00E5FF]/40 text-xs transition-colors"
                    >
                      <KeyboardKey label={cmd.shortcut} size="sm" />
                      <span className="font-semibold text-zinc-200">{cmd.name}</span>
                      <span className="text-zinc-500 text-[11px]">({cmd.spanishName})</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Practical Exercise Box */}
              {lesson.practicalSteps.map((practice, pIdx) => (
                <div
                  key={pIdx}
                  className="p-6 rounded-2xl bg-[#0F1420] border border-[#1E2E44] space-y-4"
                >
                  <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{practice.title}</span>
                  </h4>

                  <ol className="space-y-2.5 text-xs text-zinc-300">
                    {practice.steps.map((st, sidx) => (
                      <li key={sidx} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#182638] border border-[#233852] text-[#00E5FF] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {sidx + 1}
                        </span>
                        <span className="leading-relaxed">{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}

              {/* Pro Tips */}
              {lesson.proTips.map((tip, tIdx) => (
                <div
                  key={tIdx}
                  className="p-4 rounded-xl bg-[#14121F] border border-[#2A2342] flex items-start gap-3 text-xs text-zinc-300"
                >
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{tip}</p>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}
