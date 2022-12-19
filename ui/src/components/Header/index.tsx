import { Button } from "react-daisyui";
import { SunIcon as OutlineSunIcon } from "@heroicons/react/24/outline";
// components
import { MarqoLogo } from "../Logo";


const navLinks = [
    { key: 0, title: "Cloud Pricing", href: "https://www.marqo.ai/pricing" },
    { key: 1, title: "Docs", href: "https://docs.marqo.ai" },
    { key: 2, title: "Company", href: "https://www.marqo.ai/about-us" },
];

export default function Header() {
    return <header className="navbar bg-primary container-fluid w-screen pl-12 pr-16">
        <div className="flex-1">
            <MarqoLogo />
        </div>
        {/* TODO: hamburger on xs to md, show on lg up */}
        <nav className="flex-none xs:invisible lg:block">
            <ul className="flex">
                {navLinks.map(({ key, title, href }) => {
                    return <li key={key} className="pl-12">
                        <a href={href} className="text-white">{title}</a>
                    </li>
                })}
                {/* <li className="">
                    <Button className="transparent">
                        <OutlineSunIcon className="h-6 w-6" />
                    </Button>
                </li> */}
            </ul>
        </nav>
    </header>
}