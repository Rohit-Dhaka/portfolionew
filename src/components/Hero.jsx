
import { useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

import { personal } from "../data/personal";

const pics = personal.images;

const roles = personal.professional.roles?.length
  ? personal.professional.roles
  : [personal.role];

// Heading animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    rotateX: -30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Image animation
const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    rotate: -12,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 18,
    },
  },
};

// Animated image
function Pic({ src, className = "" }) {
  return (
    <motion.span
      variants={imageVariants}
      whileHover={{
        scale: 1.12,
        rotate: 5,
        y: -5,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      }}
      className={`relative inline-flex shrink-0 overflow-hidden align-middle ${className}`}
    >
      <motion.img
        src={src}
        alt=""
        draggable={false}
        animate={{
          y: [0, -4, 0, 3, 0],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-full w-full object-cover"
      />
    </motion.span>
  );
}

// Animated role pill
function Pill({ role }) {
  return (
    <motion.span
      whileHover={{
        y: -3,
        scale: 1.04,
        transition: {
          type: "spring",
          stiffness: 350,
          damping: 15,
        },
      }}
      className="relative inline-flex min-h-[40px] items-center gap-2.5 overflow-hidden rounded-full border border-accent/20 bg-white px-3 py-1.5 align-middle shadow-[0_5px_25px_rgba(255,77,46,0.08)] sm:min-h-[50px] sm:px-4 sm:py-2"
    >
      {/* Shine effect */}
      <motion.span
        className="absolute inset-y-0 w-[45%] -skew-x-[20deg] bg-gradient-to-r from-transparent via-accent/10 to-transparent"
        initial={{ left: "-60%" }}
        animate={{ left: "130%" }}
        transition={{
          duration: 1.5,
          delay: 1.5,
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut",
        }}
      />

      {/* Pulse dot */}
      <motion.span
        className="relative h-2 w-2 shrink-0 rounded-full bg-accent"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.6, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dynamic role animation */}
      <span className="relative grid items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={role}
            initial={{
              opacity: 0,
              y: 12,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -12,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="whitespace-nowrap font-heading text-xs font-bold tracking-tight text-ink sm:text-base"
          >
            {role}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);

  // Dynamic role state
  const [roleIndex, setRoleIndex] = useState(0);

  // Change role every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  const taglineWords = personal.tagline.split(" ");

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-bg px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top right glow */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[110px]"
        />

        {/* Bottom left glow */}
        <motion.div
          animate={{
            x: [0, -35, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-32 h-[350px] w-[350px] rounded-full bg-accent-2/10 blur-[100px]"
        />

        {/* Floating dot 1 */}
        <motion.span
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-accent"
        />

        {/* Floating dot 2 */}
        <motion.span
          animate={{
            y: [0, 14, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute right-[16%] top-[35%] h-1.5 w-1.5 rounded-full bg-accent-2"
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
        }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center"
      >
        {/* Availability badge */}
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="mb-6 flex justify-center sm:mb-8"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-2 backdrop-blur-xl">
            <motion.span
              className="h-2 w-2 rounded-full bg-green-500"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            <span className="font-body text-xs text-neutral-600 sm:text-sm">
              {personal.professional.availability}
            </span>
          </div>
        </motion.div>

        {/* Animated heading */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full font-heading text-[1.65rem] font-semibold leading-[1.45] tracking-tight text-ink sm:text-[2.5rem] md:text-[3.15rem] lg:text-[3.7rem]"
          style={{ perspective: 1000 }}
        >
          {/* Line 1 */}
          <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3">
            <motion.span variants={wordVariants}>Hi,</motion.span>

            <motion.span variants={wordVariants}>I'm</motion.span>

            <Pic
              src={pics.heroOne}
              className="h-9 w-9 rounded-xl sm:h-14 sm:w-14 md:h-[4.2rem] md:w-[4.2rem]"
            />

            <motion.span variants={wordVariants}>
              {personal.name}
            </motion.span>
          </span>

          {/* Line 2 */}
          <span className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3">
            <Pic
              src={pics.heroTwo}
              className="h-9 w-9 rounded-full sm:h-14 sm:w-14 md:h-[4.2rem] md:w-[4.2rem]"
            />

            <Pill role={roles[roleIndex]} />

            <motion.span variants={wordVariants}>who</motion.span>

            <motion.span variants={wordVariants}>builds</motion.span>
          </span>

          {/* Line 3 */}
          <span className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-3">
            <Pic
              src={pics.heroThree}
              className="h-9 w-9 rounded-t-full sm:h-14 sm:w-14 md:h-[4.2rem] md:w-[5.2rem]"
            />

            {taglineWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            delay: 1.4,
          }}
          className="mx-auto mt-6 max-w-xl font-body text-sm leading-7 text-neutral-500 sm:mt-7 sm:text-base sm:leading-8"
        >
          {personal.shortIntro}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 1.65,
          }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4"
        >
          {/* View projects */}
          <motion.a
            href={personal.heroButtons.primary.href}
            whileHover={{
              y: -4,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-white transition-shadow hover:shadow-xl hover:shadow-black/10 sm:py-3.5"
          >
            <span className="font-body text-sm font-medium">
              {personal.heroButtons.primary.label}
            </span>

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </motion.a>

          {/* Download CV */}
          <motion.a
            href={personal.heroButtons.secondary.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              y: -4,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group inline-flex items-center gap-3 rounded-full border border-line bg-white/70 px-5 py-3 text-ink backdrop-blur-xl transition-colors hover:border-ink sm:py-3.5"
          >
            <Download size={16} />

            <span className="font-body text-sm font-medium">
              {personal.heroButtons.secondary.label}
            </span>
          </motion.a>
        </motion.div>

  
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
        className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2  "
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-neutral-400"
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="font-body text-[10px] uppercase tracking-[0.25em]">
            Scroll to explore
          </span>

          <span className="h-7 w-[1px] bg-gradient-to-b from-accent to-transparent sm:h-8" />
        </motion.a>
      </motion.div>
    </section>
  );
}
