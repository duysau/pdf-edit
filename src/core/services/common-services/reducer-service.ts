import { Model } from "react3l-common";
import { produce } from "immer";
import React from "react";

export const combineReducers = <State, Action>(
  slices: ((state: State, action: Action) => State)[]
) =>
  produce((state: State, action: Action) => {
    slices.reduce(
      (newState: State, reducer: (state: State, action: Action) => State) =>
        reducer(newState, action),
      state
    );
  });

export const combineStateReducers = <State, Action>(slices: {
  [key: string]: (state: State, action: Action) => State;
}) =>
  produce((state: State & Model, action: Action) => {
    Object.keys(slices).reduce((acc: State & Model, prop: string) => {
      slices[prop](acc[prop], action);
      return acc;
    }, state);
  });

export const useReducerWithMiddleware = <TState, TAction>(
  reducer: (state: TState, action: TAction) => TState,
  initialState: TState,
  middlewareFns: { (...params: any): void | unknown }[] = [],
  afterwareFns: { (...params: any): void | unknown }[] = []
) => {
  const [stateValue, dispatch] = React.useReducer(reducer, initialState);

  const aRef = React.useRef();

  const dispatchWithMiddleware = React.useCallback(
    (action: any) => {
      middlewareFns.length > 0 &&
        middlewareFns.forEach((middlewareFn: any) => middlewareFn(action));
      aRef.current = action;
      dispatch(action);
    },
    [middlewareFns]
  );

  React.useEffect(() => {
    if (!aRef.current) return;

    afterwareFns.length > 0 &&
      afterwareFns.forEach((afterwareFn: any) =>
        afterwareFn(aRef.current, stateValue)
      );

    aRef.current = undefined;
  }, [afterwareFns, stateValue]);

  return { stateValue, dispatchWithMiddleware };
};
