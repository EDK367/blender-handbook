'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { BlenderCommand } from '@/types';
import { KeyboardKey } from './KeyboardKey';
import { ContextBadge } from './ContextBadge';
import { CopyButton } from './CopyButton';
import { FavoriteButton } from './FavoriteButton';

interface CommandCardProps {
  command: BlenderCommand;
  compact?: boolean;
}

export const CommandCard: React.FC<CommandCardProps> = ({ command, compact = false }) => {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-xl bg-[#11111A] border border-[#1F1F2E] hover:border-[#00E5FF]/50 hover:shadow-[0_4px_24px_rgba(0,229,255,0.1)] transition-all duration-200 overflow-hidden ${
        compact ? 'p-4' : 'p-5'
      }`}
    >
      {/* Top Header: Shortcut + Action buttons */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Keycaps */}
          <div className="flex flex-wrap items-center gap-1.5">
            {command.keys.map((k, idx) => (
              <React.Fragment key={idx}>
                <KeyboardKey label={k} size={compact ? 'sm' : 'md'} />
                {idx < command.keys.length - 1 && (
                  <span className="text-zinc-500 text-xs font-mono font-bold">+</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <CopyButton textToCopy={command.shortcut} size="sm" />
            <FavoriteButton commandId={command.id} />
          </div>
        </div>

        {/* Command Names: Official in English, Spanish translation underneath */}
        <Link href={`/commands/${command.id}`} className="block group-hover:text-[#00E5FF] transition-colors">
          <h3 className="text-base font-bold text-zinc-100 flex items-center justify-between gap-2">
            <span>{command.name}</span>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all shrink-0" />
          </h3>
          <p className="text-xs text-[#00E5FF]/80 font-medium mt-0.5">
            {command.spanishName}
          </p>
        </Link>

        {/* Description in Spanish */}
        <p className={`text-xs text-zinc-400 mt-2.5 leading-relaxed ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {command.description}
        </p>
      </div>

      {/* Footer: Contexts & Categories */}
      <div className="mt-4 pt-3 border-t border-[#1F1F2E]/80 flex flex-col gap-2">
        {/* Context chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {command.contexts.slice(0, 2).map((ctx) => (
            <ContextBadge key={ctx} context={ctx} size="sm" />
          ))}
          {command.contexts.length > 2 && (
            <span className="text-[10px] text-zinc-500 font-mono">
              +{command.contexts.length - 2}
            </span>
          )}
        </div>

        {/* Category tag */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#8B5CF6]" />
            <span>{command.categories[0]}</span>
          </span>
          {command.pattern && (
            <span className="font-mono text-[10px] text-amber-400/90 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
              {command.pattern}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
