import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';

export const VersionBadge: React.FC = () => {
  return (
    <Link
      href="/versions"
      title="Versión de referencia oficial: Blender 5.x / 4.x"
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#161624] hover:bg-[#1E1E34] text-xs font-mono font-medium text-zinc-300 hover:text-[#00E5FF] border border-[#2B2B40] hover:border-[#00E5FF]/40 transition-all shrink-0"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-zinc-400">Blender</span>
      <span className="font-bold text-zinc-100">5.x</span>
      <Layers className="w-3 h-3 text-zinc-500 ml-0.5" />
    </Link>
  );
};
