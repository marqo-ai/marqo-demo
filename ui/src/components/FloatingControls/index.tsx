import { Button } from "react-daisyui"
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
// hooks
import { useShowScrollToTop } from "../../hooks/useScrollToTop"

export const FloatingControls = () => {
    const showScroll = useShowScrollToTop();

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0, behavior: "smooth",
        });
    }

    // return <div className="flex justify-center w-2/4 absolute bottom-0 sticky transition duration-150 ease-in-out" id="btn-scroll-to-top">
    return <div className="flex justify-center absolute bottom-0 fixed mx-auto transition duration-150 ease-in-out" id="btn-scroll-to-top">
        <div className={`${showScroll ? "block" : "invisible"}`}>
            <Button onClick={handleScrollToTop} className="bg-transparent border-none"><ArrowUpCircleIcon className="w-10 h-10 stroke-transparent fill-primary" /></Button>
        </div>
    </div>
}