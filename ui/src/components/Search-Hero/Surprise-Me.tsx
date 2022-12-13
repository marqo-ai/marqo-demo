import { Button, useTheme } from "react-daisyui"
// store
import { useDispatch, useSelector } from "../../store";
import { postSearchDataset } from "../../store/thunks";
import { setQ } from "../../store/slices/app-slice";
// data
import surpriseMe from "../../data/surpriseMe.json";

export const SurpriseMe = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const { dataset, q } = useSelector(({ app }) => app);

    const handleOnSurprise = () => {
        let randomSet = dataset === "boredapes" ? surpriseMe["randomBoredApesQs"] : surpriseMe["randomSimpleWikiQs"];
        const randomQ = randomSet[Math.floor(Math.random() * randomSet.length)];
        dispatch(setQ(randomQ))
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
    </div>
}