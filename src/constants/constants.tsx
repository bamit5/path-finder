export const pxToVh = (px: number): number => px * 0.16233766233766234;
export const vhToPx = (vh: number): number => vh / 0.16233766233766234;

export const ENTER = 13;
export const SPACE = 32;

export interface NodeData {
  x: number;
  y: number;
  dist: number;
  prev: NodeData | null;
  type: string;
  visited: boolean;
  taken: boolean;
}

export const nodeTypes = {
  ACTIVE: 'active-node', // TODO delete ACTIVE, cause 'active' = 'wall' node
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
  type: nodeTypes.INACTIVE,
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
