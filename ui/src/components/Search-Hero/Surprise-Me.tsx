import { Button, useTheme } from "react-daisyui"
// store
import { useDispatch, useSelector } from "../../store";
import { postSearchDataset } from "../../store/thunks";
import { setQ } from "../../store/slices/app-slice";
// data
import surpriseMe from "../../data/surpriseMe.json";
import { useLocation, useSearchParams } from "react-router-dom";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton } from "react-share";

export const SurpriseMe = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const { dataset, q } = useSelector(({ app }) => app);

    const handleOnSurprise = () => {
        let randomSet = dataset === "boredapes" ? surpriseMe["randomBoredApesQs"] : surpriseMe["randomSimpleWikiQs"];
        const randomQ = randomSet[Math.floor(Math.random() * randomSet.length)];
        dispatch(setQ(randomQ))
        setSearchParams({
            q: randomQ,
            index: dataset
        })
        dispatch(postSearchDataset({
            q: randomQ,
            index: dataset
        }))
    }

    return <div className={`relative w-full`}>
        <div className={`absolute pl-4 top-0 mt-[-110px] flex justify-start items-center text-sm`}>
            <span className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>Ask abstract questions</span>
            <Button onClick={handleOnSurprise} className={`${theme === "dark" ? "bg-slate-700 text-slate-100 hover:bg-slate-600" : "bg-slate-100 text-slate-700 hover:bg-slate-200"} font-medium border-none px-2 btn-sm ml-4 text-xs capitalize`}>Surprise me</Button>
        </div>

        <div className={`absolute pl-4 top-0 right-0 flex justify-start items-center text-2xl mt-[0px]`}>
            <div className={`${theme === "dark" ? "text-slate-100" : "text-slate-700"} border-none bg-transparent font-medium p-0 btn-sm flex justify-end h-[fit-content]`}>
                <span className={`flex self-center`}>Share this awesomeness!</span>
                <LinkedinShareButton url={window.location.href}>
                    <LinkedinIcon className={`w-6 h-6 ml-2 rounded-sm`} />
                </LinkedinShareButton>
                <FacebookShareButton url={window.location.href}>
                    <FacebookIcon className={`w-6 h-6 ml-2 rounded-sm`} />
                </FacebookShareButton>
            </div>
        </div>
    </div>
}