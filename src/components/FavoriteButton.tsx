'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  commandId: string;
  className?: string;
  showText?: boolean;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  commandId,
  className = '',
  showText = false,
}) => {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const favorited = isLoaded && isFavorite(commandId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(commandId);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      title={favorited ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
      aria-label={favorited ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all duration-200 cursor-pointer ${
        favorited
          ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
          : 'bg-[#181826] text-zinc-400 hover:text-amber-300 hover:bg-[#1E1E32] border border-[#2B2B40] hover:border-amber-400/30'
      } ${className}`}
    >
      <Star
        className={`w-3.5 h-3.5 transition-transform duration-200 ${
          favorited ? 'fill-amber-400 text-amber-400 scale-110' : 'text-zinc-400'
        }`}
      />
      {showText && (
        <span>{favorited ? 'En favoritos' : 'Añadir a favoritos'}</span>
      )}
    </button>
  );
};
