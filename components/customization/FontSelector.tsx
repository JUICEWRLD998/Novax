"use client";

import React from 'react';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

const fontOptions = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Comic Sans MS, cursive', label: 'Comic Sans MS' },
  { value: 'Playfair Display, serif', label: 'Playfair Display' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
];

export default function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[18px]/[100%] font-bold font-pp-neuebit text-black">
        Font Family
      </label>
      <p className="text-[14px]/[150%] text-black/60 font-pp-neuebit">
        Choose the font for your message text
      </p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-3 rounded-lg border-2 border-[#F0F0EF] text-[16px] font-pp-neuebit font-bold focus:border-black focus:outline-none transition-colors cursor-pointer bg-white"
      >
        {fontOptions.map((font) => (
          <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
            {font.label}
          </option>
        ))}
      </select>
      <div 
        className="mt-2 p-4 rounded-lg border-2 border-[#F0F0EF] bg-[#FAF9F5] text-center"
        style={{ fontFamily: value }}
      >
        <p className="text-[18px]/[150%]">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  );
}
