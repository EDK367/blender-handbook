import React from 'react';

interface KeyboardKeyProps {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'cyan' | 'purple' | 'orange' | 'default';
  className?: string;
}

export const KeyboardKey: React.FC<KeyboardKeyProps> = ({
  label,
  size = 'md',
  variant = 'cyan',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'min-w-[1.5rem] h-6 px-1.5 text-xs',
    md: 'min-w-[1.85rem] h-[1.85rem] px-2 text-xs font-semibold',
    lg: 'min-w-[2.5rem] h-9 px-3 text-sm font-semibold',
  };

  const variantClasses = {
    cyan: 'text-[#00E5FF] border-[#2B2B40] border-b-[#00E5FF]/70 hover:border-[#00E5FF] hover:shadow-[0_0_12px_rgba(0,229,255,0.35)]',
    purple: 'text-[#C4B5FD] border-[#2B2B40] border-b-[#8B5CF6]/70 hover:border-[#8B5CF6] hover:shadow-[0_0_12px_rgba(139,92,246,0.35)]',
    orange: 'text-[#FDBA74] border-[#2B2B40] border-b-[#EA7600]/70 hover:border-[#EA7600] hover:shadow-[0_0_12px_rgba(234,118,0,0.35)]',
    default: 'text-zinc-200 border-[#2B2B40] border-b-zinc-500/70 hover:border-zinc-400',
  };

  return (
    <kbd
      className={`inline-flex items-center justify-center font-mono rounded bg-gradient-to-b from-[#181824] to-[#0F0F18] border shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] select-none transition-all duration-150 whitespace-nowrap ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {label}
    </kbd>
  );
};
