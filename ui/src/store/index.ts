import { createContext } from "react";
import { CoreResponse } from "../api/types";

export type AppStateProps = {
    theme: string;
    dataset: "boredapes" | "simplewiki";
    coreAPIResults: CoreResponse | null;
}

export const initialState: AppStateProps = {
    theme: "light",
    dataset: "boredapes",
    coreAPIResults: null,
}

const AppContext = createContext(initialState);
export default AppContext;