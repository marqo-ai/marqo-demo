import { useEffect, useState } from "react";
import { Link } from "react-daisyui";
import { LazyLoadImage } from "react-lazy-load-image-component";
// store, thunks, slices, hook
import { useDispatch, useSelector } from "../../store";
import { getWikiImgThunk, postSearchDataset } from "../../store/thunks";
import { setWikiImgs } from "../../store/slices/app-slice";
import { useScreen } from "../../hooks/useScreen";
// components
import { ShareResults } from "../Share-Results";
import { ResultsLoader } from "../Loaders";
import RawLogo from "../../assets/simplewiki.png"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { PlaceholderComponent, Spinner } from "../Loaders/Spinner";
import { SearchTheWayYouThink } from "../Fillers/Search-The-Way-You-Think";

const placeholderSrc = "sample-bored-ape.png"
const simpleWikiPlaceholderSrc = "simplewiki.png"

export const ImageResults: React.FC = () => {
    const dispatch = useDispatch();
    const { q, results, isSearchingCoreAPI } = useSelector(({ app }) => app);
    const { screen } = useScreen();

    useEffect(() => {
        if (results === null) {
            dispatch(postSearchDataset({
                q: q,
                index: "boredapes"
            }))
        }
    }, [])

    const getTileStyles = (key: number, hitsArrayLength: number) => {
        if (["2xl", "xl", "lg", "md"].includes(screen)) {
            return `${((key % 7 == 0 && key % 2 == 0) || (key % 7 == 3 && key % 2 == 0)) && key <= hitsArrayLength - 3 ? "large-tile" : "tile"}`
        } else {
            return `col-span-1`
        }
    }

    return <div className="results">
        {isSearchingCoreAPI && <ResultsLoader />}

        {!isSearchingCoreAPI && results?.results && results?.results?.hits && (
            <div className={`imgResultsWrapper grid gap-[4px] ${["2xl", "xl", "lg", "md"].includes(screen) ? "grid-cols-5" : "grid-cols-2"}`}>

                {results?.results?.hits.map(({ image, _id, _highlights, _score }, key, hitsArray) => {
                    return <div key={_id} className={`cursor-pointer relative flex min-w-full min-h-full ${getTileStyles(key, hitsArray.length)}`}>
                        <LazyLoadImage
                            // crossOrigin="anonymous"
                            effect="opacity"
                            src={image}
                            width={"100%"}
                            height={"100%"}
                            placeholder={<PlaceholderComponent />}
                            alt={`q${key}-${_score}`}
                            className={`hover:opacity-[0.2]`} />
                        <div className={`rounded-[4%] absolute top-0 w-full h-full flex items-center px-5 bg-transparent opacity-0 hover:opacity-100 hover:bg-white/[.7] text-slate-700 text-lg md:text-xs lg:text-lg`}>
                            <b>Score:</b> <span className={`w-full text-nowrap overflow-hidden text-ellipsis`}>{_score}</span>
                        </div>
                    </div>
                })}

                <SearchTheWayYouThink />

            </div>
        )}
    </div>
}

const initialiseSeeMore = (results: any): Boolean[] => {
    if (results && results?.results?.hits) {
        return new Array(results?.results.hits.length).fill(true);
    } else {
        return []
    }
}

export const ListResults: React.FC = () => {
    const { results, isSearchingCoreAPI, theme, wikiImgs } = useSelector(({ app }) => app);
    const dispatch = useDispatch();

    const [seeMore, setSeeMore] = useState<Boolean[]>(initialiseSeeMore(results));

    useEffect(() => {
        setSeeMore(initialiseSeeMore(results));

        if (results && results?.results?.hits) {
            let _imgs: string[] = new Array(results?.results.hits.length).fill("");
            dispatch(setWikiImgs(_imgs))

            results?.results.hits.forEach(async (hit, hitIndex) => {
                const hitTitle = hit["title"];

                if (hitTitle) {
                    dispatch(getWikiImgThunk({ title: cleanWikiTitle(hitTitle), hitIndex }))
                }
            })
        }

    }, [results])

    const handleSeeMore = (key: number) => {
        let _seeMore = [...seeMore];
        _seeMore[key] = !seeMore[key];
        setSeeMore(_seeMore);
    }

    const cleanWikiSrc = (src: string) => {
        return src.replace("http://s.wikipedia.org/wiki", "https://wikipedia.org/wiki")
    }

    const cleanWikiTitle = (wikiTitle: string) => {
        return wikiTitle.replace(" - Wikipedia", "")
    }

    return <div className="results px-2">
        {isSearchingCoreAPI && <ResultsLoader />}

        {!isSearchingCoreAPI && (
            <div className="flex flex-wrap">
                {results && results?.results?.hits.map(({ content, docDate, domain, title, url, _id, _highlights, _score }, key) => {
                    return <div key={key} className={`p-2 basis-2/2 md:basis-1/2 text-primary w-full overflow-hidden ${theme === "dark" ? "text-primary" : ""}`}>
                        <div className={`${theme === "dark" ? "bg-slate-300" : "bg-slate-100"} h-full p-6 rounded-lg `}>
                            <div className="mb-6 font-bold text-lg">{cleanWikiTitle(title)}</div>
                            <div className={`flex flex-row overflow-hidden ${seeMore[key] ? "max-h-[200px]" : "max-h-[400px]"} `}>
                                <div className={`basis-3/4 flex flex-col justify-between relative pr-2`}>
                                    <p className={`pb-2`}>Highlights</p>
                                    <p className={`text-sm h-full overflow-y-scroll break-all ${theme === "dark" ? "text-slate-700" : "text-slate-800"}`}>{Object.values(_highlights).flat().join("")}</p>
                                    <div className={`flex space-x-6 pt-2 text-sm`}>
                                        <p className={`italic`}>Score: {_score}</p>
                                        <Link className={`underline`} target="_blank" href={cleanWikiSrc(url)}>Read article</Link>
                                    </div>
                                    {/* {seeMore[key] && <div className={`absolute z-1 bg-gradient-to-b from-transparent to-base-100 h-full basis-3/4 w-full ${theme === "dark" && "to-primary"} `} />} */}
                                    {/* <Button onClick={() => handleSeeMore(key)} className={`bg-transparent z-10 capitalize text-primary border-none hover:bg-transparent hover:border-none hover:text-accent ${theme === "dark" && "text-secondary"}`}>{seeMore[key] ? "Read more" : "Hide"}</Button> */}
                                </div>

                                <div className={`basis-1/4 flex justify-center self-start ${theme === "dark" ? "bg-white" : ""}`}>
                                    {/* <img src={`${ typeof wikiImgs[key] === "string" ? wikiImgs[key] : RawLogo } `} alt={title} className={`${ seeMore[key] ? "h-[100px] md:h-[150px] lg:h-[200px]" : "max-h-[400px]" } `} /> */}
                                    <LazyLoadImage
                                        width={"100%"}
                                        height={"100%"}
                                        effect="opacity"
                                        placeholder={<PlaceholderComponent />}
                                        src={`${typeof wikiImgs[key] === "string" ? wikiImgs[key] : RawLogo} `}
                                        alt={title}
                                        className={`h-auto w-full`} />
                                </div>
                            </div>
                        </div>

                    </div>
                })}
            </div>
        )}
    </div >
}