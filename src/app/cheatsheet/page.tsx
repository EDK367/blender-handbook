import React from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { KeyboardKey } from '@/components/KeyboardKey';
import { CopyButton } from '@/components/CopyButton';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Zap, ExternalLink, Printer } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Blender Cheat Sheet Rápido — Blender Handbook',
  description: 'Hoja de referencia rápida de Blender con los atajos más esenciales organizados por categorías para consulta inmediata.',
};

interface CheatItem {
  shortcut: string;
  keys: string[];
  command: string;
  spanish: string;
  id?: string;
  context?: string;
}

const CHEAT_GROUPS: { category: string; description: string; items: CheatItem[] }[] = [
  {
    category: 'Comandos Básicos (Basic)',
    description: 'Atajos universales para el flujo diario en Blender.',
    items: [
      { shortcut: 'A', keys: ['A'], command: 'Select All', spanish: 'Seleccionar todo', id: 'select-all' },
      { shortcut: 'Alt + A', keys: ['Alt', 'A'], command: 'Select None', spanish: 'Deseleccionar todo', id: 'select-none' },
      { shortcut: 'G', keys: ['G'], command: 'Move (Grab)', spanish: 'Mover selección libremente', id: 'move' },
      { shortcut: 'R', keys: ['R'], command: 'Rotate', spanish: 'Rotar selección', id: 'rotate' },
      { shortcut: 'S', keys: ['S'], command: 'Scale', spanish: 'Escalar selección', id: 'scale' },
      { shortcut: 'X / Del', keys: ['X'], command: 'Delete', spanish: 'Borrar objeto o elemento', id: 'delete-object' },
      { shortcut: 'Shift + D', keys: ['Shift', 'D'], command: 'Duplicate', spanish: 'Duplicar objeto o malla', id: 'duplicate' },
      { shortcut: 'Alt + D', keys: ['Alt', 'D'], command: 'Duplicate Linked', spanish: 'Duplicar instancia vinculada', id: 'duplicate-linked' },
      { shortcut: 'Ctrl + Z', keys: ['Ctrl', 'Z'], command: 'Undo', spanish: 'Deshacer último paso', id: 'undo' },
      { shortcut: 'Ctrl + Shift + Z', keys: ['Ctrl', 'Shift', 'Z'], command: 'Redo', spanish: 'Rehacer paso', id: 'redo' },
      { shortcut: 'F3', keys: ['F3'], command: 'Operator Search', spanish: 'Buscador universal de herramientas', id: 'search-operator' },
      { shortcut: 'Tab', keys: ['Tab'], command: 'Toggle Edit Mode', spanish: 'Alternar Object / Edit Mode', id: 'toggle-edit-mode' },
      { shortcut: 'Z', keys: ['Z'], command: 'Shading Pie Menu', spanish: 'Menú radial Solid/Wire/Render', id: 'shading-pie-menu' },
      { shortcut: 'Alt + Z', keys: ['Alt', 'Z'], command: 'Toggle X-Ray', spanish: 'Alternar transparencia de rayos X', id: 'toggle-xray' },
      { shortcut: 'N', keys: ['N'], command: 'Toggle Sidebar', spanish: 'Mostrar/ocultar N-Panel derecho', id: 'toggle-sidebar-n' },
      { shortcut: 'T', keys: ['T'], command: 'Toggle Toolbar', spanish: 'Mostrar/ocultar T-Panel izquierdo', id: 'toggle-toolbar-t' },
      { shortcut: 'Ctrl + Space', keys: ['Ctrl', 'Space'], command: 'Maximize Area', spanish: 'Maximizar panel a pantalla completa', id: 'maximize-area' },
    ],
  },
  {
    category: 'Restricción de Ejes (Axis Constraints)',
    description: 'Combina el operador con una letra de eje o pulsa Enter para valores exactos.',
    items: [
      { shortcut: 'G + X', keys: ['G', 'X'], command: 'Move X', spanish: 'Mover únicamente en eje X (Rojo)' },
      { shortcut: 'G + Y', keys: ['G', 'Y'], command: 'Move Y', spanish: 'Mover únicamente en eje Y (Verde)' },
      { shortcut: 'G + Z', keys: ['G', 'Z'], command: 'Move Z', spanish: 'Mover únicamente en eje Z (Azul)' },
      { shortcut: 'R + X', keys: ['R', 'X'], command: 'Rotate X', spanish: 'Rotar alrededor del eje X' },
      { shortcut: 'R + Y', keys: ['R', 'Y'], command: 'Rotate Y', spanish: 'Rotar alrededor del eje Y' },
      { shortcut: 'R + Z', keys: ['R', 'Z'], command: 'Rotate Z', spanish: 'Rotar alrededor del eje Z' },
      { shortcut: 'S + X', keys: ['S', 'X'], command: 'Scale X', spanish: 'Escalar únicamente en el eje X' },
      { shortcut: 'S + Y', keys: ['S', 'Y'], command: 'Scale Y', spanish: 'Escalar únicamente en el eje Y' },
      { shortcut: 'S + Z', keys: ['S', 'Z'], command: 'Scale Z', spanish: 'Escalar únicamente en el eje Z' },
      { shortcut: 'G + Shift + Z', keys: ['G', 'Shift', 'Z'], command: 'Move XY Plane', spanish: 'Mover en el suelo (excluyendo altura Z)' },
      { shortcut: 'S + Shift + Z', keys: ['S', 'Shift', 'Z'], command: 'Scale XY Plane', spanish: 'Escalar grosor horizontal manteniendo altura' },
      { shortcut: 'R + R', keys: ['R', 'R'], command: 'Trackball Rotate', spanish: 'Rotación esférica libre tipo trackball' },
    ],
  },
  {
    category: 'Modo Edición (Edit Mode)',
    description: 'Operaciones para modelar la geometría interna.',
    items: [
      { shortcut: '1', keys: ['1'], command: 'Vertex Select', spanish: 'Seleccionar vértices individuales', id: 'vertex-select' },
      { shortcut: '2', keys: ['2'], command: 'Edge Select', spanish: 'Seleccionar aristas / bordes', id: 'edge-select' },
      { shortcut: '3', keys: ['3'], command: 'Face Select', spanish: 'Seleccionar caras poligonales', id: 'face-select' },
      { shortcut: 'E', keys: ['E'], command: 'Extrude Region', spanish: 'Extruir volumen en la normal', id: 'extrude-region' },
      { shortcut: 'Alt + E', keys: ['Alt', 'E'], command: 'Extrude Menu', spanish: 'Extruir normales o caras individuales', id: 'extrude-along-normals' },
      { shortcut: 'I', keys: ['I'], command: 'Inset Faces', spanish: 'Insertar cara concéntrica interna', id: 'inset-faces' },
      { shortcut: 'Ctrl + R', keys: ['Ctrl', 'R'], command: 'Loop Cut and Slide', spanish: 'Insertar anillo de aristas', id: 'loop-cut' },
      { shortcut: 'Ctrl + B', keys: ['Ctrl', 'B'], command: 'Bevel', spanish: 'Biselar aristas / esquinas', id: 'bevel' },
      { shortcut: 'K', keys: ['K'], command: 'Knife Tool', spanish: 'Corte libre de cuchillo', id: 'knife-tool' },
      { shortcut: 'M', keys: ['M'], command: 'Merge Vertices', spanish: 'Unir / colapsar vértices en uno', id: 'merge' },
      { shortcut: 'F', keys: ['F'], command: 'Fill / Make Face', spanish: 'Crear cara o arista cerrando hueco', id: 'make-face-edge' },
      { shortcut: 'Ctrl + X', keys: ['Ctrl', 'X'], command: 'Dissolve', spanish: 'Disolver arista o vértice sin hueco', id: 'dissolve-selection' },
      { shortcut: 'G + G', keys: ['G', 'G'], command: 'Edge Slide', spanish: 'Deslizar arista sobre la superficie', id: 'edge-slide' },
      { shortcut: 'O', keys: ['O'], command: 'Proportional Editing', spanish: 'Edición proporcional con radio suave', id: 'proportional-editing' },
      { shortcut: 'Alt + S', keys: ['Alt', 'S'], command: 'Shrink / Fatten', spanish: 'Inflar o adelgazar la geometría', id: 'shrink-fatten' },
      { shortcut: 'P', keys: ['P'], command: 'Separate', spanish: 'Separar geometría en nuevo objeto', id: 'separate' },
    ],
  },
  {
    category: 'Navegación y Vistas (Navigation)',
    description: 'Control de la cámara del visor 3D.',
    items: [
      { shortcut: 'MMB', keys: ['MMB'], command: 'Orbit View', spanish: 'Rotar la cámara en 360°', id: 'orbit-view' },
      { shortcut: 'Shift + MMB', keys: ['Shift', 'MMB'], command: 'Pan View', spanish: 'Desplazar lateralmente la vista', id: 'pan-view' },
      { shortcut: 'Ctrl + MMB', keys: ['Ctrl', 'MMB'], command: 'Zoom View', spanish: 'Zoom ultrasuave continuo', id: 'zoom-view' },
      { shortcut: 'Numpad 1', keys: ['Numpad 1'], command: 'Front View', spanish: 'Vista ortográfica frontal', id: 'front-view' },
      { shortcut: 'Numpad 3', keys: ['Numpad 3'], command: 'Right View', spanish: 'Vista ortográfica lateral derecha', id: 'right-view' },
      { shortcut: 'Numpad 7', keys: ['Numpad 7'], command: 'Top View', spanish: 'Vista ortográfica superior (planta)', id: 'top-view' },
      { shortcut: 'Numpad 5', keys: ['Numpad 5'], command: 'Toggle Ortho/Persp', spanish: 'Alternar perspectiva / isométrica', id: 'ortho-persp-toggle' },
      { shortcut: 'Numpad 0', keys: ['Numpad 0'], command: 'Camera View', spanish: 'Mirar a través de la cámara activa', id: 'camera-view' },
      { shortcut: 'Ctrl + Alt + Num 0', keys: ['Ctrl', 'Alt', 'Num 0'], command: 'Align Camera to View', spanish: 'Alinear cámara a lo que estás viendo', id: 'align-camera-to-view' },
      { shortcut: 'Numpad .', keys: ['Numpad .'], command: 'View Selected', spanish: 'Enfocar y centrar en el objeto seleccionado', id: 'view-selected' },
      { shortcut: 'Home', keys: ['Home'], command: 'View All', spanish: 'Encuadrar toda la escena', id: 'view-all' },
      { shortcut: '~', keys: ['~'], command: 'Navigation Pie Menu', spanish: 'Menú radial de vistas ortográficas', id: 'navigation-pie-menu' },
    ],
  },
  {
    category: 'Renderizado y Animación (Render & Animation)',
    description: 'Cálculo de imagen final y control de la línea de tiempo.',
    items: [
      { shortcut: 'F12', keys: ['F12'], command: 'Render Image', spanish: 'Renderizar fotograma final', id: 'render-image' },
      { shortcut: 'Ctrl + F12', keys: ['Ctrl', 'F12'], command: 'Render Animation', spanish: 'Renderizar vídeo o secuencia', id: 'render-animation' },
      { shortcut: 'F11', keys: ['F11'], command: 'View Render', spanish: 'Ver último render guardado', id: 'view-render' },
      { shortcut: 'Ctrl + B', keys: ['Ctrl', 'B'], command: 'Render Region', spanish: 'Definir recuadro de render rápido', id: 'render-region' },
      { shortcut: 'Spacebar', keys: ['Space'], command: 'Play / Pause', spanish: 'Reproducir o pausar animación', id: 'play-animation' },
      { shortcut: 'I', keys: ['I'], command: 'Insert Keyframe', spanish: 'Grabar fotograma clave de animación', id: 'insert-keyframe' },
      { shortcut: 'Alt + I', keys: ['Alt', 'I'], command: 'Delete Keyframe', spanish: 'Borrar fotograma clave', id: 'delete-keyframe' },
    ],
  },
];

