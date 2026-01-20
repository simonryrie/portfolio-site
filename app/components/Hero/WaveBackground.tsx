"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function createWavePath({
  width,
  baseY,
  amplitude,
  phase,
  offsetX,
  variance,
}: {
  width: number;
  baseY: number;
  amplitude: number;
  phase: number;
  offsetX: number;
  variance: number;
}) {
  const segment = width / 3;

  return `
    M0,${baseY}
    C${segment * 0.5 + offsetX},${
    baseY + (amplitude + variance) * Math.sin(phase)
  }
     ${segment * 1.0 + offsetX},${
    baseY - (amplitude - variance) * Math.sin(phase)
  }
     ${segment * 1.5},${baseY}
    C${segment * 2.0 + offsetX},${
    baseY + (amplitude + variance) * Math.sin(phase)
  }
     ${segment * 2.5 + offsetX},${
    baseY - (amplitude - variance) * Math.sin(phase)
  }
     ${width},${baseY}
    L${width},900 L0,900 Z
  `;
}

const waveConfig = {
  baseY: 520,
  amplitude: 120,
  duration: 3,
  drift: 120,
  randomness: 40,
};

type WaveBackgroundProps = {
  clipPathId?: string;
};

export function WaveBackground({
  clipPathId = "waveClip",
}: WaveBackgroundProps) {
  const wavePathRef = useRef<SVGPathElement | null>(null);
  const svgWidthRef = useRef(1440);

  useEffect(() => {
    const updateWidth = () => {
      svgWidthRef.current = window.innerWidth;
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (!wavePathRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const waveState = {
      phase: 0,
      offsetX: 0,
      variance: 0,
    };

    const phaseTween = gsap.to(waveState, {
      phase: Math.PI * 2,
      offsetX: waveConfig.drift,
      duration: waveConfig.duration,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        wavePathRef.current?.setAttribute(
          "d",
          createWavePath({
            width: svgWidthRef.current,
            baseY: waveConfig.baseY,
            amplitude: waveConfig.amplitude,
            phase: waveState.phase,
            offsetX: waveState.offsetX,
            variance: waveState.variance,
          })
        );
      },
    });

    const varianceTween = gsap.to(waveState, {
      variance: waveConfig.randomness,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => {
      phaseTween.kill();
      varianceTween.kill();
    };
  }, []);

  return (
    <>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${svgWidthRef.current} 900`}
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={clipPathId}>
            <path
              ref={wavePathRef}
              d={createWavePath({
                width: svgWidthRef.current,
                baseY: waveConfig.baseY,
                amplitude: waveConfig.amplitude,
                phase: 1,
                offsetX: 0,
                variance: 0,
              })}
            />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-sky dark:bg-sky-dark transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-sea dark:bg-sea-dark transition-colors duration-500" />
      <div
        className="absolute inset-0 bg-sea dark:bg-sea-dark transition-colors duration-500"
        style={{ clipPath: `url(#${clipPathId})` }}
      />
    </>
  );
}
