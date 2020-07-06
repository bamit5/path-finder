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
  SETTING_BRIDGE_NODES = 'bridge-node',
}

type Mode =
  | ModeConstants.EDITING
  | ModeConstants.SOLVING
  | ModeConstants.VISUALIZING
  | ModeConstants.COMPLETED;

type Node =
  | ModeConstants.SETTING_WALL_NODES
  | ModeConstants.SETTING_BRIDGE_NODES;

type SolvingAlgorithm =
  | ModeConstants.BFS
  | ModeConstants.DIJKSTRAS
  | ModeConstants.A_STAR;

export { ModeConstants };
export type ModeType = Mode;
export type NodeType = Node;
export type SolvingAlgorithmType = SolvingAlgorithm;
