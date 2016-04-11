import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { routerMiddleware, push } from 'react-router-redux';
import { hashHistory } from 'react-router';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, routerMiddleware(hashHistory))
  );
};
