import "./App.css";
import Menu from "./Menu";
//import alertMessage from "./alertMessage";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import Dummy from "./Dummy";
import type { Link, Joint } from "./types";

function App() {
  const [joints, setJoints] = useState<Joint[]>([
    { type: "point", id: 1, position: [0, 0, 0], color: "#00ff00" },
  ]);
  const [links, setLinks] = useState<Link[]>([]);
  const [onHoverId, setOnHoverId] = useState<number | null>(null);
  const [selectedObject, setSelectedObject] = useState<Joint | Link | null>(
    null
  );

  const InfoPanel = () => {
    if (selectedObject !== null) {
      return (
        <>
          <p>Object type: {selectedObject.type}</p>
          <p>Object ID: {selectedObject.id}</p>
        </>
      );
    } else {
      return (
        <>
          <p>not selected</p>
        </>
      );
    }
  };

  const createArgs = (link: Link) => {
    return [...link.start, ...link.end];
  };

  const handleChangePointColor = (point: Joint) => {
    if (point.id === onHoverId) return colorHover;
    if (selectedObject !== null && point.id === selectedObject.id)
      return colorSelected;
    return point.color;
  };

  const raycasterParams: THREE.RaycasterParameters = {
    Mesh: {},
    Line: { threshold: 0.1 },
    LOD: {},
    Points: { threshold: 0.1 },
    Sprite: {},
  };

  const colorHover = "#ffbb00";
  const colorSelected = "#ff0000";

  return (
    <>
      <Canvas
        className="canvas"
        raycaster={{ params: raycasterParams }}
        onPointerMissed={() => {
          setSelectedObject(null);
        }}
      >
        {joints.map((joint) => (
          <points
            key={`joint-${joint.id}`}
            onPointerOver={() => setOnHoverId(joint.id)}
            onPointerOut={() => setOnHoverId(null)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedObject(joint);
            }}
          >
            <bufferGeometry attach="geometry">
              <float32BufferAttribute
                attach="attributes-position"
                args={[new Float32Array(joint.position), 3]}
              />
            </bufferGeometry>
            <pointsMaterial
              attach="material"
              size={0.1}
              color={handleChangePointColor(joint)}
            />
          </points>
        ))}
        {links.map((link) => (
          <link
            key={`link-${link.id}`}
            onPointerOver={() => setOnHoverId(link.id)}
            onPointerOut={() => setOnHoverId(null)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedObject(link);
            }}
          >
            <bufferGeometry attach="geometry">
              <float32BufferAttribute
                attach="attributes-position"
                args={[createArgs(link), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={link.color} />
          </link>
        ))}
      </Canvas>
      <div className="info-panel">{InfoPanel()}</div>
      <Menu
        selectedObject={selectedObject}
        setJoints={setJoints}
        setLinks={setLinks}
      />
      {/* <Controller /> */}
      <button
        onClick={() =>
          setLinks((prev) => [
            ...prev,
            {
              type: "line",
              id: -1,
              start: [-1, -1, 0],
              end: [1, -1, 0],
              color: "#ffffff",
              position: [0, 0, 0],
            },
          ])
        }
      >
        test
      </button>
      <Dummy />
    </>
  );
}

// function App() {
//   const colorHighlight = "#ff0000";
//   const testData: LineData = {
//     id: -1,
//     points: [1, 1, 0, 0, 0, 0],
//     color: "#00ff00",
//   };

//   const raycasterParams: THREE.RaycasterParameters = {
//     Mesh: {},
//     Line: { threshold: 0.1 },
//     LOD: {},
//     Points: { threshold: 1 },
//     Sprite: {},
//   };

//   const [lines, setLines] = useState<LineData[]>([testData]);
//   const [onHoverId, setOnHoverId] = useState<number | null>(null);

//   return (
//     <>
//       <Canvas className="canvas" raycaster={{ params: raycasterParams }}>
//         {lines.map((line) => (
//           <line
//             key={line.id}
//             onClick={(e) => {
//               e.stopPropagation();
//               alert("you clicked Line: " + line.id);
//             }}
//             onPointerOver={() => setOnHoverId(line.id)}
//             onPointerOut={() => setOnHoverId(null)}
//           >
//             <bufferGeometry attach="geometry">
//               <float32BufferAttribute
//                 attach="attributes-position"
//                 args={[line.points, 3]}
//               />
//             </bufferGeometry>
//             <lineBasicMaterial
//               attach="material"
//               color={onHoverId === line.id ? colorHighlight : line.color}
//             />
//           </line>
//         ))}
//       </Canvas>
//       <Controller setLines={setLines} />
//       <Dummy />
//     </>
//   );
// }

export default App;
