import { useState, useEffect } from "react";

/*
 * React Custom Hooks with Axios Async useEffect | React Tutorials for Beginners
 * https://www.youtube.com/watch?v=tBuceoEGFhI
 */
export const useWindowSize = () => {

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        handleResize();

        /* Jotta ikkunan koon muutoksia seurataan kokoaika */
        window.addEventListener("resize", handleResize);

        /* Jälkien siivous, jotta ei tapahdu memory leakup */
        return () => window.removeEventListener("resize", handleResize);

    }, [])

    return windowSize;
}
