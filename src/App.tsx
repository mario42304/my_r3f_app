import "./App.css";
import Menu from "./Menu";
//import alertMessage from "./alertMessage";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import Dummy from "./Dummy";
import type { Link, Joint } from "./types";
import isJoint from "./isJoint";
import isLink from "./isLink";

function App() {
  const [joints, setJoints] = useState<Joint[]>([
    {
      type: "point",
      id: crypto.randomUUID(),
      color: "#00ff00",
      position: [0, 0, 0],
      partnerPosition: null,
      isFixed: true,
      shape: "cylindrical",
      isDriver: true,
    },
  ]);
  const [links, setLinks] = useState<Link[]>([]);
  const [onHoverId, setOnHoverId] = useState<string | null>(null);
  const [selectedObject, setSelectedObject] = useState<Joint | Link | null>(
    null
  );

  const InfoPanel = () => {
    if (selectedObject === null) {
      return (
        <>
          <p>not selected</p>
        </>
      );
    } else if (isJoint(selectedObject)) {
      return (
        <>
          <p>Object type: {selectedObject.type}</p>
          <p>Object ID: {selectedObject.id}</p>
          <p>Object Position: {selectedObject.position.map((n) => `${n}, `)}</p>
          <p>
            Object Partner Pos:{" "}
            {selectedObject.partnerPosition
              ? selectedObject.partnerPosition.map((n) => `${n}, `)
              : "null"}
          </p>
        </>
      );
    } else if (isLink(selectedObject)) {
      return (
        <>
          <p>Object type: {selectedObject.type}</p>
          <p>Object ID: {selectedObject.id}</p>
        </>
      );
    }
  };

  const createArgs = (link: Link) => {
    return [...link.start, ...link.end];
  };

  const handleChangePointColor = (point: Joint | Link) => {
    if (point.id === onHoverId) return colorHover;
    if (selectedObject !== null && point.id === selectedObject.id)
      return colorSelected;
    return point.color;
  };

  const raycasterParams: THREE.RaycasterParameters = {
    Mesh: {},
    Line: { threshold: 0.05 },
    LOD: {},
    Points: { threshold: 0.2 },
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
          <line
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
            <lineBasicMaterial
              attach="material"
              color={handleChangePointColor(link)}
            />
          </line>
        ))}
      </Canvas>
      <div className="info-panel">{InfoPanel()}</div>
      <Menu
        selectedObject={selectedObject}
        setJoints={setJoints}
        setLinks={setLinks}
      />
      {/* <Controller /> */}
      <Dummy />
    </>
  );
}

export default App;
