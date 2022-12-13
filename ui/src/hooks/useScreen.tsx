import { useEffect, useState } from "react"

export const SCREEN_BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    _2xl: 1536
}

type ScreenTypes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

function getSize(w: number) {
    let size = "";
    const { sm, md, lg, xl, _2xl } = SCREEN_BREAKPOINTS;
    if (w < sm) {
        size = "xs";
    } else if (w >= sm && w < md) {
        size = "sm";
    } else if (w >= md && w < lg) {
        size = "md";
    } else if (w >= lg && w < xl) {
        size = "lg";
    } else if (w >= xl && w < _2xl) {
        size = "xl";
    } else {
        size = "2xl";
    }

    return size as ScreenTypes
}

export const useScreen = () => {
    const [screen, setScreen] = useState<ScreenTypes>(getSize(window.innerWidth));

    function handleResize() {
        let w = window.innerWidth;
        const newScreen = getSize(w);
        if (screen != newScreen) {
            setScreen(newScreen)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [window.innerWidth])

    return { screen };
}