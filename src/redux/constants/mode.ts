enum ModeConstants {
  EDITING = 'EDITING',
  SOLVE = 'SOLVE',
  SOLVING = 'SOLVING',
  SOLVED_SUCCESS = 'SOLVED_SUCCESS',
  SOLVED_FAILURE = 'SOLVED_FAILURE',
  SET_SOLVING_ALG = 'SET_SOLVING_ALGORITHM',
  BFS = 'BFS',
  DIJKSTRAS = 'DIJKSTRAS',
  A_STAR = 'A_STAR',
  SETTING_WALL_NODES = 'wall-node',
  SETTING_START_NODE = 'start-node',
  SETTING_END_NODE = 'end-node',
  SETTING_BRIDGE_NODES = 'bridge-node',
}

enum SolvingAlgorithms {
  BFS = ModeConstants.BFS,
  DIJKSTRAS = ModeConstants.DIJKSTRAS,
  A_STAR = ModeConstants.A_STAR,
}

enum Modes {
  EDITING = ModeConstants.EDITING,
  SOLVING = ModeConstants.SOLVING,
  SOLVED_SUCCESS = ModeConstants.SOLVED_SUCCESS,
  SOLVED_FAILURE = ModeConstants.SOLVED_FAILURE,
}

enum Nodes {
  SETTING_WALL_NODES = ModeConstants.SETTING_WALL_NODES,
  SETTING_START_NODE = ModeConstants.SETTING_START_NODE,
  SETTING_END_NODE = ModeConstants.SETTING_END_NODE,
  SETTING_BRIDGE_NODES = ModeConstants.SETTING_BRIDGE_NODES,
}

type Mode =
  | ModeConstants.EDITING
  | ModeConstants.SOLVING
  | ModeConstants.SOLVED_SUCCESS
  | ModeConstants.SOLVED_FAILURE;

type Node =
  | ModeConstants.SETTING_WALL_NODES
  | ModeConstants.SETTING_START_NODE
  | ModeConstants.SETTING_END_NODE
  | ModeConstants.SETTING_BRIDGE_NODES;

type SolvingAlgorithm =
  | ModeConstants.BFS
  | ModeConstants.DIJKSTRAS
  | ModeConstants.A_STAR;

export { ModeConstants, Modes, Nodes, SolvingAlgorithms };
export type ModeType = Mode;
export type NodeType = Node;
export type SolvingAlgorithmType = SolvingAlgorithm;
