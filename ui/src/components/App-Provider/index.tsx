import { PropsWithChildren, useEffect, useReducer } from "react"
import AppContext, { initialState } from "../../store"
import appReducer from "../../store/app-reducer"
import { searchAPI } from "../../api"

// export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
//     const [state, dispatch] = useReducer(appReducer, initialState as never)

//     useEffect(() => {
//         searchAPI({ q: "captain hook", index: "boredapes" })
//     })

//     return <AppContext.Provider value={{ state, dispatch }}>
//         {children}
//     </AppContext.Provider>
// }