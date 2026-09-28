'use client';

import React, { useState } from 'react';
import { KeyboardKey } from './KeyboardKey';
import { ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface OperatorInfo {
  key: string;
  name: string;
  verb: string;
  spanishAction: string;
  unit: string;
  exampleValue: string;
  exampleExplanation: string;
}

const OPERATORS: OperatorInfo[] = [
  {
    key: 'G',
    name: 'Move (Grab)',
    verb: 'Mover',
    spanishAction: 'Desplazar el elemento seleccionado',
    unit: 'metros / unidades de escena',
    exampleValue: '2',
    exampleExplanation: 'Mueve exactamente 2 metros a lo largo del eje seleccionado.',
  },
  {
    key: 'R',
    name: 'Rotate',
    verb: 'Rotar',
    spanishAction: 'Girar el elemento seleccionado',
    unit: 'grados angulares (°)',
    exampleValue: '90',
    exampleExplanation: 'Rota exactamente 90 grados alrededor del eje elegido.',
  },
  {
    key: 'S',
    name: 'Scale',
    verb: 'Escalar',
    spanishAction: 'Redimensionar el tamaño',
    unit: 'factor multiplicador',
    exampleValue: '2',
    exampleExplanation: 'Duplica el tamaño (escala al doble en ese eje). Con 0.5 reduce a la mitad.',
  },
];

export const TransformPlayground: React.FC = () => {
  const [selectedOp, setSelectedOp] = useState<OperatorInfo>(OPERATORS[0]);
  const [selectedAxis, setSelectedAxis] = useState<'None' | 'X' | 'Y' | 'Z' | 'Shift+Z'>('X');
  const [inputValue, setInputValue] = useState<string>('2');

  const axisLabels: Record<string, { label: string; color: string; desc: string }> = {
    None: { label: 'Libre', color: 'text-zinc-400', desc: 'Mueve en el plano perpendicular al punto de vista de la cámara.' },
    X: { label: 'Eje X (Rojo)', color: 'text-rose-400', desc: 'Restricción horizontal en el eje cartesiano X.' },
    Y: { label: 'Eje Y (Verde)', color: 'text-emerald-400', desc: 'Restricción de profundidad en el eje cartesiano Y.' },
    Z: { label: 'Eje Z (Azul)', color: 'text-blue-400', desc: 'Restricción vertical de altura en el eje cartesiano Z.' },
    'Shift+Z': { label: 'Plano XY (Excluir Z)', color: 'text-amber-400', desc: 'Mueve horizontalmente en el suelo (X e Y) sin modificar la altura Z.' },
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0F0F1A] to-[#0A0A12] border border-[#2B2B42] p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1F1F2E]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 text-xs font-mono font-bold">
              LA LÓGICA DE BLENDER
            </span>
            <h3 className="text-xl font-bold text-zinc-100">
              Transformaciones y Patrón de Ejes
            </h3>
          </div>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            En Blender no necesitas arrastrar flechas en pantalla: combinas el comando con un eje y un valor numérico para una precisión absoluta.
          </p>
        </div>

        {/* Universal Formula Badge */}
        <div className="bg-[#141424] border border-[#2A2A44] px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2 self-start md:self-auto">
          <span className="text-zinc-500 font-bold">FÓRMULA:</span>
          <span className="text-[#00E5FF] font-semibold">[Operador]</span>
          <span className="text-zinc-500">+</span>
          <span className="text-emerald-400 font-semibold">[Eje]</span>
          <span className="text-zinc-500">+</span>
          <span className="text-amber-400 font-semibold">[Valor]</span>
          <span className="text-zinc-500">+</span>
          <span className="text-purple-400 font-semibold">[Enter]</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Step 1: Select Operator */}
        <div className="p-4 rounded-xl bg-[#121220] border border-[#232338]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-3">
            Paso 1: Selecciona la Operación
          </span>
          <div className="grid grid-cols-3 gap-2">
            {OPERATORS.map((op) => {
              const isSelected = selectedOp.key === op.key;
              return (
                <button
                  key={op.key}
                  onClick={() => {
                    setSelectedOp(op);
                    setInputValue(op.exampleValue);
                  }}
                  type="button"
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C1C32] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                      : 'bg-[#0E0E18] border-[#222236] text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
                  }`}
                >
                  <KeyboardKey label={op.key} size="md" variant={isSelected ? 'cyan' : 'default'} />
                  <span className="text-xs font-bold text-zinc-200 mt-2">{op.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-zinc-400">{op.verb}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Axis */}
        <div className="p-4 rounded-xl bg-[#121220] border border-[#232338]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-3">
            Paso 2: Restricción de Eje
          </span>
          <div className="grid grid-cols-2 gap-2">
            {(['X', 'Y', 'Z', 'Shift+Z'] as const).map((axis) => {
              const isSelected = selectedAxis === axis;
              const meta = axisLabels[axis];
              return (
                <button
                  key={axis}
                  onClick={() => setSelectedAxis(axis)}
                  type="button"
                  className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C1C32] border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                      : 'bg-[#0E0E18] border-[#222236] text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
                  }`}
                >
                  <KeyboardKey label={axis} size="sm" variant={isSelected ? 'purple' : 'default'} />
                  <div className="truncate">
                    <div className={`text-xs font-semibold ${meta.color}`}>{axis}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{meta.label.split(' ')[0]}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Numerical Value */}
        <div className="p-4 rounded-xl bg-[#121220] border border-[#232338]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-3">
            Paso 3: Cantidad Numérica
          </span>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="2"
                className="w-full py-2 px-3 rounded-lg bg-[#0A0A14] border border-[#2B2B42] text-sm text-zinc-100 font-mono focus:outline-none focus:border-[#00E5FF]"
              />
              <span className="text-xs text-zinc-400 shrink-0">
                {selectedOp.unit.split(' ')[0]}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(selectedOp.key === 'R' ? ['45', '90', '180', '-90'] : ['1', '2', '5', '0.5']).map((val) => (
                <button
                  key={val}
                  onClick={() => setInputValue(val)}
                  className="px-2 py-1 rounded bg-[#161626] hover:bg-[#1E1E34] text-xs font-mono text-zinc-300 border border-[#2A2A40]"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Simulation Box */}
      <div className="mt-6 p-5 rounded-xl bg-[#0B0B14] border border-[#222236] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Comando generado en tu teclado:
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
            <KeyboardKey label={selectedOp.key} size="lg" variant="cyan" />
            <span className="text-zinc-500 font-bold">+</span>
            <KeyboardKey label={selectedAxis} size="lg" variant="purple" />
            {inputValue && (
              <>
                <span className="text-zinc-500 font-bold">+</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#181828] border border-[#2E2E44] text-amber-300 font-bold text-base">
                  {inputValue}
                </span>
              </>
            )}
            <span className="text-zinc-500 font-bold">+</span>
            <KeyboardKey label="Enter" size="lg" variant="default" />
          </div>
        </div>

        <div className="md:max-w-md bg-[#121222] p-3.5 rounded-lg border border-[#222238] text-xs">
          <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#00E5FF]" />
            ¿Qué hace esta combinación?
          </div>
          <p className="text-zinc-400 mt-1">
            <strong className="text-[#00E5FF]">{selectedOp.verb}</strong> la selección en el <strong className="text-emerald-400">eje {selectedAxis}</strong> una cantidad exacta de <strong className="text-amber-300">{inputValue} {selectedOp.unit}</strong> y confirma.
          </p>
        </div>
      </div>
    </div>
  );
};
