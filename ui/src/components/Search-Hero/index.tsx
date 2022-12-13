import { Button, Hero, Input } from "react-daisyui"
// components
import { SearchBar } from "./Search-Bar"
import { useDispatch, useSelector } from "../../store"
import { useRef } from "react";
import { SurpriseMe } from "./Surprise-Me";

export const SearchHero = () => {
    const { results, theme } = useSelector(({ app }) => app);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    // const handleOnChange = (e) => {
    //     e.preventDefault();
    //     dispatch(setImgFile(inputRef?.current.value))
    // }

    return <Hero className={`${results !== null && results?.results ? "pt-56 md:pt-72 pb-10" : "pt-[40vh] md:[50vh] lg:pt-[calc(40%_-_70px)]"}`}>
        <SurpriseMe />
        <SearchBar />
        {/* <div className="contents">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="img-file" className="flex flex-col items-center justify-center w-[fit-content] cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className={`${theme === "dark" ? "text-white hover:text-secondary" : "text-primary hover:text-slate-600"}`}>
                            or upload an image
                        </p>
                    </div>
                    <Input onInput={(e) => handleOnChange(e)} type={"file"} id="img-file" className={`hidden`} ref={inputRef} />
                </label>
            </div>
        </div> */}
    </Hero>
}