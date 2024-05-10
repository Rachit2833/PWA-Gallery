import { Outlet } from "react-router-dom"
import Navbar from "./Home/Navbar"

function AppLayot() {
    return (
        <>
            <div className="Navbar">
                <Navbar />
            </div>

            <div className="Body">
                <Outlet />
            </div>
        </>
    )
}

export default AppLayot
