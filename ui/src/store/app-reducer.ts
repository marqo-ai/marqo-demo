import React from "react";
import { actions } from "./actions";
import { AppStateProps } from ".";


const appReducer = (state: AppStateProps, action: any) => {
    switch (action.type) {
        case actions.SET_THEME:
            return {
                ...state,
                theme: action.payload,
            }
        case actions.SET_DATASET:
            console.log(action)
            return {
                ...state,
                dataset: action.payload,
            }
        case actions.SET_CORE_API_RESULTS:
            return {
                ...state,
                coreAPIResults: action.payload
            }
        default:
            return state;

    }
}


// const rootReducer = (reducers) => (state, action) => {
//     return Object.keys(reducers).reduce(
//         (acc, prop) => ({
//             ...acc,
//             [prop]: reducers[prop](acc[prop], action),
//         }),
//         state
//     );
// }
export default appReducer;