import React from "react";

/**
 * RotatingFlowers
 * Renders multiple rotating chakra/flower decorations as a full-cover background layer.
 *
 * Props:
 *  - tintColor: string  CSS color for the flower tint (rgba or hex). Defaults to semi-transparent gold.
 *  - className: string  Extra classes on the container div.
 */
const flowers = [
  // [top%, left%, size-rem, duration-s, opacity, direction]
  { top: "5%",  left: "3%",  size: 7,   dur: 28, op: 0.18, rev: false },
  { top: "8%",  left: "82%", size: 9,   dur: 36, op: 0.14, rev: true  },
  { top: "35%", left: "-3%", size: 12,  dur: 44, op: 0.12, rev: false },
  { top: "30%", left: "88%", size: 10,  dur: 38, op: 0.13, rev: true  },
  { top: "60%", left: "5%",  size: 8,   dur: 32, op: 0.15, rev: true  },
  { top: "55%", left: "78%", size: 11,  dur: 42, op: 0.12, rev: false },
  { top: "80%", left: "15%", size: 6,   dur: 26, op: 0.16, rev: false },
  { top: "75%", left: "65%", size: 8,   dur: 34, op: 0.14, rev: true  },
  { top: "90%", left: "85%", size: 7,   dur: 30, op: 0.17, rev: false },
  { top: "45%", left: "45%", size: 14,  dur: 50, op: 0.08, rev: true  },
];

const RotatingFlowers = ({ tintColor = "rgba(212,175,55,0.6)", className = "" }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes spin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
      `}</style>

      {flowers.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: f.top,
            left: f.left,
            width:  `${f.size}rem`,
            height: `${f.size}rem`,
            opacity: f.op,
            animation: `${f.rev ? "spin-ccw" : "spin-cw"} ${f.dur}s linear infinite`,
            backgroundImage: "url(/src/images/chakra.svg)",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            filter: `drop-shadow(0 0 2px ${tintColor})`,
            /* Tint the SVG to match background using blend */
            mixBlendMode: "multiply",
          }}
        />
      ))}
    </div>
  );
};

export default RotatingFlowers;
