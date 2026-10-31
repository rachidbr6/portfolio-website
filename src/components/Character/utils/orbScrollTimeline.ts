import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Adapted from the original character scroll timeline (see
// src/components/utils/GsapScroll.ts). Drives the same DOM-class scroll
// choreography (.landing-container, .about-section, .whatIDO, etc.) but
// only ever touches the orb's own group.rotation / the camera — never
// looks for GLTF-specific bones or material names, so it can't throw when
// those don't exist on the orb.
export function setOrbScrollTimeline(
  orbGroup: THREE.Object3D,
  camera: THREE.PerspectiveCamera
) {
  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  // Reveal the About copy on its own scroll range only, so it can never
  // creep into the hero while the hero is still being scrolled.
  gsap.fromTo(
    ".about-me",
    { opacity: 0, y: 48 },
    {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 50%",
        end: "top 15%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );

  let dockStartXPct: number | null = null;
  let dockStartYPct: number | null = null;

  // The "WHAT I DO" heading gets shattered into per-character spans by
  // setSplitText() (see src/components/utils/splitText.ts), which wipes out
  // the .do-h2 wrapper. Once that's happened, the last split char is the
  // "O" we want; before it happens, .do-h2 still exists. Cover both.
  const getDoTarget = (): HTMLElement | null => {
    const titleEl = document.querySelector<HTMLElement>(".what-box h2.title");
    if (!titleEl) return null;
    const chars = titleEl.querySelectorAll<HTMLElement>(".split-char");
    if (chars.length > 0) return chars[chars.length - 1];
    return titleEl.querySelector<HTMLElement>(".do-h2");
  };

  // The orb group sits at the world origin, but the camera drifts (tl2
  // animates camera.position.y) without re-aiming, so the rendered orb is
  // NOT at the DOM container's geometric center — it drifts off-center by
  // whatever the current camera offset projects to. Measure that drift via
  // an actual projection instead of assuming center, so the dock target is
  // accurate regardless of where the camera animation left it.
  const getOrbOffsetFromCenter = (modelRect: DOMRect) => {
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
    const v = new THREE.Vector3(0, 0, 0).project(camera);
    const orbX = modelRect.left + ((v.x + 1) / 2) * modelRect.width;
    const orbY = modelRect.top + ((1 - v.y) / 2) * modelRect.height;
    return {
      dx: orbX - (modelRect.left + modelRect.width / 2),
      dy: orbY - (modelRect.top + modelRect.height / 2),
    };
  };

  // Glides the orb toward the "O" in "DO" as the WHAT I DO section scrolls
  // through, then rides along with it at the same speed until it scrolls
  // out, fading away instead of freezing at the top edge.
  const updateOrbDock = (progress: number) => {
    if (window.innerWidth <= 1024) return;
    const modelEl = document.querySelector<HTMLElement>(".character-model");
    const doEl = getDoTarget();
    if (!modelEl || !doEl) return;

    if (progress <= 0.001) {
      dockStartXPct = null;
      dockStartYPct = null;
    }
    if (dockStartXPct === null || dockStartYPct === null) {
      dockStartXPct = gsap.getProperty(modelEl, "x", "%") as number;
      dockStartYPct = gsap.getProperty(modelEl, "y", "%") as number;
    }

    const modelRect = modelEl.getBoundingClientRect();
    const doRect = doEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const GAP = 64;

    const { dx: orbOffsetX, dy: orbOffsetY } = getOrbOffsetFromCenter(modelRect);
    const targetCenterX = doRect.right + GAP - orbOffsetX;
    const targetCenterY = doRect.top + doRect.height / 2 - orbOffsetY;

    const targetXPct = ((targetCenterX - vw / 2) / modelRect.width) * 100;
    const targetYPct = ((targetCenterY - vh / 2) / modelRect.height) * 100;

    const blend = gsap.utils.clamp(0, 1, progress / 0.45);
    const eased = blend * blend * (3 - 2 * blend);

    const x = gsap.utils.interpolate(dockStartXPct, targetXPct, eased);
    const y = gsap.utils.interpolate(dockStartYPct, targetYPct, eased);

    const exitStart = -40;
    const exitRange = 220;
    const fade =
      doRect.bottom < exitStart
        ? 1 - gsap.utils.clamp(0, 1, (exitStart - doRect.bottom) / exitRange)
        : 1;

    gsap.set(modelEl, { x: `${x}%`, y: `${y}%`, opacity: fade });
  };

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateOrbDock(self.progress),
    },
  });

  if (window.innerWidth > 1024) {
    tl1
      .fromTo(orbGroup.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
      .to(camera.position, { z: 22 }, 0)
      .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
      .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
      .to(".landing-container", { y: "40%", duration: 0.8 }, 0);

    tl2
      .to(
        camera.position,
        { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
        0
      )
      .to(".about-section", { y: "30%", duration: 6 }, 0)
      .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
      .fromTo(
        ".character-model",
        { pointerEvents: "inherit" },
        { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
        0
      )
      .to(orbGroup.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
      .fromTo(
        ".what-box-in",
        { display: "none" },
        { display: "flex", duration: 0.1, delay: 6 },
        0
      )
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3
      );

    tl3
      .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
      .to(orbGroup.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
  } else {
    const tM2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".what-box-in",
        start: "top 70%",
        end: "bottom top",
      },
    });
    tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);
  }
}
