import { Fragment } from "react"
import { Helmet } from "react-helmet-async"
// store
import { useSelector } from "../store"
// components
import BoredApesResults from "../components/Results/Bored-Apes"
import SimplewikiResults from "../components/Results/Simple-Wiki"
import { SearchHero } from "../components/Search-Hero"
import { BOREDAPES, SIMPLEWIKI } from "../commons/constants"

export const Home = () => {
    const { dataset, theme } = useSelector((state) => state.app)

    return <Fragment>
        <Helmet>
            <title>Marqo</title>
        </Helmet>

        {/* content */}

        <div className={`container justify-center min-h-screen w-screen pb-7 px-2 sm:px-12 m-auto ${theme === "dark" && "bg-primary"}`}>
            {/* <div className="container justify-center px-12 m-auto h-screen overflow-hidden"> */}
            {/* <div className="overflow-y-scroll h-full  whitespace-nowrap scrollbar-hide"> */}
            {/* </div> */}
            {/* </div> */}
            {/* <Header /> */}
            <SearchHero />

            <div className={`mt-0`}>
                {dataset === BOREDAPES && <BoredApesResults />}
                {dataset === SIMPLEWIKI && <SimplewikiResults />}
            </div>
            {/* TODO: scroll to top */}
            {/* <FloatingControls /> */}
        </div>
    </Fragment>
}