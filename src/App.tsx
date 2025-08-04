import "./App.css";
import Controller from "./Controller";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import type { LineData } from "./types";
import * as THREE from "three";
import Dummy from "./Dummy";

function App() {
  const colorHighlight = "#ff0000";
  const testData: LineData = {
    id: -1,
    points: [1, 1, 0, 0, 0, 0],
    color: "#00ff00",
  };

  const raycasterParams: THREE.RaycasterParameters = {
    Mesh: {},
    Line: { threshold: 0.1 },
    LOD: {},
    Points: { threshold: 1 },
    Sprite: {},
  };

  const [lines, setLines] = useState<LineData[]>([testData]);
  const [onHoverId, setOnHoverId] = useState<number | null>(null);

  return (
    <>
      <Canvas className="canvas" raycaster={{ params: raycasterParams }}>
        {lines.map((line) => (
          <line
            key={line.id}
            onClick={(e) => {
              e.stopPropagation();
              alert("you clicked Line: " + line.id);
            }}
            onPointerOver={() => setOnHoverId(line.id)}
            onPointerOut={() => setOnHoverId(null)}
          >
            <bufferGeometry attach="geometry">
              <float32BufferAttribute
                attach="attributes-position"
                args={[line.points, 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              attach="material"
              color={onHoverId === line.id ? colorHighlight : line.color}
            />
          </line>
        ))}
      </Canvas>
      <Controller setLines={setLines} />
      <Dummy />
    </>
  );
}

export default App;
