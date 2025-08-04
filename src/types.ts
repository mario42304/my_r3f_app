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
