/**
 * The Redux store stuff for the auth token state.
 */

import { Reducer } from 'redux';

// eslint-disable-next-line import/no-cycle
import { AppThunkAction } from '.';
import { defaultJson } from '../defaults/defaults';
import { JsonModel } from '../models/JsonModel';

/**
 * Interface for the JSON state.
 */
export interface IJsonState extends JsonModel {
}

/**
 * Initial JSON state.
 */
export const initialState: IJsonState = {
  ...defaultJson,
};

/**
 * Enumeration for the action type strings.
 */
export enum ActionTypeEnum {
  JsonSetString = '@@JSON/SET_STRING',
  JsonSetObject = '@@JSON/SET_OBJECT',
  JsonSetPathExpr = '@@JSON/SET_PATH_EXPR',
}

// -----------------
// ACTIONS

/**
 * Interface for the JsonSetString action.
 */
interface IJsonSetStringAction {
  type: ActionTypeEnum.JsonSetString;
  jsonStr: string;
}

/**
 * Interface for the JsonSetObject action.
 */
interface IJsonSetObjectAction {
  type: ActionTypeEnum.JsonSetObject;
  json: object;
}

/**
 * Interface for the JsonSetPathExpr action.
 */
interface IJsonSetPathExprAction {
  type: ActionTypeEnum.JsonSetPathExpr;
  pathExpr: string;
}

/**
 * Declare a 'discriminated union' type. This guarantees that all references
 * to 'type' properties contain one of the declared type strings
 * (and not any other arbitrary string).
 */
export type KnownAction = IJsonSetStringAction | IJsonSetObjectAction | IJsonSetPathExprAction;

/**
 * ACTION CREATORS.
 * These are functions exposed to UI components that will trigger a state transition.
 */
export const actionCreators = {
  jsonSetString: (
    jsonStr: string): AppThunkAction <KnownAction> =>
    (dispatch: (action: KnownAction) => void): void => {
      dispatch({ type: ActionTypeEnum.JsonSetString, jsonStr });
    },

    jsonSetObject: (json: object): AppThunkAction <KnownAction> =>
    (dispatch: (action: KnownAction) => void): void => {
      dispatch({ type: ActionTypeEnum.JsonSetObject, json });
    },

    jsonSetPathExpr: (pathExpr: string): AppThunkAction <KnownAction> =>
    (dispatch: (action: KnownAction) => void): void => {
      dispatch({ type: ActionTypeEnum.JsonSetPathExpr, pathExpr });
    },
};

/**
 * REDUCER - For a given state and action, returns the new state.
 *
 * @param state Current application state
 * @param incomingAction Dispatched Redux action
 *
 * @returns New application state
 */
export const reducer: Reducer<IJsonState> = (
  state: IJsonState | undefined,
  incomingAction: KnownAction
): IJsonState => {
  if (!state) {
    return initialState;
  }

  switch (incomingAction.type) {
    case ActionTypeEnum.JsonSetString: {
      return { ...state, jsonStr: incomingAction.jsonStr };
    }
    case ActionTypeEnum.JsonSetObject: {
      return { ...state, json: incomingAction.json };
    }
    case ActionTypeEnum.JsonSetPathExpr: {
      return { ...state, jsonStr: incomingAction.pathExpr };
    }
    default:
      // Do nothing - the final return will work
  }

  // For unrecognized actions (or in cases where actions have no effect),
  // must return the existing state (or default initial state if none was supplied)
  return state || initialState;
};
