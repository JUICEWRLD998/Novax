"use client";

import React from 'react';

interface BackgroundSelectorProps {
  value: string;
  onChange: (background: string) => void;
}

const backgroundPresets = [
  { value: '#FFFFFF', label: 'Pure White' },
  { value: '#FAF9F5', label: 'Warm Cream' },
  { value: '#F5F5F5', label: 'Light Gray' },
  { value: '#FFF5F7', label: 'Soft Pink' },
  { value: '#FFF9E6', label: 'Light Yellow' },
  { value: '#F0F8FF', label: 'Alice Blue' },
  { value: '#F5FFFA', label: 'Mint Cream' },
  { value: '#FFF0F5', label: 'Lavender Blush' },
];

export default function BackgroundSelector({ value, onChange }: BackgroundSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[18px]/[100%] font-bold font-pp-neuebit text-black">
        Background Color
      </label>
      <p className="text-[14px]/[150%] text-black/60 font-pp-neuebit">
        Set the background color for your message
      </p>
      
      {/* Preset Colors */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {backgroundPresets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onChange(preset.value)}
            className={`h-16 rounded-lg border-2 transition-all hover:scale-105 ${
              value === preset.value ? 'border-black ring-2 ring-black ring-offset-2' : 'border-[#F0F0EF]'
            }`}
            style={{ backgroundColor: preset.value }}
            title={preset.label}
          >
            <span className="sr-only">{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Custom Color */}
      <div className="flex items-center gap-3 mt-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-20 rounded-lg border-2 border-[#F0F0EF] cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-[#F0F0EF] font-mono text-[14px] focus:border-black focus:outline-none transition-colors"
          placeholder="#FFFFFF"
          maxLength={7}
        />
      </div>
    </div>
  );
}
