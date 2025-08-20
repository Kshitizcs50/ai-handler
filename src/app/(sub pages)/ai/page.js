import Ai from "@/components/ai";
import Image from "next/image";
import jarvis from "../../../../public/background/jarvis.jpg";
 export default function Home () {
   return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
          <Image
            priority
            sizes="100vw"
            src={jarvis}
            alt="background-image"
         
            className="-z-50 fixed top-0 left-0 w-full h-full object-cover object-center opacity-10"
          />
           <Ai/>
       </main>
   );
 }
   