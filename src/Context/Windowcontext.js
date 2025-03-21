// Context to get the width by secend
import { createContext, useEffect, useState } from "react";


export const WindowSize = createContext(null)

export default function WindowContext({children}) {

    const [windowSize , setWindowSize] = useState(window.innerWidth)

    useEffect(()=> {
        function setWindowWidth() {
            setWindowSize(window.innerWidth)   // Fun make the new size equals the last
        }
        window.addEventListener("resize", setWindowWidth)  // it means when resize run the fun Widthwindow to update

        return () => {
            window.removeEventListener("resize", setWindowWidth)
        }
    } , [])

    return (
    <WindowSize.Provider value={{windowSize}}>
        {children}
    </WindowSize.Provider>
    )
}