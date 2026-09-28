'use client';

import React, { useMemo } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { useFavorites } from '@/hooks/useFavorites';
import { COMMANDS } from '@/data/commands';
import { CommandCard } from '@/components/CommandCard';
import { Star, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  const favoriteCommands = useMemo(() => {
    return COMMANDS.filter((cmd) => favorites.includes(cmd.id));
  }, [favorites]);

  const handleClearAll = () => {
    if (confirm('¿Estás seguro de que deseas eliminar todos tus comandos favoritos guardados?')) {
      try {
        localStorage.removeItem('blender_handbook_favorites');
        window.dispatchEvent(new Event('blender_favorites_changed'));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumbs items={[{ label: 'Comandos Favoritos' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1A1408] via-[#120F08] to-[#07070D] border border-[#3A2B14] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/30">
              <Star className="w-7 h-7 fill-amber-400/50" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                Guardados en tu Navegador
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
                Mis Comandos Favoritos
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed mt-2">
            Tus atajos y herramientas marcadas con la estrella (☆) se guardan localmente para que puedas consultarlos al instante mientras trabajas en Blender.
          </p>
        </div>

        {favoriteCommands.length > 0 && (
          <button
            onClick={handleClearAll}
            type="button"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer self-start md:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Limpiar todos los favoritos</span>
          </button>
        )}
      </div>

      {/* Favorites Content */}
      {!isLoaded ? (
        <div className="py-16 text-center text-zinc-500">
          Cargando favoritos guardados...
        </div>
      ) : favoriteCommands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteCommands.map((cmd) => (
            <CommandCard key={cmd.id} command={cmd} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-[#0D0D16] border border-[#1F1F2E] p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#141424] border border-[#232338] flex items-center justify-center mx-auto text-amber-400/60">
            <Star className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-200">
              No tienes ningún favorito guardado
            </h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Explora la lista de atajos o comandos y haz clic en la estrella para guardarlos en esta sección.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/shortcuts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30 text-xs font-semibold transition-all"
            >
              <span>Explorar atajos ahora</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
