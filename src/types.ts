import * as THREE from "three";

export interface AddLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: number;
}

export interface LineData {
  id: number;
  points: THREE.Vector3[];
  color: number;
}
