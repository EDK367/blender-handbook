import React from 'react';
import Link from 'next/link';
import { BlenderCommand } from '@/types';
import { KeyboardKey } from './KeyboardKey';
import { ContextBadge } from './ContextBadge';
import { CopyButton } from './CopyButton';
import { FavoriteButton } from './FavoriteButton';
import { ExternalLink } from 'lucide-react';

interface CommandTableProps {
  commands: BlenderCommand[];
  showCategory?: boolean;
}

export const CommandTable: React.FC<CommandTableProps> = ({
  commands,
  showCategory = true,
}) => {
  if (commands.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500 bg-[#11111A] rounded-xl border border-[#1F1F2E]">
        No se encontraron comandos con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#1F1F2E] bg-[#11111A]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#0B0B12] text-xs uppercase tracking-wider text-zinc-400 border-b border-[#1F1F2E]">
          <tr>
            <th scope="col" className="py-3.5 px-4 w-44">Atajo (Shortcut)</th>
            <th scope="col" className="py-3.5 px-4">Comando (Blender)</th>
            <th scope="col" className="py-3.5 px-4 hidden md:table-cell">Descripción (Español)</th>
            <th scope="col" className="py-3.5 px-4 hidden lg:table-cell">Contexto</th>
            {showCategory && <th scope="col" className="py-3.5 px-4 hidden sm:table-cell">Categoría</th>}
            <th scope="col" className="py-3.5 px-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1F1F2E]/60 text-zinc-300">
          {commands.map((cmd) => (
            <tr
              key={cmd.id}
              className="hover:bg-[#161622] transition-colors group"
            >
              {/* Shortcut Keycaps */}
              <td className="py-3 px-4 font-mono whitespace-nowrap">
                <div className="flex flex-wrap items-center gap-1">
                  {cmd.keys.map((k, idx) => (
                    <React.Fragment key={idx}>
                      <KeyboardKey label={k} size="sm" />
                      {idx < cmd.keys.length - 1 && (
                        <span className="text-zinc-600 text-xs font-bold">+</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </td>

              {/* Official English Name + Spanish Subtitle */}
              <td className="py-3 px-4">
                <Link
                  href={`/commands/${cmd.id}`}
                  className="font-semibold text-zinc-100 group-hover:text-[#00E5FF] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{cmd.name}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-[#00E5FF] shrink-0" />
                </Link>
                <div className="text-xs text-[#00E5FF]/70 font-medium">
                  {cmd.spanishName}
                </div>
              </td>

              {/* Spanish Description */}
              <td className="py-3 px-4 text-xs text-zinc-400 max-w-md hidden md:table-cell">
                <span className="line-clamp-2">{cmd.description}</span>
              </td>

              {/* Contexts */}
              <td className="py-3 px-4 hidden lg:table-cell">
                <div className="flex flex-wrap gap-1">
                  {cmd.contexts.slice(0, 2).map((ctx) => (
                    <ContextBadge key={ctx} context={ctx} size="sm" />
                  ))}
                  {cmd.contexts.length > 2 && (
                    <span className="text-[10px] text-zinc-500 font-mono">
                      +{cmd.contexts.length - 2}
                    </span>
                  )}
                </div>
              </td>

              {/* Category */}
              {showCategory && (
                <td className="py-3 px-4 text-xs text-zinc-400 hidden sm:table-cell whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-[#181826] border border-[#2B2B40] text-zinc-300">
                    {cmd.categories[0]}
                  </span>
                </td>
              )}

              {/* Action buttons */}
              <td className="py-3 px-4 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-1.5">
                  <CopyButton textToCopy={cmd.shortcut} size="sm" />
                  <FavoriteButton commandId={cmd.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
