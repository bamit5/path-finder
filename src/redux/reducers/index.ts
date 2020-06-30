import { combineReducers } from 'redux';
// TODO
// eslint-disable-next-line sort-imports
import graph, { GraphState } from './graph';
import mode, { ModeState } from './mode';

const rootReducer = combineReducers({
  mode,
  graph,
});

export interface RootState {
  mode: ModeState;
  graph: GraphState;
}

export default rootReducer;
