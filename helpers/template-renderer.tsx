import { renderToHtml } from '@unlayer/react-elements';
import { NovaxMessageData, TemplateType } from '@/types/message';
import RomanticTemplate from '@/components/templates/RomanticTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import PlayfulTemplate from '@/components/templates/PlayfulTemplate';
import ElegantTemplate from '@/components/templates/ElegantTemplate';

export function getTemplateComponent(templateType: TemplateType) {
  const templates = {
    romantic: RomanticTemplate,
    professional: ProfessionalTemplate,
    playful: PlayfulTemplate,
    elegant: ElegantTemplate,
  };
  
  return templates[templateType] || templates.romantic;
}

export async function renderTemplateToHtml(data: NovaxMessageData): Promise<string> {
  const TemplateComponent = getTemplateComponent(data.template);
  
  const html = await renderToHtml(
    <TemplateComponent 
      data={data} 
      customization={data.customization} 
    />
  );
  
  return html;
}

export const templateDescriptions: Record<TemplateType, { name: string; description: string; preview: string }> = {
  romantic: {
    name: 'Romantic',
    description: 'Soft colors, hearts, and elegant fonts perfect for love letters',
    preview: '💕 Soft & Loving',
  },
  professional: {
    name: 'Professional',
    description: 'Clean lines and business-appropriate styling',
    preview: '📄 Clean & Formal',
  },
  playful: {
    name: 'Playful',
    description: 'Bright colors, fun fonts, and decorative elements',
    preview: '🎉 Fun & Colorful',
  },
  elegant: {
    name: 'Elegant',
    description: 'Minimalist and sophisticated design',
    preview: '✨ Minimal & Refined',
  },
};

export const defaultCustomizations: Record<TemplateType, NovaxMessageData['customization']> = {
  romantic: {
    primaryColor: '#FFE5EC',
    secondaryColor: '#C41E3A',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFF5F7',
  },
  professional: {
    primaryColor: '#2C3E50',
    secondaryColor: '#34495E',
    fontFamily: 'Georgia, serif',
    backgroundColor: '#F5F5F5',
  },
  playful: {
    primaryColor: '#FFD93D',
    secondaryColor: '#FF6B35',
    fontFamily: 'Comic Sans MS, cursive',
    backgroundColor: '#FFF9E6',
  },
  elegant: {
    primaryColor: '#1A1A1A',
    secondaryColor: '#D4AF37',
    fontFamily: 'Playfair Display, serif',
    backgroundColor: '#FAFAFA',
  },
};
