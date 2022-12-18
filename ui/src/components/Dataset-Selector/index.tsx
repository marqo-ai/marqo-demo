import { Button } from "react-daisyui"
import { ArrowDownIcon } from "@heroicons/react/24/solid"
// 
import { BaycLogo } from "../Logo/Bayc-Logo"
import { CaretDown } from "../Shapes"
import { SimpleWikiLogo } from "../Logo/Simple-Wiki-Logo"
import { useState } from "react"

export const DatasetSelector = () => {
    const [isBoredApes, setIsBoredApes] = useState(true);

    return <Button onClick={() => setIsBoredApes(!isBoredApes)} className="h-full bg-transparent border-none pl-0 focus:bg-transparent">
        {isBoredApes && <BaycLogo />}
        {!isBoredApes && <SimpleWikiLogo />}
        <CaretDown />
    </Button>
}