import React from 'react';
import { BlenderContext } from '@/types';

interface ContextBadgeProps {
  context: BlenderContext | string;
  size?: 'sm' | 'md';
}

const contextStyles: Record<string, string> = {
  'Object Mode': 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  'Edit Mode': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
  'Sculpt Mode': 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  'Pose Mode': 'bg-purple-500/10 text-purple-300 border-purple-500/30',
  '3D Viewport': 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  'UV Editor': 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  'Shader Editor': 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
  'Geometry Node Editor': 'bg-teal-500/10 text-teal-300 border-teal-500/30',
  'Compositor': 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30',
  'Timeline': 'bg-orange-500/10 text-orange-300 border-orange-500/30',
  'Graph Editor': 'bg-violet-500/10 text-violet-300 border-violet-500/30',
  'General': 'bg-zinc-800/60 text-zinc-300 border-zinc-700/50',
  'All Modes': 'bg-cyan-500/10 text-[#00E5FF] border-[#00E5FF]/40',
};

export const ContextBadge: React.FC<ContextBadgeProps> = ({ context, size = 'sm' }) => {
  const style = contextStyles[context] || 'bg-zinc-800/60 text-zinc-300 border-zinc-700/50';
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border tracking-wide whitespace-nowrap ${sizeClasses} ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {context}
    </span>
  );
};
