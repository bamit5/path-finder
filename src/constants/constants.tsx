export const pxToVh = (px: number): number => px * 0.16233766233766234;
export const vhToPx = (vh: number): number => vh / 0.16233766233766234;

export const ENTER = 'Enter';
export const SPACE = ' ';

export interface BasicNodeData {
  x: number;
  y: number;
  dist: number;
  prev: BasicNodeData | null;
  type: string;
}

export interface NodeData {
  x: number;
  y: number;
  dist: number;
  prev: NodeData | null;
  type: string;
  visited: boolean;
  cost: number;
}

export interface Point {
  x: number;
  y: number;
}

export const nodeStyles = {
  INACTIVE: 'inactive-node',
  // WALL: 'wall-node', // TODO
  BRICK_WALL: 'brick-wall-node',
  HAY_WALL: 'hay-wall-node',
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
  cost: 0,
};

// TODO export const createNode = <T extends BasicNodeData>(
//   TValues: Partial<BasicNodeData> & Omit<T, keyof BasicNodeData>,
// ): T => ({
//   x: 0,
//   y: 0,
//   dist: 0,
//   prev: null,
//   type: nodeStyles.INACTIVE,
//   ...TValues,
// });

export const weights = {
  'inactive-node': 1,
  'wall-node': Number.POSITIVE_INFINITY,
  'start-node': 1,
  'end-node': 1,
  'bridge-node': 1,
  'brick-wall-node': Number.POSITIVE_INFINITY,
  'hay-wall-node': 5,
};

// TODO clean up this file
