import { useEffect, useState } from "react"

export const useShowScrollToTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        function handleScrollToTop() {
            if (!showScroll && window.scrollY > 720) {

                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        }

        window.addEventListener("scroll", handleScrollToTop)

        return () => {
            window.removeEventListener("scroll", handleScrollToTop)
        }
    }, []);

    return showScroll;
}