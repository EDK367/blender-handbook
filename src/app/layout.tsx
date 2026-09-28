import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Blender Handbook — Guía Práctica y Atajos de Blender en Español',
  description:
    'Manual interactivo y cheat sheet completo de Blender en español con nombres de herramientas y comandos oficiales en inglés. Basado en el Blender Manual oficial.',
  keywords: [
    'Blender',
    'Blender Manual',
    'Atajos Blender',
    'Blender Shortcuts',
    'Blender Cheat Sheet',
    'Modelado 3D',
    'Edit Mode',
    'Object Mode',
    'Extrude',
    'Loop Cut',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-[#050509] text-[#F5F5F5] antialiased selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
        {/* Sticky Global Navigation */}
        <Navbar />

        {/* Global Two-Column Layout (Sidebar + Main Content) */}
        <div className="max-w-7xl mx-auto flex w-full">
          {/* Desktop Left Documentation Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
