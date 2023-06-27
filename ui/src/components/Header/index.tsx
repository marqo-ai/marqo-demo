import { Button, Link } from "react-daisyui";
import {
    Bars3Icon,
    MoonIcon,
    SunIcon as OutlineSunIcon
} from "@heroicons/react/24/outline";
// components
import { MarqoLogo } from "../Logo";
import { useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { setTheme } from "../../store/slices/app-slice";
import { MarqoWLink } from "../Logo/MarqoWLink";


const navLinks = [
    { key: 0, title: "Cloud Pricing", href: "https://www.marqo.ai/pricing" },
    { key: 1, title: "Docs", href: "https://docs.marqo.ai" },
    { key: 2, title: "Company", href: "https://www.marqo.ai/about-us" },
];

export default function Header() {
    const dispatch = useDispatch();
    const { theme } = useSelector(({ app }) => app)
    // const [isBurgerMenuClicked, setIsBurgerMenuClicked] = useState(false);

    const themeToggler = <Button className="transparent bg-transparent border-none hover:bg-transparent p-0" onClick={() => dispatch(setTheme(theme === "light" ? "dark" : "light"))}>
        {theme === "light" && <OutlineSunIcon className="h-6 w-6 fill-secondary stroke-secondary" />}
        {theme === "dark" && <MoonIcon className="h-6 w-6 fill-secondary stroke-secondary" />}
    </Button>

    return (<header className={`navbar bg-primary container-fluid w-screen px-4 lg:pl-12 lg:pr-16 drop-shadow-3xl fixed z-20`}>
        
        {/* <Button onClick={() => { setIsBurgerMenuClicked(!isBurgerMenuClicked) }} className="lg:hidden mr-6 px-0 bg-transparent hover:bg-transparent hover:border-none">
            <Bars3Icon className={`h-6 w-6 stroke-[3px] stroke-secondary`} />
        </Button> */}

        <div className="flex-1">
            <MarqoWLink />
        </div>

        <nav className="flex-none hidden lg:block">
            <ul className="flex self-center">
                {/* {navLinks.map(({ key, title, href }) => {
                    return <li key={key} className="pl-12 text-[1.2em] text-white hover:text-secondary font-[400] flex items-center">
                        <a href={href} target="_blank">{title}</a>
                    </li>
                })} */}
                <li className="pl-12">
                    {themeToggler}
                </li>
            </ul>
        </nav>

        <nav className="flex visible lg:hidden">{themeToggler}</nav>

        {/* <nav className={`${isBurgerMenuClicked ? "w-3/4 sm:w-1/2 md:w-2/5" : "hidden"} lg:hidden absolute mt-[260px] py-8 left-0 bg-primary`}>
            <ul className="flex flex-col w-full">
                {navLinks.map(({ key, title, href }) => {
                    return <li key={key} className="pl-12 text-[1.2em] py-2 hover:bg-secondary text-white hover:text-primary font-[500]">
                        <a href={href} target="_blank" className="w-full">{title}</a>
                    </li>
                })}
            </ul>
            </nav> */}
    </header>)
}