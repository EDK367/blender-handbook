# 🎨 Blender Handbook — Guía Práctica de Blender en Español

Una aplicación web completa y moderna construida con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**, diseñada como manual interactivo y *cheat sheet* de alta densidad para usuarios principiantes e intermedios de Blender.

Basada estrictamente en la documentación oficial: [Blender Manual (latest)](https://docs.blender.org/manual/en/latest/).

---

## 🚀 Inicio Rápido

Para ejecutar la aplicación localmente:

```bash
cd /home/edk367/Desktop/blender-handbook
npm install
npm run dev
```

Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

---

## ✨ Características Principales

1. **Búsqueda Fuzzy Ultra Rápida (`Ctrl + K` o `/`)**:
   - Búsqueda por tecla (`A`, `G`, `Z`, `S`).
   - Búsqueda por combinaciones (`Ctrl+Z`, `Ctrl Z`, `Shift+D`, `Ctrl+R`).
   - Búsqueda por nombres oficiales en inglés (`Select All`, `Extrude`, `Loop Cut`, `Bevel`).
   - Búsqueda por conceptos en español (`mover`, `duplicar`, `escalar`, `borrar`, `bucle`, `cuchillo`).
   - Filtros por categoría y contexto/modo de Blender.
   - Historial de búsquedas recientes persistido en `localStorage`.

2. **Regla de Idioma Estricta**:
   - Explicaciones, tutoriales y guías 100% en **español**.
   - Nombres oficiales de herramientas, menús, modos y operadores conservados en **inglés** (`Select All`, `Edit Mode`, `Object Mode`, `Extrude Region`, `Loop Cut and Slide`, etc.).

3. **Sección Z — Shading Pie Menu**:
   - Visualizador interactivo del menú radial de 4 cuadrantes del 3D Viewport:
     - **Arriba**: `Solid`
     - **Izquierda**: `Wireframe`
     - **Abajo**: `Material Preview`
     - **Derecha**: `Rendered`

4. **Laboratorio de Transformaciones (`G / R / S + X/Y/Z`)**:
   - Explicación visual interactiva del patrón universal de manipulación espacial:
     `[Operador] + [Eje] + [Valor Numérico] + [Enter]`
   - Restricción de ejes cartesianos (X rojo, Y verde, Z azul).
   - Exclusión de ejes (`Shift + Z` para plano XY).

5. **Spotlight para Principiantes: `F3 Operator Search`**:
   - Sección dedicada al buscador universal de operadores de Blender.

6. **Hoja de Referencia Rápida (`/cheatsheet`)**:
   - Vista de alta densidad pensada para tener abierta en un segundo monitor mientras trabajas.

7. **Diccionario de Teclas (`/keyboard`)**:
   - Consulta tecla por tecla (A-Z, F1-F12, modificadores, Numpad, ratón) y descubre todos los atajos asociados a cada una.

8. **Ruta de Aprendizaje en 6 Niveles (`/learning`)**:
   - **Nivel 1 — Fundamentos**: Interfaz, navegación espacial, selección y transformaciones.
   - **Nivel 2 — Modeling**: Object Mode, Edit Mode, componentes 1/2/3, extrusiones y biseles.
   - **Nivel 3 — Materials & Shading**: Principled BSDF, mapas UV, texturas y costuras (Seams).
   - **Nivel 4 — Lighting & Rendering**: Cycles vs EEVEE, cámaras y render final (`F12`).
   - **Nivel 5 — Animation**: Timeline, inserción de keyframes (`I`), Graph Editor y reproducción (`Space`).
   - **Nivel 6 — Advanced**: Geometry Nodes paramétricos, rigging y postproceso.

9. **Glosario Técnico Español → Inglés (`/glossary`)**:
   - Más de 30 términos técnicos con su definición, contexto y enlace al comando.

10. **Favoritos del Usuario (`/favorites`)**:
    - Marcado con estrella (☆) sincronizado en tiempo real mediante `localStorage`.

11. **Diseño Visual**:
    - Estética oscura inspirada en software 3D y herramientas de desarrollo:
      - Fondo principal: `#050509`
      - Fondo secundario: `#0B0B12`
      - Tarjetas: `#11111A`
      - Cian brillante: `#00E5FF`
      - Morado acento: `#8B5CF6`
      - Naranja Blender: `#EA7600`
    - Keycaps 3D con estilo mecánico y respuesta al foco/hover.

---

## 📁 Estructura del Proyecto

```
blender-handbook/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Layout global con Navbar y Sidebar
│   │   ├── page.tsx               # Dashboard / Home
│   │   ├── globals.css            # Tema oscuro, estilos de teclas 3D y glow
│   │   ├── shortcuts/             # /shortcuts con vista tabla y cuadrícula
│   │   ├── commands/              # /commands directorio general
│   │   │   └── [id]/              # /commands/[id] páginas individuales SSG
│   │   ├── cheatsheet/            # /cheatsheet de alta densidad
│   │   ├── object-mode/           # Guía dedicada de Object Mode
│   │   ├── edit-mode/             # Guía dedicada de Edit Mode
│   │   ├── transform/             # Guía de transformaciones y restricciones
│   │   ├── viewport/              # Guía de navegación 3D
│   │   ├── modeling/              # Guía de modelado 3D y mini-guías
│   │   ├── keyboard/              # Diccionario interactivo de teclas
│   │   ├── glossary/              # Glosario técnico ES -> EN
│   │   ├── learning/              # Ruta de aprendizaje en 6 niveles
│   │   ├── favorites/             # Comandos favoritos guardados
│   │   └── versions/              # Comparativa de versiones y keymaps
│   ├── components/                # Componentes reutilizables
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CommandCard.tsx
│   │   ├── CommandTable.tsx
│   │   ├── KeyboardKey.tsx
│   │   ├── PieMenuVisualizer.tsx
│   │   ├── TransformPlayground.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── RelatedCommands.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── CopyButton.tsx
│   │   └── FavoriteButton.tsx
│   ├── data/                      # Datos estructurados desacoplados
│   │   ├── commands.ts            # Base de datos de más de 90 comandos verificados
│   │   ├── categories.ts          # Definición de las categorías
│   │   ├── glossary.ts            # Términos del glosario
│   │   ├── learningPaths.ts       # 6 Niveles de aprendizaje
│   │   └── keyboardKeys.ts        # Mapeo de teclas físicas
│   ├── hooks/
│   │   ├── useFavorites.ts        # Sincronización en localStorage y eventos
│   │   └── useRecentSearches.ts   # Historial de búsquedas recientes
│   ├── lib/
│   │   └── searchEngine.ts        # Motor de búsqueda fuzzy con Fuse.js y sinónimos
│   └── types/
│       └── index.ts               # Tipos e interfaces de TypeScript
└── package.json
```
