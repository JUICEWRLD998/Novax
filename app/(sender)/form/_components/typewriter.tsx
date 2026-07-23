import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/form.store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Typewriter = () => {
  const { message, setMessage, messageTitle, setMessageTitle, recipientFirstName, senderFirstName } = useFormStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const playKeySound = () => {
    if (typeof window === "undefined") return;

    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextClass) return;
      audioContextRef.current = new AudioContextClass();
    }

    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(700, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  };

  useEffect(() => {
    return () => {
      void audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please describe what you want to say");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: aiPrompt,
          messageTitle: messageTitle || "Special Message",
          context: `from ${senderFirstName} to ${recipientFirstName}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate message");
      }

      const data = await response.json();
      setMessage(data.enhancedMessage);
      if (data.enhancedTitle && !messageTitle) {
        setMessageTitle(data.enhancedTitle);
      }
      toast.success("Message generated! Feel free to edit it.");
      setAiPrompt("");
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate message. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen flex items-center flex-col">
      <div className="mt-10 mb-9 w-full max-w-[860px] px-4">
        <div className="flex items-center justify-center gap-4">
          <span className="shrink-0 text-[48px] font-normal font-pp-mondwest -tracking-[2%]">
            Add a Title
          </span>
          <Input
            type="text"
            value={messageTitle}
            onChange={(e) => setMessageTitle(e.target.value)}
            placeholder="Title"
            maxLength={40}
            className="h-[60px] w-[400px] border-2 border-gray-300 bg-white p-4 !text-[36px] leading-none font-bold font-pp-neuebit focus-visible:ring-2 focus-visible:ring-black text-black"
          />
        </div>
      </div>
      <Tabs
        defaultValue="ai"
        className="w-full h-full flex flex-col items-center justify-between"
      >
        <TabsList className="text-[24px] font-bold font-pp-neuebit bg-gray-100 p-2 rounded-xl">
          <TabsTrigger value="ai" className="text-[20px] px-6 py-3">
            AI Composer
          </TabsTrigger>
          <TabsTrigger value="you" className="text-[20px] px-6 py-3">Write Yourself</TabsTrigger>
        </TabsList>

        {/* AI Composer Tab */}
        <TabsContent
          value="ai"
          className="flex flex-col items-center justify-center w-full max-w-[900px] gap-6 mt-8"
        >
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 w-full border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-[32px] font-bold font-pp-neuebit text-purple-700">
                Let AI Write Your Message
              </h3>
            </div>
            <p className="text-[20px] text-gray-700 mb-6 font-semibold">
              Tell us what you want to say, and AI will craft a beautiful message for you
            </p>
            
            <div className="space-y-4">
              <Textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Example: Write a romantic Valentine's message telling them how much they mean to me..."
                className="min-h-[150px] text-[20px] leading-relaxed border-2 border-purple-300 focus:border-purple-500 rounded-xl p-4 bg-white resize-none placeholder:text-gray-400"
                disabled={isGenerating}
              />
              
              <Button
                onClick={handleAIGenerate}
                disabled={isGenerating || !aiPrompt.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-[22px] font-bold py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={24} />
                    Generating Your Message...
                  </>
                ) : (
                  <>
                    Generate Message with AI
                  </>
                )}
              </Button>
            </div>

            {message && (
              <div className="mt-6 p-6 bg-white rounded-xl border-2 border-green-300">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-[20px] font-bold text-green-700">Generated Message (You can edit below)</p>
                </div>
                <p className="text-[22px] text-gray-800 font-semibold leading-relaxed whitespace-pre-wrap">
                  {message}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Manual Writing Tab */}
        <TabsContent
          value="you"
          className="flex flex-col items-center justify-between w-full"
        >
          {/* <Button
            variant="secondary"
            className="bg-[#FAF9F5] mt-[107px] font-pp-neuebit hover:bg-stone-200 text-[22px] font-bold text-stone-600 gap-2 rounded-[9px] h-12 px-6"
          >
            <PenTool size={18} className="rotate-270" />
            Starting Typing.
          </Button> */}

          <div className="relative w-full flex flex-col justify-center mt-8">
            <div className="flex relative justify-end mr-[50px]">
              <Image
                src="/assets/typewriter22.png"
                width={1007}
                height={716}
                alt="typewriter back"
                className="absolute w-[1007px] -left-7 bottom-0 top-0 my-auto"
              />
              <div className="flex flex-col z-[999] relative -bottom-10 mr-[140px] gap-[30px] w-[559.2px] border-[#E5E5E5] bg-white rounded-2xl border-[0.5px] p-[23px] pb-[118px]">
                <Textarea
                  ref={textareaRef}
                  value={message}
                  placeholder="Start typing your message here..."
                  className="w-full resize-none overflow-scroll border-none outline-none shadow-none focus-visible:ring-0 bg-transparent text-[24px] leading-8 font-neuemontreal font-semibold text-stone-900 p-0 h-[200px] caret-stone-800 placeholder:text-gray-400"
                  spellCheck={false}
                  onKeyDown={playKeySound}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="bg-[#FAF9F5] rounded-t-[29.85px] min-h-[432px] flex items-end -mt-[210px]">
              <Image
                src="/assets/typewriter_transparent1.png"
                width={1025}
                height={1155}
                alt="typewriter"
                className=" z-[99999] relative right-0 "
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="old-ai">AI tab content here (removed)</TabsContent>
      </Tabs>
    </div>
  );
};

export default Typewriter;
