import React from 'react';
import Link from 'next/link';
import { CategoryInfo } from '@/types';
import {
  MousePointer,
  Move,
  Compass,
  Box,
  PenTool,
  Layers,
  Grid,
  Sparkles,
  Maximize2,
  Sun,
  Palette,
  Workflow,
  Film,
  Cpu,
  Camera,
  Sliders,
  Video,
  Code,
  Settings,
  ArrowRight,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  MousePointer,
  Move,
  Compass,
  Box,
  PenTool,
  Layers,
  Grid,
  Sparkles,
  Maximize2,
  Sun,
  Palette,
  Workflow,
  Film,
  Cpu,
  Camera,
  Sliders,
  Video,
  Code,
  Settings,
};

interface CategoryCardProps {
  category: CategoryInfo;
  commandCount?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, commandCount }) => {
  const IconComponent = ICON_MAP[category.iconName] || Layers;

  return (
    <Link
      href={`/shortcuts?category=${encodeURIComponent(category.id)}`}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#11111A] border border-[#1F1F2E] hover:border-[#00E5FF]/60 hover:shadow-[0_8px_30px_rgba(0,229,255,0.12)] transition-all duration-200 overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#181828] to-[#121220] border border-[#2B2B42] flex items-center justify-center text-[#00E5FF] group-hover:scale-105 group-hover:border-[#00E5FF]/50 transition-all">
            <IconComponent className="w-5 h-5" />
          </div>

          {commandCount !== undefined && (
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-[#181826] text-zinc-400 border border-[#28283C]">
              {commandCount} {commandCount === 1 ? 'comando' : 'comandos'}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-zinc-100 group-hover:text-[#00E5FF] transition-colors flex items-center justify-between">
          <span>{category.name}</span>
          <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
        </h3>
        <p className="text-xs text-[#00E5FF]/80 font-medium mt-0.5">
          {category.spanishName}
        </p>

        <p className="text-xs text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#1F1F2E]/60 text-[11px] text-zinc-500 font-medium flex items-center justify-between">
        <span>Ver atajos y herramientas</span>
        <span className="text-zinc-600 group-hover:text-zinc-400">→</span>
      </div>
    </Link>
  );
};
