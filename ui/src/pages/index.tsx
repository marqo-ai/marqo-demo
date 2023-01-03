import { Fragment, useEffect } from "react"
import { Helmet } from "react-helmet-async"
// store
import { useDispatch, useSelector } from "../store"
// components
import BoredApesResults from "../components/Results/Bored-Apes"
import SimplewikiResults from "../components/Results/Simple-Wiki"
import { SearchHero } from "../components/Search-Hero"
import { BOREDAPES, SIMPLEWIKI } from "../commons/constants"
import { useSearchParams } from "react-router-dom"
import { postSearchDataset } from "../store/thunks"
import { setQ, setDataset } from "../store/slices/app-slice"

export const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { q, results, isSearchingCoreAPI, dataset, theme } = useSelector(({ app }) => app);

    useEffect(() => {
        const qParam = searchParams.get("q");
        const indexParam = searchParams.get("index");
        if (qParam) {
            console.log("executing")
            dispatch(postSearchDataset({
                q: qParam,
                index: indexParam || BOREDAPES
            }))
            dispatch(setQ(qParam))
            dispatch(setDataset(indexParam))
        } else if (results === null) {
            setSearchParams({
                q,
                index: BOREDAPES
            })
            console.log("apes[null[")
            dispatch(postSearchDataset({
                q,
                index: BOREDAPES
            }))
        } else {
            console.log("all else fails")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <Fragment>
        <Helmet>
            <title>Marqo</title>
        </Helmet>

        {/* content */}

        <div className={`container justify-center min-h-screen w-screen pb-7 px-2 sm:px-12 m-auto ${theme === "dark" && "bg-primary"}`}>
            <SearchHero />

            <div className={`mt-0`}>
                {dataset === BOREDAPES && <BoredApesResults />}
                {dataset === SIMPLEWIKI && <SimplewikiResults />}
            </div>
        </div>
    </Fragment>
}