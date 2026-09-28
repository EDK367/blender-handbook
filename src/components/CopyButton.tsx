'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  className = '',
  size = 'sm',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      title="Copiar atajo"
      aria-label="Copiar atajo al portapapeles"
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all duration-200 cursor-pointer ${
        copied
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
          : 'bg-[#181826] text-zinc-400 hover:text-[#00E5FF] hover:bg-[#1E1E32] border border-[#2B2B40] hover:border-[#00E5FF]/40'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className={size === 'sm' ? 'w-3.5 h-3.5 text-emerald-400' : 'w-4 h-4 text-emerald-400'} />
          <span>¡Copiado!</span>
        </>
      ) : (
        <>
          <Copy className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
          <span className="hidden sm:inline">Copiar</span>
        </>
      )}
    </button>
  );
};
