import type { LineData } from "./types";
//import * as THREE from "three";
import { useState } from "react";

interface ControllerProps {
  setLines: React.Dispatch<React.SetStateAction<LineData[]>>;
}

interface InputData {
  xo: number;
  yo: number;
  norm: number;
  theta: number; //[degree]
  color: string;
}

export default function Controller({ setLines }: ControllerProps) {
  const [doReset, setDoReset] = useState(false);
  const [input, setInput] = useState<InputData>({
    xo: 0,
    yo: 0,
    norm: 0,
    theta: 0,
    color: "#00ff00",
  });

  const addLine = () => {
    if (input.norm <= 0) {
      alert("length of link must be positive number!");
      setInput((prev) => ({ ...prev, xo: 0, yo: 0, norm: 0, theta: 0 }));
    } else {
      setLines((prev) => [
        ...prev,
        {
          id: Date.now(),
          points: [
            input.xo,
            input.yo,
            0,

            input.xo + input.norm * Math.cos((input.theta * Math.PI) / 180),
            input.yo + input.norm * Math.sin((input.theta * Math.PI) / 180),
            0,
          ],
          color: input.color,
        },
      ]);
      if (doReset) {
        setInput((prev) => ({ ...prev, xo: 0, yo: 0, norm: 0, theta: 0 }));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (name === "color") {
      setInput((prev) => ({ ...prev, [name]: e.target.value }));
    }
    setInput((prev) => ({ ...prev, [name]: Number(e.target.value) }));
  };

  return (
    <>
      <div>
        <label>origin_x</label>
        <input
          type="number"
          placeholder="origin_x"
          value={input.xo}
          onChange={(e) => handleChange(e, "xo")}
        />
      </div>
      <div>
        <label>origin_y</label>
        <input
          type="number"
          placeholder="origin_y"
          value={input.yo}
          onChange={(e) => handleChange(e, "yo")}
        />
      </div>
      <div>
        <label>length of link</label>
        <input
          type="number"
          placeholder="length of link"
          value={input.norm}
          onChange={(e) => handleChange(e, "norm")}
        />
      </div>
      <div>
        <label>degrees of link</label>
        <input
          type="number"
          placeholder="degrees of length"
          value={input.theta}
          onChange={(e) => handleChange(e, "theta")}
        />
      </div>
      <div>
        <label>color of link</label>
        <input
          type="color"
          placeholder="color"
          value={input.color}
          onChange={(e) => handleChange(e, "color")}
        />
      </div>
      <button onClick={() => addLine()}>add</button>
      <div>
        <input
          type="checkbox"
          checked={doReset}
          onClick={() => {
            setDoReset(!doReset);
          }}
        />
        <label>Reset inputs after submission</label>
      </div>
      <div>
        <button
          onClick={() => {
            setLines([]);
          }}
        >
          Delete all lines
        </button>
      </div>
    </>
  );
}
