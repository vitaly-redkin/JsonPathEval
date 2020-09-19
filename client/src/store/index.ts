/**
 * The root file of the Redux store.
 */
// eslint-disable-next-line import/no-cycle
import * as JsonHandler from './JsonHandler';

/**
 * Interface for the application state.
 */
export interface IApplicationState {
  json: JsonHandler.IJsonState;
}

/**
 * Inital application state.
 */
export const initialState: IApplicationState = {
  json: JsonHandler.initialState,
};

/**
 * ACTION CREATORS.
 * These are functions exposed to UI components that will trigger a state transition.
 */
export const actionCreators = {
  ...JsonHandler.actionCreators,
};

/**
 * Application reducers.
 */
export const reducers = {
  json: JsonHandler.reducer,
};

/**
 * This type can be used as a hint on action creators so that its 'dispatch' and
 * 'getState' params are correctly typed to match your store.
 */
export type AppThunkAction<TAction> = (
  dispatch: (action: TAction) => void,
  getState: () => IApplicationState) => void;
