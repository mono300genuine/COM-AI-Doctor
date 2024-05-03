import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Com Doctor AI",
  description:
    "Experience instant symptom analysis with our advanced AI doctor.",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="./favicon.ico" /> */}
      <body className={inter.className}>
        <ConvexClientProvider>
          <main className="md:px-24 flex justify-center relative bg-white">
            <Navbar />
          </main>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
