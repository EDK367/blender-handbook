import React, { Suspense } from 'react';
import ShortcutsClient from './ShortcutsClient';

export const metadata = {
  title: 'Atajos de Teclado de Blender — Blender Handbook',
  description: 'Lista completa y verificada de atajos de teclado oficiales de Blender organizados por categorías y contextos.',
};

export default function ShortcutsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-500">Cargando atajos...</div>}>
      <ShortcutsClient />
    </Suspense>
  );
}
