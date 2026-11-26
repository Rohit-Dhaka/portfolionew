import { useRef } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const scrollContainerRef = useRef(null);

  return (
    <>
      <Navbar />

      <main
        ref={scrollContainerRef}
        className="snap-container hide-scrollbar"
      >
        <section id="home" className="snap-section">
          <Hero scrollContainerRef={scrollContainerRef} />
        </section>

        <section id="about" className="snap-section">
          <About />
        </section>

        <section id="skills" className="snap-section">
          <Skills />
        </section>

        <section id="projects" className="snap-section">
          <Projects />
        </section>

        <section id="contact" className="snap-section">
          <Contact />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}