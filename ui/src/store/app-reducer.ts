import React from "react";
import { AppStateProps } from ".";

const SET_THEME = "SET_THEME";
const SET_DATASET = "SET_DATASET";
const SET_CORE_API_RESULTS = "SET_CORE_API_RESULTS";

const appReducer = (state: AppStateProps, action: any) => {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: action.payload,
            }
        case SET_DATASET:
            console.log(action)
            return {
                ...state,
                dataset: action.payload,
            }
        case SET_CORE_API_RESULTS:
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
export {
    SET_THEME,
    SET_DATASET,
}