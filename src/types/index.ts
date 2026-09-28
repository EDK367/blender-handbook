export type BlenderContext =
  | 'Object Mode'
  | 'Edit Mode'
  | 'Sculpt Mode'
  | 'Pose Mode'
  | '3D Viewport'
  | 'UV Editor'
  | 'Shader Editor'
  | 'Geometry Node Editor'
  | 'Compositor'
  | 'Video Sequencer'
  | 'Graph Editor'
  | 'Dope Sheet'
  | 'Timeline'
  | 'Outliner'
  | 'General'
  | 'All Modes';

export type BlenderCategory =
  | 'General'
  | 'Navigation'
  | 'Selection'
  | 'Transformation'
  | 'Modeling'
  | 'Mesh Editing'
  | 'Object Mode'
  | 'Edit Mode'
  | 'Sculpting'
  | 'UV Editing'
  | 'Materials'
  | 'Shading'
  | 'Geometry Nodes'
  | 'Animation'
  | 'Rigging'
  | 'Rendering'
  | 'Compositing'
  | 'Video Editing'
  | 'Scripting'
  | 'Nodes'
  | 'Viewport'
  | 'File Management';

export interface CommandVariation {
  shortcut: string;
  name: string;
  description: string;
}

export interface PracticalStep {
  title: string;
  steps: string[];
}

export interface BlenderCommand {
  id: string;
  shortcut: string;
  keys: string[];
  name: string; // Official Blender name in English
  spanishName: string; // Spanish equivalent
  description: string; // Spanish detailed description
  detailedHelp?: string; // Extended in-depth explanation
  contexts: BlenderContext[];
  categories: BlenderCategory[];
  steps?: string[]; // Step by step practical example
  pattern?: string; // Pattern logic (e.g. G + X/Y/Z)
  variations?: CommandVariation[];
  relatedCommandIds: string[];
  officialDocUrl?: string;
  versionNote?: string;
  tips?: string[];
  important?: string;
}

export interface CategoryInfo {
  id: BlenderCategory;
  slug: string;
  name: string;
  spanishName: string;
  description: string;
  iconName: string;
  count?: number;
}

export interface GlossaryItem {
  id: string;
  spanishTerm: string;
  englishTerm: string;
  category: string;
  definition: string;
  relatedCommands?: string[];
  context?: string;
}

export interface LearningLesson {
  id: string;
  level: number;
  levelName: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  keyConcepts: string[];
  commands: string[];
  practicalSteps: PracticalStep[];
  proTips: string[];
}

export interface KeyItem {
  key: string;
  label: string;
  group: 'letter' | 'number' | 'function' | 'modifier' | 'special' | 'mouse' | 'numpad';
  description?: string;
}
