"use client";

import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  description?: string;
}

export default function ColorPicker({ label, value, onChange, description }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[18px]/[100%] font-bold font-pp-neuebit text-black">
        {label}
      </label>
      {description && (
        <p className="text-[14px]/[150%] text-black/60 font-pp-neuebit">
          {description}
        </p>
      )}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-20 rounded-lg border-2 border-[#F0F0EF] cursor-pointer"
          style={{ colorScheme: 'light' }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-[#F0F0EF] font-mono text-[14px] focus:border-black focus:outline-none transition-colors"
          placeholder="#000000"
          maxLength={7}
        />
      </div>
    </div>
  );
}
