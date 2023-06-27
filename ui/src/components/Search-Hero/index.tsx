import { Hero } from "react-daisyui"
// components
import { SearchBar } from "./Search-Bar"
import { useSelector } from "../../store"
import { SurpriseMe } from "./Surprise-Me";

export const SearchHero = () => {
    const { results } = useSelector(({ app }) => app);

    return <Hero className={`${results !== null && results?.results ? "pt-36 md:pt-56 pb-24 sm:pb-2 md:pb-16" : "pt-[30vh] pb-16 md:pb-0 lg:pt-[calc(40%_-_70px)]"}`}>
        <SurpriseMe />
        <SearchBar />
    </Hero>
}