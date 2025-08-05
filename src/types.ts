//import * as THREE from "three";

export interface AddLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}

export interface LineData {
  id: number;
  points: number[];
  color: string;
}

export interface Joint {
  type: string;
  id: number;
  position: [number, number, number];
  color: string;
}

export interface Link {
  type: string;
  id: number;
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  position: [0, 0, 0]; //unuse
}
