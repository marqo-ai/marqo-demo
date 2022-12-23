import { Link, useTheme } from "react-daisyui"
import { GET_STARTED_URL, READ_THE_DOCS_URL } from "../../commons/constants"

export const SearchTheWayYouThink = () => {
    const { theme } = useTheme()

    return <div className={`col-span-2 md:col-span-3 rounded-lg p-6 text-3xl md:text-xl lg:text-2xl xl:text-3xl h-full font-bold ${theme === "dark" ? "bg-slate-700" : "bg-slate-100"}`}>
        <div className={`flex flex-col justify-center items-start lg:space-y-0 xl:space-y-1 h-full pl-0 lg:pl-10`}>
            <div className={`flex flex-col md:flex-row lg:flex-col justify-start items-center sm:items-start md:space-x-2 lg:space-x-0 h-full w-full`}>
                <p className={`${theme === "dark" ? "text-white" : "text-primary"} h-full flex items-center`}>Search the way</p>
                <p className={`${theme === "dark" ? "text-secondary" : "text-slate-400"} h-full flex items-center`}>you think<span className={`${theme === "dark" ? "text-white" : "text-primary"} text-3xl font-bold`}>.</span></p>
            </div>
            <div className={`flex flex-col sm:flex-row justify-start items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-10 md:mt-0 w-full h-full`}>
                {/* Get started */}

                <Link target={"_blank"} className={`${theme === "dark" ? "text-primary bg-secondary hover:bg-primary hover:text-white" : "text-slate-100 bg-primary"} flex rounded-full py-2 sm:py-1 px-8 sm:px-4 font-medium hover:no-underline text-center text-lg`} href={GET_STARTED_URL}>
                    Get Started
                </Link>

                {/* Read the docs */}

                <Link target={"_blank"} className={`${theme === "dark" ? "text-primary bg-secondary hover:bg-primary hover:text-white" : "text-slate-100 bg-primary"} flex rounded-full py-2 sm:py-1 px-8 sm:px-4 font-medium hover:no-underline text-center text-lg`} href={READ_THE_DOCS_URL}>
                    Read the docs
                </Link>
            </div>
        </div>
    </div>
}