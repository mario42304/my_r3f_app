import type { LineData } from "./types";
import * as THREE from "three";
import { useState } from "react";

interface ControllerProps {
  setLines: React.Dispatch<React.SetStateAction<LineData[]>>;
}

interface InputData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: number;
}

export default function Controller({ setLines }: ControllerProps) {
  const [input, setInput] = useState<InputData>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    color: 0xffffff,
  });

  const addLine = ({ x1, y1, x2, y2, color }: InputData) => {
    setLines((prev) => [
      ...prev,
      {
        id: Date.now(),
        points: [new THREE.Vector3(x1, y1, 0), new THREE.Vector3(x2, y2, 0)],
        color: color,
      },
    ]);
    setInput((prev) => ({ ...prev, x1: 0, y1: 0, x2: 0, y2: 0 }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setInput((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <>
      <input
        type="number"
        placeholder="x1"
        value={input.x1}
        onChange={(e) => handleChange(e, "x1")}
      />
      <input
        type="number"
        placeholder="y1"
        value={input.y1}
        onChange={(e) => handleChange(e, "y1")}
      />
      <input
        type="number"
        placeholder="x2"
        value={input.x2}
        onChange={(e) => handleChange(e, "x2")}
      />
      <input
        type="number"
        placeholder="y2"
        value={input.y2}
        onChange={(e) => handleChange(e, "y2")}
      />
      <input
        type="color"
        placeholder="color"
        value={input.color}
        onChange={(e) => handleChange(e, "color")}
      />
      <button onClick={() => addLine(input)}>add</button>
    </>
  );
}
