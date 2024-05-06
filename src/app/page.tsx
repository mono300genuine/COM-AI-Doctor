"use client";
import { Brain } from "lucide-react";
import Link from "next/link";
import AnimatedTextCharacter from "./components/AnimateTextWord";
import { Disclaimer } from "./components/Disclaimer";
import Footer from "./components/Footer";
import HowitWorks from "./components/HowitWorks";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <>
      <main 
        style={{
          backgroundImage: 'url("/medicine.jpg")',
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: 'center'
          
        }}
        className="flex flex-col md:gap-0 md:mt-0 mt-20 gap-10 md:flex-row min-h-screen md:px-28 px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-white to-white items-center justify-center md:justify-between">
        <div 
           
          role="img"
          aria-label="Map Image" 
          className="flex flex-col md:items-start md:justify-start items-center justify-center">
          <section className="flex items-center gap-1">
            <AnimatedTextCharacter 
              text="COM DOCTOR"
            />
          </section>
          <p className="md:text-base text-sm text-secondary-foreground text-left opacity-75">
          Get ready to witness the future of healthcare! Introducing our cutting-edge AI doctor,
          <br/>your personal health companion.
          <br/>Say goodbye to the waiting room and hello to instant symptom analysis. 
          <br/>Get ready to experience healthcare like never before!
          </p>
          <section className="flex space-x-2">
            <Disclaimer />
            <Link href="#works">
              <Button
                className="mt-5 px-2 space-x-3"
                variant={"outline"}
                size={"lg"}
              >
                <span>How it works</span>
                <Brain className="w-6" />
              </Button>
            </Link>
          </section>
        </div>
      </main>
      <div className="md:px-24 px-4">
        <HowitWorks />
      </div>
      <Footer />
    </>
  );
}
