"use client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex fixed w-4/5 top-0 md:px-24 px-4 z-10 backdrop-blur-3xl border py-4 items-center justify-between rounded-xl">
      <Link href="/">
        <Image
          src="/logo.gif"
          alt="logo"
          className="object-cover w-14 h-14"
          width={500}
          height={500}
        />
      </Link>
      <h1 className="font-serif text-center items-center text-2xl font-bold text-white text-secondary-foreground">COMMUNE DOCTOR AI</h1>
    </nav>
  );
};

export default Navbar;
