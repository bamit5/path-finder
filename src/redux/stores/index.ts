import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
// TODO
// eslint-disable-next-line sort-imports
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const rootStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default rootStore;
