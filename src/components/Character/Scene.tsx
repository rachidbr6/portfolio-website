import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { createNetworkOrb } from "./utils/networkOrb";
import { setOrbScrollTimeline } from "./utils/orbScrollTimeline";
import { handleMouseMove, handleTouchMove, handleTouchEnd } from "./utils/mouseUtils";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";
import { setAllTimeline } from "../utils/GsapScroll";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!canvasDiv.current) return;

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;
    const scene = sceneRef.current;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 200);
    camera.position.set(0, 0, 11);
    camera.lookAt(0, 0, 0);

    const orb = createNetworkOrb();
    scene.add(orb.group);

    const progress = setProgress((value) => setLoading(value));

    let introTimeout: ReturnType<typeof setTimeout> | undefined;
    progress.loaded().then(() => {
      introTimeout = setTimeout(() => {
        orb.playIntro();
        gsap.to(".character-rim", {
          y: "55%",
          opacity: 1,
          delay: 0.2,
          duration: 2,
        });
        setOrbScrollTimeline(orb.group, camera);
        setAllTimeline();
      }, 400);
    });

    let mouse = { x: 0, y: 0 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };
    let debounce: ReturnType<typeof setTimeout> | undefined;
    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };
    const onTouchEnd = () => {
      handleTouchEnd((x, y) => (mouse = { x, y }));
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    const clock = new THREE.Clock();
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      orb.update(delta, clock.elapsedTime, mouse);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!canvasDiv.current) return;
      const box = canvasDiv.current.getBoundingClientRect();
      renderer.setSize(box.width, box.height);
      camera.aspect = box.width / box.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(introTimeout);
      clearTimeout(debounce);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      scene.clear();
      renderer.dispose();
      if (canvasDiv.current) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
