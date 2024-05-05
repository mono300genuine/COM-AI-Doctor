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
            <AnimatedTextCharacter text="COM DOCTOR" />
            <span className="mb-5 font-semibold text-destructive uppercase text-sm rounded-lg">
              Alpha
            </span>
          </section>
          <p className="md:text-base text-sm text-secondary-foreground text-center opacity-75">
            Experience instant symptom analysis with our advanced AI doctor.
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
        {/* <Image
          src="/com-doctor-banner.jpeg"
          alt="hero banner"
          className="md:w-3/5 shadow-lg shadow-primary/20 w-full rounded-sm"
          width={1024}
          height={1024}
        /> */}
      </main>
      <div className="md:px-24 px-4">
        <HowitWorks />
      </div>
      <Footer />
    </>
  );
}
