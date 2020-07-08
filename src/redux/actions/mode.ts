import {
  ModeConstants,
  ModeType,
  SolvingAlgorithmType,
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

const modeActions = {
  setMode,
  setSolvingAlg,
  setWallNodeType,
  toggleBridgeNode,
};

export default modeActions;
