import { useEffect, useState } from "react";
import { Link } from "react-daisyui";
import { LazyLoadImage, trackWindowScroll } from "react-lazy-load-image-component";
// store, thunks, slices, hook
import { useDispatch, useSelector } from "../../store";
import { getWikiImgThunk } from "../../store/thunks";
import { setWikiImgs } from "../../store/slices/app-slice";
// components
import { ResultsLoader } from "../Loaders";
import { PlaceholderComponent } from "../Loaders/Spinner";
import RawLogo from "../../assets/simplewiki.png"
import 'react-lazy-load-image-component/src/effects/blur.css';


const initialiseSeeMore = (results: any): Boolean[] => {
    if (results && results?.results?.hits) {
        return new Array(results?.results.hits.length).fill(true);
    } else {
        return []
    }
}

const SimpleWikiResults: React.FC = () => {
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

    const cleanWikiSrc = (src: string) => {
        return src.replace("http://s.wikipedia.org/wiki", "https://wikipedia.org/wiki")
    }

    const cleanWikiTitle = (wikiTitle: string) => {
        return wikiTitle.replace(" - Wikipedia", "")
    }

    return <div className="results px-2">
        {isSearchingCoreAPI && <ResultsLoader />}

        {!isSearchingCoreAPI && (
            <div className="flex flex-wrap lg:justify-center animate-smoothSlideUp">
                {results && results?.results?.hits.map(({ title, url, _highlights }, key) => {
                    return <div key={key} className={`p-2 basis-2/2 md:basis-1/2 lg:basis-1/3 text-primary w-full h-full overflow-hidden ${theme === "dark" ? "text-primary" : ""}`}>
                        <div className={`${theme === "dark" ? "bg-slate-300" : "bg-slate-100"} h-full p-6 rounded-lg `}>
                            <div className="mb-6 font-bold text-lg">{cleanWikiTitle(title)}</div>
                            <div className={`flex flex-row overflow-hidden ${seeMore[key] ? "max-h-[200px]" : "max-h-[400px]"} `}>
                                <div className={`basis-3/4 flex flex-col justify-between relative pr-2`}>
                                    <p className={`pb-2`}>Highlights</p>
                                    <p className={`text-sm h-full overflow-y-scroll break-all ${theme === "dark" ? "text-slate-700" : "text-slate-800"}`}>{Object.values(_highlights).flat().join("")}</p>
                                    <div className={`flex space-x-6 pt-2 text-sm`}>
                                        <Link className={`underline`} target="_blank" href={cleanWikiSrc(url)}>Read article</Link>
                                    </div>
                                </div>

                                <div className={`basis-1/4 flex justify-center self-start ${theme === "dark" ? "bg-white" : ""}`}>
                                    <LazyLoadImage
                                        width={"100%"}
                                        height={"100%"}
                                        effect="blur"
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

export default trackWindowScroll(SimpleWikiResults)