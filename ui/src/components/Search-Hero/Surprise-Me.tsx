import { useSearchParams } from "react-router-dom";
import { Button, useTheme } from "react-daisyui"
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton } from "react-share";
// store
import { useDispatch, useSelector } from "../../store";
import { postSearchDataset } from "../../store/thunks";
import { DatasetTypes, setQ } from "../../store/slices/app-slice";
// data
import surpriseMe from "../../data/surpriseMe.json";
import { UploadImg } from "./Upload-Img";
import { BOREDAPES, SIMPLEWIKI } from "../../commons/constants";

export const getRandomQ = (dataset: DatasetTypes) => {
    let randomSet = dataset === BOREDAPES ? surpriseMe["randomBoredApesQs"] : surpriseMe["randomSimpleWikiQs"];
    return randomSet[Math.floor(Math.random() * randomSet.length)];
}

export const SurpriseMe = () => {
    const [, setSearchParams] = useSearchParams();
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const { dataset, q } = useSelector(({ app }) => app);

    const handleOnSurprise = () => {
        let randomQ = getRandomQ(dataset)

        while (randomQ === q) {
            randomQ = getRandomQ(dataset)
        }

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
        <div className={`absolute pl-0 top-0 mt-[-110px] w-full flex flex-wrap flex-row-reverse gap-[10px] justify-end items-center md:flex-row md:flex-nowrap md:justify-between md:items-center text-sm`}>
            <div className={`flex gap-[10px] w-[fit-content]`}>
                <p className={`${theme === "dark" ? "text-slate-300" : "text-slate-600"} whitespace-nowrap hidden md:block`}>Try abstract or detailed descriptions.</p>
                {/* {dataset !== SIMPLEWIKI && <UploadImg />} */}
            </div>
            <Button
                onClick={handleOnSurprise}
                className={`${theme === "dark" ? "bg-slate-700 text-slate-100 hover:bg-slate-600" : "bg-slate-100 text-slate-700 hover:bg-slate-200"} w-[fit-content] md:w-auto font-medium border-none border-2 border-slate-700 px-2 btn-sm text-xs capitalize`}>Surprise me</Button>
        </div>

        <div className={`absolute pl-4 top-0 right-0 w-[fit-content] flex flex-col flex-wrap md:flex-nowrap space-y-2 md:space-y-0 justify-end items-end text-2xl mt-[0px]`}>

            {/* <Button
                onClick={handleOnSurprise}
                className={`${theme === "dark" ? "bg-slate-700 text-slate-100 hover:bg-slate-600" : "bg-slate-100 text-slate-700 hover:bg-slate-200"} block md:hidden font-medium border-none px-2 btn-sm text-xs capitalize`}>Surprise me</Button> */}
            <div className={`${theme === "dark" ? "text-slate-100" : "text-slate-700"} flex gap-[10px] border-none bg-transparent font-medium p-0 btn-sm justify-end h-[fit-content]`}>
                <span className={`flex self-center hidden md:block`}>Share this awesomeness!</span>
                <LinkedinShareButton url={window.location.href}>
                    <LinkedinIcon className={`w-8 md:w-6 h-8 md:h-6 rounded-sm`} />
                </LinkedinShareButton>
                <FacebookShareButton url={window.location.href}>
                    <FacebookIcon className={`w-8 md:w-6 h-8 md:h-6 rounded-sm`} />
                </FacebookShareButton>
            </div>
        </div>
    </div>
}
