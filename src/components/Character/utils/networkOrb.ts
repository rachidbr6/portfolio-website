import * as THREE from "three";

// Purple "AI network" orb — a Jarvis/Ultron-style rotating geodesic sphere
// with glowing nodes, connecting arcs, and a pulsing core. Replaces the
// GLTF character model with a lightweight, dependency-free THREE.Group.

const CORE_PURPLE = 0x9b5cff;
const LINE_PURPLE = 0xb388ff;
const NODE_PURPLE = 0xe0c8ff;

export interface NetworkOrb {
  /** Root group — safe to animate with GSAP scroll timelines (position/rotation.y). */
  group: THREE.Group;
  /** Call every frame: handles idle spin, pulse and mouse-reactive tilt. */
  update: (delta: number, elapsed: number, mouse: { x: number; y: number }) => void;
  /** Intro reveal — call once the orb should "power on". */
  playIntro: () => void;
}

export function createNetworkOrb(): NetworkOrb {
  const group = new THREE.Group();
  const spin = new THREE.Group();
  group.add(spin);

  const shells: { mesh: THREE.LineSegments; speed: number; axis: THREE.Vector3 }[] = [];
  const shellConfigs = [
    { radius: 2.1, detail: 2, opacity: 0.55, speed: 0.18 },
    { radius: 2.6, detail: 1, opacity: 0.28, speed: -0.11 },
    { radius: 3.15, detail: 0, opacity: 0.16, speed: 0.07 },
  ];

  shellConfigs.forEach(({ radius, detail, opacity, speed }, i) => {
    const geo = new THREE.IcosahedronGeometry(radius, detail);
    const edges = new THREE.EdgesGeometry(geo);
    const mat = new THREE.LineBasicMaterial({
      color: LINE_PURPLE,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mesh = new THREE.LineSegments(edges, mat);
    spin.add(mesh);
    shells.push({
      mesh,
      speed,
      axis: new THREE.Vector3(
        i === 0 ? 1 : 0.2,
        1,
        i === 1 ? 0.6 : 0.15
      ).normalize(),
    });
    geo.dispose();
  });

  // Glowing node points at the densest shell's vertices.
  const nodeGeo = new THREE.IcosahedronGeometry(2.15, 2);
  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute("position", nodeGeo.attributes.position.clone());
  const pointsMat = new THREE.PointsMaterial({
    color: NODE_PURPLE,
    size: 0.07,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pointsGeo, pointsMat);
  spin.add(points);

  // A handful of random "data pulse" arcs between nodes for a network feel.
  const posArray = nodeGeo.attributes.position.array as Float32Array;
  const vertexCount = posArray.length / 3;
  const arcCount = 16;
  const arcPositions = new Float32Array(arcCount * 2 * 3);
  for (let i = 0; i < arcCount; i++) {
    const a = Math.floor(Math.random() * vertexCount) * 3;
    const b = Math.floor(Math.random() * vertexCount) * 3;
    arcPositions.set([posArray[a], posArray[a + 1], posArray[a + 2]], i * 6);
    arcPositions.set([posArray[b], posArray[b + 1], posArray[b + 2]], i * 6 + 3);
  }
  const arcGeo = new THREE.BufferGeometry();
  arcGeo.setAttribute("position", new THREE.BufferAttribute(arcPositions, 3));
  const arcMat = new THREE.LineBasicMaterial({
    color: NODE_PURPLE,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const arcs = new THREE.LineSegments(arcGeo, arcMat);
  spin.add(arcs);
  nodeGeo.dispose();

  // Glowing core.
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 32, 32),
    new THREE.MeshBasicMaterial({
      color: CORE_PURPLE,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  spin.add(core);

  const coreGlow = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshBasicMaterial({
      color: CORE_PURPLE,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    })
  );
  spin.add(coreGlow);

  let currentTiltX = 0;
  let currentTiltZ = 0;

  spin.scale.setScalar(0.001);
  group.userData.introPlayed = false;

  function update(delta: number, elapsed: number, mouse: { x: number; y: number }) {
    shells.forEach(({ mesh, speed, axis }) => {
      mesh.rotateOnAxis(axis, speed * delta);
    });
    points.rotation.y += 0.12 * delta;
    arcs.rotation.y -= 0.09 * delta;

    const pulse = 1 + Math.sin(elapsed * 1.4) * 0.035;
    core.scale.setScalar(pulse);
    coreGlow.scale.setScalar(pulse * (1 + Math.sin(elapsed * 0.9) * 0.02));

    const targetTiltZ = mouse.x * 0.22;
    const targetTiltX = -mouse.y * 0.16;
    currentTiltX += (targetTiltX - currentTiltX) * 0.05;
    currentTiltZ += (targetTiltZ - currentTiltZ) * 0.05;
    spin.rotation.x = currentTiltX;
    spin.rotation.z = currentTiltZ;
  }

  function playIntro() {
    if (group.userData.introPlayed) return;
    group.userData.introPlayed = true;
    import("gsap").then(({ gsap }) => {
      gsap.to(spin.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.6,
        ease: "elastic.out(1, 0.65)",
      });
    });
  }

  return { group, update, playIntro };
}
