import { PropsWithChildren, useCallback, useReducer } from "react";
import AppContext, { initialState } from ".";
import { actions } from "./actions";
import appReducer from "./app-reducer";

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)
    const value = {
        theme: state.theme,
        setTheme: dispatch({
            type: actions.SET_THEME,
            payload: payload
        }),
        dataset: state.dataset,
        setDataset: useCallback((payload: string) => dispatch({
            type: actions.SET_DATASET,
            payload: payload
        }), []),
        coreAPIResults: state.dataset,
        setCoreAPIResults: useCallback((payload: string) => dispatch({
            type: actions.SET_CORE_API_RESULTS,
            payload: payload
        }), []),
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}