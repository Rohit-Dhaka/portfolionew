
import { useState } from "react";
import { motion } from "framer-motion";
import { personal } from "../data/personal";

const Icon = ({ children, className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const icons = {
  chat: (
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z" />
  ),

  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </>
  ),

  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),

  message: (
    <>
      <path d="M4 4h16v12H8l-4 4z" />
      <path d="M8 8h8M8 12h5" />
    </>
  ),

  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,

  check: <path d="m5 12 5 5 9-10" />,

  error: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4m0 4h.01" />
    </>
  ),
};

// ---------------------------------------------
// Input Field
// ---------------------------------------------
const Field = ({ icon, children, className = "" }) => (
  <label
    className={`group flex items-start gap-3 rounded-sm border border-[#e5e2dc] bg-white px-4 transition-all duration-300 hover:border-[#c9c4bb] focus-within:border-accent ${className}`}
  >
    <span className="mt-[15px] shrink-0 text-[#99948c] transition-colors duration-300 group-focus-within:text-accent">
      <Icon className="h-[18px] w-[18px]">{icons[icon]}</Icon>
    </span>

    {children}
  </label>
);

const inputCls =
  "w-full bg-transparent py-4 text-sm text-[#222] outline-none placeholder:text-[#aaa69f] sm:text-[15px]";

// ---------------------------------------------
// Animation
// ---------------------------------------------
const up = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ---------------------------------------------
// Contact Section
// ---------------------------------------------
export default function Contact() {
  const [status, setStatus] = useState("idle");

  const send = async (e) => {
    e.preventDefault();

    if (status === "sending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      return;
    }

    formData.append("access_key", accessKey);
    formData.append("subject", `Portfolio contact - ${formData.get("name")}`);
    formData.append("from_name", personal.name);

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative mx-2 mt-4 overflow-hidden rounded-t-[32px] bg-[#f8f7f4] px-4 pb-20 pt-20 text-[#171717] sm:mx-4 sm:rounded-t-[48px] sm:px-6 sm:pb-24 sm:pt-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-28 -top-32 h-[350px] w-[350px] rounded-full bg-orange-200/30 blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full bg-amber-100/50 blur-[100px]"
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mx-auto w-[min(1000px,100%)]"
      >
        {/* Heading */}
        <div className="text-center">
          <motion.div
            custom={0}
            variants={up}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#85817a] sm:text-sm"
          >
            <motion.span
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="text-accent"
            >
              <Icon className="h-6 w-6">{icons.chat}</Icon>
            </motion.span>

            Let's connect
          </motion.div>

          <motion.h2
            custom={1}
            variants={up}
            className="mt-5 font-heading text-[clamp(2.8rem,7vw,5rem)] font-medium  leading-[1.05] tracking-[-0.04em] text-[#171717]"
          >
            Let's talk<span className="text-accent">.</span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={up}
            className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#77736d] sm:text-base sm:leading-8"
          >
            Have an idea, a project, or an opportunity? I'd love to hear about it.
            Drop me a message and let's create something meaningful.
          </motion.p>
        </div>

        {/* Contact Form */}
        <motion.form
          custom={3}
          variants={up}
          onSubmit={send}
          className="mx-auto mt-10 grid max-w-3xl gap-4 sm:mt-14 sm:gap-5"
        >
          {/* Name & Email */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <Field icon="user">
              <input
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                placeholder="Your name"
                className={inputCls}
              />
            </Field>

            <Field icon="mail">
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Your email address"
                className={inputCls}
              />
            </Field>
          </div>

          {/* Message */}
          <Field icon="message">
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={3000}
              rows={5}
              placeholder="Tell me a little about your project..."
              className={`${inputCls} min-h-[150px] resize-y leading-7`}
            />
          </Field>

          {/* Status Message */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-green-700"
              role="status"
            >
              <Icon className="h-5 w-5">{icons.check}</Icon>
              Your message has been sent successfully!
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 text-sm text-red-600"
              role="alert"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0">
                {icons.error}
              </Icon>
              Something went wrong. Please try again or contact me directly via email.
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="mt-3 flex justify-center sm:mt-5">
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={status !== "sending" ? { y: -3 } : {}}
              whileTap={status !== "sending" ? { scale: 0.97 } : {}}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#171717] px-8 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60 sm:px-10"
            >
              {status === "sending" ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  />
                  Sending message...
                </>
              ) : status === "success" ? (
                <>
                  <Icon className="h-4 w-4">{icons.check}</Icon>
                  Message sent
                </>
              ) : (
                <>
                  Send message
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <Icon className="h-4 w-4">{icons.arrow}</Icon>
                  </span>
                </>
              )}
            </motion.button>
          </div>

          {/* Small footer text */}
          <motion.p
            custom={4}
            variants={up}
            className="mt-2 text-center text-xs text-[#99948c]"
          >
            Typically respond within 24–48 hours.
          </motion.p>
        </motion.form>
      </motion.div>
    </section>
  );
}
