import React from 'react';
import { COMMANDS } from '@/data/commands';
import { CommandCard } from './CommandCard';
import { Network } from 'lucide-react';

interface RelatedCommandsProps {
  commandIds: string[];
}

export const RelatedCommands: React.FC<RelatedCommandsProps> = ({ commandIds }) => {
  const related = COMMANDS.filter((c) => commandIds.includes(c.id));

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-[#1F1F2E]">
      <div className="flex items-center gap-2 mb-6">
        <Network className="w-5 h-5 text-[#00E5FF]" />
        <h3 className="text-lg font-bold text-zinc-100">
          Comandos Relacionados
        </h3>
        <span className="text-xs font-mono text-zinc-500">
          ({related.length})
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((cmd) => (
          <CommandCard key={cmd.id} command={cmd} compact />
        ))}
      </div>
    </div>
  );
};
