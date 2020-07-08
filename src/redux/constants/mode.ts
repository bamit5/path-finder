enum ModeConstants {
  // user modes
  EDITING = 'EDITING',
  SOLVING = 'SOLVING',
  VISUALIZING = 'VISUALIZING',
  COMPLETED = 'COMPLETED',
  // algorithm modes
  BFS = 'Breadth First Search',
  DIJKSTRAS = "Dijkstra's",
  A_STAR = 'A Star',
  // edit graph modes
  SET_WALL_TYPE = 'SET_WALL_TYPE',
  BRICK_WALL = 'brick-wall-node',
  HAY_WALL = 'hay-wall-node',
  TOGGLE_BRIDGE_NODE = 'bridge-node',
  // visualizing speed modes
  SET_SPEED = 'SET_SPEED',
  SLOW = 'Slow',
  FAST = 'Fast',
  FLASH = 'Flash',
  IMMEDIATE = 'Immediate',
}

type Mode =
  | ModeConstants.EDITING
  | ModeConstants.SOLVING
  | ModeConstants.VISUALIZING
  | ModeConstants.COMPLETED;

type WallNode = ModeConstants.BRICK_WALL | ModeConstants.HAY_WALL;

type SolvingAlgorithm =
  | ModeConstants.BFS
  | ModeConstants.DIJKSTRAS
  | ModeConstants.A_STAR;

type Speed =
  | ModeConstants.SLOW
  | ModeConstants.FAST
  | ModeConstants.FLASH
  | ModeConstants.IMMEDIATE;

export { ModeConstants };
export type ModeType = Mode;
export type WallNodeType = WallNode;
export type SolvingAlgorithmType = SolvingAlgorithm;
export type SpeedType = Speed;
