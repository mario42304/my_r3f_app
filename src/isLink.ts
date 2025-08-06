import type { Link, ObjectData } from "./types";

export default function isJoint(obj: ObjectData): obj is Link {
  return obj!.type === "line";
}
