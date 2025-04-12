import React, { useState } from "react";

const SideNav = ({activeSection, setActiveSection}) => {

    return (
        <div className="side-nav">
            <h2>MasterPiece Dashboard</h2>
            <ul>
                <li
                    className={activeSection === "Dashboard" ? "active" : ""}
                    onClick={() => setActiveSection("Dashboard")}
                >
                    Dashboard
                </li>
                {/* <li
                    className={activeSection === "Search" ? "active" : ""}
                    onClick={() => setActiveSection("Search")}
                >
                    Search
                </li> */}
                <li
                    className={activeSection === "About" ? "active" : ""}
                    onClick={() => setActiveSection("About")}
                >
                    About
                </li>
            </ul>
            {/* <div className="content">
                {activeSection === "Dashboard" && <Dashboard />}
                {activeSection === "Search" && <p>Use the search feature to find what you need.</p>}
                {activeSection === "About" && <p>Learn more about this application in the About section.</p>}
            </div> */}
        </div>
    );
};

export default SideNav;