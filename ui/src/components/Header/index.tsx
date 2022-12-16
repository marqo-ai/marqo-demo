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
    return <header className="navbar">
        <div className="flex-1">
            <MarqoLogo />
        </div>
        <nav className="flex-none">
            <ul className="flex">
                {navLinks.map(({ key, title, href }) => {
                    return <li key={key} className="px-4">
                        <a href={href}>{title}</a>
                    </li>
                })}
                <li className="">
                    <OutlineSunIcon className="h-6 w-6" />
                    {/* <Button><SunIcon /></Button> */}
                </li>
            </ul>
        </nav>
    </header>
}