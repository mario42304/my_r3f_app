import type { Joint, ObjectData } from "./types";

export default function isJoint(obj: ObjectData): obj is Joint {
  return obj!.type === "point";
}
