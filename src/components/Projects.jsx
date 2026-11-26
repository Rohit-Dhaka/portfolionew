
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fullStackProjects, frontendProjects } from "../data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ExternalLink } from "lucide-react";

import "swiper/css";

/* ---------- github icon ---------- */
const GithubIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.88 10.95.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.35-3.88-1.35-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.46.12-3.05 0 0 .98-.3 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.48 3.2-1.18 3.2-1.18.64 1.59.24 2.75.12 3.05.75.8 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.25 5.69.42.36.79 1.07.79 2.16v3.21c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

/* ---------- folder icon ---------- */
const FolderIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  </svg>
);

/* ---------- full stack project links ---------- */
function ProjectLinks({ p }) {
  const buttonStyle =
    "flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 hover:-translate-y-1 active:scale-95";

  return (
    <div className="mt-5 flex items-center gap-3">
      {/* Live Demo */}
      {p.live && (
        <motion.a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          title="Live Demo"
          aria-label={`Live demo of ${p.title}`}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          className={`${buttonStyle} bg-white text-black hover:bg-accent hover:text-white`}
        >
          <ExternalLink size={19} strokeWidth={2} />
        </motion.a>
      )}

      {/* GitHub */}
      {p.code && (
        <motion.a
          href={p.code}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Repository"
          aria-label={`GitHub repository of ${p.title}`}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          className={`${buttonStyle} border border-white/15 bg-white/[0.04] text-white hover:bg-white hover:text-black`}
        >
          <GithubIcon size={19} />
        </motion.a>
      )}
    </div>
  );
}

