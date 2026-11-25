
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const text =
  "I am a curious developer who loves turning ideas into real, smooth and beautiful websites. I care about clean code, great design and small details.";

const words = text.split(" ");

// Scroll reveal word
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="mr-[0.28em] inline-block"
    >
      {children}
    </motion.span>
  );
}

// Actual image cards (same overlapping style as original)
const photos = [
  {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
    cap: "My workspace",
    left: "0%",
    top: "20px",
    r: -8,
  },
  {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=85",
    cap: "Late night coding",
    left: "38%",
    top: "110px",
    r: 7,
  },
];

const stats = [
  ["2+", "Years learning"],
  ["15+", "Projects built"],
  ["100%", "Passion"],
];

export default function About() {
  const textRef = useRef(null);
  const photoRef = useRef(null);

  // Text reveal on scroll
  const { scrollYProgress: tp } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.5"],
  });

  // Image parallax
  const { scrollYProgress: pp } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });

  const rot1 = useTransform(pp, [0, 1], [-20, 6]);
  const rot2 = useTransform(pp, [0, 1], [20, -6]);

  const y1 = useTransform(pp, [0, 1], [80, -40]);
  const y2 = useTransform(pp, [0, 1], [-20, 60]);

  const rots = [rot1, rot2];
  const ys = [y1, y2];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0b0b0d] py-28 text-white sm:py-36"
    >
      {/* Ambient orange light - no grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[130px]"
        />

        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-accent-2/5 blur-[130px]"
        />
      </div>

      {/* Main content */}
      <div className="relative mx-auto grid w-[min(1100px,92%)] items-center gap-16 md:grid-cols-[1.2fr_1fr] md:gap-14">

        {/* Left content */}
        <div className="relative z-10">
          {/* Section label */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent"
          >
            <span className="h-px w-8 bg-accent" />
            About me
          </motion.span>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-7 font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          >
            Turning ideas into
            <span className="mt-1 block text-neutral-500">
              digital experiences.
            </span>
          </motion.h2>

          {/* Scroll animated paragraph */}
          <p
            ref={textRef}
            className="max-w-2xl font-body text-lg font-semibold leading-snug tracking-tight sm:text-[1.65rem] lg:text-[2rem]"
          >
            {words.map((w, i) => (
              <Word
                key={i}
                progress={tp}
                range={[
                  i / words.length,
                  (i + 1) / words.length,
                ]}
              >
                {w}
              </Word>
            ))}
          </p>

          {/* Explore link */}
          <motion.a
            href="#projects"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ x: 5 }}
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-accent"
          >
            Explore my work
            <ArrowUpRight size={16} />
          </motion.a>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-7 sm:mt-14 sm:gap-8">
            {stats.map(([n, l], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                }}
              >
                <h3 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  {n}
                </h3>

                <p className="mt-2 text-xs leading-5 text-neutral-500 sm:text-sm">
                  {l}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right image section - original overlapping layout */}
        <div
          ref={photoRef}
          className="relative mx-auto h-[390px] w-full max-w-[480px] sm:h-[470px]"
        >
          {/* Soft glow behind images */}
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />

          {photos.map((p, i) => (
            <motion.div
              key={p.cap}
              style={{
                rotate: rots[i],
                y: ys[i],
                left: p.left,
                top: p.top,
              }}
              initial={{
                opacity: 0,
                scale: 0.85,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
              }}
              whileHover={{
                scale: 1.04,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                },
              }}
              className="absolute w-[200px] overflow-hidden rounded-xl border border-white/10 bg-[#171719] p-2.5 pb-8 shadow-2xl shadow-black/40 sm:w-[250px] sm:p-3 sm:pb-10"
            >
              {/* Actual image */}
              <div className="relative h-[200px] overflow-hidden rounded-lg sm:h-[250px]">
                <motion.img
                  src={p.src}
                  alt={p.cap}
                  draggable="false"
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              </div>

              {/* Image caption */}
              <small className="mt-3 block text-center text-sm text-neutral-400">
                {p.cap}
              </small>
            </motion.div>
          ))}
        </div>
      </div>

   
    </section>
  );
}
