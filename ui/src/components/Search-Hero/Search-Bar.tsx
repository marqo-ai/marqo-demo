import { Fragment, KeyboardEvent, useEffect, useState } from "react";
import { Button } from "react-daisyui"
// store
import { useDispatch, useSelector } from "../../store";
import { postSearchDataset } from "../../store/thunks";
import { setQ, setPosQ, setNegQ } from "../../store/slices/app-slice";
// components
import { DatasetSelector } from "../Dataset-Selector"
import { useSearchParams } from "react-router-dom";
import { SIMPLEWIKI } from "../../commons/constants";

const MOBILE_WINDOW_THRESOLD = 500

export const SearchBar = () => {
    const [mobile, setMobile] = useState(window.innerWidth <= MOBILE_WINDOW_THRESOLD);
    const [, setSearchParams] = useSearchParams();
    const { dataset, theme, q, posQ, negQ } = useSelector(({ app }) => app);
    const dispatch = useDispatch();
    const disableClasses = "disabled:border-2 disabled:border-slate-100 md:disabled:border-none disabled:bg-transparent disabled:text-slate-400";

    const handleWindowSizeChange = () => {
        setMobile(window.innerWidth <= MOBILE_WINDOW_THRESOLD);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const handleOnSearch = () => {

        setSearchParams({
            q: q,
            posQ: posQ != null ? posQ : "",
            negQ: negQ != null ? negQ : "",
            index: dataset
        })
        dispatch(postSearchDataset({
            q: q,
            posQ: posQ,
            negQ: negQ,
            index: dataset
        }));
    }

    const handleOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            handleOnSearch()
        }
    }

    const handleOnQChange = (e: any) => {
        dispatch(setQ(e.target.value || ""))
    }
    const handleOnPosQChange = (e: any) => {
        dispatch(setPosQ(e.target.value || ""))
    }
    const handleOnNegQChange = (e: any) => {
        dispatch(setNegQ(e.target.value || ""))
    }

    return <Fragment>
        <div className={`flex w-full h-[50px] mb-20 rounded-lg ${theme === "dark" ? "bg-slate-700" : "searchBar"}`}>
            <div className="searchInputWrapper border-[#00FFAA] flex h-full w-full justify-left self-center rounded-sm py-0 pr-0 pl-2">
                <input 
                    value={q} 
                    onChange={handleOnQChange} 
                    onKeyDown={handleOnKeyDown} 
                    placeholder="Search..." 
                    className={`bg-transparent ml-2 px-0 w-full text-sm md:text-md focus:outline-none ${theme === "dark" ? "" : "text-primary"}`} 
                />
                {dataset !== SIMPLEWIKI && !mobile ? 
                    (<>
                        <div className={"border-2 bg-gray-400 h-3/4 m-auto rounded-lg"}/>
                        <input 
                            value={posQ != null ? posQ : ""} 
                            onChange={handleOnPosQChange} 
                            onKeyDown={handleOnKeyDown} 
                            placeholder="More of..." 
                            className={`bg-transparent ml-2 px-0 w-full text-sm md:text-md focus:outline-none ${theme === "dark" ? "" : "text-primary"}`} 
                        />
                        <div className={"border-2 bg-gray-400 h-3/4 m-auto rounded-lg"}/>
                        <input 
                            value={negQ != null ? negQ : ""} 
                            onChange={handleOnNegQChange} 
                            onKeyDown={handleOnKeyDown} 
                            placeholder="Less of..." 
                            className={`bg-transparent ml-2 px-0 w-full text-sm md:text-md focus:outline-none ${theme === "dark" ? "" : "text-primary"}`} 
                        />
                    </>) : 
                    (<></>)
                }
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