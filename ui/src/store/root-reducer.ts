import { combineReducers } from "@reduxjs/toolkit";
import app from "./slices/app-slice";

export const rootReducer = combineReducers({
    app,
});

export type RootStateType = ReturnType<typeof rootReducer>;
