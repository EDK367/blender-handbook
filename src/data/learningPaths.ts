import { LearningLesson } from '@/types';

export const LEARNING_PATHS: LearningLesson[] = [
  {
    id: 'nivel-1-fundamentos',
    level: 1,
    levelName: 'Nivel 1 — Fundamentos',
    title: 'Primeros Pasos y Navegación Espacial',
    subtitle: 'Interfaz, navegación en 3D Viewport, selección y transformaciones básicas.',
    duration: '45 min',
    description: 'Aprende a moverte con fluidez en el espacio tridimensional de Blender. Perder el miedo a la cámara y dominar los atajos de traslación, rotación y escalado es la base indispensable antes de crear cualquier modelo.',
    keyConcepts: [
      'Orientación y órbita con el botón central del ratón (MMB)',
      'Vistas ortográficas precisas (Numpad 1, 3, 7)',
      'La regla de oro de las transformaciones: G (Move), R (Rotate), S (Scale)',
      'Restricción de movimiento en ejes cartesianos (X, Y, Z)',
      'Uso del buscador de emergencia (F3) para cualquier operador',
    ],
    commands: ['orbit-view', 'pan-view', 'zoom-view', 'move', 'rotate', 'scale', 'select-all', 'search-operator', 'shading-pie-menu'],
    practicalSteps: [
      {
        title: 'Ejercicio 1: Tu primera navegación',
        steps: [
          'Abre una nueva escena con el cubo por defecto.',
          'Mantén presionado el botón central del ratón (MMB) y muévelo para orbitar en 360° alrededor del cubo.',
          'Mantén Shift + MMB para desplazar lateralmente la vista.',
          'Presiona Numpad 1 para ver el cubo de frente, Numpad 3 para verlo de lado y Numpad 7 desde arriba.',
          'Presiona Numpad . con el cubo seleccionado si alguna vez te desorientas en el espacio.',
        ],
      },
      {
        title: 'Ejercicio 2: Mover y restringir con precisión',
        steps: [
          'Selecciona el cubo con clic izquierdo.',
          'Presiona G, luego X, luego el número 2 y finalmente Enter. El cubo se moverá exactamente 2 metros en el eje X.',
          'Presiona R, luego Z, luego 45 y Enter. El cubo rotará 45 grados sobre su eje vertical.',
          'Presiona S, luego 2 y Enter para duplicar su tamaño.',
          'Presiona Alt + G, Alt + R y Alt + S para devolver el cubo al estado original en el centro del mundo.',
        ],
      },
    ],
    proTips: [
      'No muevas la vista arrastrando el gizmo de la esquina si puedes usar MMB; memorizar el ratón te hará 5 veces más rápido.',
      'Si estás en una laptop sin Numpad físico, ve a Edit > Preferences > Input y activa "Emulate Numpad". Así los números 1-9 superiores actuarán como vistas de cámara.',
    ],
  },
  {
    id: 'nivel-2-modelado',
    level: 2,
    levelName: 'Nivel 2 — Modeling',
    title: 'Modelado Poligonal y Topología',
    subtitle: 'Object Mode vs Edit Mode, vértices, aristas, caras, Extrude, Loop Cut y Bevel.',
    duration: '1 hora 15 min',
    description: 'Transforma figuras primitivas en formas complejas. Descubre la diferencia entre mover un objeto completo y entrar a su anatomía poligonal para cortar, extruir y biselar sus caras.',
    keyConcepts: [
      'Alternar entre Object Mode y Edit Mode mediante Tab',
      'Los tres componentes: Vértices (1), Aristas (2) y Caras (3)',
      'Extrusión de volumen con E y variaciones con Alt + E',
      'Inserción concéntrica con I (Inset)',
      'Añadir geometría con bucles de corte: Loop Cut (Ctrl + R)',
      'Redondear aristas con Bevel (Ctrl + B) y la regla de aplicar escala (Ctrl + A)',
    ],
    commands: ['toggle-edit-mode', 'vertex-select', 'edge-select', 'face-select', 'extrude-region', 'loop-cut', 'bevel', 'inset-faces', 'knife-tool', 'merge', 'apply-transforms'],
    practicalSteps: [
      {
        title: 'Ejercicio: Modela una taza básica',
        steps: [
          'Borra el cubo con X y añade un cilindro con Shift + A > Mesh > Cylinder.',
          'Presiona Tab para entrar en Edit Mode.',
          'Presiona 3 para modo cara, selecciona la cara superior y presiona I para hacer un Inset hacia adentro.',
          'Presiona E, luego Z y mueve el ratón hacia abajo para extruir el hueco interior de la taza.',
          'Presiona Ctrl + R en el lateral exterior para añadir dos Loop Cuts con la rueda del ratón.',
          'Selecciona las dos caras creadas en el lateral y presiona E para extruir el asa hacia afuera.',
          'Sal a Object Mode (Tab), haz clic derecho y selecciona "Shade Auto Smooth".',
        ],
      },
    ],
    proTips: [
      'Si el bisel (Ctrl + B) se ve asimétrico o achatado, es porque escalaste el objeto en Object Mode sin aplicar escala. Sal con Tab, presiona Ctrl + A > Apply Scale y vuelve a intentarlo.',
    ],
  },
  {
    id: 'nivel-3-materiales',
    level: 3,
    levelName: 'Nivel 3 — Materials & Shading',
    title: 'Materiales, Shaders y Despliegue UV',
    subtitle: 'Shader Editor, Principled BSDF, costuras de corte (Mark Seam) y texturizado.',
    duration: '1 hora',
    description: 'Aprende a dotar de color, brillo, rugosidad y texturas realistas a tus modelos 3D con el material maestro Principled BSDF y a desplegar mallas en 2D mediante costuras UV.',
    keyConcepts: [
      'Entender los canales del Principled BSDF: Base Color, Roughness, Metallic, Normal',
      'El Shading Pie Menu (Z) para previsualizar materiales',
      'Qué es un mapa UV y por qué se necesitan costuras (Mark Seam)',
      'Conexión de mapas de texturas en el Shader Editor',
    ],
    commands: ['shading-pie-menu', 'add-node', 'cut-links', 'uv-unwrap', 'mark-seam', 'pack-islands'],
    practicalSteps: [
      {
        title: 'Ejercicio: Tu primer material realista',
        steps: [
          'Divide el área de trabajo o ve al espacio de trabajo "Shading" en la barra superior.',
          'Crea un nuevo material en el panel de materiales.',
          'Baja el parámetro "Roughness" a 0.1 y sube "Metallic" a 1.0 para crear un metal cromado espejo.',
          'Presiona Z en el 3D Viewport y elige "Material Preview" o "Rendered" para ver los reflejos del entorno.',
        ],
      },
    ],
    proTips: [
      'Activa el add-on gratuito que viene incluido en Blender llamado "Node Wrangler" (Edit > Preferences > Add-ons). Te permitirá previsualizar nodos al instante con Ctrl + Shift + LMB.',
    ],
  },
  {
    id: 'nivel-4-render',
    level: 4,
    levelName: 'Nivel 4 — Lighting & Rendering',
    title: 'Iluminación y Motores de Render',
    subtitle: 'Cycles vs EEVEE, luces de 3 puntos, encuadre de cámara y render final en F12.',
    duration: '50 min',
    description: 'Transforma una escena gris en una imagen fotorrealista. Domina la colocación de luces, la composición con la cámara y las diferencias clave entre el trazado de rayos de Cycles y la velocidad de EEVEE.',
    keyConcepts: [
      'Diferencias entre Cycles (Ray Tracing físicamente preciso) y EEVEE (Rasterizado ultrarrápido)',
      'Esquema clásico de iluminación de 3 puntos: Key Light, Fill Light y Rim/Back Light',
      'Control de cámara: fijar vista con Ctrl + Alt + Numpad 0 y bloquear a la vista',
      'Ajustes de resolución, muestras (Samples) y reducción de ruido (Denoising)',
    ],
    commands: ['render-image', 'render-animation', 'view-render', 'camera-view', 'align-camera-to-view', 'render-region'],
    practicalSteps: [
      {
        title: 'Ejercicio: Encuadre e iluminación de estudio',
        steps: [
          'Añade un plano debajo de tu modelo con Shift + A > Mesh > Plane y escálalo con S 10.',
          'Coloca la vista en el ángulo que más te guste y presiona Ctrl + Alt + Numpad 0 para encuadrar la cámara.',
          'Añade una luz de área con Shift + A > Light > Area y apúntala al modelo a 45 grados.',
          'En Render Properties, selecciona el motor Cycles y activa "Denoise" en el panel de Viewport y Render.',
          'Presiona F12 para generar tu primer render de alta calidad.',
        ],
      },
    ],
    proTips: [
      'Para ajustar la cámara sin batallar, presiona Numpad 0, abre el panel lateral (N), ve a "View" y marca la casilla "Camera to View". Ahora mover la vista con MMB moverá directamente la cámara.',
    ],
  },
  {
    id: 'nivel-5-animacion',
    level: 5,
    levelName: 'Nivel 5 — Animation',
    title: 'Línea de Tiempo y Principios de Animación',
    subtitle: 'Timeline, inserción de Keyframes (I), Graph Editor y curvas de interpolación.',
    duration: '1 hora',
    description: 'Da vida a tus modelos. Comprende cómo registrar posiciones en el tiempo, interpolar movimientos suaves y controlar la aceleración con las curvas Bézier en el Graph Editor.',
    keyConcepts: [
      'El concepto de fotograma (Frames) y velocidad (24 fps estándar cinematográfico)',
      'Insertar fotogramas clave con la tecla I',
      'Reproducción continua en la Timeline con la Barra Espaciadora',
      'Aceleración y desaceleración (Ease In / Ease Out) en el Graph Editor',
      'Introducción a jerarquías y Armatures con huesos (Bones)',
    ],
    commands: ['insert-keyframe', 'delete-keyframe', 'play-animation', 'set-parent'],
    practicalSteps: [
      {
        title: 'Ejercicio: La pelota que rebota (Bouncing Ball)',
        steps: [
          'Añade una UV Sphere en el centro de la escena.',
          'En la Timeline, asegúrate de estar en el fotograma 1.',
          'Presiona I > Location para fijar la pelota en el suelo.',
          'Avanza al fotograma 12, mueve la pelota hacia arriba con G + Z + 5 y presiona I > Location.',
          'Avanza al fotograma 24, regresa la pelota al suelo con G + Z + -5 y presiona I > Location.',
          'Presiona la Barra Espaciadora para ver rebotar la pelota en bucle.',
        ],
      },
    ],
    proTips: [
      'Usa el editor "Graph Editor" para ajustar las manijas de las curvas. En el punto de impacto contra el suelo, rompe las manijas de la curva en forma de "V" con la tecla V > Vector para simular un rebote seco instantáneo.',
    ],
  },
  {
    id: 'nivel-6-avanzado',
    level: 6,
    levelName: 'Nivel 6 — Advanced',
    title: 'Nodos de Geometría, Rigging y Postproceso',
    subtitle: 'Geometry Nodes procedurales, articulación de personajes con IK y composición final.',
    duration: '1 hora 30 min',
    description: 'Adéntrate en los sistemas más avanzados y demandados de la industria: generación procedural de mundos mediante Geometry Nodes, esqueletos articulados para personajes con cinemática inversa (IK) y postproducción cinematográfica en el Compositor.',
    keyConcepts: [
      'Geometría paramétrica y campos (Fields) en Geometry Nodes',
      'Distribuir puntos sobre superficies (Distribute Points on Faces) e instanciar objetos',
      'Construcción de esqueletos (Armature) y asignación de pesos de vértices (Weight Paint)',
      'Postprocesado en el Compositor: Glow/Glare, viñeta y corrección de color',
      'Automatización básica con Python en la consola de Blender (bpy.ops)',
    ],
    commands: ['add-node', 'cut-links', 'frame-nodes', 'set-parent', 'search-operator'],
    practicalSteps: [
      {
        title: 'Ejercicio: Dispersión de piedras procedural con Geometry Nodes',
        steps: [
          'Selecciona un plano y añade un modificador "Geometry Nodes".',
          'En el editor de Geometry Nodes, inserta un nodo "Distribute Points on Faces" entre Group Input y Group Output.',
          'Inserta un nodo "Instance on Points" y conecta un objeto de roca en el conector "Instance".',
          'Añade un nodo "Random Value" conectado a la escala para que cada roca tenga un tamaño natural aleatorio.',
        ],
      },
    ],
    proTips: [
      'Cualquier operador que ejecutes manualmente en Blender imprime su equivalente en código Python en el panel "Info". Esto hace que aprender a automatizar con scripts sea extremadamente intuitivo.',
    ],
  },
];