/* ---------- frontend live link only ---------- */
function FrontendLiveLink({ p }) {
  if (!p.live) return null;

  return (
    <a
      href={p.live}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open live demo of ${p.title}`}
      title="Live Demo"
      className="group/link inline-flex shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] p-2.5 text-white transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
    >
      <ExternalLink
        size={17}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      />
    </a>
  );
}

/* ---------- project media ---------- */
function Media({ p }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#121214]">
      {p.video ? (
        <video
          src={p.video}
          poster={p.image || undefined}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : p.image ? (
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700"
        />
      ) : (
        <div
          className="absolute inset-0 grid place-items-center overflow-hidden text-white"
          style={{
            background:
              p.gradient ||
              "linear-gradient(135deg, #27272a, #09090b)",
          }}
        >
          <span className="absolute text-[7rem] font-black leading-none opacity-[0.12] sm:text-[9rem]">
            {p.id}
          </span>

          <div className="relative text-center">
            <FolderIcon />
            <span className="mt-3 block text-xs text-white/70">
              Project Preview
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- full stack project row ---------- */
function FullStackRow({ p, i }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  const imageLeft = i % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const long = (p.desc || "").length > 150;

  return (
    <div ref={ref} className="relative">
      {/* ambient glow */}
      <div
        className={`pointer-events-none absolute top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-accent/10 blur-[100px] sm:h-[450px] sm:w-[450px] ${
          imageLeft ? "left-0" : "right-0"
        }`}
      />

      <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* image */}
        <motion.div
          style={{ y: imageY }}
          className={`relative z-10 ${
            imageLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: imageLeft ? -60 : 60, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Media p={p} />
          </motion.div>
        </motion.div>

        {/* project details */}
        <motion.div
          initial={{ opacity: 0, x: imageLeft ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`relative z-20 ${
            imageLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* category */}
          <div
            className={`flex items-center gap-3 ${
              !imageLeft ? "lg:flex-row-reverse lg:justify-end" : ""
            }`}
          >
            <span className="text-accent">
              <FolderIcon />
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 sm:text-sm">
              Full Stack Project
            </span>
          </div>

          {/* title */}
          <h3
            className={`mt-4 text-[clamp(2rem,4vw,3.3rem)] font-extrabold leading-[1.05] tracking-tight ${
              !imageLeft ? "lg:text-right" : ""
            }`}
          >
            {p.title}
          </h3>

          {/* tags */}
          <div
            className={`mt-5 flex flex-wrap gap-2 ${
              !imageLeft ? "lg:justify-end" : ""
            }`}
          >
            {(p.tags || []).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* description */}
          <div
            className={`mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.055] p-5 backdrop-blur-xl sm:p-6 ${
              imageLeft ? "lg:-ml-20" : "lg:-mr-20"
            }`}
          >
            <p
              className={`text-sm leading-7 text-neutral-300 sm:text-[15px] ${
                open || !long ? "" : "line-clamp-3"
              }`}
            >
              {p.desc}
            </p>

            {long && (
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="mt-3 text-sm font-semibold text-accent transition-colors hover:text-white"
              >
                {open ? "Read Less −" : "Read More +"}
              </button>
            )}
          </div>

          {/* links */}
          <div className={!imageLeft ? "lg:flex lg:justify-end" : ""}>
            <ProjectLinks p={p} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- frontend project card ---------- */
function FrontendCard({ p }) {
  return (
    <div className="h-full">
      {/* project preview */}
      <Media p={p} />

      {/* Live link + project title */}
      <div className="mt-4 flex items-center gap-3">
        <FrontendLiveLink p={p} />

        <h3 className="min-w-0 truncate text-base font-semibold text-white sm:text-lg">
          {p.title}
        </h3>
      </div>
    </div>
  );
}

/* ---------- reveal animation ---------- */
const up = {
  hidden: { opacity: 0, y: 35 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

/* ---------- main projects section ---------- */
export default function Projects() {
  const swiperRef = useRef(null);

  const pauseSlider = () => {
    swiperRef.current?.autoplay?.stop();
  };

  const resumeSlider = () => {
    swiperRef.current?.autoplay?.start();
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-ink  text-white py-16 sm:py-18 lg:py-20"
    >
      {/* background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[130px]" />

      <div className="relative mx-auto w-[min(1200px,92%)]">
        {/* main heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mb-20 max-w-2xl text-center sm:mb-28"
        >
          <motion.div
            custom={0}
            variants={up}
            className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-400 sm:text-sm"
          >
            <span className="text-accent">
              <FolderIcon />
            </span>
            Portfolio Showcase
          </motion.div>

          <motion.h2
            custom={1}
            variants={up}
            className="mt-4 font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tight"
          >
            My Work
          </motion.h2>

          <motion.p
            custom={2}
            variants={up}
            className="mt-5 text-sm leading-relaxed text-neutral-400 sm:text-lg"
          >
            A collection of projects built with creativity, problem-solving and modern web technologies.
          </motion.p>
        </motion.div>

        {/* ================= FULL STACK PROJECTS ================= */}
        <div className="mb-24 sm:mb-32">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16"
          >
            <div className="mb-3 flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                <FolderIcon />
              </span>

              <div>
                <h3 className="text-2xl font-heading font-bold sm:text-3xl ">
                  Full Stack Projects
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  End-to-end applications with frontend and backend functionality.
                </p>
              </div>
            </div>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/40 via-white/10 to-transparent" />
          </motion.div>

          {/* full stack projects */}
          <div className="space-y-24 sm:space-y-36">
            {fullStackProjects.map((p, i) => (
              <FullStackRow key={`fullstack-${p.id}`} p={p} i={i} />
            ))}
          </div>
        </div>

        {/* ================= FRONTEND PROJECTS ================= */}
        <div className="relative">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14"
          >
            <div className="mb-3 flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                <FolderIcon />
              </span>

              <div>
                <h3 className="text-2xl font-bold sm:text-3xl">
                  Frontend Projects
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  Creative interfaces, responsive websites and interactive experiences.
                </p>
              </div>
            </div>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/40 via-white/10 to-transparent" />
          </motion.div>

          {/* smooth continuous frontend slider */}
          <div
            onMouseEnter={pauseSlider}
            onMouseLeave={resumeSlider}
            className="frontend-slider-wrap"
          >
            <Swiper
              modules={[Autoplay]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              loop={frontendProjects.length > 2}
              speed={6500}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              allowTouchMove
              grabCursor
              spaceBetween={18}
              slidesPerView={1.08}
              breakpoints={{
                540: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 22,
                },
                1024: {
                  slidesPerView: 2.4,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 26,
                },
              }}
              className="frontend-project-swiper !pb-4"
            >
              {frontendProjects.map((p) => (
                <SwiperSlide key={`frontend-${p.id}`} className="!h-auto">
                  <FrontendCard p={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* continuous linear movement */}
      <style>{`
        .frontend-project-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .frontend-slider-wrap .swiper-slide {
          transform: none !important;
        }

        .frontend-slider-wrap .swiper-slide img {
          transform: none !important;
        }
      `}</style>
    </section>
  );
}
