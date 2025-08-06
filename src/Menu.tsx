import type { Joint, Link, ObjectData } from "./types";
import { useState } from "react";
import alertMessage from "./alertMessage";
import isJoint from "./isJoint";

interface MenuProps {
  selectedObject: ObjectData;
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

  const isNumericString = (numericStirng: string) => {
    const regex = /^-?\d+(.\d+)?$/;
    return regex.test(numericStirng);
  };

  const handleCreatePoint = () => {
    if (!isNumericString(coordinates.x) || !isNumericString(coordinates.y)) {
      setCoordinates({ x: "", y: "" });
      alertMessage("input number");
      return;
    }

    setJoints((prev) => [
      ...prev,
      {
        type: "point",
        id: crypto.randomUUID(),
        position: [Number(coordinates.x), Number(coordinates.y), 0],
        partnerPosition: null,
        color: "#00ff00",
      },
    ]);
  };

  const handleCreateLine = () => {
    if (isJoint(selectedObject)) {
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

      setJoints((prev) => [
        ...prev,
        {
          type: "point",
          id: crypto.randomUUID(),
          position: [x, y, 0],
          partnerPosition: selectedObject.position,
          color: "#00ff00",
        },
      ]);
      setJoints((prev) =>
        prev.map((p) =>
          p.id === selectedObject.id ? { ...p, partnerPosition: [x, y, 0] } : p
        )
      );
      setLinks((prev) => [
        ...prev,
        {
          type: "line",
          id: crypto.randomUUID(),
          start: selectedObject.position,
          end: [x, y, 0],
          color: "#ffffff",
          position: [0, 0, 0],
        },
      ]);
    }
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
        <button onClick={handleCreatePoint}>create point</button>
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
        <button onClick={handleCreateLine}>create line</button>
      </>
    );
  } else if (selectedObject.type === "line") {
    menu = (
      <>
        <p>TODO</p>
      </>
    );
  }
  return menu;
}
