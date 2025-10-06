import Footer from "@/components/footer";
import About from "@/features/home/about";
import Hero from "@/features/home/hero";
import ProjectsHome from "@/features/home/projects";
import Projects from "@/features/home/projects";
import React from "react";

export default function page() {
  return (
    <div className="">
      <Hero />
      <About />
      <ProjectsHome />
    </div>
  );
}
