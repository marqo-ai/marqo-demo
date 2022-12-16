import { Button } from "react-daisyui"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export const SearchBar = () => {
    return <div className="flex w-8/12 searchBar rounded-3xl">
        <div className="searchInputWrapper flex w-full justify-left self-center rounded-sm py-2 pr-2 pl-5">
            <MagnifyingGlassIcon className="h-6 w-6 self-center" />
            <input placeholder="smiling with glasses" className="bg-transparent ml-2 px-4 w-full text-xl focus:outline-none" />
        </div>

        <Button color="primary" className="rounded-r-3xl rounded-l-none">Search</Button>
    </div>
}