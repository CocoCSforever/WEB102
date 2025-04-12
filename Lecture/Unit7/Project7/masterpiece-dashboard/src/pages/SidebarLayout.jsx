import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
    return (
        <div className="app-container">
            <div className="side-nav">
                <h2>MasterPiece Dashboard</h2>
                <ul>
                    <li>Dashboard</li>
                    <li>About</li>
                </ul>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default SidebarLayout;