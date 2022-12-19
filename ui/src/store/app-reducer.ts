import React from "react";
import { InitialStateProps } from ".";

const SET_THEME = "SET_THEME";
const SET_DATASET = "SET_DATASET";

const appReducer = (state: InitialStateProps, action: any) => {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: action.payload,
            }
            break;
        case SET_DATASET:
            return {
                ...state,
                dataset: action.payload,
            }
            break;
        default:
            break;

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