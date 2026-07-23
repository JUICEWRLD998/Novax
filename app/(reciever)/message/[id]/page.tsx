"use client";
import { useRecipientStore } from "@/store/recipient.store";
import WelcomeScreen from "./_components/welcome-screen";
import MainMessage from "./_components/main_message";
import { AnimatePresence, motion } from "motion/react";
import Yes from "./_components/yes";
import NoPage from "./_components/no";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import { decodeMessageData } from "@/helpers/data-encoding";
import { toast } from "sonner";

const MessagePage = () => {
  const { steps, setMessageDetails, loading, setLoading, messageDetails } =
    useRecipientStore();

  const { id } = useParams();

  const renderSteps = () => {
    switch (steps) {
      case 1:
        return <WelcomeScreen />;
      case 2:
        return <MainMessage />;
      case 3:
        return <Yes />;
      case 4:
        return <NoPage />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        setLoading(true);
        
        if (!id || typeof id !== 'string') {
          toast.error("Invalid message link");
          setLoading(false);
          return;
        }

        // Decode message data from URL
        const decodedData = decodeMessageData(id);
        console.log("Decoded message data:", decodedData);
        
        // Transform to match the expected structure
        setMessageDetails({
          senderName: decodedData.senderName,
          recipientName: decodedData.recipientName,
          messageTitle: decodedData.messageTitle,
          messageBody: decodedData.messageBody,
          template: decodedData.template,
          signatureImageUrl: decodedData.signatureImageUrl,
          backgroundImageUrl: decodedData.backgroundImageUrl,
          icons: decodedData.icons,
          aiGenerated: decodedData.aiGenerated,
          customization: decodedData.customization,
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to decode message:", error);
        toast.error("Failed to load message. The link may be invalid or corrupted.");
        setLoading(false);
      }
    };

    fetchMessageDetails();
  }, [id]);

  return (
    <section
      className="bg-cover bg-center bg-no-repeat"
      style={
        messageDetails?.backgroundImageUrl
          ? { backgroundImage: `url(${messageDetails.backgroundImageUrl})` }
          : undefined
      }
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <LoaderIcon className="animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={steps}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {renderSteps()}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default MessagePage;
