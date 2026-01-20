"use client";

import { Typography } from "../Typography/Typography";
import { WaveBackground } from "./WaveBackground";
import { useTheme } from "../../context/ThemeContext";

function SunMoonToggle({
  isDark,
  onToggle,
  className,
}: {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={`w-24 h-24 rounded-full transition-colors duration-500 cursor-pointer ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <circle cx="12" cy="12" r="10" />
        <circle
          cx="8"
          cy="12"
          r="10"
          style={{
            fill: isDark ? "var(--sky-dark)" : "var(--sky)",
            opacity: isDark ? 1 : 0,
            transition: "fill 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>
    </button>
  );
}

function HeroText({ variant }: { variant: "sky" | "sea" }) {
  const textColor =
    variant === "sky"
      ? "text-sky-text dark:text-sky-text-dark"
      : "text-sea-text dark:text-sea-text-dark";

  return (
    <>
      <Typography as="h1" variant="heading1" className={textColor}>
        Simon Ryrie
      </Typography>
      <Typography as="h2" variant="heading2" className={textColor}>
        Frontend Engineer
      </Typography>
      <Typography as="h3" variant="heading3" className={textColor}>
        I build accessible, pixel-perfect digital experiences for the web.
      </Typography>
    </>
  );
}

export function Hero() {
  const { isDark, toggleTheme } = useTheme();

  const textContainerStyles =
    "absolute inset-0 flex flex-col items-start px-80 gap-2 justify-center";

  return (
    <div className="relative w-full h-screen overflow-hidden bg-sea dark:bg-sea-dark">
      <WaveBackground />

      <SunMoonToggle
        isDark={isDark}
        onToggle={toggleTheme}
        className="absolute top-8 left-8 z-10 text-sky-text dark:text-sky-text-dark transition-colors duration-500"
      />

      <div className={textContainerStyles}>
        <HeroText variant="sky" />
      </div>

      <div
        className={textContainerStyles}
        style={{ clipPath: "url(#waveClip)" }}
      >
        <HeroText variant="sea" />
      </div>
    </div>
  );
}
