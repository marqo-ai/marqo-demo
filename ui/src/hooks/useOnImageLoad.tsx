import { Dispatch, SetStateAction, useEffect, useState } from "react";


export const useOnImageLoad = (src: string): [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

    }, [])

    return [loaded, setLoaded]
};