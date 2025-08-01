import "./App.css";
import Controller from "./Controller";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import type { LineData } from "./types";
import * as THREE from "three";
import Dummy from "./Dummy";

function App() {}

// function App() {
//   const testData: LineData = {
//     id: -1,
//     points: [new THREE.Vector3(1, 1, 0), new THREE.Vector3(0, 0, 0)],
//     color: 0xff0000,
//   };

//   const [lines, setLines] = useState<LineData[]>([testData]);

//   return (
//     <>
//       <Canvas>
//         <ambientLight color={0xffffff} intensity={1} />
//         {lines.map((line) => (
//           <line key={line.id}>
//             <bufferGeometry attach="geometry">
//               <float32BufferAttribute
//                 attach="attributes-position"
//                 args={[line.points.flatMap((p) => [p.x, p.y, p.z]), 3]}
//               />
//             </bufferGeometry>
//             <lineBasicMaterial color={line.color} attach="material" />
//           </line>
//         ))}
//       </Canvas>
//       <Controller setLines={setLines} />
//       <Dummy />
//     </>
//   );
// }

export default App;
