import {
  ModeConstants,
  ModeType,
  SolvingAlgorithmType,
  SpeedType,
  WallNodeType,
} from '../constants';

const setMode = (mode: ModeType) => ({
  type: mode,
});

const setSolvingAlg = (alg: SolvingAlgorithmType) => ({
  type: alg,
});

const setWallNodeType = (wallNodeType: WallNodeType) => ({
  type: ModeConstants.SET_WALL_TYPE,
  message: wallNodeType,
});

const toggleBridgeNode = () => ({
  type: ModeConstants.TOGGLE_BRIDGE_NODE,
});

const setSpeed = (speed: SpeedType) => ({
  type: ModeConstants.SET_SPEED,
  message: speed,
});

const modeActions = {
  setMode,
  setSolvingAlg,
  setWallNodeType,
  toggleBridgeNode,
  setSpeed,
};

export default modeActions;
