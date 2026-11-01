import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const SCRAMBLE_CHARS =
  "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const welcomeRef = useRef<HTMLSpanElement>(null);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  // Matrix-style falling code backdrop.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const fontSize = 16;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const setup = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.ceil(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    };
    setup();

    ctx.fillStyle = "#060609";
    ctx.fillRect(0, 0, width, height);

    if (reducedMotion) {
      window.addEventListener("resize", setup);
      return () => window.removeEventListener("resize", setup);
    }

    let rafId: number;
    let frame = 0;
    const draw = () => {
      rafId = requestAnimationFrame(draw);
      frame++;
      if (frame % 2 !== 0) return; // halve the effective frame rate

      ctx.fillStyle = "rgba(6, 6, 9, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char =
          SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = "rgba(94, 255, 143, 0.75)";
        ctx.fillText(char, i * fontSize, y);
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };
    draw();

    window.addEventListener("resize", setup);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setup);
    };
  }, []);

  // Decode "WELCOME" character by character once loading completes.
  useEffect(() => {
    const el = welcomeRef.current;
    if (!loaded || !el) return;

    const target = "WELCOME";
    const totalTicks = 16;
    let tick = 0;

    const id = window.setInterval(() => {
      tick++;
      let out = "";
      for (let i = 0; i < target.length; i++) {
        const revealAt = (i / target.length) * totalTicks * 0.6 + totalTicks * 0.3;
        out +=
          tick >= revealAt
            ? target[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = out;
      if (tick >= totalTicks) {
        el.textContent = target;
        window.clearInterval(id);
      }
    }, 45);

    return () => window.clearInterval(id);
  }, [loaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          RachidBourjila
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            {[...Array(5)].map((_, index) => (
              <div className="loaderGame-bar" key={index}></div>
            ))}
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <canvas ref={canvasRef} className="loading-matrix-canvas" />
        <div className="loading-marquee">
          <Marquee>
            <span>&nbsp; CODE TO ADOPTION &nbsp;</span> <span>&nbsp; AI DEPLOYMENT &nbsp;</span>
            <span>&nbsp; CODE TO ADOPTION &nbsp;</span> <span>&nbsp; AI DEPLOYMENT &nbsp;</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  <span className="loading-prompt">&gt;_</span> Loading <span className="loading-percent">{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span ref={welcomeRef}>WELCOME</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      const rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
