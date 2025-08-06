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

export interface ObjectBase {
  type: string;
  id: string;
  color: string;
}

export interface Joint extends ObjectBase {
  position: [number, number, number];
  partnerPosition: [number, number, number] | null;
}

export interface Link extends ObjectBase {
  start: [number, number, number];
  end: [number, number, number];
}

export type ObjectData = Joint | Link | null;
