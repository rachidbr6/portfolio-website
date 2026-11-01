const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテト0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomChar() {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
}

function scrambleOnce(chars: HTMLElement[], duration = 900, tickMs = 45) {
  const originals = chars.map((el) => el.textContent || "");
  let elapsed = 0;

  const id = window.setInterval(() => {
    elapsed += tickMs;
    const progress = Math.min(1, elapsed / duration);

    chars.forEach((el, i) => {
      const original = originals[i];
      if (!original || original.trim() === "") return;

      // Characters reveal left-to-right as progress advances, like a decode.
      const revealAt = (i / chars.length) * 0.65 + 0.25;
      if (progress >= revealAt) {
        if (el.textContent !== original) {
          el.textContent = original;
          el.classList.remove("matrix-scramble-char");
        }
      } else {
        el.textContent = randomChar();
        el.classList.add("matrix-scramble-char");
      }
    });

    if (progress >= 1) {
      window.clearInterval(id);
      chars.forEach((el, i) => {
        el.textContent = originals[i];
        el.classList.remove("matrix-scramble-char");
      });
    }
  }, tickMs);
}

// Periodically re-scrambles the .split-char spans TextSplitter already
// produced inside the given selectors (see initialFX.ts), decoding them
// back to the real text — a "Matrix" style glitch, without fighting
// TextSplitter/GSAP for ownership of the element's innerHTML.
export function startMatrixGlitchLoop(
  selectors: string[],
  options?: { interval?: number; delay?: number }
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  const interval = options?.interval ?? 5200;
  const delay = options?.delay ?? 2200;

  const run = () => {
    selectors.forEach((sel) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const chars = Array.from(el.querySelectorAll<HTMLElement>(".split-char"));
      if (chars.length === 0) return;
      scrambleOnce(chars);
    });
  };

  let intervalId: number | undefined;
  const timeoutId = window.setTimeout(() => {
    run();
    intervalId = window.setInterval(run, interval);
  }, delay);

  return () => {
    window.clearTimeout(timeoutId);
    if (intervalId !== undefined) window.clearInterval(intervalId);
  };
}
