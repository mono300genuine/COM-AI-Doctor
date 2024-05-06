"use client";
import { Brain } from "lucide-react";
import Link from "next/link";
import AnimatedTextCharacter from "./components/AnimateTextWord";
import { Disclaimer } from "./components/Disclaimer";
import Footer from "./components/Footer";
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
        className="flex flex-col md:gap-0 md:mt-0 mt-20 gap-10 md:flex-row min-h-screen md:px-28 px-4 items-center justify-center md:justify-between">
        <div

          role="img"
          aria-label="Map Image"
          className="flex flex-col md:items-start md:justify-start items-center justify-center">
          <section className="flex items-center gap-1">
            <AnimatedTextCharacter
              text="COMMUNE AI DOCTOR"
            />
          </section>
          <p className="md:text-xl text-xl text-secondary-foreground text-left opacity-75 mt-4">
            👩‍⚕️ &nbsp;Get ready to witness the future of healthcare! Introducing our cutting-edge AI doctor,
            <br />💊 &nbsp;your personal health companion.
            <br />🩺 &nbsp;Say goodbye to the waiting room and hello to instant symptom analysis.
            <br />📃 &nbsp;Get ready to experience healthcare like never before!
          </p>
          <section className="flex mt-4 space-x-2">
            <Disclaimer />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
