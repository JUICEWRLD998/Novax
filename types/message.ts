export type TemplateType = 'romantic' | 'professional' | 'playful' | 'elegant';

export interface NovaxMessageData {
  senderName: string;
  senderEmail: string;
  recipientName: string;
  template: TemplateType;
  messageTitle: string;
  messageBody: string;
  aiGenerated: boolean;
  customization: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    backgroundColor: string;
  };
  signatureImageUrl?: string;
  backgroundImageUrl?: string;
  icons: Array<{
    position: number;
    iconSrc: string;
    iconNote?: string;
  }>;
  response?: {
    choice: 'yes' | 'no';
    respondedAt: string;
  };
}

export interface TemplateProps {
  data: NovaxMessageData;
  customization: NovaxMessageData['customization'];
}
