import { ModeType, SolvingAlgorithmType } from '../constants/mode';
import { ModeConstants } from '../constants';

const setMode = (mode: ModeType) => ({
  type: mode,
});

const setSolvingAlg = (alg: SolvingAlgorithmType) => ({
  type: alg,
});

const settingWallNodes = () => ({
  type: ModeConstants.SETTING_WALL_NODES,
});

const toggleBridgeNode = () => ({
  type: ModeConstants.TOGGLE_BRIDGE_NODE,
});

const modeActions = {
  setMode,
  setSolvingAlg,
  settingWallNodes,
  toggleBridgeNode,
};

export default modeActions;
