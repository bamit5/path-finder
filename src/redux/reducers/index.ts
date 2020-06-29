import { combineReducers } from 'redux';
// TODO
// eslint-disable-next-line sort-imports
import mode, { ModeState } from './mode';

const rootReducer = combineReducers({
  mode,
});

export interface RootState {
  mode: ModeState;
}

export default rootReducer;
