import { useContext, useEffect, useReducer, useState } from "react"
import { Button } from "react-daisyui"
// 
import { BaycLogo } from "../Logo/Bayc-Logo"
import { CaretDown } from "../Shapes"
import { SimpleWikiLogo } from "../Logo/Simple-Wiki-Logo"
import appReducer from "../../store/app-reducer"
import AppContext, { initialState } from "../../store"


const datasetOptions = [
    { index: 0, value: "boredapes", title: "Bored Apes" },
    { index: 1, value: "simplewiki", title: "Simple Wiki" },
]

export const DatasetSelector = () => {
    // const [state, dispatch] = useReducer(appReducer, initialState);
    const { dataset, setDataset } = useContext(AppContext);
    // const { dataset } = state;
    // useState
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleOnSelect = (value: string) => {
        setOpenDropdown(false)
        setDataset(value)
    };

    return <div className="flex flex-col">
        <Button onClick={() => setOpenDropdown(!openDropdown)}
            className="flex flex-col h-full w-[90px] bg-transparent border-none pl-0 focus:bg-transparent hover:bg-transparent">
            {dataset === "boredapes" && <BaycLogo />}
            {dataset === "simplewiki" && <SimpleWikiLogo />}
            <CaretDown />
        </Button>

        {/* options */}

        <div id="dataset-dropdown" className={`${openDropdown ? "flex" : "hidden"} bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700`}>
            <ul className="w-min-content">
                {datasetOptions.map(({ index, value, title }) => (
                    <li key={index} className="w-[90px]">
                        <Button onClick={() => handleOnSelect(value)}
                            className="flex flex-col flex-wrap bg-transparent border-none hover:bg-transparent">
                            <div className="text-primary capitalize hover:text-accent">{title}</div>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
}