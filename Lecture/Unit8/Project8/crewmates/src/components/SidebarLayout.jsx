import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const SidebarLayout = () => {
    return (
        <div className="app-container">
            <div className="side-nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/createcrewmate">Create a Crewmate!</Link></li>
                    <li><Link to="/crewmategallery">Crewmate Gallery</Link></li>
                </ul>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;