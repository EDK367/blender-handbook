import Fuse from 'fuse.js';
import { BlenderCommand } from '@/types';
import { COMMANDS } from '@/data/commands';

export function normalizeKeyQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/\+/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const fuseOptions = {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  keys: [
    { name: 'shortcut', weight: 3.5 },
    { name: 'name', weight: 3.0 },
    { name: 'spanishName', weight: 2.5 },
    { name: 'keys', weight: 2.5 },
    { name: 'contexts', weight: 2.0 },
    { name: 'categories', weight: 2.0 },
    { name: 'description', weight: 1.5 },
    { name: 'pattern', weight: 1.5 },
    { name: 'detailedHelp', weight: 1.0 },
  ],
};

const fuse = new Fuse(COMMANDS, fuseOptions);

// Direct Spanish synonym mapping for instant intuitive answers
const SPANISH_SYNONYMS: Record<string, string[]> = {
  mover: ['move'],
  trasladar: ['move'],
  desplazar: ['move'],
  rotar: ['rotate'],
  girar: ['rotate'],
  escalar: ['scale'],
  tamano: ['scale'],
  redimensionar: ['scale'],
  duplicar: ['duplicate'],
  copiar: ['duplicate'],
  extruir: ['extrude'],
  extrude: ['extrude'],
  cortar: ['knife', 'loop cut', 'cut'],
  cuchillo: ['knife'],
  bucle: ['loop cut'],
  biselar: ['bevel'],
  chaflan: ['bevel'],
  borrar: ['delete'],
  eliminar: ['delete'],
  suprimir: ['delete'],
  unir: ['join', 'merge'],
  fusionar: ['merge'],
  separar: ['separate', 'split'],
  ocultar: ['hide'],
  mostrar: ['unhide'],
  deshacer: ['undo'],
  rehacer: ['redo'],
  seleccionar: ['select'],
  guardar: ['save'],
  render: ['render'],
  renderizar: ['render'],
  solido: ['shading', 'solid'],
  alambre: ['wireframe'],
  material: ['material', 'shading'],
  buscar: ['search', 'f3'],
  camara: ['camera'],
  frente: ['front view'],
  arriba: ['top view'],
  lado: ['right view'],
  centrar: ['view selected'],
  enfocar: ['view selected'],
  modo: ['mode', 'tab'],
  vertice: ['vertex'],
  arista: ['edge'],
  cara: ['face'],
};

export function searchCommands(
  rawQuery: string,
  options?: {
    category?: string;
    context?: string;
    limit?: number;
  }
): BlenderCommand[] {
  const query = rawQuery.trim();

  let results: BlenderCommand[] = [];

  if (!query) {
    results = [...COMMANDS];
  } else {
    const normalized = normalizeKeyQuery(query);

    // 1. Direct exact shortcut match check
    const directShortcutMatch = COMMANDS.filter((cmd) => {
      const normShortcut = normalizeKeyQuery(cmd.shortcut);
      const exactKey = cmd.keys.some((k) => k.toLowerCase() === query.toLowerCase());
      return normShortcut === normalized || exactKey;
    });

    // 2. Check synonyms
    const synonymMatches: BlenderCommand[] = [];
    for (const [key, targets] of Object.entries(SPANISH_SYNONYMS)) {
      if (normalized.includes(key) || key.includes(normalized)) {
        for (const target of targets) {
          const matched = COMMANDS.filter(
            (c) =>
              c.name.toLowerCase().includes(target) ||
              c.description.toLowerCase().includes(target) ||
              c.categories.some((cat) => cat.toLowerCase().includes(target))
          );
          synonymMatches.push(...matched);
        }
      }
    }

    // 3. Fuse.js fuzzy results
    const fuseResults = fuse.search(query).map((r) => r.item);

    // Combine prioritizing exact shortcut -> synonyms -> fuzzy results without duplicates
    const seen = new Set<string>();
    const combined: BlenderCommand[] = [];

    for (const item of [...directShortcutMatch, ...synonymMatches, ...fuseResults]) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        combined.push(item);
      }
    }

    results = combined;
  }

  // Filter by category if supplied
  if (options?.category && options.category !== 'All') {
    results = results.filter((c) =>
      c.categories.some((cat) => cat.toLowerCase() === options.category?.toLowerCase())
    );
  }

  // Filter by context if supplied
  if (options?.context && options.context !== 'All') {
    results = results.filter((c) =>
      c.contexts.some((ctx) => ctx.toLowerCase() === options.context?.toLowerCase() || ctx === 'All Modes')
    );
  }

  if (options?.limit) {
    results = results.slice(0, options.limit);
  }

  return results;
}
