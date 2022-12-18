import { Button } from "react-daisyui"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { DatasetSelector } from "../Dataset-Selector"

export const SearchBar = () => {
    return <div className="flex xs:w-full lg:w-8/12 h-[60px] searchBar rounded-full">
        <div className="searchInputWrapper flex h-full w-full justify-left self-center rounded-sm py-2 pr-0 pl-5">
            <MagnifyingGlassIcon className="h-6 w-6 self-center" />
            <input placeholder="smiling with glasses" className="bg-transparent ml-2 px-4 w-full text-xl focus:outline-none" />
        </div>
        <DatasetSelector />
        <Button color="primary" className="h-full rounded-r-full rounded-l-none">Search</Button>
    </div>
}