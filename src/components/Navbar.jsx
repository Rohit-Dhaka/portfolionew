import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = ["home", "about", "skills", "projects", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");

  // Active section observer
  useEffect(() => {
    const sections = links
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5, 0.7],
        rootMargin: "-15% 0px -15% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 130,
          damping: 18,
          delay: 0.15,
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 p-1.5 sm:p-2 rounded-full bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_8px_35px_rgba(0,0,0,0.07)] max-w-[94vw]"
      >
        {links.map((link) => {
          const isActive = active === link;

          return (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => setActive(link)}
              className={`relative isolate flex items-center justify-center px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-[13px] font-medium font-body capitalize whitespace-nowrap outline-none transition-colors duration-300 ${
                isActive
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {/* Active background pill */}
              {isActive && (
                <motion.span
                  layoutId="navbar-active-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              {/* Hover background */}
              {!isActive && (
                <motion.span
                  className="absolute inset-0 -z-10 rounded-full bg-neutral-200/60 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              <motion.span
                animate={{
                  y: isActive ? -0.5 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                {link}
              </motion.span>
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}
