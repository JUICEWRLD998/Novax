import { create } from "zustand";

interface messageDetailsT {
  backgroundImageUrl?: string;
  icons: { position: number; iconSrc: string; iconNote?: string }[];
  recipientName: string;
  messageBody: string;
  messageTitle: string;
  result?: { choice: "yes" | "no"; respondedAt: string } | null;
  senderEmail?: string;
  senderName: string;
  signatureImageUrl?: string;
  template: string;
  aiGenerated?: boolean;
  customization?: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    backgroundColor: string;
  };
}

interface RecipientType {
  steps: number;
  setSteps: (steps: number) => void;
  messageDetails: messageDetailsT | null;
  setMessageDetails: (messageDetails: messageDetailsT) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useRecipientStore = create<RecipientType>((set) => ({
  steps: 1,
  setSteps: (steps: number) => set({ steps }),
  messageDetails: null,
  setMessageDetails: (messageDetails: messageDetailsT) =>
    set({ messageDetails }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
