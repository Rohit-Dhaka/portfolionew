
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";

import { personal } from "../data/personal";

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
  discord: FaDiscord,
};

const fade = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  const email = personal.contact?.email || "";
  const phone = personal.contact?.phone || "";
  const navLinks = personal.navLinks || [];
  const socials = personal.socials || [];

  return (
    <footer className="relative w-full overflow-hidden  bg-black  ">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-[600px] max-w-full -translate-x-1/2 rounded-full bg-indigo-500/[0.06] blur-[120px]" />

        <div className="absolute left-[15%] top-1/3 h-2 w-2 rounded-full bg-indigo-500/10 blur-[2px]" />
        <div className="absolute right-[24%] top-[65%] h-2 w-2 rounded-full bg-violet-500/10 blur-[2px]" />
        <div className="absolute left-[28%] top-[20%] h-1.5 w-1.5 rounded-full bg-blue-400/10" />
      </div>

      {/* Main Footer Content */}
      <div className="relative flex w-full flex-col items-center px-4 pt-16 pb-14 sm:pt-20 sm:pb-16">

        {/* Social Icons */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          {socials.map((social) => {
            const Icon =
              socialIcons[social.name?.toLowerCase()] || FaGithub;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-white text-accent transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-white"
              >
                <Icon size={19} />
              </a>
            );
          })}
        </motion.div>

        {/* Contact Details */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
        >
          {email && (
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-2.5 text-sm text-slate-300 transition-colors hover:text-accent"
            >
              <Mail
                size={18}
                className="shrink-0 transition-colors group-hover:text-accent"
              />
              {email}
            </a>
          )}

          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="group inline-flex items-center gap-2.5 text-sm text-slate-300 transition-colors hover:text-white"
            >
              <Phone
                size={18}
                className="shrink-0 transition-colors group-hover:text-accent"
              />
              {phone}
            </a>
          )}
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          custom={2}
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 transition-colors duration-300 hover:text-accent"
            >
              {link.name === "Contact" ? "Contact Me" : link.name}
            </a>
          ))}
        </motion.nav>
      </div>

      {/* Divider */}
      <div className="relative w-full border-t border-white/15" />

      {/* Copyright */}
      <motion.div
        variants={fade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative flex min-h-[72px] items-center justify-center px-4 py-5 text-center"
      >
        <p className="text-sm font-medium text-slate-300">
          © {new Date().getFullYear()} <span className="mx-1">|</span> All Rights Reserved
        </p>
      </motion.div>
    </footer>
  );
}
