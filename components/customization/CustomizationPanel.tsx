"use client";

import React from 'react';
import ColorPicker from './ColorPicker';
import FontSelector from './FontSelector';
import BackgroundSelector from './BackgroundSelector';
import { NovaxMessageData } from '@/types/message';

interface CustomizationPanelProps {
  customization: NovaxMessageData['customization'];
  onUpdate: (customization: NovaxMessageData['customization']) => void;
}

export default function CustomizationPanel({ customization, onUpdate }: CustomizationPanelProps) {
  const handleChange = (key: keyof NovaxMessageData['customization'], value: string) => {
    onUpdate({
      ...customization,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-col gap-8 p-6 bg-white rounded-[20px] border-2 border-[#F0F0EF]">
      <div>
        <h3 className="text-[28px]/[100%] font-bold font-pp-neuebit mb-2">
          Customize Your Message
        </h3>
        <p className="text-[16px]/[150%] text-black/60 font-pp-neuebit">
          Make it uniquely yours with colors and fonts
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <ColorPicker
          label="Primary Color"
          description="Main accent color for headers and highlights"
          value={customization.primaryColor}
          onChange={(color) => handleChange('primaryColor', color)}
        />

        <ColorPicker
          label="Secondary Color"
          description="Supporting color for details and accents"
          value={customization.secondaryColor}
          onChange={(color) => handleChange('secondaryColor', color)}
        />

        <FontSelector
          value={customization.fontFamily}
          onChange={(font) => handleChange('fontFamily', font)}
        />

        <BackgroundSelector
          value={customization.backgroundColor}
          onChange={(bg) => handleChange('backgroundColor', bg)}
        />
      </div>

      <div className="mt-4 p-4 bg-[#FFF3F3] rounded-lg border border-[#FFE5EC]">
        <p className="text-[14px]/[150%] font-pp-neuebit text-black/70">
          💡 <strong>Tip:</strong> Your changes update the preview in real-time!
        </p>
      </div>
    </div>
  );
}
