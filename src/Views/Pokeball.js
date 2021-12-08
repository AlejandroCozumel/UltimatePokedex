// import "./App.css";
import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Banana({ z }) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/pokeball-v1-transformed.glb");
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    ref.current.rotation.y += 0.01;
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.004),
      (data.rZ += 0.005)
    );
    ref.current.position.set(data.x * width, (data.y += 0.01), z);
    if (data.y > height / 1.3) {
      data.y = -height / 1.3;
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes.Sphere003_0.geometry}
      material={materials.skin}
      // rotation={[-Math.PI / 1, 2, 1]}
    />
  );
}

export default function App({ count = 100, depth = 80 }) {
  return (
    <>
      <Canvas
        gl={{ alpha: false, antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 30, near: 0.01, far: 110, }}
      >
        <color attach="background" args={["#ffbf40"]} />
        <spotLight position={[10, 10, 10]} intensity={2} />
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          {Array.from({ length: count }, (_, i) => (
            <Banana key={i} z={-(i / count) * depth - 2} />
          ))}
          <EffectComposer>
            <DepthOfField
              target={[0, 0, depth / 2]}
              focalLength={0.6}
              bokehScale={7}
              height={700}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </>
  );
}
