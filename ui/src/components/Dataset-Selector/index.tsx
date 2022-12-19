import { Button, Select } from "react-daisyui"
import { ArrowDownIcon } from "@heroicons/react/24/solid"
// 
import { BaycLogo } from "../Logo/Bayc-Logo"
import { CaretDown } from "../Shapes"
import { SimpleWikiLogo } from "../Logo/Simple-Wiki-Logo"
import { useReducer, useState } from "react"
import appReducer, { SET_DATASET } from "../../store/app-reducer"


const datasetOptions = [
    { index: 0, value: "boredapes", title: "Bored Apes" },
    { index: 1, value: "simplewiki", title: "Simple Wiki" },
]

export const DatasetSelector = () => {
    const [dataset, setDataset] = useState("boredapes");
    const [openDropdown, setOpenDropdown] = useState(false);
    // const [state, dispatch] = useReducer(appReducer, isBoredApes);
    const action = {
        type: SET_DATASET,
        payload: ""
    }
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
                        <Button onClick={() => setDataset(value)}
                            className="flex flex-col flex-wrap bg-transparent border-none hover:bg-transparent">
                            <div className="text-primary capitalize hover:text-accent">{title}</div>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
}