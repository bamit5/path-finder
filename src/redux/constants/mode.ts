enum ModeConstants {
  // user modes
  EDITING = 'EDITING',
  SOLVING = 'SOLVING',
  VISUALIZING = 'VISUALIZING',
  COMPLETED = 'COMPLETED',
  // algorithm modes
  SET_SOLVING_ALG = 'SET_SOLVING_ALGORITHM',
  BFS = 'BFS',
  DIJKSTRAS = 'DIJKSTRAS',
  A_STAR = 'A_STAR',
  // edit graph modes
  SETTING_WALL_NODES = 'wall-node',
  SETTING_START_NODE = 'start-node',
  SETTING_END_NODE = 'end-node',
  SETTING_BRIDGE_NODES = 'bridge-node',
}

type Mode =
  | ModeConstants.EDITING
  | ModeConstants.SOLVING
  | ModeConstants.VISUALIZING
  | ModeConstants.COMPLETED;

type Node =
  | ModeConstants.SETTING_WALL_NODES
  | ModeConstants.SETTING_START_NODE
  | ModeConstants.SETTING_END_NODE
  | ModeConstants.SETTING_BRIDGE_NODES;

type SolvingAlgorithm =
  | ModeConstants.BFS
  | ModeConstants.DIJKSTRAS
  | ModeConstants.A_STAR;

export { ModeConstants };
export type ModeType = Mode;
export type NodeType = Node;
export type SolvingAlgorithmType = SolvingAlgorithm;
