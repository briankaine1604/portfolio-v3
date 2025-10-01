import Footer from "@/components/footer";
import About from "@/features/home/about";
import Hero from "@/features/home/hero";
import Projects from "@/features/home/projects";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="">
      <Hero />
      <About />
      <Projects />
    </div>
  );
}
