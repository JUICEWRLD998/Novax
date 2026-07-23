"use client";

import { initialHeaderIcons } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="w-full">
        {/* Hero Section */}
        <div id="novax" className="w-full flex flex-col items-center relative min-h-screen justify-center px-6">
          <h1 className="text-[50px]/[100%] font-bold font-pp-neuebit text-center">
            Novax
          </h1>
          <div className="flex flex-col items-center justify-content max-w-[656px] mt-[80px]">
            <p className="text-[50px]/[100%] -tracking-[2%] font-pp-mondwest mb-[40px] text-center">
              Send a message they'll never forget.
            </p>
            <p className="text-[35px]/[100%] font-pp-neuebit font-bold mb-[50px] text-center">
              Create beautiful, AI-enhanced messages with full customization.
              Share via URL.
            </p>
          </div>

          <Image
            src="/assets/flower.svg"
            alt="flower"
            width={153}
            height={153}
            className="absolute right-12 bottom-12"
          />
        </div>

        {/* Demo Section */}
        <div className="bg-gradient-to-br from-pink-200 via-rose-300 to-pink-400 rounded-[20px] pt-[33px] pb-[48px] mx-6 mb-5 flex flex-col items-center bg-cover bg-center border border-[#F0F0EF]">
          <h2 className="text-[35px]/[100%] mb-[25px] text-white -tracking-[2%] font-normal font-pp-mondwest">
            When love and code meets...
          </h2>
          <div className="flex items-center gap-6.25">
            {initialHeaderIcons.map((icon, index) => (
              <button
                key={`${icon.alt}-${index}`}
                type="button"
                className="relative group"
              >
                <Image
                  src={icon.src}
                  alt={icon.alt}
                  height={icon.height}
                  width={icon.width}
                />
                <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 flex -translate-x-1/2 flex-col items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  <span className="whitespace-nowrap rounded-full bg-[#F6EDEC] px-3 py-1 text-[20px] leading-none text-black shadow-sm">
                    Click to Open -&gt;
                  </span>
                  {icon.note ? (
                    <span className="max-w-56 rounded-[10px] border-[.5px] border-[#E5E5E5] bg-[#FFFFFF1A] px-3 py-2 text-center text-[18px] leading-[1.05] text-stone-900 shadow-sm whitespace-pre-wrap wrap-break-word">
                      {icon.note}
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
          </div>

          <Image
            src="/assets/messagee.png"
            alt="message"
            width={393}
            height={519}
            className="mt-[67px]"
          />
        </div>

        {/* How it works Section */}
        <div className="h-[524px] border border-[#F0F0EF] flex items-center justify-center relative mx-6 mb-5">
          <h2 className="text-[100px]/[100%] font-bold font-pp-neuebit">
            How it works
          </h2>
          <Image
            src="/assets/flowerr.svg"
            alt="flowerr"
            width={110}
            height={110}
            className="absolute bottom-0 right-0"
          />
          <Image
            src="/assets/maill.svg"
            alt="maill"
            width={110}
            height={110}
            className="absolute bottom-0 left-0"
          />
        </div>

        {/* Template Selection */}
        <div className="border border-[#F0F0EF] p-[25px] mx-6 mb-5">
          <div className="border border-[#F0F0EF] rounded-[20.82px] flex h-[618px]">
            <div className="border-r relative border-[#F0F0EF] flex flex-col justify-end items-end h-full">
              <button className="absolute left-4 top-4 cursor-pointer z-[9999999] flex items-center gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px]">
                <Image
                  src="/assets/left-arrow.svg"
                  alt="Back"
                  width={17}
                  height={17}
                />
                Back
              </button>
              <Image
                src="/assets/temp.svg"
                alt="template"
                height={1114}
                width={163}
                className="self-end justify-self-end ml-10 mb-4"
              />
            </div>
            <div className="w-full relative flex flex-col items-center">
              <button className="cursor-pointer absolute z-[9999999] right-8 top-12 flex items-center gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px]">
                Next
                <Image
                  src="/assets/left-arrow.svg"
                  alt="Back"
                  width={17}
                  height={17}
                  className="rotate-180"
                />
              </button>
              <h2 className="text-[35px]/[100%] mt-[37px] mb-[140px] -tracking-[2%] font-pp-mondwest mx-auto text-center">
                Choose a <span className="font-bold font-pp-neuebit">Template.</span>
              </h2>

              <div className="relative">
                <Image
                  src="/assets/hash.svg"
                  alt="hash"
                  width={51.6}
                  height={51.6}
                  className="absolute left-0 top-0"
                />
                <Image
                  src="/assets/templates.svg"
                  alt="templates"
                  width={885}
                  height={323}
                  className="z-10"
                />
              </div>
              <Image
                src="/assets/flower.svg"
                alt="flower"
                width={127}
                height={127}
                className="bottom-0 right-0 absolute"
              />
            </div>
          </div>
        </div>

        {/* Write Section */}
        <div id="write" className="flex border border-[#F0F0EF] flex-col items-center justify-center relative h-[278px] mx-6 mb-5">
          <h2 className="text-[100px]/[100%] font-bold -tracking-[2%] font-pp-neuebit">
            Write your message
          </h2>
          <p className="text-[20px]/[100%] font-bold -tracking-[2%]">
            With a typewriter.
          </p>
          <Image
            src="/assets/flowerr.svg"
            alt="flower"
            width={110}
            height={110}
            className="absolute bottom-0 right-0"
          />
        </div>

        {/* Write Message Visual */}
        <div className="p-6 flex items-center justify-center">
          <Image
            src="/assets/write-message.svg"
            alt="flower"
            width={1167}
            height={828}
          />
        </div>

        {/* AI Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-[100px]/[100%] font-bold font-pp-neuebit -tracking-[2%] py-[60px]">
            Let AI write for you
          </h2>
          <Image src="/assets/ai-help.svg" alt="" width={1166} height={317} />
        </div>

        {/* Customize Section */}
        <div id="customize" className="flex flex-col gap-[39px] py-[77px] border border-[#F0F0EF] items-center mx-6 mb-5">
          <h2 className="text-[100px]/[100%] font-bold -tracking-[2%] font-pp-neuebit">
            Customize your message
          </h2>
          <Image
            src="/assets/customize.svg"
            alt="customize"
            width={372}
            height={38}
          />
        </div>

        {/* Customize Visual */}
        <div className="flex flex-col justify-center items-center gap-8 p-6 mb-[100px]">
          <div className="grid grid-cols-3 gap-6">
            <Image
              src="/assets/preview1.svg"
              alt="customization preview"
              width={350}
              height={250}
            />
            <Image
              src="/assets/preview2.svg"
              alt="customization preview"
              width={350}
              height={250}
            />
            <Image
              src="/assets/preview3.svg"
              alt="customization preview"
              width={350}
              height={250}
            />
          </div>
          <div className="flex gap-6">
            <Image
              src="/assets/preview4.svg"
              alt="customization preview"
              width={350}
              height={250}
            />
            <Image
              src="/assets/preview5.svg"
              alt="customization preview"
              width={350}
              height={250}
            />
          </div>
        </div>

        {/* Add Icons Section */}
        <div className="flex flex-col items-center justify-center gap-[6.5px] py-[115px] border border-[#F0F0EF] relative mx-6 mb-5">
          <h2 className="text-[100px]/[100%] -tracking-[2%] font-bold font-pp-neuebit">
            Add cute thingys
          </h2>
          <p className="text-[20px] font-pp-neuebit -tracking-[2%] font-bold">
            And extra messages.
          </p>
          <Image
            src="/assets/glass-flower.png"
            alt="cute thingys"
            width={102}
            height={102}
            className="absolute -top-10 left-0"
          />
          <Image
            src="/assets/circle.svg"
            alt="circle"
            width={102}
            height={102}
            className="absolute top-0 bottom-0 my-auto right-0"
          />
          <Image
            src="/assets/popcorn.svg"
            alt="popcorn"
            width={102}
            height={102}
            className="absolute bottom-2 left-[150px]"
          />
          <Image
            src="/assets/gaming.svg"
            alt="gaming"
            width={102}
            height={102}
            className="absolute -top-14 right-[337px]"
          />
        </div>

        {/* Icon Visual */}
        <div className="flex items-center justify-center border border-[#F0F0EF] p-6 mx-6 mb-5">
          <div className="grid grid-cols-5 gap-8 items-center">
            <Image src="/assets/icon1.svg" alt="icon" width={200} height={200} />
            <Image src="/assets/icon2.svg" alt="icon" width={200} height={200} />
            <Image src="/assets/icon3.svg" alt="icon" width={200} height={200} />
            <Image src="/assets/icon4.svg" alt="icon" width={200} height={200} />
            <Image src="/assets/icon5.svg" alt="icon" width={200} height={200} />
          </div>
        </div>

        {/* Share Section */}
        <div id="share" className="relative h-screen flex items-center justify-center">
          <span className="relative">
            <h2 className="text-[100px]/[100%] font-bold relative -tracking-[2%]">
              Share your Message
            </h2>
            <Image
              src="/assets/done.svg"
              alt="done"
              width={144}
              height={144}
              className="absolute right-0 -bottom-16"
            />
          </span>
        </div>

        {/* Team and Footer Section */}
        <div className="flex flex-col items-center justify-center gap-[34px] mt-[50px] border border-[#F0F0EF] p-6 mx-6 mb-5">
          <Image
            src="/assets/linnked-logo.svg"
            alt="novax"
            width={691}
            height={140}
          />

          <div id="team" className="flex flex-col bg-[url('/assets/bg3.webp')] rounded-[24px] bg-cover bg-center h-[730px] items-center justify-center gap-[35px] w-full">
            <h2 className="text-[119px]/[100%] font-bold font-pp-neuebit -tracking-[2%] text-white">
              Novax was built by a small team.
            </h2>
          </div>

          {/* Final CTA */}
          <div className="flex flex-col bg-[url('/assets/bg3.webp')] rounded-[24px] bg-cover bg-center relative h-[1128px] items-center justify-center gap-[35px] w-full">
            <Image
              src="/assets/circle.svg"
              alt="customize"
              width={80}
              height={80}
              className="top-20 left-20 absolute"
            />
            <Image
              src="/assets/gaming.svg"
              alt="gaming"
              width={96}
              height={135}
              className="absolute top-[298px] left-[442px]"
            />
            <Image
              src="/assets/done.svg"
              alt="done"
              width={144}
              height={144}
              className="right-[95px] bottom-[360px] absolute"
            />
            <Image
              src="/assets/stand.svg"
              alt="stand"
              width={141}
              height={133}
              className="absolute bottom-0 left-0"
            />
            <Image
              src="/assets/popcorn.svg"
              alt="popcorn"
              width={144}
              height={144}
              className="right-[398px] bottom-0 absolute"
            />
            <Image
              src="/assets/leaf.svg"
              alt="leaf"
              width={111}
              height={111}
              className="right-0 bottom-[145px] absolute"
            />
            <Image
              src="/assets/email.svg"
              alt="email"
              width={111}
              height={111}
              className="right-[184px] top-[178px] absolute"
            />

            <h2 className="text-[119px]/[100%] text-center font-bold font-pp-neuebit -tracking-[2%] text-white">
              Send a Message they'll never forget.
            </h2>
            <Link
              href="/form"
              className="z-[9999999] cursor-pointer flex items-center gap-1 text-black px-[10px] py-[6.5px] bg-[#FFF3F3] text-[20px]/[100%] tracking-[2%] font-bold w-fit rounded-[22px]"
            >
              Create Message
              <Image
                src="/assets/left-arrow.svg"
                alt="Back"
                width={17}
                height={17}
                className="rotate-180"
              />
            </Link>

            <Image
              src="/assets/customize.svg"
              alt="customize"
              width={446}
              height={45}
            />

            <p className="text-[59px]/[100%] font-bold -tracking-[2%] font-pp-neuebit absolute right-[47px] bottom-6 text-white">
              Novax
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
