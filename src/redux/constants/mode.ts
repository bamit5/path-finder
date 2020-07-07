enum ModeConstants {
  // user modes
  EDITING = 'EDITING',
  SOLVING = 'SOLVING',
  VISUALIZING = 'VISUALIZING',
  COMPLETED = 'COMPLETED',
  // algorithm modes
  BFS = 'BFS',
  DIJKSTRAS = 'Dijkstras',
  A_STAR = 'A*',
  // edit graph modes
  SETTING_WALL_NODES = 'wall-node',
  SETTING_WEIGHTED_NODES = 'weighted-node', // TODO
  TOGGLE_BRIDGE_NODE = 'bridge-node',
}

type Mode =
  | ModeConstants.EDITING
  | ModeConstants.SOLVING
  | ModeConstants.VISUALIZING
  | ModeConstants.COMPLETED;

type Node = ModeConstants.SETTING_WALL_NODES | ModeConstants.TOGGLE_BRIDGE_NODE;

type SolvingAlgorithm =
  | ModeConstants.BFS
  | ModeConstants.DIJKSTRAS
  | ModeConstants.A_STAR;

export { ModeConstants };
export type ModeType = Mode;
export type NodeType = Node;
export type SolvingAlgorithmType = SolvingAlgorithm;
