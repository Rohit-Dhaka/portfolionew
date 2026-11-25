
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { skillGroups } from "../data/skills";

const logoMap = {
  react: "react",
  "react.js": "react",
  javascript: "javascript",
  js: "javascript",
  html: "html5",
  html5: "html5",
  css: "css3",
  css3: "css3",
  tailwind: "tailwindcss",
  "tailwind css": "tailwindcss",
  bootstrap: "bootstrap",
  vite: "vite",
  redux: "redux",
  "react router": "reactrouter",
  "next.js": "nextdotjs",
  nextjs: "nextdotjs",
  node: "nodedotjs",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  express: "express",
  "express.js": "express",
  mongodb: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  postgres: "postgresql",
  firebase: "firebase",
  git: "git",
  github: "github",
  postman: "postman",
  npm: "npm",
  yarn: "yarn",
  vscode: "visualstudiocode",
  "vs code": "visualstudiocode",
  figma: "figma",
  vercel: "vercel",
  netlify: "netlify",
  jwt: "jsonwebtokens",
  axios: "axios",
  python: "python",
  java: "java",
  typescript: "typescript",
  ts: "typescript",
  sass: "sass",
  "framer motion": "framer",
  motion: "framer",
};

const getLogo = (name) => {
  const normalized = name.toLowerCase().trim();
  return logoMap[normalized] || normalized.replace(/[^a-z0-9]/g, "");
};

function SkillChip({ skill, group, index }) {
  const logo = getLogo(skill.name);

  return (
    <div
      className="skill-marquee-card group/card flex shrink-0 items-center gap-3 rounded-xl border border-[#e9e7e2] bg-white px-4 py-3 transition-all duration-300 hover:border-neutral-400 hover:bg-[#fafafa]"
    >
      <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#f5f5f3] p-2 transition-transform duration-300 group-hover/card:-rotate-3 group-hover/card:scale-105">
        <img
          src={`https://cdn.simpleicons.org/${logo}`}
          alt=""
          loading="lazy"
          className="h-full w-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling.style.display = "grid";
          }}
        />
        <span
          style={{ display: "none" }}
          className="absolute inset-0 place-items-center text-[11px] font-bold text-ink"
        >
          {skill.short || skill.name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="whitespace-nowrap text-sm font-semibold text-ink">
          {skill.name}
        </span>
        <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.12em] text-neutral-400">
          {group.title}
        </span>
      </div>

      <span className="ml-2 text-neutral-300 transition-colors duration-300 group-hover/card:text-accent">
        <ArrowUpRight size={14} />
      </span>
    </div>
  );
}

function MarqueeRow({ skills, direction = "left", speed = 35 })  {
  if (!skills.length) return null;

  const duplicated = [...skills, ...skills];

  return (
    <div className="skill-marquee group/marquee overflow-hidden">
      <motion.div
        className="flex w-max gap-3 py-2"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicated.map((item, i) => (
          <SkillChip
            key={`${item.groupId}-${item.skill.name}-${i}`}
            skill={item.skill}
            group={item.group}
            index={i}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  const { firstRow, secondRow, total } = useMemo(() => {
    const all = skillGroups.flatMap((group) =>
      group.items.map((skill) => ({
        skill,
        group,
        groupId: group.id,
      }))
    );

    const frontendIds = ["frontend", "ui"];

    return {
      firstRow: all.filter((item) => frontendIds.includes(item.groupId)),
      secondRow: all.filter((item) => !frontendIds.includes(item.groupId)),
      total: all.length,
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#f8f7f4] py-16 sm:py-20"
    >
      <div className="mx-auto w-[min(1150px,92%)]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                Skills & Technologies
              </span>
            </div>

            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-[-0.065em] text-ink">
              My Toolkit<span className="text-accent">.</span>
            </h2>
          </div>

          <div className="flex items-end justify-between gap-5">
            <p className="max-w-[340px] text-sm leading-7 text-neutral-500">
              The tools and technologies I use to build modern websites,
              applications and digital experiences.
            </p>
          </div>
        </motion.div>

        {/* Skills marquee container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[24px] border border-[#e8e6e0] bg-white py-6 sm:py-8"
        >
          {/* Top info */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white">
                <Sparkles size={15} />
              </span>
              <div>
                <p className="text-xs font-bold text-ink">Tech Stack</p>
                <p className="mt-0.5 text-[10px] text-neutral-400">
                  Tools I work & build with
                </p>
              </div>
            </div>

            <span className="rounded-full border border-[#e9e7e2] px-3 py-1.5 text-[10px] font-semibold text-neutral-500">
              {String(total).padStart(2, "0")} Technologies
            </span>
          </div>

          {/* Row 1 */}
          {firstRow.length > 0 && (
            <div className="mb-3">
              <MarqueeRow
                skills={firstRow}
                direction="left"
                speed={36}
              />
            </div>
          )}

          {/* Row 2 */}
          {secondRow.length > 0 && (
            <MarqueeRow
              skills={secondRow}
              direction="right"
              speed={42}
            />
          )}

   
        </motion.div>

    
      </div>

      {/* Marquee styles */}
      <style>{`
        .skill-marquee:hover .skill-marquee-card {
          transition-duration: 250ms;
        }
        .skill-marquee:hover > div {
          animation-play-state: paused;
        }
        .skill-marquee {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}
