import { AnyAction } from 'redux';
// TODO
// eslint-disable-next-line sort-imports
import {
  ModeConstants,
  ModeType,
  SolvingAlgorithmType,
  WallNodeType,
} from '../constants/index';

export interface ModeState {
  mode: ModeType;
  wallNodeType: WallNodeType;
  solvingAlg: SolvingAlgorithmType;
  bridgeNodeExists: boolean;
}

const initialState: ModeState = {
  mode: ModeConstants.EDITING,
  wallNodeType: ModeConstants.BRICK_WALL,
  solvingAlg: ModeConstants.A_STAR,
  bridgeNodeExists: false,
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

    case ModeConstants.SET_WALL_TYPE:
      return {
        ...state,
        wallNodeType: action.message,
      };

    case ModeConstants.TOGGLE_BRIDGE_NODE:
      return {
        ...state,
        bridgeNodeExists: !state.bridgeNodeExists,
      };

    default:
      return state;
  }
};

export default mode;
