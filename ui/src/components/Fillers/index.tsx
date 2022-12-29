import { Link, useTheme } from "react-daisyui"
import { MarqoWLink } from "../Logo/MarqoWLink"
import { JOIN_CLOUD_BETA_TYPEFORM } from "../../commons/constants"

export const TryMarqo = () => {
    const { theme } = useTheme()

    return <div className={`flex flex-col lg:flex-row justify-start items-center rounded-lg w-[80%] md:w-[45vw] lg:w-[40vw] 2xl:w-[30vw] px-0 ${theme === "dark" ? "text-primary bg-slate-700" : "text-slate-700 bg-slate-100"}`}>
        <div className={`${theme === "dark" ? "bg-slate-800" : "bg-slate-700"} flex justify-center py-8 lg:pt-12 lg:pb-16 rounded-t-lg rounded-b-none lg:rounded-r-none lg:rounded-l-lg w-full basis-1/2`}>
            <MarqoWLink />
        </div>
        <div className={`flex justify-center items-center w-full py-12 lg:py-0`}>
            <Link target={"_blank"} className={`${theme === "dark" ? "text-primary bg-secondary hover:bg-primary hover:text-white" : "text-slate-100 bg-primary"} flex rounded-full py-1 px-4 font-medium hover:no-underline text-center text-lg`} href={JOIN_CLOUD_BETA_TYPEFORM}>Join <span className="ml-1"><b>Marqo Cloud</b></span></Link>
        </div>
    </div>
}