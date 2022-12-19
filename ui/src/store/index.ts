import { createContext } from "react";

export type InitialStateProps = {
    theme: string;
    dataset: "boredapes" | "simplewiki";
}
const initialState: InitialStateProps = {
    theme: "light",
    dataset: "boredapes",
}

const AppContext = createContext(initialState);
export default AppContext;