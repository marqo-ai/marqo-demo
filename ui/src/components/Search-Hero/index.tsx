import { Button, Hero } from "react-daisyui"
// components
import { SearchBar } from "./Search-Bar"

export const SearchHero = () => {
    return <Hero className="py-36">
        <SearchBar />
        <div className="contents">
            <Button className="bg-transparent border-none text-primary lowercase">or upload an image</Button>
        </div>
    </Hero>
}