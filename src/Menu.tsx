import type { Joint, Link } from "./types";
import { useState } from "react";
import alertMessage from "./alertMessage";

interface MenuProps {
  selectedObject: Joint | Link | null;
  setJoints: React.Dispatch<React.SetStateAction<Joint[]>>;
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
}

interface Coordinates {
  x: string;
  y: string;
}

export default function Menu({
  selectedObject,
  setJoints,
  setLinks,
}: MenuProps) {
  const [length, setlength] = useState<string>("");
  const [angle, setAngle] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: "",
    y: "",
  });

  const createPoint = () => {
    if (coordinates.x === "" || coordinates.y === "") {
      setCoordinates({ x: "", y: "" });
      alertMessage("input number");
      return;
    }

    setJoints((prev) => [
      ...prev,
      {
        type: "point",
        id: Date.now(),
        position: [Number(coordinates.x), Number(coordinates.y), 0],
        color: "#00ff00",
      },
    ]);
  };

  const createLine = () => {
    if (length === "" || angle === "") {
      setlength("");
      setAngle("");
      alertMessage("input number");
      return;
    }

    const x =
      selectedObject!.position[0] +
      Number(length) * Math.cos((Number(angle) * Math.PI) / 180);
    const y =
      selectedObject!.position[1] +
      Number(length) * Math.sin((Number(angle) * Math.PI) / 180);

    const id = Date.now();

    setJoints((prev) => [
      ...prev,
      { type: "point", id: id, position: [x, y, 0], color: "#00ff00" },
    ]);
    setLinks((prev) => [
      ...prev,
      {
        type: "line",
        id: id,
        start: selectedObject!.position,
        end: [x, y, 0],
        color: "#ffffff",
        position: [0, 0, 0],
      },
    ]);
  };

  let menu;
  if (selectedObject === null) {
    menu = (
      <>
        <div>
          <label>x coordinate</label>
          <input
            type="number"
            value={coordinates.x}
            onChange={(e) =>
              setCoordinates((prev) => ({ ...prev, x: e.target.value }))
            }
          />
        </div>
        <div>
          <label>y coordinate</label>
          <input
            type="number"
            value={coordinates.y}
            onChange={(e) =>
              setCoordinates((prev) => ({ ...prev, y: e.target.value }))
            }
          />
        </div>
        <button onClick={createPoint}>create point</button>
      </>
    );
  } else if (selectedObject.type === "point") {
    menu = (
      <>
        <div>
          <label>length of link</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setlength(e.target.value)}
          />
        </div>
        <div>
          <label>angle of link(degree)</label>
          <input
            type="number"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
          />
        </div>
        <button onClick={createLine}>create line</button>
      </>
    );
  } else if (selectedObject.type === "line") {
    menu = <></>;
  }
  return menu;
}
