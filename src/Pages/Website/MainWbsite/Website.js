import { Outlet } from "react-router-dom"
import NavBar from "../NavBar/Navbar"

export default function Website() {

    return  <>
                <NavBar/>
                <Outlet/>
            </>
}