export default function CheatSheetPage() {
  return (
    <div className="space-y-10 pb-16">
      <Breadcrumbs items={[{ label: 'Cheat Sheet' }]} />

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#131122] via-[#0E0E18] to-[#050509] border border-[#2A2344] p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
              Referencia Rápida de Alta Densidad
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100">
            Blender Cheat Sheet
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Todas las operaciones fundamentales condensadas para tener en pantalla mientras trabajas. Haz clic en el botón de copiar para pegar cualquier combinación.
          </p>
        </div>
      </div>

      {/* Cheat Sheet Sections */}
      <div className="space-y-8">
        {CHEAT_GROUPS.map((group, gIdx) => (
          <div
            key={gIdx}
            className="rounded-2xl bg-[#0D0D16] border border-[#1F1F2E] overflow-hidden"
          >
            {/* Category Header */}
            <div className="px-6 py-4 bg-[#11111E] border-b border-[#1F1F2E] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h2 className="text-base font-bold text-zinc-100">
                  {group.category}
                </h2>
                <p className="text-xs text-zinc-400">
                  {group.description}
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-400 shrink-0">
                {group.items.length} atajos
              </span>
            </div>

            {/* Dense Items Table */}
            <div className="divide-y divide-[#1A1A28]">
              {group.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-6 py-3 hover:bg-[#141424] transition-colors group"
                >
                  {/* Left: Keycaps */}
                  <div className="flex items-center gap-1.5 w-48 sm:w-56 shrink-0">
                    {item.keys.map((k, kIdx) => (
                      <React.Fragment key={kIdx}>
                        <KeyboardKey label={k} size="sm" />
                        {kIdx < item.keys.length - 1 && (
                          <span className="text-zinc-600 text-xs font-bold">+</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Center: Command + Spanish description */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2">
                      {item.id ? (
                        <Link
                          href={`/commands/${item.id}`}
                          className="text-xs sm:text-sm font-bold text-zinc-200 hover:text-[#00E5FF] transition-colors truncate"
                        >
                          {item.command}
                        </Link>
                      ) : (
                        <span className="text-xs sm:text-sm font-bold text-zinc-200 truncate">
                          {item.command}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] sm:text-xs text-zinc-400 truncate">
                      {item.spanish}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <CopyButton textToCopy={item.shortcut} size="sm" />
                    {item.id && <FavoriteButton commandId={item.id} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
