/**
 * Redux store configurator.
 */

import {
  AnyAction, applyMiddleware, combineReducers, compose, createStore,
  Reducer, ReducersMapObject, Store, StoreEnhancerStoreCreator
} from 'redux';
import thunk from 'redux-thunk';
import { IApplicationState, reducers } from '.';

/**
 * Types for the application Redux store.
 */
export type StoreType = Store<IApplicationState>;

/**
 * Global varialble with Redux store.
 */
export let store: StoreType | undefined;

/**
 * Configures Redux store.
 *
 * @returns application Redux store
 */
export function configureStore(initialState: IApplicationState): StoreType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  store = composeEnhancers(
    applyMiddleware(thunk),
    <S>(next: StoreEnhancerStoreCreator<S>) => next
  )(createStore)(buildRootReducer(reducers), initialState);

  return store!;
}

/**
 * Builds the root reducer.
 *
 * @param allReducers Application reducers
 * @returns Root reducer combined from the application ones
 */
function buildRootReducer(allReducers: ReducersMapObject<IApplicationState, AnyAction>):
  Reducer<IApplicationState> {
  return combineReducers<IApplicationState>(allReducers);
}
