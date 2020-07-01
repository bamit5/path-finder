import { List } from 'immutable';

export const pxToVh = (px: number): number => px * 0.16233766233766234;
export const vhToPx = (vh: number): number => vh / 0.16233766233766234;

export const ENTER = 'Enter';
export const SPACE = ' ';

export interface NodeData {
  x: number;
  y: number;
  dist: number;
  prev: NodeData | null;
  type: string;
  visited: boolean;
  taken: boolean;
}

// creates an interface in which dist, prev, type, visited, and taken are optional, and x and y are required
export type ChangeableNodeData = Partial<Omit<NodeData, 'x' | 'y'>> &
  Required<Pick<NodeData, 'x' | 'y'>>;

export interface Point {
  x: number;
  y: number;
}

export type Graph = List<List<NodeData>>;

export const nodeStyles = {
  INACTIVE: 'inactive-node',
  WALL: 'wall-node',
  START: 'start-node',
  END: 'end-node',
  BRIDGE: 'bridge-node',
  VISITED: 'visited-node',
  TAKEN: 'taken-node',
};

export const defaultNode: NodeData = {
  x: 0,
  y: 0,
  dist: Number.POSITIVE_INFINITY,
  prev: null,
  type: nodeStyles.INACTIVE,
  visited: false,
  taken: false,
};

export const weights = {
  'inactive-node': 1,
  'wall-node': Number.POSITIVE_INFINITY,
  'start-node': 1,
  'end-node': 1,
  'bridge-node': 1,
};

export const Algorithms = {
  DIJKSTRAS: 'DIJKSTRAS',
};
