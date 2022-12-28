import { useEffect, useState } from "react";
import { Link, Modal } from "react-daisyui";
import { LazyLoadImage } from "react-lazy-load-image-component";
// store, thunks, slices, hook
import { useDispatch, useSelector } from "../../store";
import { getWikiImgThunk, postSearchDataset } from "../../store/thunks";
import { setDataset, setQ, setWikiImgs } from "../../store/slices/app-slice";
import { useScreen } from "../../hooks/useScreen";
// components
import { ShareResults } from "../Share-Results";
import { ResultsLoader } from "../Loaders";
import RawLogo from "../../assets/simplewiki.png"
import 'react-lazy-load-image-component/src/effects/blur.css';
import { PlaceholderComponent, Spinner } from "../Loaders/Spinner";
import { SearchTheWayYouThink } from "../Fillers/Search-The-Way-You-Think";
import { useSearchParams } from "react-router-dom";

const placeholderSrc = "sample-bored-ape.png"
const simpleWikiPlaceholderSrc = "simplewiki.png"

export const ImageResults: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { q, results, isSearchingCoreAPI } = useSelector(({ app }) => app);
    const { screen } = useScreen();
    const [openImgModal, setOpenImgModal] = useState(false);
    const [modalImg, setModalImg] = useState("");

    useEffect(() => {
        const qParam = searchParams.get("q");
        const indexParam = searchParams.get("index");
        if (qParam) {
            dispatch(setQ(qParam))
            dispatch(setDataset(indexParam))
            dispatch(postSearchDataset({
                q: qParam,
                index: indexParam || "boredapes"
            }))
        } else if (results === null) {
            setSearchParams({
                q,
                index: "boredapes"
            })
            dispatch(postSearchDataset({
                q,
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

    const handleOnClickImg = (image: string) => {
        setModalImg(image);
        setOpenImgModal(!openImgModal)
    }

    return <div className="results">
        {isSearchingCoreAPI && <ResultsLoader />}

        <Modal open={openImgModal} onClickBackdrop={() => setOpenImgModal(false)}>
            <LazyLoadImage
                effect="blur"
                src={modalImg}
                width={"100%"}
                height={"100%"}
                placeholder={<PlaceholderComponent />}
                alt={`ape-modal`} />
        </Modal>

        {!isSearchingCoreAPI && results?.results && results?.results?.hits && (
            <div className={`imgResultsWrapper grid gap-[4px] ${["2xl", "xl", "lg", "md"].includes(screen) ? "grid-cols-5" : "grid-cols-2"}`}>

                {results?.results?.hits.map(({ image, _id, _score }, key, hitsArray) => {
                    return <div key={_id} onClick={() => handleOnClickImg(image)} className={`cursor-pointer relative flex min-w-full min-h-full hover:scale-[.95] hover:duration-150 ${getTileStyles(key, hitsArray.length)}`}>
                        <LazyLoadImage
                            effect="blur"
                            src={image}
                            width={"100%"}
                            height={"100%"}
                            placeholder={<PlaceholderComponent />}
                            alt={`ape-${key}-${_score}`}
                        />
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
                                        <Link className={`underline`} target="_blank" href={cleanWikiSrc(url)}>Read article</Link>
                                    </div>
                                </div>

                                <div className={`basis-1/4 flex justify-center self-start ${theme === "dark" ? "bg-white" : ""}`}>
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