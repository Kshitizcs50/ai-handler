import Photohub from '@/components/photo/Photohub'
import React from 'react'
import RenderModel from '@/components/RenderModel'
import Image from "next/image";
import bg from "../../../../public/background/bg.jpg";
import { Marvellogo } from '@/components/models/Marvellogo'
import Photo2 from '@/components/photo/Photo2';
import Photo3 from '@/components/photo/Photo3';
import Photo4 from '@/components/photo/Photo4';
import Photo5 from '@/components/photo/Photo5';
import Photo6 from '@/components/photo/Photo6';

function Page() {
  return (
    <main className="-z-60 flex min-h-screen flex-col w-screen  items-center ">
      
  

      
        <RenderModel>
          <Marvellogo />
          
        </RenderModel>
        
     
      
        <Photohub/>
        <Photo2/>
        <Photo3/>
        <Photo4/>
        <Photo5/>
        <Photo6/>
      
    </main>
  )
}

export default Page
