
import { Outlet } from "react-router-dom";
import Sidebar from "../../Componants/Dashboaed/Sidebar";
import Topbar from "../../Componants/Dashboaed/Topbar";
import './Dashboard.css'

export default function Dashboard() {
    return (
    <div className="position-relative ">
        <Topbar/>
        <div style={{ marginTop: '70px'}} className="dashboard d-flex gap-1">
            <Sidebar/>
            <Outlet/>
        </div>
    </div>
    )
}