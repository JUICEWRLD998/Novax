import { useFormStore } from "@/store/form.store";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Template = () => {
  const { template, setSteps, steps } = useFormStore();

  return (
    <section className="flex flex-col items-center gap-[40px] h-full w-full max-w-[1400px] mt-[45px] px-6">
      <div className="text-center">
        <h2 className="text-[56px]/[110%] font-normal font-pp-mondwest mb-3">
          Choose Your <span className="font-bold font-pp-neuebit">Template</span>
        </h2>
        <p className="text-[24px] text-gray-600 font-pp-neuebit">
          All templates built with Unlayer Elements - fully customizable
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-8 w-full max-w-[1200px]">
        <RomanticTemplate />
        <ProfessionalTemplate />
        <PlayfulTemplate />
        <ElegantTemplate />
      </div>
      
      <Button
        onClick={() => setSteps(steps + 1)}
        disabled={!template}
        className="text-black text-[24px] font-bold mx-auto hover:text-white hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed w-[180px] bg-[#FFF3F3] py-6 px-6 flex items-center gap-3 mt-4"
      >
        Continue <ArrowRight size={28} />
      </Button>
    </section>
  );
};

export default Template;

const RomanticTemplate = () => {
  const { template, setTemplate } = useFormStore();
  const isSelected = template === "romantic";
  
  return (
    <div
      onClick={() => setTemplate("romantic")}
      className={`cursor-pointer rounded-2xl border-4 transition-all hover:shadow-xl ${
        isSelected ? 'border-rose-500 shadow-2xl scale-[1.02]' : 'border-gray-200 hover:border-rose-300'
      }`}
    >
      <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-6 rounded-xl">
        <div className="bg-white rounded-lg p-8 shadow-inner min-h-[320px] flex items-center">
          {/* Unlayer Elements Preview */}
          <div className="space-y-4 w-full">
            <div className="flex justify-center gap-2">
              <div className="w-8 h-8 bg-rose-200 rounded-full" />
              <div className="w-8 h-8 bg-pink-200 rounded-full" />
              <div className="w-8 h-8 bg-red-200 rounded-full" />
            </div>
            <div className="h-1 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 rounded" />
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold text-rose-600">💕 Message Title 💕</h3>
              <div className="h-px bg-rose-200 w-20 mx-auto" />
              <p className="text-sm text-gray-600 leading-relaxed px-4">
                Your heartfelt message with beautiful romantic styling using Unlayer Elements...
              </p>
              <p className="text-lg text-rose-500 font-semibold italic">With love ❤️</p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h4 className="text-[32px] font-bold font-pp-neuebit text-rose-600">Romantic</h4>
          <p className="text-[18px] text-gray-600 mt-1 font-semibold">Perfect for love messages</p>
          {isSelected && (
            <div className="mt-2 bg-rose-500 text-white text-sm font-bold py-2 px-4 rounded-full inline-block">
              ✓ Selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfessionalTemplate = () => {
  const { template, setTemplate } = useFormStore();
  const isSelected = template === "professional";
  
  return (
    <div
      onClick={() => setTemplate("professional")}
      className={`cursor-pointer rounded-2xl border-4 transition-all hover:shadow-xl ${
        isSelected ? 'border-blue-600 shadow-2xl scale-[1.02]' : 'border-gray-200 hover:border-blue-400'
      }`}
    >
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl">
        <div className="bg-white rounded-lg p-8 shadow-inner min-h-[320px] flex items-center">
          {/* Unlayer Elements Preview */}
          <div className="space-y-4 w-full">
            <div className="bg-slate-700 text-white text-center py-4 px-6 rounded">
              <h3 className="text-xl font-light tracking-wide">MESSAGE TITLE</h3>
            </div>
            <div className="flex justify-center gap-3">
              <div className="w-6 h-6 bg-slate-300 rounded opacity-80" />
              <div className="w-6 h-6 bg-slate-400 rounded opacity-80" />
              <div className="w-6 h-6 bg-slate-500 rounded opacity-80" />
            </div>
            <div className="text-left space-y-2 px-4">
              <p className="text-sm text-slate-600 font-medium">Dear Recipient,</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Professional message with elegant styling using Unlayer Elements components...
              </p>
              <div className="border-t border-gray-300 my-3" />
              <p className="text-sm text-slate-700 font-semibold">Sender Name</p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h4 className="text-[32px] font-bold font-pp-neuebit text-slate-700">Professional</h4>
          <p className="text-[18px] text-gray-600 mt-1 font-semibold">Clean and elegant</p>
          {isSelected && (
            <div className="mt-2 bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full inline-block">
              ✓ Selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PlayfulTemplate = () => {
  const { template, setTemplate } = useFormStore();
  const isSelected = template === "playful";
  
  return (
    <div
      onClick={() => setTemplate("playful")}
      className={`cursor-pointer rounded-2xl border-4 transition-all hover:shadow-xl ${
        isSelected ? 'border-purple-500 shadow-2xl scale-[1.02]' : 'border-gray-200 hover:border-purple-400'
      }`}
    >
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
        <div className="bg-white rounded-lg p-8 shadow-inner min-h-[320px] flex items-center">
          {/* Unlayer Elements Preview */}
          <div className="space-y-4 w-full">
            <div className="flex justify-center gap-2 flex-wrap">
              <div className="w-10 h-10 bg-yellow-300 rounded-lg rotate-12" />
              <div className="w-10 h-10 bg-purple-300 rounded-full -rotate-6" />
              <div className="w-10 h-10 bg-pink-300 rounded-lg rotate-6" />
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-bold text-purple-600 tracking-wide">✨ HEY THERE! ✨</h3>
              <div className="space-y-2 px-4">
                <div className="h-3 bg-purple-200 rounded w-3/4 mx-auto" />
                <div className="h-3 bg-pink-200 rounded w-full" />
                <div className="h-3 bg-purple-200 rounded w-2/3 mx-auto" />
              </div>
              <p className="text-lg text-purple-500 font-bold">~ Your Friend 🎉</p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h4 className="text-[32px] font-bold font-pp-neuebit text-purple-600">Playful</h4>
          <p className="text-[18px] text-gray-600 mt-1 font-semibold">Fun and colorful</p>
          {isSelected && (
            <div className="mt-2 bg-purple-500 text-white text-sm font-bold py-2 px-4 rounded-full inline-block">
              ✓ Selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ElegantTemplate = () => {
  const { template, setTemplate } = useFormStore();
  const isSelected = template === "elegant";
  
  return (
    <div
      onClick={() => setTemplate("elegant")}
      className={`cursor-pointer rounded-2xl border-4 transition-all hover:shadow-xl ${
        isSelected ? 'border-amber-600 shadow-2xl scale-[1.02]' : 'border-gray-200 hover:border-amber-400'
      }`}
    >
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl">
        <div className="bg-white rounded-lg p-8 shadow-inner min-h-[320px] flex items-center border-2 border-amber-200">
          {/* Unlayer Elements Preview */}
          <div className="space-y-4 w-full">
            <div className="text-center border-b-2 border-amber-300 pb-3">
              <h3 className="text-2xl font-serif text-amber-800 italic">A Special Message</h3>
            </div>
            <div className="flex justify-center gap-4">
              <div className="w-2 h-2 bg-amber-400 rounded-full" />
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <div className="w-2 h-2 bg-amber-400 rounded-full" />
            </div>
            <div className="text-center space-y-2 px-6">
              <p className="text-sm text-gray-700 leading-relaxed font-serif italic">
                Sophisticated message with timeless elegance, crafted using Unlayer Elements...
              </p>
              <div className="border-t border-amber-200 my-3 w-16 mx-auto" />
              <p className="text-base text-amber-800 font-serif">Sincerely yours</p>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <h4 className="text-[32px] font-bold font-pp-neuebit text-amber-800">Elegant</h4>
          <p className="text-[18px] text-gray-600 mt-1 font-semibold">Timeless and sophisticated</p>
          {isSelected && (
            <div className="mt-2 bg-amber-600 text-white text-sm font-bold py-2 px-4 rounded-full inline-block">
              ✓ Selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
