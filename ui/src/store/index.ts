import { Dispatch, PropsWithChildren, createContext, useCallback } from "react";
import { CoreResponse } from "../api/types";
import React from "react";
import appReducer from "./app-reducer";
import { actions } from "./actions";

export type AppStateProps = {
    theme: string;
    dataset: "boredapes" | "simplewiki";
    coreAPIResults: CoreResponse | null;
    setTheme: (val: string) => {};
    setDataset: (val: string) => {};
}

export const initialState = {
    theme: "light",
    dataset: "boredapes",
    coreAPIResults: null,
}

// const AppContext = createContext<{ state: AppStateProps; dispatch: Dispatch<> }>({ state: initialState, dispatch: () => null });
const AppContext = createContext(initialState);
export default AppContext;