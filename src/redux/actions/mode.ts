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

const settingBridgeNodes = () => ({
  type: ModeConstants.SETTING_BRIDGE_NODES,
});

const modeActions = {
  setMode,
  setSolvingAlg,
  settingWallNodes,
  settingBridgeNodes,
};

export default modeActions;
