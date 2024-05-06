"use client";
import Image from "next/image";
import Link from "next/link";

import { useConvexAuth } from "convex/react";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <nav className="flex fixed w-full top-0 md:px-24 px-4 z-10 backdrop-blur-3xl  border-green-100 py-2 items-center justify-between">
      <Link href="/">
        <Image
          src="/logo.gif"
          alt="logo"
          className="object-cover w-14 h-14"
          width={500}
          height={500}
        />
      </Link>
      <h1 className="font-serif text-center text-5xl font-bold text-white text-secondary-foreground"><span className="underline underline-offset-3 decoration-8 decoration-blue-500 text-transparent bg-clip-text bg-gradient-to-r to-emerald-500 from-sky-600">COMMUNE DOCTOR AI</span></h1>
      <ul className="flex items-center gap-x-3">
        {/* {isLoading && <Spinner />} */}
        {!isAuthenticated && !isLoading && (
          <>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
