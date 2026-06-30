"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

type RotatingBaguaProps = {
  className?: string;
  size?: number;
};

const trigrams = [
  { name: "乾", bars: ["full", "full", "full"] },
  { name: "兑", bars: ["break", "full", "full"] },
  { name: "离", bars: ["full", "break", "full"] },
  { name: "震", bars: ["break", "break", "full"] },
  { name: "坤", bars: ["break", "break", "break"] },
  { name: "艮", bars: ["full", "break", "break"] },
  { name: "坎", bars: ["break", "full", "break"] },
  { name: "巽", bars: ["full", "full", "break"] },
];

const ringText = "乾坤震巽坎离艮兑甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥";

export function RotatingBagua({ className = "", size = 520 }: RotatingBaguaProps) {
  const [paused, setPaused] = useState(false);

  return (
    <button
      aria-label={paused ? "继续旋转八卦图" : "暂停旋转八卦图"}
      className={`bagua-shell ${paused ? "is-paused" : ""} ${className}`}
      onClick={() => setPaused((value) => !value)}
      style={{ "--bagua-size": `${size}px` } as CSSProperties}
      type="button"
    >
      <svg className="bagua-svg" role="img" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <title>旋转八卦图</title>
        <defs>
          {/* 可修改颜色位置：主金色、青铜金、墨蓝底色。 */}
          <radialGradient id="baguaOuterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4d391" stopOpacity="0.34" />
            <stop offset="48%" stopColor="#b88338" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#020807" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="baguaInk" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#10231f" stopOpacity="0.96" />
            <stop offset="70%" stopColor="#06100f" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#020706" stopOpacity="0.08" />
          </radialGradient>
          <radialGradient id="taijiLight" cx="38%" cy="32%" r="58%">
            <stop offset="0%" stopColor="#fff2cf" />
            <stop offset="100%" stopColor="#d0a765" />
          </radialGradient>
          <filter id="baguaGlow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              result="goldGlow"
              values="1 0 0 0 0.82 0 1 0 0 0.55 0 0 1 0 0.22 0 0 0 0.72 0"
            />
            <feMerge>
              <feMergeNode in="goldGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path id="baguaTextPath" d="M 300 300 m -154 0 a 154 154 0 1 1 308 0 a 154 154 0 1 1 -308 0" />
          <path id="baguaTextPathInner" d="M 300 300 m -118 0 a 118 118 0 1 1 236 0 a 118 118 0 1 1 -236 0" />
        </defs>

        <circle cx="300" cy="300" fill="url(#baguaOuterGlow)" r="292" />
        <circle cx="300" cy="300" fill="url(#baguaInk)" r="246" />

        <g className="bagua-outer">
          <circle className="bagua-stroke soft" cx="300" cy="300" r="244" />
          <circle className="bagua-stroke dashed" cx="300" cy="300" r="220" />
          <circle className="bagua-stroke" cx="300" cy="300" r="184" />
          <circle className="bagua-stroke thin" cx="300" cy="300" r="158" />
          <circle className="bagua-stroke" cx="300" cy="300" r="132" />

          {Array.from({ length: 96 }).map((_, index) => (
            <line
              className={index % 4 === 0 ? "bagua-tick major" : "bagua-tick"}
              key={`tick-${index}`}
              transform={`rotate(${index * 3.75} 300 300)`}
              x1="300"
              x2="300"
              y1={index % 4 === 0 ? "66" : "76"}
              y2="91"
            />
          ))}

          {Array.from({ length: 48 }).map((_, index) => (
            <text
              className="bagua-ring-text"
              key={`ring-${index}`}
              textAnchor="middle"
              transform={`rotate(${index * 7.5} 300 300)`}
              x="300"
              y="120"
            >
              {ringText[index % ringText.length]}
            </text>
          ))}

          <text className="bagua-path-text">
            <textPath href="#baguaTextPath" startOffset="0%">
              {ringText.repeat(3)}
            </textPath>
          </text>
          <text className="bagua-path-text inner">
            <textPath href="#baguaTextPathInner" startOffset="8%">
              {ringText.repeat(3)}
            </textPath>
          </text>

          {trigrams.map((item, index) => {
            const angle = index * 45;
            return (
              <g key={item.name} transform={`rotate(${angle} 300 300)`}>
                <g transform="translate(300 55)">
                  <text className="bagua-name" textAnchor="middle" x="0" y="-16">
                    {item.name}
                  </text>
                  {item.bars.map((bar, barIndex) => (
                    <g key={`${item.name}-${barIndex}`} transform={`translate(0 ${barIndex * 12})`}>
                      {bar === "full" ? (
                        <rect className="trigram-bar" height="6" rx="1" width="54" x="-27" y="0" />
                      ) : (
                        <>
                          <rect className="trigram-bar" height="6" rx="1" width="22" x="-27" y="0" />
                          <rect className="trigram-bar" height="6" rx="1" width="22" x="5" y="0" />
                        </>
                      )}
                    </g>
                  ))}
                </g>
              </g>
            );
          })}
        </g>

        <g className="bagua-taiji">
          <circle cx="300" cy="300" fill="url(#taijiLight)" r="76" />
          <path
            d="M300 224A76 76 0 0 1 300 376A38 38 0 0 1 300 300A38 38 0 0 0 300 224Z"
            fill="#06100f"
          />
          <circle cx="300" cy="262" fill="#06100f" r="11" />
          <circle cx="300" cy="338" fill="#f2d69a" r="11" />
          <circle className="bagua-stroke" cx="300" cy="300" r="76" />
          <circle className="bagua-stroke soft" cx="300" cy="300" r="92" />
        </g>
      </svg>
      <span className="sr-only">点击可暂停或继续旋转</span>

      <style jsx>{`
        .bagua-shell {
          /* 可修改尺寸位置：默认由 size prop 控制，最大不超过容器宽度。 */
          width: min(var(--bagua-size), 100%);
          aspect-ratio: 1;
          display: block;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          color: inherit;
          contain: layout paint;
        }

        .bagua-svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        /* 可修改速度位置：外圈 20s 顺时针，中心 32s 逆时针。 */
        .bagua-outer {
          transform-box: view-box;
          transform-origin: 300px 300px;
          animation: bagua-spin-clockwise 20s linear infinite;
          filter: url(#baguaGlow);
        }

        .bagua-taiji {
          transform-box: view-box;
          transform-origin: 300px 300px;
          animation: bagua-spin-counter 32s linear infinite;
        }

        .bagua-shell:hover .bagua-outer {
          animation-duration: 42s;
        }

        .bagua-shell:hover .bagua-taiji {
          animation-duration: 56s;
        }

        .bagua-shell.is-paused .bagua-outer,
        .bagua-shell.is-paused .bagua-taiji {
          animation-play-state: paused;
        }

        .bagua-stroke {
          fill: none;
          stroke: rgba(216, 166, 86, 0.72);
          stroke-width: 1.4;
        }

        .bagua-stroke.thin {
          stroke-width: 0.8;
          opacity: 0.72;
        }

        .bagua-stroke.soft {
          opacity: 0.38;
        }

        .bagua-stroke.dashed {
          stroke-dasharray: 4 8;
          opacity: 0.45;
        }

        .bagua-tick {
          stroke: rgba(216, 166, 86, 0.45);
          stroke-width: 0.8;
        }

        .bagua-tick.major {
          stroke: rgba(242, 205, 135, 0.82);
          stroke-width: 1.4;
        }

        .bagua-ring-text,
        .bagua-path-text {
          fill: rgba(218, 167, 88, 0.78);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .bagua-path-text.inner {
          fill: rgba(193, 133, 55, 0.7);
          font-size: 10px;
        }

        .bagua-name {
          fill: #e0ad62;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .trigram-bar {
          fill: #d7a65c;
          filter: drop-shadow(0 0 5px rgba(214, 166, 86, 0.45));
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @keyframes bagua-spin-clockwise {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bagua-spin-counter {
          to {
            transform: rotate(-360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bagua-outer,
          .bagua-taiji {
            animation: none;
          }
        }
      `}</style>
    </button>
  );
}
