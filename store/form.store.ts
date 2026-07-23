import { initialHeaderIcons } from "@/lib/data";
import { HeaderIconItem } from "@/types/data";
import { NovaxMessageData, TemplateType } from "@/types/message";
import { create } from "zustand";

interface FormType {
  steps: number;
  loading: boolean;
  senderFirstName: string;
  senderEmail: string;
  recipientFirstName: string;
  template: TemplateType;
  message: string;
  messageTitle: string;
  aiGenerated: boolean;
  formDone: boolean;
  backgroundImage: string;
  signature: string;
  link: string;
  headerIcons: HeaderIconItem[];
  customization: NovaxMessageData['customization'];
  setCustomization: (customization: NovaxMessageData['customization']) => void;
  setBackgroundImage: (backgroundImage: string) => void;
  setSignature: (signature: string) => void;
  setHeaderIcons: (
    headerIcons:
      | HeaderIconItem[]
      | ((prev: HeaderIconItem[]) => HeaderIconItem[]),
  ) => void;
  setLink: (link: string) => void;
  setFormDone: (value: boolean) => void;
  setAiGenerated: (value: boolean) => void;
  setMessageTitle: (messageTitle: string) => void;
  setMessage: (message: string) => void;
  setTemplate: (template: TemplateType) => void;
  setSenderFirstName: (senderFirstName: string) => void;
  setSenderEmail: (senderEmail: string) => void;
  setRecipientFirstName: (recipientFirstName: string) => void;
  setSteps: (steps: number) => void;
  setLoading: (loading: boolean) => void;
}

export const useFormStore = create<FormType>((set) => ({
  steps: 1,
  loading: false,
  senderFirstName: "",
  senderEmail: "",
  recipientFirstName: "",
  template: "romantic",
  message: "",
  backgroundImage: "",
  messageTitle: "A little something for you :)",
  aiGenerated: false,
  formDone: false,
  link: "",
  headerIcons: initialHeaderIcons,
  signature: "",
  customization: {
    primaryColor: '#FFE5EC',
    secondaryColor: '#C41E3A',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#FFF5F7',
  },
  setCustomization: (customization) => set({ customization }),
  setBackgroundImage: (backgroundImage: string) => set({ backgroundImage }),
  setSignature: (signature: string) => set({ signature }),
  setHeaderIcons: (headerIcons) =>
    set((state) => ({
      headerIcons:
        typeof headerIcons === "function"
          ? headerIcons(state.headerIcons)
          : headerIcons,
    })),
  setLink: (link: string) => set({ link }),
  setFormDone: (formDone: boolean) => set({ formDone }),
  setAiGenerated: (aiGenerated: boolean) => set({ aiGenerated }),
  setMessageTitle: (messageTitle: string) => set({ messageTitle }),
  setMessage: (message: string) => set({ message }),
  setTemplate: (template: TemplateType) => set({ template }),
  setSenderFirstName: (senderFirstName: string) => set({ senderFirstName }),
  setSenderEmail: (senderEmail: string) => set({ senderEmail }),
  setRecipientFirstName: (recipientFirstName: string) =>
    set({ recipientFirstName }),
  setSteps: (steps: number) => set({ steps }),
  setLoading: (loading: boolean) => set({ loading }),
}));
