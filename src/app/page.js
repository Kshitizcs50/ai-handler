"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bg from "../../public/background/bg.jpg";
import RenderModel from "@/components/RenderModel";
import Navigation from "@/components/navigation";
import LogoutButton from "./LogoutButton"; // ⬅️ import logout button
import dynamic from "next/dynamic";
import Live from "./(sub pages)/Live";

const Wizard = dynamic(() => import("@/components/models/Wizard"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ redirect to /auth if no token
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start relative overflow-x-hidden">
      {/* Background Image */}
      <Image
        priority
        sizes="100vw"
        src={bg}
        alt="background-image"
        fill
        className="-z-50 w-full h-full object-cover object-center opacity-50"
      />

      {/* Floating Logout Button (top-right) */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50">
        <LogoutButton />
      </div>

      {/* Content Container */}
      <div className="w-full flex flex-col items-center justify-start pt-24 md:pt-32 px-4 sm:px-6 lg:px-12 space-y-6">
        {/* Navigation */}
        <div className="w-full max-w-7xl">
          <Navigation />
        </div>

        {/* 3D Model Section */}
        <div className="w-full max-w-4xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex justify-center items-center">
          <RenderModel>
            <Wizard />
          </RenderModel>
        </div>

        {/* Live Component */}
        <div className="w-full max-w-7xl px-2 sm:px-4">
          <Live />
        </div>
      </div>
    </main>
  );
}
