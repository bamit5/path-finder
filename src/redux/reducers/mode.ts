import { AnyAction } from 'redux';
// TODO
// eslint-disable-next-line sort-imports
import { ModeConstants, ModeType, NodeType } from '../constants/index';
import { Algorithms } from '../../constants/constants';

export interface ModeState {
  mode: ModeType;
  settingNodeType: NodeType;
  solvingAlg: string; // TODO change this to function type?
}

const initialState: ModeState = {
  mode: ModeConstants.EDITING,
  settingNodeType: ModeConstants.SETTING_WALL_NODES,
  solvingAlg: Algorithms.DIJKSTRAS,
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

    case ModeConstants.SETTING_WALL_NODES:
      return {
        ...state,
        settingNodeType: ModeConstants.SETTING_WALL_NODES,
      };

    case ModeConstants.SETTING_START_NODE:
      return {
        ...state,
        settingNodeType: ModeConstants.SETTING_START_NODE,
      };

    case ModeConstants.SETTING_END_NODE:
      return {
        ...state,
        settingNodeType: ModeConstants.SETTING_END_NODE,
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
