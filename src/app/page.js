"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bg from "../../public/background/bg.jpg";
import RenderModel from "@/components/RenderModel";
import Navigation from "@/components/navigation";
import LogoutButton from "./LogoutButton"; 
 // ⬅️ import logout button

import dynamic from "next/dynamic";
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
    <main className="flex min-h-screen flex-col items-center justify-between relative">
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
      <div className="absolute top-6 right-6 z-50">
        <LogoutButton/>
      </div>

      {/* Content */}
      <div className="w-full h-screen">
        <Navigation />
        <RenderModel>
          <Wizard />
        </RenderModel>
      </div>
    </main>
  );
}
