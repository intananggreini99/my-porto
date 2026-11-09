import { useCallback, useEffect, useState } from "react";
import data from "./data/portfolio";
import { NAV } from "./lib/utils";
import { useScroll } from "./hooks/useScroll";
import { Dock, Header, OffCanvas, Rail } from "./components/Navigation";
import ProfileCard from "./components/Profile";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Credentials from "./components/Credentials";
import Activities from "./components/Activities";
import Contact from "./components/Contact";
import ProjectModal from "./components/ProjectModal";
import Lightbox from "./components/Lightbox";
import { BackToTop, Footer } from "./components/Footer";

const SECTION_IDS = NAV.map((n) => n.id);

export default function App() {
  const { scrolled, showTop, progress, active } = useScroll(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [viewer, setViewer] = useState(null); // { items, start }

  const project = projectId ? data.projects.find((p) => p.id === projectId) : null;
  const openViewer = useCallback((items, start) => setViewer({ items, start }), []);

  // hide the static preloader once the app is on screen
  useEffect(() => {
    const el = document.getElementById("preloader");
    if (!el) return;
    const done = () => el.classList.add("is-done");
    const t = setTimeout(done, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed top-[-60px] left-4 z-[300] rounded-card bg-gold-400 px-4 py-2.5 font-semibold text-gray-950 transition-[top] focus:top-4"
      >
        Skip to content
      </a>

      <Header scrolled={scrolled} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
      <Rail active={active} />

      <div className="mx-auto max-w-[1320px] px-[var(--gutter)] pt-[calc(var(--header-h)+28px)] pb-32 md:pt-[calc(var(--header-h)+32px)] xl:grid xl:grid-cols-[320px_minmax(0,1fr)] xl:items-start xl:gap-9 xl:pt-[calc(var(--header-h)+72px)] xl:pb-12 xl:pl-[calc(var(--gutter)+var(--rail-w)+24px)] 2xl:grid-cols-[340px_minmax(0,1fr)] 2xl:gap-10">
        <ProfileCard />
        <main id="main" tabIndex={-1} className="@container mt-14 min-w-0 focus:outline-none xl:mt-0">
          <Hero />
          <About />
          <Skills />
          <Projects onOpen={(id) => setProjectId(id)} />
          <Credentials />
          <Activities onOpen={openViewer} />
          <Contact />
          <Footer />
        </main>
      </div>

      <Dock active={active} />
      <BackToTop visible={showTop} progress={progress} />
      <OffCanvas open={menuOpen} active={active} onClose={() => setMenuOpen(false)} />
      <ProjectModal project={project} onClose={() => setProjectId(null)} onZoom={(items, start) => openViewer(items, start)} zoomOpen={Boolean(viewer)} />
      <Lightbox items={viewer?.items} start={viewer?.start} onClose={() => setViewer(null)} />
    </>
  );
}
