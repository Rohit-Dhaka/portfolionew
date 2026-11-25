import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { frontendIntro, frontendProjects } from "../data/frontend";

/* ---------- icons ---------- */
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const up = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

/* ---------- one card ---------- */
function Card({ p, i }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group shrink-0 w-[min(440px,80vw)]"
    >
      {/* screenshot */}
      <a
        href={p.live}
        target="_blank"
        rel="noreferrer"
        className="relative block overflow-hidden rounded-xl aspect-[16/10] bg-neutral-900 ring-1 ring-white/10 group-hover:ring-accent/60 transition"
      >
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: p.gradient }}
          >
            {/* mini fake website layout */}
            <div className="absolute inset-x-5 top-4 flex items-center justify-between">
              <span className="w-12 h-2 rounded bg-white/70" />
              <span className="flex gap-2">
                <i className="w-6 h-1.5 rounded bg-white/50" />
                <i className="w-6 h-1.5 rounded bg-white/50" />
                <i className="w-6 h-1.5 rounded bg-white/50" />
              </span>
            </div>
            <span className="absolute left-5 top-1/3 text-white text-2xl sm:text-3xl font-extrabold tracking-tight leading-none max-w-[70%]">
              {p.title}
            </span>
            <span className="absolute left-5 bottom-5 px-4 py-1.5 rounded-full bg-white text-ink text-xs font-bold">
              Get started
            </span>
          </div>
        )}
      </a>

      {/* title row */}
      <div className="flex items-center gap-3 mt-4">
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${p.title}`}
          className="w-9 h-9 shrink-0 rounded-lg bg-gradient-to-br from-accent to-orange-400 text-white grid place-items-center group-hover:rotate-12 transition-transform"
        >
          <ExternalIcon />
        </a>
        <h3 className="text-lg font-medium truncate">{p.title}</h3>
        <a
          href={p.code}
          target="_blank"
          rel="noreferrer"
          aria-label={`${p.title} on GitHub`}
          title="GitHub"
          className="ml-auto text-neutral-500 hover:text-white transition"
        >
          <GithubIcon />
        </a>
      </div>
    </motion.article>
  );
}

/* ---------- main ---------- */
export default function FrontendGallery() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const calc = () =>
      setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // row left ki taraf sarakti hai jaise page scroll hota hai
  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, -dist]);
  const glow = useTransform(scrollYProgress, [0, 1], [-80, 120]);

  return (
    <section
      id="frontend"
      ref={ref}
      className="relative overflow-hidden bg-ink text-white rounded-[40px] sm:rounded-[56px] mx-2 sm:mx-4 mt-4 py-24 sm:py-32"
    >
      {/* glow */}
      <motion.div
        style={{ y: glow }}
        className="absolute -top-24 right-[8%] w-[480px] h-[480px] rounded-full bg-accent/20 blur-[130px] pointer-events-none"
      />

      {/* header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative w-[min(820px,92%)] mx-auto text-center"
      >
        <motion.div
          custom={0}
          variants={up}
          className="inline-flex items-center gap-3 text-neutral-400 tracking-[0.12em] uppercase text-base sm:text-lg font-medium"
        >
          <motion.span
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
            className="text-accent"
          >
            <EyeIcon />
          </motion.span>
          {frontendIntro.label}
        </motion.div>

        <motion.h2
          custom={1}
          variants={up}
          className="mt-5 text-[clamp(2rem,5vw,3.4rem)] font-extrabold tracking-tight leading-tight bg-gradient-to-r from-accent via-orange-400 to-amber-300 bg-clip-text text-transparent"
        >
          {frontendIntro.heading}
        </motion.h2>

        <motion.p
          custom={2}
          variants={up}
          className="mt-6 text-neutral-400 text-base sm:text-xl leading-relaxed"
        >
          {frontendIntro.desc}
        </motion.p>
      </motion.div>

      {/* scrolling row */}
      <div className="relative mt-16 sm:mt-24 overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 sm:gap-8 w-max px-[6vw] will-change-transform"
        >
          {frontendProjects.map((p, i) => (
            <Card key={p.title} p={p} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}