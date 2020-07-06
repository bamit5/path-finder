import { AnyAction } from 'redux';
// TODO
// eslint-disable-next-line sort-imports
import {
  ModeConstants,
  ModeType,
  NodeType,
  SolvingAlgorithmType,
} from '../constants/index';

export interface ModeState {
  mode: ModeType;
  settingNodeType: NodeType;
  solvingAlg: SolvingAlgorithmType;
}

const initialState: ModeState = {
  mode: ModeConstants.EDITING,
  settingNodeType: ModeConstants.SETTING_WALL_NODES,
  solvingAlg: ModeConstants.DIJKSTRAS,
};

const mode = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ModeConstants.EDITING:
      return {
        ...state,
        mode: ModeConstants.EDITING,
      };

    case ModeConstants.SOLVING:
      return {
        ...state,
        mode: ModeConstants.SOLVING,
      };

    case ModeConstants.VISUALIZING:
      return {
        ...state,
        mode: ModeConstants.VISUALIZING,
      };

    case ModeConstants.COMPLETED:
      return {
        ...state,
        mode: ModeConstants.COMPLETED,
      };

    case ModeConstants.BFS:
      return {
        ...state,
        solvingAlg: ModeConstants.BFS,
      };

    case ModeConstants.DIJKSTRAS:
      return {
        ...state,
        solvingAlg: ModeConstants.DIJKSTRAS,
      };

    case ModeConstants.A_STAR:
      return {
        ...state,
        solvingAlg: ModeConstants.A_STAR,
      };

    case ModeConstants.SETTING_WALL_NODES:
      return {
        ...state,
        settingNodeType: ModeConstants.SETTING_WALL_NODES,
      };

    case ModeConstants.SETTING_BRIDGE_NODES:
      return {
        ...state,
        settingNodeType: ModeConstants.SETTING_BRIDGE_NODES,
      };

    default:
      return state;
  }
};

export default mode;
