"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useFormStore } from "@/store/form.store";
import { toast } from "sonner";
import { uploadImageToClodinary } from "@/helpers/upload-media";
import { encodeMessageData, validateEncodedSize } from "@/helpers/data-encoding";
import { NovaxMessageData } from "@/types/message";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    template,
    setSteps,
    steps,
    backgroundImage,
    setBackgroundImage,
    setLoading,
    senderFirstName,
    senderEmail,
    recipientFirstName,
    message,
    messageTitle,
    signature,
    headerIcons,
    setLink,
    aiGenerated,
    customization,
  } = useFormStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isBgUploading, setIsBgUploading] = useState(false);

  console.log(steps, template);

  const handlePickBackground = () => {
    console.log("clicked");
    fileInputRef.current?.click();
  };

  const handleBackgroundChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const maxSizeMB = 10;
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setBackgroundImage(objectUrl);
    setIsBgUploading(true);

    try {
      const publicUrl = await uploadImageToClodinary(
        file,
        "linnked/backgrounds",
      );
      setBackgroundImage(publicUrl);
      URL.revokeObjectURL(objectUrl);
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(
        `Background upload failed: ${errorMessage}. Using local preview.`,
      );
    } finally {
      setIsBgUploading(false);
    }
  };

  const submitMessage = async () => {
    try {
      setLoading(true);

      const messageData: NovaxMessageData = {
        senderName: senderFirstName,
        senderEmail: senderEmail || "",
        recipientName: recipientFirstName,
        template: template,
        messageTitle,
        messageBody: message,
        aiGenerated,
        customization,
        signatureImageUrl: signature || undefined,
        backgroundImageUrl: backgroundImage || undefined,
        icons: headerIcons.slice(0, 6).map((icon, index) => ({
          position: index + 1,
          iconSrc: icon.src,
          iconNote: icon.note || undefined,
        })),
      };

      // Validate size
      const sizeCheck = validateEncodedSize(messageData);
      if (!sizeCheck.isValid) {
        toast.error(`Message too large (${sizeCheck.size} chars, max: ${sizeCheck.maxSize}). Try shortening your message.`);
        setLoading(false);
        return;
      }

      // Encode message data
      const encodedData = encodeMessageData(messageData);
      
      // Generate shareable URL
      const baseUrl = window.location.origin;
      const shareUrl = `${baseUrl}/message/${encodedData}`;

      setLink(shareUrl);
      setLoading(false);
      
      toast.success("Message created successfully!");
      console.log("Share URL generated:", shareUrl);
    } catch (error: unknown) {
      console.error("Error creating message:", error);
      toast.error("Failed to create message. Please try again.");
      setLoading(false);
    }
  };

  const moveNext = async () => {
    switch (steps) {
      case 2:
        if (!template) {
          return toast.error("Please select a template");
        }
      case 5:
        await submitMessage();
        break;
      case 3:
        if (message == "") {
          return toast.error("Please enter a message");
        }

      default:
        break;
    }
    setSteps(steps + 1);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBackgroundChange}
      />
      {steps == 5 && (
        <button
          onClick={() => setSteps(steps - 1)}
          className=" cursor-pointer absolute z-[9999999] left-0 top-12 left-12 flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
        >
          <Image
            src="/assets/left-arrow.svg"
            alt="Back"
            width={17}
            height={17}
            className=""
          />
          Back
        </button>
      )}

      <div className="flex items-center absolute  z-[999] mr-5 mt-[35px] self-end p-4 gap-2">
        {steps == 4 && template == "playful" && (
          <button
            onClick={handlePickBackground}
            className="flex  w-fit items-center gap-1 py-[5px] px-[10px] bg-[#FAF9F5] rounded-[22px]"
          >
            <p>{isBgUploading ? "Uploading..." : "Add background image"}</p>
            {isBgUploading ? (
              <span className="h-4 w-4 rounded-full border-2 border-stone-400 border-t-transparent animate-spin" />
            ) : (
              <Image
                src="icons/arrow-up.svg"
                alt="arrow up"
                height={17}
                width={17}
              />
            )}
          </button>
        )}
        <button
          onClick={moveNext}
          className=" cursor-pointer flex items-center  gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px] "
        >
          Next
          <Image
            src="/assets/left-arrow.svg"
            alt="Back"
            width={17}
            height={17}
            className="rotate-180"
          />
        </button>
      </div>
      {children}
    </>
  );
};

export default ClientLayout;
