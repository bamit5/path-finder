import { AnyAction } from 'redux';
// TODO
// eslint-disable-next-line sort-imports
import { ModeConstants, ModeType, NodeType } from '../constants/index';
import { Algorithms } from '../../constants/constants';

export interface ModeState {
  mode: ModeType;
  nodeType: NodeType;
  solvingAlg: string; // TODO change this to function type?
}

const initialState: ModeState = {
  mode: ModeConstants.EDITING,
  nodeType: ModeConstants.SETTING_WALL_NODES,
  solvingAlg: Algorithms.DIJKSTRAS,
};

const mode = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ModeConstants.EDITING:
      return {
        ...state,
        mode: ModeConstants.EDITING,
      };

    case ModeConstants.SOLVE:
      // TODO call whichever function to solve the maze here?
      return {
        ...state,
        mode: ModeConstants.SOLVING,
      };

    case ModeConstants.SOLVING:
      return {
        ...state,
        mode: ModeConstants.SOLVING,
      };

    case ModeConstants.SOLVED_SUCCESS:
      return {
        ...state,
        mode: ModeConstants.SOLVED_SUCCESS,
      };

    case ModeConstants.SOLVED_FAILURE:
      return {
        ...state,
        mode: ModeConstants.SOLVED_FAILURE,
      };

    case ModeConstants.SETTING_WALL_NODES:
      return {
        ...state,
        nodeType: ModeConstants.SETTING_WALL_NODES,
      };

    case ModeConstants.SETTING_START_NODE:
      return {
        ...state,
        nodeType: ModeConstants.SETTING_START_NODE,
      };

    case ModeConstants.SETTING_END_NODE:
      return {
        ...state,
        nodeType: ModeConstants.SETTING_END_NODE,
      };

    case ModeConstants.SETTING_BRIDGE_NODES:
      return {
        ...state,
        nodeType: ModeConstants.SETTING_BRIDGE_NODES,
      };

    default:
      return state;
  }
};

export default mode;
