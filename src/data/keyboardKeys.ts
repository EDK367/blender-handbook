import { KeyItem } from '@/types';

export const KEYBOARD_KEYS: KeyItem[] = [
  // Letters A-Z
  { key: 'A', label: 'A', group: 'letter', description: 'Select All, Add Object (Shift+A), Apply (Ctrl+A), Select None (Alt+A)' },
  { key: 'B', label: 'B', group: 'letter', description: 'Box Select, Bevel (Ctrl+B), Render Region (Ctrl+B en Viewport)' },
  { key: 'C', label: 'C', group: 'letter', description: 'Circle Select, Center to Cursor (Shift+C)' },
  { key: 'D', label: 'D', group: 'letter', description: 'Duplicate (Shift+D), Duplicate Linked (Alt+D)' },
  { key: 'E', label: 'E', group: 'letter', description: 'Extrude Region, Extrude Menu (Alt+E)' },
  { key: 'F', label: 'F', group: 'letter', description: 'Fill / Make Face, Brush Size (Sculpt), Focus View' },
  { key: 'G', label: 'G', group: 'letter', description: 'Move / Grab, Edge Slide (G+G), Clear Location (Alt+G)' },
  { key: 'H', label: 'H', group: 'letter', description: 'Hide Selected, Unhide All (Alt+H), Hide Unselected (Shift+H)' },
  { key: 'I', label: 'I', group: 'letter', description: 'Inset Faces, Insert Keyframe, Invert Selection (Ctrl+I)' },
  { key: 'J', label: 'J', group: 'letter', description: 'Connect Vertex Path, Join Objects (Ctrl+J)' },
  { key: 'K', label: 'K', group: 'letter', description: 'Knife Tool (Corte libre)' },
  { key: 'L', label: 'L', group: 'letter', description: 'Select Linked (Seleccionar elementos conectados)' },
  { key: 'M', label: 'M', group: 'letter', description: 'Merge (Vértices), Move to Collection, Mute Node' },
  { key: 'N', label: 'N', group: 'letter', description: 'Toggle Sidebar / Properties Shelf (N-Panel)' },
  { key: 'O', label: 'O', group: 'letter', description: 'Proportional Editing Toggle, Falloff Type (Shift+O)' },
  { key: 'P', label: 'P', group: 'letter', description: 'Separate (Edit Mode), Set Parent (Ctrl+P), Clear Parent (Alt+P)' },
  { key: 'Q', label: 'Q', group: 'letter', description: 'Quick Favorites Menu' },
  { key: 'R', label: 'R', group: 'letter', description: 'Rotate, Trackball (R+R), Loop Cut (Ctrl+R), Clear Rotation (Alt+R)' },
  { key: 'S', label: 'S', group: 'letter', description: 'Scale, Save (Ctrl+S), Shrink/Fatten (Alt+S), Clear Scale (Alt+S)' },
  { key: 'T', label: 'T', group: 'letter', description: 'Toggle Toolbar (T-Panel)' },
  { key: 'U', label: 'U', group: 'letter', description: 'UV Unwrap Menu (Edit Mode)' },
  { key: 'V', label: 'V', group: 'letter', description: 'Rip Region, Vertex Slide (Shift+V)' },
  { key: 'W', label: 'W', group: 'letter', description: 'Context Menu (Special / Selection Box toggle)' },
  { key: 'X', label: 'X', group: 'letter', description: 'Delete Menu, Dissolve (Ctrl+X), Restrict to X Axis' },
  { key: 'Y', label: 'Y', group: 'letter', description: 'Split Mesh, Restrict to Y Axis' },
  { key: 'Z', label: 'Z', group: 'letter', description: 'Shading Pie Menu (Solid/Wire/Mat/Render), X-Ray (Alt+Z), Undo (Ctrl+Z)' },

  // Numbers (Top Row)
  { key: '1', label: '1', group: 'number', description: 'Vertex Select Mode (Edit Mode)' },
  { key: '2', label: '2', group: 'number', description: 'Edge Select Mode (Edit Mode)' },
  { key: '3', label: '3', group: 'number', description: 'Face Select Mode (Edit Mode)' },

  // Modifiers & Specials
  { key: 'Ctrl', label: 'Ctrl', group: 'modifier', description: 'Modificador para atajos clave, inversión de snap y combinaciones de sistema' },
  { key: 'Shift', label: 'Shift', group: 'modifier', description: 'Modificador para creación (Shift+A), precisión lenta y duplicación (Shift+D)' },
  { key: 'Alt', label: 'Alt', group: 'modifier', description: 'Modificador para limpieza/reseteo (Alt+G/R/S), bucles (Alt+LMB) y menús alternativos' },
  { key: 'Space', label: 'Space', group: 'special', description: 'Play / Pause Animation (o Search según preferencias)' },
  { key: 'Tab', label: 'Tab', group: 'special', description: 'Toggle Edit Mode / Object Mode, Snapping (Shift+Tab)' },
  { key: 'Esc', label: 'Esc', group: 'special', description: 'Cancelar cualquier transformación o herramienta activa' },
  { key: 'Enter', label: 'Enter', group: 'special', description: 'Confirmar transformación o aplicar operador' },
  { key: 'Delete', label: 'Delete', group: 'special', description: 'Eliminar objeto o elementos seleccionados' },
  { key: '~', label: '` / ~', group: 'special', description: 'Navigation Pie Menu (Vistas ortográficas y cámara rápida)' },

  // Function Keys
  { key: 'F2', label: 'F2', group: 'function', description: 'Rename Active Object / Element' },
  { key: 'F3', label: 'F3', group: 'function', description: 'Operator Search (Buscador universal de Blender)' },
  { key: 'F4', label: 'F4', group: 'function', description: 'File Context Menu' },
  { key: 'F9', label: 'F9', group: 'function', description: 'Adjust Last Operation Panel' },
  { key: 'F11', label: 'F11', group: 'function', description: 'View Last Render Result' },
  { key: 'F12', label: 'F12', group: 'function', description: 'Render Current Frame (Ctrl+F12 para animación)' },

  // Numpad Keys
  { key: 'Numpad 0', label: 'Num 0', group: 'numpad', description: 'Active Camera View' },
  { key: 'Numpad 1', label: 'Num 1', group: 'numpad', description: 'Front View (Ctrl+Num 1 para Back)' },
  { key: 'Numpad 3', label: 'Num 3', group: 'numpad', description: 'Right View (Ctrl+Num 3 para Left)' },
  { key: 'Numpad 7', label: 'Num 7', group: 'numpad', description: 'Top View (Ctrl+Num 7 para Bottom)' },
  { key: 'Numpad 5', label: 'Num 5', group: 'numpad', description: 'Toggle Perspective / Orthographic View' },
  { key: 'Numpad .', label: 'Num .', group: 'numpad', description: 'View Selected / Frame Selected' },
  { key: 'Home', label: 'Home', group: 'numpad', description: 'View All / Frame All' },

  // Mouse Actions
  { key: 'MMB', label: 'MMB', group: 'mouse', description: 'Botón Central del Ratón: Orbitar la vista 3D' },
  { key: 'Shift + MMB', label: 'Shift+MMB', group: 'mouse', description: 'Desplazar la vista (Pan)' },
  { key: 'Ctrl + MMB', label: 'Ctrl+MMB', group: 'mouse', description: 'Zoom continuo ultrasuave' },
];
