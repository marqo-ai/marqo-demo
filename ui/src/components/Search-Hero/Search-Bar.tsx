import { Fragment, KeyboardEvent, useRef } from "react";
import { Button } from "react-daisyui"
// store
import { useDispatch, useSelector } from "../../store";
import { postSearchDataset } from "../../store/thunks";
import { DEFAULT_Q, setQ } from "../../store/slices/app-slice";
// components
import { DatasetSelector } from "../Dataset-Selector"
import { useSearchParams } from "react-router-dom";

export const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { dataset, theme, q, imgFile } = useSelector(({ app }) => app);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const disableClasses = "disabled:border-2 disabled:border-slate-100 md:disabled:border-none disabled:bg-transparent disabled:text-slate-400";

    const handleOnSearch = () => {
        const value = inputRef.current?.value;

        setSearchParams({
            q: value ? value : DEFAULT_Q,
            index: dataset
        })
        dispatch(postSearchDataset({
            q: value ? value : DEFAULT_Q,
            index: dataset
        }));
    }

    const handleOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleOnSearch()
        }
    }

    const handleOnChange = () => {
        dispatch(setQ(inputRef.current?.value || ""))
    }

    return <Fragment>
        <div className={`flex w-full h-[50px] mb-20 rounded-lg ${theme === "dark" ? "bg-slate-700" : "searchBar"}`}>
            {/* <div className={`flex w-full h-[50px] mb-20 rounded-lg ${theme === "dark" ? "darkSearchBar" : "searchBar"}`}> */}
            <div className="searchInputWrapper border-[#00FFAA] flex h-full w-full justify-left self-center rounded-sm py-0 pr-0 pl-2">
                <input value={q} onChange={handleOnChange} onKeyDown={handleOnKeyDown} placeholder="smiling with glasses" className={`bg-transparent ml-2 px-0 w-full text-sm md:text-md focus:outline-none ${theme === "dark" ? "" : "text-primary"}`} ref={inputRef} />
            </div>
            <DatasetSelector />
            <Button disabled={!q}
                onClick={handleOnSearch}
                className={`bg-primary h-full rounded-r-lg rounded-l-none text-white hidden sm:block hover:border-none hover:bg-secondary hover:text-primary ${theme === "dark" && "bg-secondary text-primary border-none"} ${disableClasses}`}>
                Search
            </Button>
            <div className="sm:hidden absolute w-full mt-[150px] flex justify-center">
                <Button onClick={handleOnSearch}
                    color="primary"
                    disabled={!q}
                    className={`w-[200px] rounded-lg text-white hover:bg-secondary hover:text-primary hover:border-none ${theme === "dark" && "bg-secondary text-primary"} ${disableClasses}`}>
                    Search
                </Button>
            </div>
        </div>

    </Fragment>
}