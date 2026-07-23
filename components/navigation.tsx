"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#F0F0EF] bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo/Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src="/assets/linnk.svg"
            alt="Novax"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="text-[24px]/[100%] font-bold font-pp-neuebit">
            Novax
          </span>
        </Link>

        {/* Center Links - Optional */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#write"
            className="text-[18px]/[100%] font-bold font-pp-neuebit text-black/70 transition-colors hover:text-black"
          >
            How it works
          </Link>
          <Link
            href="/#customize"
            className="text-[18px]/[100%] font-bold font-pp-neuebit text-black/70 transition-colors hover:text-black"
          >
            Features
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          href="/form"
          className="flex items-center gap-1 rounded-[22px] bg-[#FFF3F3] px-[14px] py-[8px] text-[18px]/[100%] font-bold tracking-[2%] text-black transition-all hover:bg-[#FFE8E8] hover:scale-[1.02]"
        >
          Create Message
          <Image
            src="/assets/left-arrow.svg"
            alt="Arrow"
            width={14}
            height={14}
            className="rotate-180"
          />
        </Link>
      </div>
    </nav>
  );
}
